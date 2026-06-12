/**
 * Utility to compress and downscale images on the client side using HTML5 Canvas.
 * This ensures compatibility with Firestore's 1MB document limit and makes uploading
 * extremely smooth regardless of original photo resolution or size (e.g., from phone camera).
 */
export function compressImage(
  file: File, 
  maxDimension: number = 1000, 
  quality: number = 0.75
): Promise<string> {
  return new Promise((resolve, reject) => {
    // Check if file is valid image
    if (!file.type.startsWith('image/')) {
      reject(new Error('Selected file is not a valid image format.'));
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;

          // Scale down proportionally if either dimension exceeds limits
          if (width > maxDimension || height > maxDimension) {
            if (width > height) {
              height = Math.round((height * maxDimension) / width);
              width = maxDimension;
            } else {
              width = Math.round((width * maxDimension) / height);
              height = maxDimension;
            }
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext('2d');
          if (!ctx) {
            reject(new Error('Failed to create canvas rendering context.'));
            return;
          }

          // Draw the image onto the canvas with scaling
          ctx.drawImage(img, 0, 0, width, height);
          
          // Get compressed Base64 data URL
          const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
          resolve(compressedDataUrl);
        } catch (err: any) {
          reject(new Error('Error processing canvas elements: ' + err.message));
        }
      };

      img.onerror = () => {
        reject(new Error('Failed to render source photo inside browser canvas.'));
      };

      if (e.target?.result) {
        img.src = e.target.result as string;
      } else {
        reject(new Error('Source file read was unexpectedly blank.'));
      }
    };

    reader.onerror = () => {
      reject(new Error('Error reading local file stream.'));
    };

    reader.readAsDataURL(file);
  });
}

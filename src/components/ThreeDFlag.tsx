import React from 'react';

interface ThreeDFlagProps {
  country: string;
  className?: string;
}

export default function ThreeDFlag({ country, className = "w-20 h-14" }: ThreeDFlagProps) {
  // Common 3D wave and satin shadow filters
  const renderDefs = () => (
    <defs>
      {/* Wave pattern light & shade overlay */}
      <linearGradient id="waveLightShade" x1="0" y1="0" x2="1" y2="0.1">
        <stop offset="0%" stopColor="#111111" stopOpacity="0.45" />
        <stop offset="12%" stopColor="#ffffff" stopOpacity="0.5" />
        <stop offset="28%" stopColor="#222222" stopOpacity="0.35" />
        <stop offset="45%" stopColor="#ffffff" stopOpacity="0.45" />
        <stop offset="62%" stopColor="#222222" stopOpacity="0.38" />
        <stop offset="78%" stopColor="#ffffff" stopOpacity="0.4" />
        <stop offset="92%" stopColor="#111111" stopOpacity="0.3" />
        <stop offset="100%" stopColor="#ffffff" stopOpacity="0.1" />
      </linearGradient>

      {/* Premium glossy overlay shadow */}
      <linearGradient id="flagGloss" x1="0.1" y1="0" x2="0.9" y2="1">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.35" />
        <stop offset="40%" stopColor="#ffffff" stopOpacity="0.05" />
        <stop offset="75%" stopColor="#000000" stopOpacity="0.15" />
        <stop offset="100%" stopColor="#000000" stopOpacity="0.3" />
      </linearGradient>

      {/* Cylinder 3D side gradient */}
      <linearGradient id="flagCylinderLeft" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#000000" stopOpacity="0.35" />
        <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
      </linearGradient>

      <linearGradient id="flagCylinderRight" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
        <stop offset="100%" stopColor="#000000" stopOpacity="0.35" />
      </linearGradient>
    </defs>
  );

  const key = country.toLowerCase().trim();

  // Render the specific country flag
  switch (key) {
    case 'india':
      return (
        <div className={`relative ${className} group`}>
          {/* Real country flag with advanced waving filter & glossy wrap */}
          <svg 
            viewBox="0 0 150 100" 
            className="w-full h-full rounded-lg overflow-hidden shadow-[0_12px_28px_rgba(0,0,0,0.32)] border border-white/10 transition-transform duration-500 group-hover:scale-108"
          >
            {renderDefs()}
            {/* Saffron horizontal block */}
            <rect width="150" height="33.3" fill="#FF9933" />
            
            {/* White horizontal block */}
            <rect y="33.3" width="150" height="33.4" fill="#FFFFFF" />
            
            {/* Green horizontal block */}
            <rect y="66.7" width="150" height="33.3" fill="#138808" />
            
            {/* Wheel center: Ashoka Chakra with 24 distinct spokes */}
            <g transform="translate(75, 50) scale(0.95)">
              <circle r="12" fill="none" stroke="#000080" strokeWidth="1.8" />
              <circle r="2.2" fill="#000080" />
              {Array.from({ length: 24 }).map((_, i) => (
                <line
                  key={i}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="-12"
                  stroke="#000080"
                  strokeWidth="0.8"
                  transform={`rotate(${(i * 360) / 24})`}
                />
              ))}
              <circle r="9" fill="none" stroke="#000080" strokeWidth="0.4" strokeDasharray="1.2 1" />
            </g>

            {/* Realistic Silk Flags wave overlay and 3D curves */}
            <rect width="150" height="100" fill="url(#waveLightShade)" style={{ mixBlendMode: 'multiply', opacity: 0.38 }} />
            <rect width="150" height="100" fill="url(#flagGloss)" style={{ mixBlendMode: 'overlay', opacity: 0.45 }} />
            
            {/* Bevel 3D visual shadows */}
            <rect width="15" height="100" fill="url(#flagCylinderLeft)" />
            <rect x="135" width="15" height="100" fill="url(#flagCylinderRight)" />
          </svg>
        </div>
      );

    case 'united states':
    case 'us':
    case 'usa':
      return (
        <div className={`relative ${className} group`}>
          <svg 
            viewBox="0 0 150 100" 
            className="w-full h-full rounded-lg overflow-hidden shadow-[0_12px_28px_rgba(0,0,0,0.32)] border border-white/10 transition-transform duration-500 group-hover:scale-108"
          >
            {renderDefs()}
            {/* 13 Red & White US Stripes */}
            {Array.from({ length: 13 }).map((_, i) => (
              <rect
                key={i}
                y={(i * 100) / 13}
                width="150"
                height={100 / 13}
                fill={i % 2 === 0 ? "#B22234" : "#FFFFFF"}
              />
            ))}
            {/* Blue canton upper-left */}
            <rect width="66" height="53.8" fill="#3C3B6E" />
            
            {/* US Stars (Structured cluster pattern coordinates) */}
            <g fill="#FFFFFF" transform="scale(0.85) translate(4, 3.5)">
              {Array.from({ length: 5 }).map((_, row) => (
                <g key={row} transform={`translate(0, ${row * 11})`}>
                  {Array.from({ length: 6 }).map((_, col) => (
                    <polygon
                      key={col}
                      points="4,0 5.2,2.8 8.2,2.8 5.8,4.7 6.8,7.7 4,5.8 1.2,7.7 2.2,4.7 -0.2,2.8 2.8,2.8"
                      transform={`translate(${col * 13}, 0)`}
                    />
                  ))}
                </g>
              ))}
              {Array.from({ length: 4 }).map((_, row) => (
                <g key={row} transform={`translate(6.5, ${row * 11 + 5.5})`}>
                  {Array.from({ length: 5 }).map((_, col) => (
                    <polygon
                      key={col}
                      points="4,0 5.2,2.8 8.2,2.8 5.8,4.7 6.8,7.7 4,5.8 1.2,7.7 2.2,4.7 -0.2,2.8 2.8,2.8"
                      transform={`translate(${col * 13}, 0)`}
                    />
                  ))}
                </g>
              ))}
            </g>

            {/* Silk Waves Filter */}
            <rect width="150" height="100" fill="url(#waveLightShade)" style={{ mixBlendMode: 'multiply', opacity: 0.38 }} />
            <rect width="150" height="100" fill="url(#flagGloss)" style={{ mixBlendMode: 'overlay', opacity: 0.45 }} />
            
            {/* Left-right curves for roundness */}
            <rect width="15" height="100" fill="url(#flagCylinderLeft)" />
            <rect x="135" width="15" height="100" fill="url(#flagCylinderRight)" />
          </svg>
        </div>
      );

    case 'canada':
      return (
        <div className={`relative ${className} group`}>
          <svg 
            viewBox="0 0 150 100" 
            className="w-full h-full rounded-lg overflow-hidden shadow-[0_12px_28px_rgba(0,0,0,0.32)] border border-white/10 transition-transform duration-500 group-hover:scale-108"
          >
            {renderDefs()}
            {/* Canada Vertical Triband (1:2:1 red, white, red) */}
            <rect width="37.5" height="100" fill="#FF0000" />
            <rect x="37.5" width="75" height="100" fill="#FFFFFF" />
            <rect x="112.5" width="37.5" height="100" fill="#FF0000" />

            {/* Iconic Maple Leaf (Hand-drawn path coords for high resolution) */}
            <path 
              d="M 75 22 
                 L 77.5 35 L 83.5 31 L 82 39.5 L 89 36 L 86.5 45.5 L 94 48 L 84 54.5 L 87 63.5 L 82 61 L 81.5 67 L 78.5 67 L 78.5 78 L 71.5 78 L 71.5 67 L 68.5 67 L 68 61 L 63 63.5 L 66 54.5 L 56 48 L 63.5 45.5 L 61 36 L 68 39.5 L 66.5 31 L 72.5 35 Z" 
              fill="#FF0000" 
            />

            {/* Silk 3D shadows */}
            <rect width="150" height="100" fill="url(#waveLightShade)" style={{ mixBlendMode: 'multiply', opacity: 0.38 }} />
            <rect width="150" height="100" fill="url(#flagGloss)" style={{ mixBlendMode: 'overlay', opacity: 0.45 }} />
            
            <rect width="15" height="100" fill="url(#flagCylinderLeft)" />
            <rect x="135" width="15" height="100" fill="url(#flagCylinderRight)" />
          </svg>
        </div>
      );

    case 'united kingdom':
    case 'uk':
      return (
        <div className={`relative ${className} group`}>
          <svg 
            viewBox="0 0 150 100" 
            className="w-full h-full rounded-lg overflow-hidden shadow-[0_12px_28px_rgba(0,0,0,0.32)] border border-white/10 transition-transform duration-500 group-hover:scale-108"
          >
            {renderDefs()}
            {/* Blue background */}
            <rect width="150" height="100" fill="#012169" />

            {/* White diagonal saltire lines */}
            <line x1="0" y1="0" x2="150" y2="100" stroke="#FFFFFF" strokeWidth="15" />
            <line x1="150" y1="0" x2="0" y2="100" stroke="#FFFFFF" strokeWidth="15" />

            {/* Red diagonal cross (St Patrick) */}
            <path d="M0,0 L75,50 M150,100 L75,50" stroke="#C8102E" strokeWidth="5" />
            <path d="M150,0 L75,50 M0,100 L75,50" stroke="#C8102E" strokeWidth="5" />

            {/* White vertical/horizontal cross border (St George background) */}
            <rect x="61" y="0" width="28" height="100" fill="#FFFFFF" />
            <rect x="0" y="36" width="150" height="28" fill="#FFFFFF" />

            {/* Red central vertical/horizontal cross (St George) */}
            <rect x="66" y="0" width="18" height="100" fill="#C8102E" />
            <rect x="0" y="41" width="150" height="18" fill="#C8102E" />

            {/* Silk Wave effect overlay */}
            <rect width="150" height="100" fill="url(#waveLightShade)" style={{ mixBlendMode: 'multiply', opacity: 0.38 }} />
            <rect width="150" height="100" fill="url(#flagGloss)" style={{ mixBlendMode: 'overlay', opacity: 0.45 }} />
            
            <rect width="15" height="100" fill="url(#flagCylinderLeft)" />
            <rect x="135" width="15" height="100" fill="url(#flagCylinderRight)" />
          </svg>
        </div>
      );

    case 'europe union':
    case 'eu':
    case 'europe':
    case 'european union':
      return (
        <div className={`relative ${className} group`}>
          <svg 
            viewBox="0 0 150 100" 
            className="w-full h-full rounded-lg overflow-hidden shadow-[0_12px_28px_rgba(0,0,0,0.32)] border border-white/10 transition-transform duration-500 group-hover:scale-108"
          >
            {renderDefs()}
            {/* Deep EU navy blue */}
            <rect width="150" height="100" fill="#003399" />

            {/* Star geometry rendering inside circle */}
            <g transform="translate(75, 50) scale(0.95)" fill="#FFCC00">
              {Array.from({ length: 12 }).map((_, i) => {
                const angle = (i * 360) / 12 - 90;
                const r = 24; // star circle radius
                const x = r * Math.cos((angle * Math.PI) / 180);
                const y = r * Math.sin((angle * Math.PI) / 180);
                return (
                  <polygon
                    key={i}
                    points="2,0 2.6,1.4 4.1,1.4 2.9,2.4 3.4,3.9 2,2.9 0.6,3.9 1.1,2.4 -0.1,1.4 1.4,1.4"
                    transform={`translate(${x}, ${y}) scale(1.6)`}
                  />
                );
              })}
            </g>

            {/* Satin fabric wavy overlay */}
            <rect width="150" height="100" fill="url(#waveLightShade)" style={{ mixBlendMode: 'multiply', opacity: 0.38 }} />
            <rect width="150" height="100" fill="url(#flagGloss)" style={{ mixBlendMode: 'overlay', opacity: 0.45 }} />
            
            <rect width="15" height="100" fill="url(#flagCylinderLeft)" />
            <rect x="135" width="15" height="100" fill="url(#flagCylinderRight)" />
          </svg>
        </div>
      );

    case 'middle east':
    case 'uae':
    case 'arab':
      return (
        <div className={`relative ${className} group`}>
          <svg 
            viewBox="0 0 150 100" 
            className="w-full h-full rounded-lg overflow-hidden shadow-[0_12px_28px_rgba(0,0,0,0.32)] border border-white/10 transition-transform duration-500 group-hover:scale-108"
          >
            {renderDefs()}
            {/* Middle East key courier hub flag (United Arab Emirates - UAE) */}
            {/* Left red vertical strip (1/4th width) */}
            <rect width="37.5" height="100" fill="#FF0000" />
            
            {/* Right horizontal stripes: Green, White, Black */}
            <rect x="37.5" width="112.5" height="33.3" fill="#00732F" />
            <rect x="37.5" y="33.3" width="112.5" height="33.4" fill="#FFFFFF" />
            <rect x="37.5" y="66.7" width="112.5" height="33.3" fill="#000000" />

            {/* Glowing Golden Silk Emirates Trim Accent (for luxurious rug delivery aura) */}
            <path d="M 0 0 L 150 0 L 150 100 L 0 100 Z" fill="none" stroke="#FFD700" strokeWidth="1.2" opacity="0.3" />

            {/* Silk light overlay */}
            <rect width="150" height="100" fill="url(#waveLightShade)" style={{ mixBlendMode: 'multiply', opacity: 0.38 }} />
            <rect width="150" height="100" fill="url(#flagGloss)" style={{ mixBlendMode: 'overlay', opacity: 0.45 }} />
            
            <rect width="15" height="100" fill="url(#flagCylinderLeft)" />
            <rect x="135" width="15" height="100" fill="url(#flagCylinderRight)" />
          </svg>
        </div>
      );

    default:
      return null;
  }
}

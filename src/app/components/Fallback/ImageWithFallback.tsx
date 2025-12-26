import React, { useEffect, useState } from "react";

const ERROR_IMG_SRC =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg==";

type ImageWithFallbackProps =
  React.ImgHTMLAttributes<HTMLImageElement>;

export function ImageWithFallback({
  src,
  alt,
  className = "",
  style,
  ...rest
}: ImageWithFallbackProps) {
  const [hasError, setHasError] = useState(false);

  // Reset error state when image source changes
  useEffect(() => {
    setHasError(false);
  }, [src]);

  // Handle broken image
  const handleError = () => {
    setHasError(true);
  };

  // Render fallback
  if (hasError) {
    return (
      <div
        className={`inline-block bg-gray-100 ${className}`}
        style={style}
        aria-label="Image failed to load"
      >
        <div className="flex items-center justify-center w-full h-full">
          <img
            src={ERROR_IMG_SRC}
            alt={alt ?? "Image failed to load"}
            {...rest}
            data-original-src={src}
            onError={(e) => {
              // prevent infinite error loop
              e.currentTarget.onerror = null;
            }}
          />
        </div>
      </div>
    );
  }

  // Render normal image
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={style}
      {...rest}
      onError={handleError}
    />
  );
}

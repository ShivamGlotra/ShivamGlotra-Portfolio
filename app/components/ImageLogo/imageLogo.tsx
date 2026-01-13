import React from "react";
import Image from "next/image";

interface ImageLogoProps {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  className?: string;
}

const ImageLogo: React.FC<ImageLogoProps> = ({
  src,
  alt = "Logo",
  width = 100,
  height = 100,
  className = "",
}) => {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
    />
  );
};

export default ImageLogo;

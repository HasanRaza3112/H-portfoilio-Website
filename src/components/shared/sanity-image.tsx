import Image from "next/image";

import { cn } from "@/lib/utils";
import type { SanityImage } from "@/types";

interface SanityImageProps {
  image?: SanityImage | null;
  alt: string;
  className?: string;
  imageClassName?: string;
  sizes?: string;
  priority?: boolean;
  fill?: boolean;
  width?: number;
  height?: number;
}

export function SanityImage({
  image,
  alt,
  className,
  imageClassName,
  sizes = "(max-width: 768px) 100vw, 33vw",
  priority = false,
  fill = true,
  width,
  height,
}: SanityImageProps) {
  if (!image?.url) {
    return (
      <div
        className={cn(
          "bg-surface-secondary flex items-center justify-center text-caption text-muted",
          className,
        )}
        aria-hidden={alt ? undefined : true}
      >
        {alt ? <span className="sr-only">{alt}</span> : null}
      </div>
    );
  }

  if (fill) {
    return (
      <div className={cn("relative overflow-hidden", className)}>
        <Image
          src={image.url}
          alt={alt}
          fill
          className={cn("object-cover", imageClassName)}
          sizes={sizes}
          priority={priority}
          placeholder={image.lqip ? "blur" : "empty"}
          blurDataURL={image.lqip ?? undefined}
        />
      </div>
    );
  }

  return (
    <Image
      src={image.url}
      alt={alt}
      width={width ?? 800}
      height={height ?? 600}
      className={cn("object-cover", className, imageClassName)}
      sizes={sizes}
      priority={priority}
      placeholder={image.lqip ? "blur" : "empty"}
      blurDataURL={image.lqip ?? undefined}
    />
  );
}

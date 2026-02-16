"use client";

import Image, { ImageProps } from "next/image";
import { useState, useEffect } from "react";

/**
 * Post image. Keeps layout stable: when src is empty or image fails to load,
 * renders a grey placeholder of the same size so the layout does not change.
 * Syncs to src prop when it changes (e.g. client navigation or async data).
 */
export function PostImage({
  src,
  alt,
  width,
  height,
  fill,
  className,
  style,
  ...rest
}: ImageProps) {
  const [imgSrc, setImgSrc] = useState(() =>
    typeof src === "string" && src.trim() ? src : undefined
  );
  const [errored, setErrored] = useState(false);

  useEffect(() => {
    const next = typeof src === "string" && src.trim() ? src : undefined;
    setImgSrc(next ?? undefined);
    setErrored(false);
  }, [src]);

  const showImage = !errored && imgSrc && imgSrc.length > 0;

  const isFill = fill === true;
  const numericWidth = typeof width === "number" ? width : undefined;
  const numericHeight = typeof height === "number" ? height : undefined;

  const wrapperStyle: React.CSSProperties = isFill
    ? { position: "relative", width: "100%", height: "100%", minHeight: 0, display: "block" }
    : {
        position: "relative",
        display: "block",
        width: numericWidth ?? "100%",
        height: numericHeight ?? "100%",
        overflow: "hidden",
      };

  const placeholderStyle: React.CSSProperties = isFill
    ? { position: "absolute", inset: 0, backgroundColor: "#e0e0e0" }
    : {
        width: "100%",
        height: "100%",
        backgroundColor: "#e0e0e0",
        minWidth: numericWidth ?? undefined,
        minHeight: numericHeight ?? undefined,
      };

  return (
    <span
      style={{ ...wrapperStyle, ...(style as React.CSSProperties) }}
      data-post-image-wrapper
    >
      {showImage ? (
        <Image
          {...rest}
          src={imgSrc!}
          alt={alt}
          width={width}
          height={height}
          fill={fill}
          className={className}
          unoptimized
          onError={() => setErrored(true)}
          style={{
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
      ) : (
        <span
          className={`post-image-placeholder ${className ?? ""}`.trim()}
          style={placeholderStyle}
          aria-hidden
        />
      )}
    </span>
  );
}

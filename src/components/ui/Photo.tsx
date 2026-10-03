import Image from "next/image";
import type { Photo as PhotoType } from "@/lib/images";

type Props = {
  photo: PhotoType;
  sizes: string;
  className?: string;
  priority?: boolean;
  /** When true the image fills its (positioned) parent with object-cover. */
  fill?: boolean;
};

export function Photo({ photo, sizes, className = "", priority, fill = true }: Props) {
  if (fill) {
    return (
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        sizes={sizes}
        priority={priority}
        placeholder="blur"
        blurDataURL={photo.blurDataURL}
        className={`object-cover ${className}`}
      />
    );
  }
  return (
    <Image
      src={photo.src}
      alt={photo.alt}
      width={photo.width}
      height={photo.height}
      sizes={sizes}
      priority={priority}
      placeholder="blur"
      blurDataURL={photo.blurDataURL}
      className={`h-auto w-full ${className}`}
    />
  );
}

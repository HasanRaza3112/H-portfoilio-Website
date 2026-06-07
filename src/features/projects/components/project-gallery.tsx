import { SanityImage } from "@/components/shared/sanity-image";
import { Section } from "@/components/layout/section";
import type { ProjectDetail } from "@/types";

interface ProjectGalleryProps {
  gallery: NonNullable<ProjectDetail["gallery"]>;
  videos?: ProjectDetail["videos"];
}

export function ProjectGallery({ gallery, videos }: ProjectGalleryProps) {
  const images = gallery.filter((item) => item.url);

  if (images.length === 0 && !videos?.length) {
    return null;
  }

  return (
    <Section
      id="project-gallery"
      aria-labelledby="project-gallery-heading"
      divider="top"
      eyebrow="Media"
      title="Gallery"
      titleId="project-gallery-heading"
    >
      {images.length > 0 ? (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((image, index) => (
            <li key={`${image.url}-${index}`}>
              <figure className="overflow-hidden rounded-lg border border-border-subtle bg-surface-secondary shadow-panel">
                <SanityImage
                  image={image}
                  alt={image.alt ?? `Gallery image ${index + 1}`}
                  className="aspect-[4/3] w-full"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                {image.caption ? (
                  <figcaption className="border-t border-border-subtle px-4 py-3 text-body-sm text-muted">
                    {image.caption}
                  </figcaption>
                ) : null}
              </figure>
            </li>
          ))}
        </ul>
      ) : null}
      {videos && videos.length > 0 ? (
        <ul className="mt-6 flex flex-wrap gap-3">
          {videos.map((video) => (
            <li key={video._key ?? video.url}>
              <a
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-md border border-border-subtle bg-surface-secondary px-4 py-2 text-body-sm text-foreground transition-colors-token hover:border-border-accent hover:text-accent"
              >
                {video.title}
              </a>
            </li>
          ))}
        </ul>
      ) : null}
    </Section>
  );
}

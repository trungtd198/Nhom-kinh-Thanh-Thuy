import Image from 'next/image';

type ProjectCardProps = {
  project: {
    title: string;
    location: string;
    type: string;
    year: string;
    image: string;
  };
};

export const ProjectCard = ({ project }: ProjectCardProps) => (
  <article className="group overflow-hidden rounded-lg bg-navy-950 text-white">
    <div className="relative aspect-[5/4] overflow-hidden">
      <Image
        src={project.image}
        alt={project.title}
        fill
        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
        className="object-cover opacity-80 transition duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/20 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-5">
        <p className="text-sm font-semibold text-champagne-300">
          {project.type}
        </p>
        <h3 className="mt-2 text-xl font-bold">{project.title}</h3>
        <p className="mt-2 text-sm text-silver-200">
          {project.location} · {project.year}
        </p>
      </div>
    </div>
  </article>
);

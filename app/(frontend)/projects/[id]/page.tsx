import Image from 'next/image';
import Link from 'next/link';
import { sanityFetch } from '@/sanity/lib/client';
import { singleProjectQuery, projectsQuery } from '@/sanity/lib/queries';
import { PortableText } from 'next-sanity';

export const revalidate = 60;

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  // Fetch specific project
  const project = await sanityFetch(singleProjectQuery, { slug: id }, null);
  
  // Fetch all projects to determine "Next Project"
  const allProjects = await sanityFetch(projectsQuery, {}, []);
  
  if (!project) {
    return <div className="min-h-screen pt-48 px-8 max-w-screen-2xl mx-auto">Projet introuvable</div>;
  }

  // Find next project
  const currentIndex = allProjects.findIndex((p: any) => p.id === id);
  let nextProject = allProjects[0];
  if (currentIndex !== -1 && currentIndex < allProjects.length - 1) {
    nextProject = allProjects[currentIndex + 1];
  }

  const gallery = project.gallery || [];

  return (
    <div className="bg-white">
      {/* Fixed Back Button */}
      <Link href="/projects" className="fixed top-32 left-6 md:left-12 z-50 inline-flex items-center gap-3 text-xs uppercase tracking-widest text-brand-black bg-white/80 backdrop-blur-md px-6 py-3 border border-brand-black/10 hover:bg-brand-black hover:text-white transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
        Retour
      </Link>

      {/* Hero */}
      <section className="relative h-[80vh] w-full">
        <Image
          src={project.coverImage || "/images/archi_project_1_1781266000472.png"}
          alt={project.title}
          fill
          className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
          priority
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-8 max-w-screen-2xl mx-auto w-full">
            <div className="bg-white/90 backdrop-blur-sm p-6 md:p-8 max-w-md border-l-4 border-brand-sand">
                <span className="text-xs uppercase tracking-[0.3em] text-brand-gray mb-2 block">Détails du projet</span>
                <h1 className="font-serif text-4xl md:text-5xl mb-4 font-bold tracking-tight text-brand-black">{project.title}</h1>
                <p className="text-sm uppercase tracking-[0.2em] font-medium text-brand-gray">{project.location} — {project.year}</p>
            </div>
        </div>
      </section>

      {/* Info Block */}
      <section className="max-w-screen-2xl mx-auto px-4 md:px-8 py-24 flex flex-col lg:grid lg:grid-cols-12 gap-16">
        <div className="lg:col-span-4">
          <div className="grid grid-cols-2 gap-y-12 text-sm border-t border-brand-black/10 pt-8">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] mb-2 text-brand-gray">Localisation</p>
              <p className="font-serif text-lg text-brand-black italic">{project.location}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] mb-2 text-brand-gray">Année</p>
              <p className="font-serif text-lg text-brand-black italic">{project.year}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] mb-2 text-brand-gray">Service</p>
              <p className="font-serif text-lg text-brand-black italic">{project.category}</p>
            </div>
          </div>
        </div>
        <div className="lg:col-span-8 flex items-start border-t border-brand-black/10 pt-8">
          <div className="text-base leading-relaxed text-brand-black font-light max-w-2xl prose prose-neutral">
            {project.description ? (
              <PortableText value={project.description} />
            ) : (
              <p>Description détaillée du projet.</p>
            )}
          </div>
        </div>
      </section>

      {/* Gallery */}
      {gallery.length > 0 && (
        <section className="max-w-screen-2xl mx-auto px-8 pb-32">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
            {gallery.map((img: string, i: number) => (
              <div 
                key={i} 
                className={`relative bg-[#F9F9F9] ${
                  i === 2 ? 'md:col-span-2 aspect-[21/9]' : 'aspect-square md:aspect-[4/5]'
                }`}
              >
                <Image
                  src={img}
                  alt={`${project.title} - Image ${i + 1}`}
                  fill
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Next Project Navigation */}
      {nextProject && (
        <section className="border-t border-brand-black/10 bg-[#F9F9F9] overflow-hidden">
          <Link href={`/projects/${nextProject.id}`} className="group relative block w-full py-32 md:py-48 flex flex-col items-center justify-center text-center transition-colors">
            {/* Subtle hover background expansion */}
            <div className="absolute inset-0 bg-brand-black/5 transform scale-y-0 origin-bottom group-hover:scale-y-100 transition-transform duration-700 ease-[0.16,1,0.3,1] z-0" />
            
            <div className="relative z-10 flex flex-col items-center">
              <span className="text-xs uppercase tracking-[0.4em] text-brand-gray mb-8 block font-medium group-hover:text-brand-black transition-colors duration-500">
                Projet Suivant
              </span>
              <h2 className="font-serif text-5xl md:text-7xl lg:text-[100px] italic font-light tracking-tight text-brand-black group-hover:scale-[1.02] transition-transform duration-700 ease-[0.16,1,0.3,1]">
                {nextProject.title}
              </h2>
            </div>
          </Link>
        </section>
      )}
    </div>
  );
}

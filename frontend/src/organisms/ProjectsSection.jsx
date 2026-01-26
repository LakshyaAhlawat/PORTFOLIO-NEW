import { motion } from 'framer-motion';
import { Section } from '../atoms/Section.jsx';
import { Heading } from '../atoms/Heading.jsx';
import { Text } from '../atoms/Text.jsx';
import { useProjects } from '../hooks/useProjects.js';
import Spinner from '../components/spinner.jsx';
export const ProjectsSection = () => {
  const { projects, loading } = useProjects();

  return (
    <Section id="projects">
      <div className="space-y-6">
        <Heading level={2}>Projects</Heading>
        <Text>A selection of work that showcases how I build.</Text>
        {loading && <Spinner />}

        <div className="mt-6 grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, idx) => (
            <motion.article
              key={project.id || project._id}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: idx * 0.06 }}
              whileHover={{ y: -8, scale: 1.03 }}
              className="group relative overflow-hidden rounded-3xl border border-gray-800 bg-gradient-to-br from-gray-900/95 to-black/80 p-0 shadow-2xl"
            >
              {/* Thumbnail */}
              <div className="h-44 w-full bg-gray-800">
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-44 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-44 items-center justify-center text-gray-500">No image</div>
                )}
              </div>

              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-lg font-semibold text-white group-hover:text-blue-300">
                    {project.title}
                  </h3>
                  <span className="text-xs text-gray-400">{new Date(project.createdAt).getFullYear()}</span>
                </div>

                {project.description && (
                  <p className="mt-2 text-sm text-gray-300 line-clamp-3">{project.description}</p>
                )}

                {project.techStack?.length ? (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {project.techStack.map((t) => (
                      <span key={t} className="rounded-full bg-blue-600/10 px-3 py-1 text-[11px] text-blue-300">
                        {t}
                      </span>
                    ))}
                  </div>
                ) : null}

                <div className="mt-4 flex gap-3">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 px-3 py-2 text-sm font-semibold text-white shadow-md hover:brightness-105"
                    >
                      Live
                    </a>
                  )}

                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-gray-700 px-3 py-2 text-sm font-medium text-gray-200 hover:bg-gray-800"
                    >
                      GitHub
                    </a>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default ProjectsSection;

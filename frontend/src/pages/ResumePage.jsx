import { SiteHeader } from '../organisms/SiteHeader.jsx';
import { SiteFooter } from '../organisms/SiteFooter.jsx';
import { Section } from '../atoms/Section.jsx';
import { Heading } from '../atoms/Heading.jsx';
import { Text } from '../atoms/Text.jsx';
import { ResumeSection } from '../organisms/ResumeSection.jsx';
import { useResume } from '../hooks/useResume.js';
import { motion } from 'framer-motion';

export const ResumePage = () => {
  const { resume } = useResume();

  return (
    <div className="flex min-h-screen flex-col bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-50 w-full overflow-x-hidden">
      <SiteHeader />
      <main className="flex-1">
        <ResumeSection />
        <Section>
          <div className="mx-auto max-w-4xl rounded-2xl border border-gray-200 bg-white/90 p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900/80">
            <Heading level={3}>Downloadable Resumes</Heading>
            <Text className="mt-2 text-sm">Choose a resume tailored for a purpose. Click to open or download.</Text>
            <ul className="mt-4 space-y-2">
              {(resume?.pdfs || []).map((p) => (
                <li key={p.publicId} className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{p.title || 'Untitled'}</div>
                    <div className="text-xs text-gray-500">{p.purpose} · {new Date(p.uploadedAt).toLocaleDateString()}</div>
                  </div>
                  {p.downloadable ? (
                    <a href={p.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-3 py-1 text-sm text-white">Open</a>
                  ) : (
                    <span className="inline-flex items-center gap-2 rounded-full bg-gray-700 px-3 py-1 text-sm text-gray-300">Visible (not downloadable)</span>
                  )}
                </li>
              ))}
              {!resume?.pdfs?.length && <li className="text-sm text-gray-500">No downloadable resumes available.</li>}
            </ul>
          </div>
        </Section>
        <Section>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {resume?.experience?.length ? (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="rounded-2xl border border-gray-200 bg-white/90 p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900/80"
              >
                <Heading level={3} className="mb-2 text-lg">
                  Experience
                </Heading>
                <ul className="space-y-3 text-sm">
                  {resume.experience.map((item, idx) => (
                    <li key={idx} className="rounded-lg border border-gray-100 p-3 dark:border-gray-700">
                      <p className="font-semibold">
                        {item.role} @ {item.company}
                      </p>
                      <p className="text-xs text-gray-500">
                        {item.startDate} – {item.endDate || 'Present'} · {item.location}
                      </p>
                      {item.description && (
                        <p className="mt-1 text-gray-700 dark:text-gray-200">{item.description}</p>
                      )}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ) : null}

            {resume?.education?.length ? (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.05 }}
                className="rounded-2xl border border-gray-200 bg-white/90 p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900/80"
              >
                <Heading level={3} className="mb-2 text-lg">
                  Education
                </Heading>
                <ul className="space-y-3 text-sm">
                  {resume.education.map((item, idx) => (
                    <li key={idx} className="rounded-lg border border-gray-100 p-3 dark:border-gray-700">
                      <p className="font-semibold">{item.degree}</p>
                      <p className="text-xs text-gray-500">
                        {item.institution} · {item.startDate} – {item.endDate}
                      </p>
                      {item.description && (
                        <p className="mt-1 text-gray-700 dark:text-gray-200">{item.description}</p>
                      )}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ) : null}

            {resume?.skills?.length ? (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="rounded-2xl border border-gray-200 bg-white/90 p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900/80"
              >
                <Heading level={3} className="mb-2 text-lg">
                  Skills
                </Heading>
                <p className="text-sm text-gray-700 dark:text-gray-200">
                  {resume.skills.join(' · ')}
                </p>
              </motion.div>
            ) : null}

            {resume?.achievements?.length ? (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.15 }}
                className="rounded-2xl border border-gray-200 bg-white/90 p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900/80"
              >
                <Heading level={3} className="mb-2 text-lg">
                  Achievements
                </Heading>
                <ul className="list-disc space-y-1 pl-5 text-sm text-gray-700 dark:text-gray-200">
                  {resume.achievements.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </motion.div>
            ) : null}
          </div>
        </Section>
      </main>
      <SiteFooter />
    </div>
  );
};

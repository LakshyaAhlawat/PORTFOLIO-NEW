export const Section = ({ id, children, className = '' }) => (
  <section id={id} className={`py-16 md:py-24 ${className}`}>
    <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">{children}</div>
  </section>
);

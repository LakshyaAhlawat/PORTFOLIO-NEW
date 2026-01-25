export const Heading = ({ level = 1, children, className = '' }) => {
  const Tag = `h${level}`;
  const sizes = {
    1: 'text-4xl md:text-5xl font-bold',
    2: 'text-3xl md:text-4xl font-semibold',
    3: 'text-2xl font-semibold',
  };
  return <Tag className={`${sizes[level] || sizes[2]} ${className}`}>{children}</Tag>;
};

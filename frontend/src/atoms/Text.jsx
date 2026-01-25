export const Text = ({ children, className = '' }) => (
  <p className={`text-sm md:text-base text-gray-600 dark:text-gray-300 ${className}`}>{children}</p>
);

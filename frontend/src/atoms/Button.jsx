export const Button = ({
  as: Component = 'button',
  children,
  variant = 'primary',
  className = '',
  ...props
}) => {
  const base =
    'inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background transition-colors disabled:opacity-50 disabled:cursor-not-allowed';
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-500 focus-visible:ring-blue-600',
    ghost: 'bg-transparent text-sm text-muted-foreground hover:bg-gray-100 dark:hover:bg-gray-800',
  };

  return (
    <Component className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </Component>
  );
};

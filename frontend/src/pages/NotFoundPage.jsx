import { Link } from 'react-router-dom';
import { Section } from '../atoms/Section.jsx';
import { Heading } from '../atoms/Heading.jsx';
import { Text } from '../atoms/Text.jsx';

export const NotFoundPage = () => (
  <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-950">
    <Section className="text-center">
      <Heading level={2}>Page not found</Heading>
      <Text className="mt-2">The page youre looking for does not exist.</Text>
      <p className="mt-4 text-sm">
        <Link to="/" className="text-blue-600 hover:underline">
          Go back home
        </Link>
      </p>
    </Section>
  </div>
);

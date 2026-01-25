
import { SiteHeader } from '../organisms/SiteHeader.jsx';
import { SiteFooter } from '../organisms/SiteFooter.jsx';
import { ContactSection } from '../organisms/ContactSection.jsx';
import { SparklesBG } from '../components/SparklesBG.jsx';

export const ContactPage = () => (
  <div className="relative flex min-h-screen flex-col bg-gray-950 text-gray-50 overflow-x-hidden">
    <SparklesBG />
    <SiteHeader />
    <main className="flex-1 z-30 relative">
      <ContactSection />
    </main>
    <SiteFooter />
  </div>
);

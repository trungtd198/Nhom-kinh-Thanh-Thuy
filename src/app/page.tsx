import { AnimatedSection } from '@/components/sections/animated-section';
import { CTASection } from '@/components/sections/cta-section';
import { GalleryMasonry } from '@/components/sections/gallery-masonry';
import { HomeHero } from '@/components/sections/home-hero';
import { ProcessSection } from '@/components/sections/process-section';
import { ProductsSection } from '@/components/sections/products-section';
import { ProjectsSection } from '@/components/sections/projects-section';
import { StatsSection } from '@/components/sections/stats-section';
import { TestimonialsSection } from '@/components/sections/testimonials-section';

const HomePage = () => (
  <>
    <HomeHero />
    <AnimatedSection>
      <StatsSection />
    </AnimatedSection>
    <AnimatedSection>
      <ProductsSection />
    </AnimatedSection>
    <AnimatedSection>
      <ProjectsSection />
    </AnimatedSection>
    <AnimatedSection>
      <ProcessSection />
    </AnimatedSection>
    <AnimatedSection>
      <GalleryMasonry />
    </AnimatedSection>
    <AnimatedSection>
      <TestimonialsSection />
    </AnimatedSection>
    <CTASection />
  </>
);

export default HomePage;

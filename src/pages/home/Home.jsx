import React from 'react';
import HeroSection from './HeroSection';
import { TrustStrip, ServicesPreview } from './TrustServices';
import { ClientFlow, ApplicantFlow } from './Flows';
import { WhyUs, Testimonials } from './WhyTestimonials';
import { JobsPreview, CtaBanner } from './CtaJobs';
import PortfolioGallery from '../../components/sections/PortfolioGallery';
import { useRevealOnScroll } from '../../hooks/useReveal';

export default function Home() {
  const reveal = useRevealOnScroll();
  return (
    <div ref={reveal}>
      <HeroSection />
      <TrustStrip />
      <ServicesPreview />
      <ClientFlow />
      <WhyUs />
      <PortfolioGallery />
      <JobsPreview />
      <Testimonials />
      <ApplicantFlow />
      <CtaBanner />
    </div>
  );
}
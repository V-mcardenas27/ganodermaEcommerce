import { Navbar } from '@/components/store/Navbar'
import { HeroSection } from '@/components/store/HeroSection'
import { BenefitsSection } from '@/components/store/BenefitsSection'
import { ProductSection } from '@/components/store/ProductSection'
import { AboutSection } from '@/components/store/AboutSection'
import { TestimonialsSection } from '@/components/store/TestimonialsSection'
import { CtaBanner } from '@/components/store/CtaBanner'
import { Footer } from '@/components/store/Footer'
import { WhatsAppFloat } from '@/components/store/WhatsAppFloat'

export default function HomePage() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <BenefitsSection />
      <ProductSection />
      <AboutSection />
      <TestimonialsSection />
      <CtaBanner />
      <Footer />
      <WhatsAppFloat />
    </>
  )
}
import React from 'react';
import { Hero } from '@/components/Hero';
import { Features } from '@/components/Features';
import { LeadForm } from '@/components/LeadForm';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500 selection:text-slate-900">
      {/* Background Subtle Gradient */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))]" />
      
      <div className="relative z-10">
        <Hero />
        <Features />
        <LeadForm />
        <Footer />
      </div>
    </main>
  );
}

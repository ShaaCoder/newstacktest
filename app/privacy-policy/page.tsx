'use client';

import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Head from 'next/head';

// —————————————————————————————————————
// 1.  Section metadata
// —————————————————————————————————————
const sections = [
  { id: 'info',    title: '1. Information We Collect' },
  { id: 'usage',   title: '2. How We Use Your Information' },
  { id: 'sharing', title: '3. Sharing Your Information' },
  { id: 'cookies', title: '4. Cookies' },
  { id: 'security',title: '5. Data Security' },
  { id: 'rights',  title: '6. Your Rights' },
  { id: 'changes', title: '7. Changes to This Policy' },
  { id: 'contact', title: '8. Contact Us' },
] as const;

// —————————————————————————————————————
// 2.  React component
// —————————————————————————————————————
export default function PrivacyPolicyPage() {
  // Active section id for scroll‑spy
  const [activeId, setActiveId] = useState<string | null>(null);

  // Observe each section with IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Find the entry that is intersecting most (closest to top)
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (a.intersectionRatio > b.intersectionRatio ? -1 : 1));

        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: '0px 0px -70% 0px', // Trigger a bit before the section top hits viewport
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* ————————————————— SEO ————————————————— */}
      <Head>
        <title>Privacy Policy | NewStack</title>
        <meta
          name="description"
          content="Read NewStack's privacy policy about data collection, usage, cookies, and user rights."
        />
      </Head>

      <Header />

      <main className="bg-white text-gray-800 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl sm:text-5xl font-bold text-gray-900 mb-12 text-center"
          >
            Privacy Policy
          </motion.h1>

          {/* ————————————————— TOC ————————————————— */}
          <aside
            className="
              mb-12
              lg:float-right lg:w-1/4 lg:ml-8
              lg:sticky lg:top-32
            "
          >
            <nav className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <h2 className="text-lg font-semibold mb-4 text-gray-800">Contents</h2>
              <ul className="space-y-2 list-none">
                {sections.map(({ id, title }) => (
                  <li key={id}>
                    <a
                      href={`#${id}`}
                      className={`
                        block pl-2 border-l-4
                        transition-colors
                        ${
                          activeId === id
                            ? 'text-blue-600 font-medium border-blue-600'
                            : 'text-gray-600 hover:text-blue-500 border-transparent'
                        }
                      `}
                    >
                      {title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          {/* ————————————————— Policy content ————————————————— */}
          <article className="space-y-16 text-base sm:text-lg leading-relaxed lg:w-3/4">
            {/* SECTION TEMPLATE */}
            <section id="info" className="scroll-mt-28">
              <h2 className="text-2xl font-semibold mb-2">1. Information We Collect</h2>
              <p>We collect the following types of information:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Personal info: name, email, phone</li>
                <li>Device info: IP address, browser, location</li>
                <li>Usage patterns: pages visited, actions taken</li>
                <li>Customer communications</li>
              </ul>
            </section>

            <section id="usage" className="scroll-mt-28">
              <h2 className="text-2xl font-semibold mb-2">2. How We Use Your Information</h2>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>To deliver and improve services</li>
                <li>To personalize content and experience</li>
                <li>To send updates and offers (with consent)</li>
                <li>To respond to queries or technical support</li>
              </ul>
            </section>

            <section id="sharing" className="scroll-mt-28">
              <h2 className="text-2xl font-semibold mb-2">3. Sharing Your Information</h2>
              <p>We may share data with:</p>
              <ul className="list-disc list-inside mt-2">
                <li>Trusted partners for hosting, analytics, and marketing</li>
                <li>Legal authorities if required by law</li>
              </ul>
            </section>

            <section id="cookies" className="scroll-mt-28">
              <h2 className="text-2xl font-semibold mb-2">4. Cookies</h2>
              <p>
                We use cookies for personalization and analytics. You can manage cookies in your browser settings.
              </p>
            </section>

            <section id="security" className="scroll-mt-28">
              <h2 className="text-2xl font-semibold mb-2">5. Data Security</h2>
              <p>
                Your data is secured using industry‑standard encryption and access controls. However, no method is 100%
                secure online.
              </p>
            </section>

            <section id="rights" className="scroll-mt-28">
              <h2 className="text-2xl font-semibold mb-2">6. Your Rights</h2>
              <p>
                You may request access, correction, or deletion of your personal data and opt out of marketing
                communications at any time.
              </p>
            </section>

            <section id="changes" className="scroll-mt-28">
              <h2 className="text-2xl font-semibold mb-2">7. Changes to This Policy</h2>
              <p>
                We may revise this Privacy Policy periodically. Updates will be posted here with an updated “last
                modified” date.
              </p>
            </section>

            <section id="contact" className="scroll-mt-28">
              <h2 className="text-2xl font-semibold mb-2">8. Contact Us</h2>
              <p>Questions? Reach us at:</p>
              <p className="mt-2 text-blue-600 font-medium">newstack8810@gmail.com</p>
            </section>
          </article>
        </div>
      </main>

      <Footer />
    </>
  );
}

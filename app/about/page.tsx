
'use client';

import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Head from 'next/head';
import { useRef } from 'react';

export default function AboutPage() {
  const heroRef = useRef(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, 50]);

  // Structured Data (JSON-LD) for SEO
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About NewStack',
    description:
      'NewStack is a digital agency specializing in high-performance websites, apps, and AI solutions. Learn about our mission, team, and impact.',
    url: 'https://www.newstack.com/about',
    publisher: {
      '@type': 'Organization',
      name: 'NewStack',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.newstack.com/images/logo.png',
      },
    },
    mainEntity: {
      '@type': 'Organization',
      name: 'NewStack',
      description:
        'A forward-thinking digital agency creating innovative websites, apps, and AI solutions.',
      sameAs: [
        'https://www.linkedin.com/company/newstack',
        'https://x.com/newstack',
        'https://www.instagram.com/newstack',
      ],
    },
  };

  return (
    <>
      {/* Meta Tags for SEO */}
      <Head>
        <title>About Us | NewStack - Digital Agency for Web & AI Solutions</title>
        <meta
          name="description"
          content="Discover NewStack, a digital agency crafting high-performance websites, apps, and AI solutions. Learn about our mission, team, and community impact."
        />
        <meta name="keywords" content="NewStack, digital agency, web development, AI solutions, Next.js, React, technology, innovation" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content="About Us | NewStack - Digital Agency" />
        <meta
          property="og:description"
          content="Learn about NewStack’s mission, vision, and team dedicated to building innovative digital experiences."
        />
        <meta property="og:url" content="https://www.newstack.com/about" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.newstack.com/images/og-about.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About Us | NewStack - Digital Agency" />
        <meta
          name="twitter:description"
          content="Discover NewStack’s passion for creating high-performance websites, apps, and AI solutions."
        />
        <meta name="twitter:image" content="https://www.newstack.com/images/og-about.jpg" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <link rel="canonical" href="https://www.newstack.com/about" />
      </Head>

      <Header />

      <main className="bg-gray-50 text-gray-900 font-sans">
        {/* Hero Section with Parallax */}
        <section ref={heroRef} className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-700 via-blue-600 to-teal-500 text-white">
          <motion.div className="absolute inset-0 z-0" style={{ y }}>
            <Image
              src="/images/hero-bg.jpg"
              alt="Abstract technology background"
              fill
              className="object-cover opacity-20"
              priority
            />
          </motion.div>
          <div className="absolute inset-0 bg-black/30 z-10" />
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="relative max-w-6xl mx-auto px-4 sm:px-6 text-center z-20"
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight drop-shadow-xl">
              About NewStack
            </h1>
            <p className="mt-6 text-xl sm:text-2xl max-w-3xl mx-auto leading-relaxed opacity-95">
              We’re a forward-thinking digital agency creating high-performance websites, apps, and AI solutions that empower businesses to soar.
            </p>
            <a
              href="/contact"
              className="mt-10 inline-flex items-center bg-white text-indigo-600 font-semibold px-8 py-4 rounded-full shadow-2xl hover:bg-indigo-100 hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-indigo-300"
            >
              Start Your Journey
            </a>
          </motion.div>
        </section>

        {/* Who We Are */}
        <section className="py-32 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 tracking-tight">Who We Are</h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                NewStack is a collective of passionate developers, designers, and strategists united by a mission to craft
                transformative digital experiences. From sleek marketing sites to powerful SaaS platforms, we deliver solutions that make an impact.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                With expertise in <a href="/services/web-development" className="text-indigo-600 hover:underline">React</a>, <a href="/services/nextjs" className="text-indigo-600 hover:underline">Next.js</a>, Node.js, AI, and automation, we partner with startups and enterprises to navigate the digital landscape with confidence.
              </p>
              <a
                href="/services"
                className="mt-6 inline-block text-indigo-600 font-semibold hover:underline"
              >
                Explore Our Services →
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              viewport={{ once: true }}
              className="relative"
            >
              <Image
                src="/images/team.jpg"
                alt="NewStack team collaborating on innovative projects"
                width={600}
                height={400}
                className="rounded-3xl shadow-2xl object-cover transform hover:scale-[1.03] transition-transform duration-500"
                priority
              />
            </motion.div>
          </div>
        </section>

        {/* Our Process */}
        <section className="py-32 bg-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              viewport={{ once: true }}
              className="text-4xl lg:text-5xl font-bold text-gray-900 mb-16 tracking-tight"
            >
              Our Process
            </motion.h2>
            <div className="grid md:grid-cols-4 gap-8">
              {[
                {
                  step: '1. Discovery',
                  desc: 'We dive deep into your goals, audience, and challenges to align our strategy.',
                  icon: '🔍',
                },
                {
                  step: '2. Design',
                  desc: 'We craft intuitive, visually stunning designs tailored to your brand.',
                  icon: '🎨',
                },
                {
                  step: '3. Development',
                  desc: 'We build robust, scalable solutions using cutting-edge technologies.',
                  icon: '💻',
                },
                {
                  step: '4. Deployment & Support',
                  desc: 'We launch your project and provide ongoing support for success.',
                  icon: '🚀',
                },
              ].map((process, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.2, ease: 'easeOut' }}
                  viewport={{ once: true }}
                  className="backdrop-blur-md bg-white/30 p-8 rounded-3xl shadow-xl border border-white/20 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300"
                >
                  <div className="text-5xl mb-6 text-indigo-600">{process.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{process.step}</h3>
                  <p className="text-gray-600 text-base leading-relaxed">{process.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-32 bg-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              viewport={{ once: true }}
              className="backdrop-blur-md bg-white/30 p-8 rounded-3xl shadow-xl border border-white/20"
            >
              <h2 className="text-3xl font-bold text-indigo-700 mb-4">Our Mission</h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                To empower businesses with scalable, intelligent, and beautifully crafted digital solutions that drive meaningful change.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
              viewport={{ once: true }}
              className="backdrop-blur-md bg-white/30 p-8 rounded-3xl shadow-xl border border-white/20"
            >
              <h2 className="text-3xl font-bold text-indigo-700 mb-4">Our Vision</h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                To lead as a trusted technology partner, driving innovation and excellence in the digital age.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-32 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              viewport={{ once: true }}
              className="text-4xl lg:text-5xl font-bold text-gray-900 mb-16 tracking-tight"
            >
              Our Core Values
            </motion.h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Innovation',
                  desc: 'We pioneer cutting-edge technologies to deliver smarter, faster solutions.',
                  icon: '💡',
                },
                {
                  title: 'Transparency',
                  desc: 'We build trust through open, honest, and clear communication.',
                  icon: '🤝',
                },
                {
                  title: 'Excellence',
                  desc: 'We pursue perfection, delivering work that surpasses expectations.',
                  icon: '🏆',
                },
              ].map((value, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.2, ease: 'easeOut' }}
                  viewport={{ once: true }}
                  className="relative bg-gradient-to-br from-white to-gray-50 p-8 rounded-3xl shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 border border-gray-100"
                >
                  <div className="text-5xl mb-6 text-indigo-600">{value.icon}</div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600 text-base leading-relaxed">{value.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Showcase */}
        {/* <section className="py-32 bg-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              viewport={{ once: true }}
              className="text-4xl lg:text-5xl font-bold text-gray-900 mb-16 tracking-tight"
            >
              Meet Our Team
            </motion.h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  name: 'Jane Doe',
                  role: 'Lead Developer',
                  image: '/images/team/jane.jpg',
                  desc: 'Expert in React and Next.js, Jane drives our technical innovation.',
                },
                {
                  name: 'John Smith',
                  role: 'Creative Director',
                  image: '/images/team/john.jpg',
                  desc: 'John crafts stunning visuals that elevate our projects.',
                },
                {
                  name: 'Emily Chen',
                  role: 'AI Specialist',
                  image: '/images/team/emily.jpg',
                  desc: 'Emily integrates AI to create intelligent solutions.',
                },
              ].map((member, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.2, ease: 'easeOut' }}
                  viewport={{ once: true }}
                  className="bg-white p-6 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300"
                >
                  <Image
                    src={member.image}
                    alt={`${member.name}, ${member.role} at NewStack`}
                    width={200}
                    height={200}
                    className="rounded-full mx-auto mb-4 object-cover"
                    loading="lazy"
                  />
                  <h3 className="text-xl font-semibold text-gray-900">{member.name}</h3>
                  <p className="text-indigo-600 font-medium">{member.role}</p>
                  <p className="text-gray-600 mt-2 text-base">{member.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section> */}

        {/* Client Success Stories */}
        {/* <section className="py-32 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              viewport={{ once: true }}
              className="text-4xl lg:text-5xl font-bold text-gray-900 mb-16 tracking-tight"
            >
              Client Success Stories
            </motion.h2>
            <div className="grid md:grid-cols-2 gap-12">
              {[
                {
                  client: 'TechTrend Inc.',
                  quote: 'NewStack transformed our e-commerce platform, boosting conversions by 40%.',
                  logo: '/images/clients/techtrend.png',
                  caseStudy: '/case-studies/techtrend',
                },
                {
                  client: 'GrowEasy Solutions',
                  quote: 'Their AI-driven analytics dashboard revolutionized how we track performance.',
                  logo: '/images/clients/groweasy.png',
                  caseStudy: '/case-studies/groweasy',
                },
              ].map((story, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.2, ease: 'easeOut' }}
                  viewport={{ once: true }}
                  className="backdrop-blur-md bg-white/30 p-8 rounded-3xl shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300"
                >
                  <Image
                    src={story.logo}
                    alt={`${story.client} logo`}
                    width={120}
                    height={60}
                    className="mx-auto mb-6"
                    loading="lazy"
                  />
                  <p className="text-gray-700 text-lg italic leading-relaxed mb-4">"{story.quote}"</p>
                  <p className="text-indigo-600 font-semibold">{story.client}</p>
                  <a
                    href={story.caseStudy}
                    className="mt-4 inline-block text-indigo-600 font-medium hover:underline"
                  >
                    Read Case Study →
                  </a>
                </motion.div>
              ))}
            </div>
          </div>
        </section> */}

        {/* Company Timeline */}
        <section className="py-32 bg-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              viewport={{ once: true }}
              className="text-4xl lg:text-5xl font-bold text-gray-900 mb-16 tracking-tight"
            >
              Our Journey
            </motion.h2>
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-indigo-200 h-full" />
              {[
                { year: '2018', event: 'NewStack Founded', desc: 'Started with a vision to revolutionize digital solutions.' },
                { year: '2020', event: 'First Major Client', desc: 'Landed a Fortune 500 client, scaling our operations.' },
                { year: '2023', event: 'AI Division Launched', desc: 'Expanded into AI-driven solutions for smarter apps.' },
                { year: '2025', event: 'Global Reach', desc: 'Serving clients across 20+ countries with innovative tech.' },
              ].map((milestone, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: idx % 2 === 0 ? -60 : 60 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.2, ease: 'easeOut' }}
                  viewport={{ once: true }}
                  className={`relative flex ${idx % 2 === 0 ? 'justify-start' : 'justify-end'} mb-12`}
                >
                  <div className={`w-5/12 ${idx % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                    <div className="bg-white p-6 rounded-3xl shadow-xl border border-gray-100">
                      <h3 className="text-xl font-semibold text-indigo-600">{milestone.year}</h3>
                      <h4 className="text-lg font-medium text-gray-900 mt-1">{milestone.event}</h4>
                      <p className="text-gray-600 mt-2 text-base">{milestone.desc}</p>
                    </div>
                  </div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-indigo-600 rounded-full" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Community Impact */}
        <section className="py-32 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              viewport={{ once: true }}
              className="text-4xl lg:text-5xl font-bold text-gray-900 mb-16 tracking-tight"
            >
              Community Impact
            </motion.h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Open Source Contributions',
                  desc: 'We actively contribute to open-source projects, sharing tools and libraries with the global developer community.',
                  icon: '🌐',
                },
                {
                  title: 'Tech Education',
                  desc: 'We host workshops and mentorship programs to inspire the next generation of tech innovators.',
                  icon: '📚',
                },
                {
                  title: 'Sustainability Initiatives',
                  desc: 'We support eco-friendly practices, optimizing our solutions for minimal environmental impact.',
                  icon: '🌱',
                },
              ].map((impact, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.2, ease: 'easeOut' }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-3xl shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 border border-gray-100"
                >
                  <div className="text-5xl mb-6 text-indigo-600">{impact.icon}</div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-3">{impact.title}</h3>
                  <p className="text-gray-600 text-base leading-relaxed">{impact.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-32 bg-gradient-to-r from-indigo-800 via-blue-700 to-teal-600 text-white text-center">
          <div className="absolute inset-0 bg-black/40 z-0" />
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            viewport={{ once: true }}
            className="relative max-w-4xl mx-auto px-4 sm:px-6 z-10"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 drop-shadow-xl tracking-tight">
              Ready to Shape the Future?
            </h2>
            <p className="text-xl mb-10 opacity-95 max-w-3xl mx-auto">
              Partner with NewStack to create innovative, high-impact digital solutions that drive success.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center bg-white text-indigo-600 font-semibold px-10 py-4 rounded-full shadow-2xl hover:bg-indigo-100 hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-indigo-300"
            >
              Let’s Build Together
            </a>
          </motion.div>
        </section>
      </main>

      <Footer />
    </>
  );
}
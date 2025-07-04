"use client";
import React, { useEffect, useState } from 'react';
import { Header } from '@/components/layout/header';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Footer } from '@/components/layout/footer';

const portfolioData = [
  {
    slug: 'ecommerce-platform',
    title: 'E-commerce Platform',
    description: 'An online store with modern UX and secure checkout.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
    content: `
      We built a fully-featured e-commerce system for a client in the fashion industry. 
      The solution includes Stripe integration, a CMS dashboard, product filtering, and performance optimizations.
    `,
    technologies: [
      { name: 'Next.js', icon: 'nextjs' },
      { name: 'Tailwind CSS', icon: 'tailwindcss' },
      { name: 'Stripe', icon: 'stripe' },
      { name: 'MongoDB', icon: 'mongodb' },
    ],
    demoUrl: 'https://example.com/ecommerce-demo',
  },
  {
    slug: 'ai-chatbot',
    title: 'AI Chatbot',
    description: 'A smart assistant powered by GPT for 24/7 support.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop',
    content: `
      Designed and integrated a chatbot using OpenAI for a SaaS customer service platform. 
      The bot answers user queries, helps with onboarding, and passes leads to live agents.
    `,
    technologies: [
      { name: 'OpenAI', icon: 'openai' },
      { name: 'Node.js', icon: 'nodedotjs' },
      { name: 'Socket.IO', icon: 'socketdotio' },
      { name: 'Tailwind', icon: 'tailwindcss' },
    ],
    demoUrl: 'https://example.com/chatbot-demo',
  },
  {
    slug: 'saas-dashboard',
    title: 'SaaS Dashboard',
    description: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop.',
    image: '/portfolio/dashboard.jpg',
    content: `
      Built with Next.js and Tailwind, this dashboard shows dynamic metrics, user trends, and traffic sources.
      Built-in access control and theme switching included.
    `,
    technologies: [
      { name: 'Next.js', icon: 'nextjs' },
      { name: 'Recharts', icon: 'recharts' },
      { name: 'Tailwind', icon: 'tailwindcss' },
      { name: 'MongoDB', icon: 'mongodb' },
    ],
    demoUrl: 'https://example.com/dashboard-demo',
  },
  {
    slug: 'mobile-banking',
    title: 'Mobile Banking App',
    description: 'Mobile-first banking UI with custom animation and OTP verification.',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop',
    content: `
      A beautiful mobile app UI for a banking client. Integrated OTP auth, balance display, transaction history,
      and customer chat. Built with React Native and secured with Firebase Auth.
    `,
    technologies: [
      { name: 'React Native', icon: 'react' },
      { name: 'Firebase', icon: 'firebase' },
      { name: 'Framer Motion', icon: 'framer' },
    ],
    demoUrl: 'https://example.com/banking-demo',
  },
  {
    slug: 'social-automation',
    title: 'Social Media Automation',
    description: 'Automated system to plan, schedule, and analyze content.',
    image: 'https://images.unsplash.com/photo-1611262588024-d12430b98920?w=800&h=600&fit=crop',
    content: `
      This web tool helps businesses automate Instagram, Facebook, and LinkedIn posts. Includes analytics dashboard,
      scheduled queues, and AI-generated captions.
    `,
    technologies: [
      { name: 'Next.js', icon: 'nextjs' },
      { name: 'Node.js', icon: 'nodedotjs' },
      { name: 'CRON Jobs', icon: 'cron' },
      { name: 'OpenAI', icon: 'openai' },
    ],
    demoUrl: 'https://example.com/social-demo',
  },
  {
    slug: 'ai-writer',
    title: 'AI Writing Tool',
    description: 'AI-assisted content creator with editing and tone suggestions.',
    image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&h=600&fit=crop',
    content: `
      A writing tool powered by OpenAI to generate blogs, marketing copy, and LinkedIn posts. 
      Includes plagiarism checker, tone adjustments, and inline editing.
    `,
    technologies: [
      { name: 'React', icon: 'react' },
      { name: 'OpenAI', icon: 'openai' },
      { name: 'Supabase', icon: 'supabase' },
    ],
    demoUrl: 'https://example.com/ai-writer-demo',
  },
];

export default function PortfolioDetails({ params }: { params: { slug: string } }) {
  const item = portfolioData.find((p) => p.slug === params.slug);

  if (!item) return notFound();

  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: item.title,
        text: item.description,
        url: window.location.href,
      });
    } else {
      alert('Share functionality is not supported in this browser.');
    }
  };

  return (
    <>
      <Header />
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
        <div
          className="h-full bg-blue-600 transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
      <section className="pt-32 pb-16 px-6 lg:px-20 bg-gradient-to-br from-blue-50 via-white to-purple-50 min-h-screen">
        <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-1/4 bg-white rounded-2xl shadow-lg p-6 sticky top-24 h-fit">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Other Projects</h2>
            <ul className="space-y-2">
              {portfolioData
                .filter((p) => p.slug !== params.slug)
                .map((p) => (
                  <li key={p.slug}>
                    <Link
                      href={`/portfolio/${p.slug}`}
                      className="block text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
                    >
                      {p.title}
                    </Link>
                  </li>
                ))}
            </ul>
            <Link
              href="/portfolio"
              className="mt-6 inline-block text-blue-600 font-semibold hover:underline"
            >
              ← Back to Portfolio
            </Link>
          </aside>

          {/* Main Content */}
          <div className="lg:w-3/4 bg-white rounded-2xl shadow-xl p-8 md:p-12 transition-all duration-300 hover:shadow-2xl">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight animate-fade-in-up">
              {item.title}
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 font-medium leading-relaxed animate-fade-in-up animation-delay-200">
              {item.description}
            </p>

            <div className="relative w-full h-80 md:h-96 rounded-xl overflow-hidden mb-10 group">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover rounded-xl transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            <div className="flex gap-4 mb-8">
              <a
                href={item.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200 animate-fade-in-up animation-delay-300"
              >
                View Demo
              </a>
              <button
                onClick={handleShare}
                className="inline-flex items-center px-6 py-3 bg-gray-100 text-gray-800 font-semibold rounded-lg hover:bg-gray-200 transition-colors duration-200 animate-fade-in-up animation-delay-400"
              >
                Share
              </button>
            </div>

            <div className="prose prose-lg max-w-none text-gray-800 animate-fade-in-up animation-delay-500">
              <p className="leading-relaxed">{item.content}</p>

              <h3 className="mt-8 text-2xl font-semibold text-gray-900">Technologies Used</h3>
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-4">
                {item.technologies.map((tech) => (
                  <div
                    key={tech.name}
                    className="flex items-center bg-gray-100 rounded-lg px-4 py-3 transition-colors duration-200 hover:bg-blue-100 hover:text-blue-800"
                  >
                    <img
                      src={`https://cdn.simpleicons.org/${tech.icon}`}
                      alt={`${tech.name} icon`}
                      className="w-6 h-6 mr-2"
                    />
                    <span className="font-medium">{tech.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer/>
    </>
  );
}
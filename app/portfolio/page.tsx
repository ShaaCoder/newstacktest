"use client";
import { Header } from '@/components/layout/header';
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Footer } from '@/components/layout/footer';

const portfolioItems = [
  {
    slug: 'ecommerce-platform',
    title: 'E-commerce Platform',
    description: 'Scalable online store with Stripe integration and real-time inventory management.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
    technologies: ['React', 'Node.js', 'Stripe', 'MongoDB'],
    category: 'Web Development',
  },
  {
    slug: 'ai-chatbot',
    title: 'AI Chatbot Dashboard',
    description: 'GPT-powered chatbot interface with advanced analytics and conversation management.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop',
    technologies: ['Python', 'OpenAI', 'React', 'FastAPI'],
    category: 'AI/ML',
  },
  {
    slug: 'saas-dashboard',
    title: 'SaaS Analytics Dashboard',
    description: 'Real-time analytics platform with interactive charts and comprehensive user insights.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    technologies: ['Vue.js', 'D3.js', 'PostgreSQL', 'Docker'],
    category: 'Data Analytics',
  },
  {
    slug: 'mobile-banking',
     title: 'Mobile Banking Interface',
    description: 'Secure and intuitive banking application with modern UI/UX design.',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop',
    technologies: ['React Native', 'TypeScript', 'Firebase', 'Biometrics'],
    category: 'Mobile Development'
  },
  {
    slug: 'social-automation',
    title: 'Social Media Automation',
    description: 'Comprehensive social media management tool with scheduling and analytics.',
    image: 'https://images.unsplash.com/photo-1611262588024-d12430b98920?w=800&h=600&fit=crop',
    technologies: ['Next.js', 'GraphQL', 'Redis', 'AWS'],
    category: 'Automation',
  },
  {
    slug: 'ai-writer',
  title: 'AI Content Generator',
    description: 'Advanced AI writing assistant with content optimization and SEO tools.',
    image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&h=600&fit=crop',
    technologies: ['OpenAI', 'React', 'TailwindCSS', 'Supabase'],
    category: 'AI Writing',
  },
];

export default function PortfolioPage() {
  return (
    <>
      <Header />
      <section className="pt-28 pb-16 px-6 lg:px-20 bg-gradient-to-br from-blue-50 to-white min-h-screen">
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-4xl md:text-5xl font-bold text-gray-900"
          >
            Our Portfolio
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto"
          >
            Projects built with passion and precision for modern businesses.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioItems.map((item, index) => (
            <Link href={`/portfolio/${item.slug}`} key={item.slug}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition duration-300 cursor-pointer"
              >
                <div className="relative w-full h-52">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-blue-600">{item.title}</h3>
                  <p className="text-gray-600 mt-2">{item.description}</p>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>
      <Footer/>
    </>
  );
}

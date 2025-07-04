'use client';

import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { useState } from 'react';

import { services, generateSlug } from '@/lib/services';

interface ServicePageProps {
  params: { slug: string };
}

export default function ServicePage({ params }: ServicePageProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'features' | 'benefits'>('overview');

  const service = services.find((s) => generateSlug(s.title) === params.slug);
  if (!service) notFound();

  return (
    <>
      <Header />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-blue-50 to-indigo-100 py-24">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <service.icon className="mx-auto h-16 w-16 text-blue-600 mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">{service.title}</h1>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">{service.shortDescription}</p>
          </motion.div>
        </div>
      </section>

      {/* Sticky nav of all services */}
      <section className="bg-gray-100 py-4 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex flex-wrap gap-4 justify-center">
            {services.map((s) => {
              const slug = generateSlug(s.title);
              return (
                <Link
                  key={slug}
                  href={`/services/${slug}`}
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
                    slug === params.slug
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-blue-50'
                  }`}
                >
                  {s.title}
                </Link>
              );
            })}
          </nav>
        </div>
      </section>

      {/* Main content */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8">
          {/* Left column */}
          <motion.div
            className="md:col-span-2"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="shadow-lg">
              <CardHeader>
                <div className="bg-blue-100 rounded-xl w-fit p-4 mb-4">
                  <service.icon className="h-10 w-10 text-blue-600" />
                </div>
                <CardTitle className="text-2xl">{service.title}</CardTitle>
              </CardHeader>

              <CardContent>
                {/* Tab buttons */}
                <div className="flex gap-4 mb-6">
                  {(['overview', 'features', 'benefits'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-4 py-2 rounded-md ${
                        activeTab === tab ? 'bg-blue-600 text-white' : 'bg-gray-200'
                      }`}
                    >
                      {tab[0].toUpperCase() + tab.slice(1)}
                    </button>
                  ))}
                </div>

                {/* Tab panel */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="text-gray-600"
                  >
                    {activeTab === 'overview' && <p>{service.extendedDescription}</p>}

                    {activeTab === 'features' && (
                      <ul className="space-y-3">
                        {service.features.map((f, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <CheckCircle className="w-5 h-5 text-blue-500" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {activeTab === 'benefits' && <p>{service.benefits}</p>}
                  </motion.div>
                </AnimatePresence>
              </CardContent>
            </Card>
          </motion.div>

          {/* Right column – sticky feature list */}
          <div className="hidden md:block sticky top-20">
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="text-lg">Key Features</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-gray-600">
                  {service.features.map((f, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-blue-500 mt-1" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

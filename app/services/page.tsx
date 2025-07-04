'use client';

import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

import { services, generateSlug } from '@/lib/services';

export default function ServicesPage() {
  return (
    <>
      <Header />

      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold text-gray-900"
          >
            Our Services
          </motion.h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            We build modern, scalable solutions — powered by AI, web, mobile, and automation.
          </p>
        </div>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 mt-16 max-w-7xl mx-auto px-4">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <Link href={`/services/${generateSlug(service.title)}`} passHref>
                <Card className="h-full shadow-md hover:shadow-lg hover:scale-[1.02] transition">
                  <CardHeader>
                    <div className="bg-blue-100 rounded-xl w-fit p-3 mb-4">
                      <service.icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <CardTitle className="text-xl text-gray-900">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600">{service.shortDescription}</CardDescription>
                    <ul className="mt-4 text-gray-600 text-sm space-y-2">
                      {service.features.slice(0, 2).map((f, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-blue-500" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="mt-4 text-blue-600 font-semibold hover:underline">Learn More</p>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}

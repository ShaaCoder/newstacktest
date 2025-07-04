'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Github } from 'lucide-react';
import { motion } from 'framer-motion';

const projects = [
  {
    title: 'E-commerce Platform',
    description: 'Modern online store with advanced filtering, payment integration, and admin dashboard.',
    image: 'https://images.pexels.com/photos/4050334/pexels-photo-4050334.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    demoUrl: '#',
    githubUrl: '#',
  },
  {
    title: 'Healthcare Management System',
    description: 'Comprehensive patient management system with appointment scheduling and medical records.',
    image: 'https://images.pexels.com/photos/4173251/pexels-photo-4173251.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['Next.js', 'PostgreSQL', 'TypeScript', 'Tailwind'],
    demoUrl: '#',
    githubUrl: '#',
  },
  {
    title: 'Real Estate Platform',
    description: 'Property listing platform with advanced search, virtual tours, and agent management.',
    image: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['Vue.js', 'Firebase', 'Google Maps API', 'PWA'],
    demoUrl: '#',
    githubUrl: '#',
  },
  {
    title: 'Learning Management System',
    description: 'Educational platform with course creation, progress tracking, and interactive assessments.',
    image: 'https://images.pexels.com/photos/4050302/pexels-photo-4050302.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['React', 'Express', 'Socket.io', 'AWS'],
    demoUrl: '#',
    githubUrl: '#',
  },
  {
    title: 'Financial Dashboard',
    description: 'Real-time analytics dashboard for financial data with interactive charts and reports.',
    image: 'https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['Angular', 'Python', 'D3.js', 'Redis'],
    demoUrl: '#',
    githubUrl: '#',
  },
  {
    title: 'Social Media App',
    description: 'Modern social platform with real-time messaging, content sharing, and community features.',
    image: 'https://images.pexels.com/photos/1337387/pexels-photo-1337387.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['React Native', 'GraphQL', 'Apollo', 'Prisma'],
    demoUrl: '#',
    githubUrl: '#',
  },
];

export function Portfolio() {
  return (
    <section id="portfolio" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            Our Work
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Take a look at some of our recent projects that showcase our expertise and creativity.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                <div className="relative">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
                    <a
                      href={project.demoUrl}
                      className="bg-white rounded-full p-2 hover:bg-gray-100 transition-colors"
                    >
                      <ExternalLink className="h-5 w-5 text-gray-900" />
                    </a>
                    <a
                      href={project.githubUrl}
                      className="bg-white rounded-full p-2 hover:bg-gray-100 transition-colors"
                    >
                      <Github className="h-5 w-5 text-gray-900" />
                    </a>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
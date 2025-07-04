'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin, Send, Code2, Github, Linkedin, Twitter } from 'lucide-react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';


// Contact Form Types

type ContactForm = {
  name: string;
  email: string;
  message: string;
};

export default function ContactPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactForm>();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: ContactForm) => {
    setIsSubmitting(true);
    try {
      const res = await fetch('http://localhost:3000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        toast.success('Message sent successfully!');
        reset();
      } else {
        toast.error('Something went wrong.');
      }
    } catch (error) {
      toast.error('Failed to send message.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const buttonMotion = {
    whileHover: { scale: 1.05, boxShadow: '0 0 10px #3b82f6' },
    whileTap: { scale: 0.98 },
  };

  return (
    <>
      <Header />
      <Toaster position="top-right" />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-blue-600 text-white py-20"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Get in Touch</h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto">
              We’d love to hear from you! Whether you have a question, feedback, or a project in mind, reach out to us today.
            </p>
          </div>
        </motion.section>

        {/* Contact Form & Info */}
        <section id="contact" className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Form */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div>
                    <Label htmlFor="name" className="text-gray-700">Name</Label>
                    <Input
                      id="name"
                      placeholder="Your name"
                      {...register('name', { required: 'Name is required' })}
                      className="mt-1"
                    />
                    {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>}
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-gray-700">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Your email"
                      {...register('email', {
                        required: 'Email is required',
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: 'Invalid email address',
                        },
                      })}
                      className="mt-1"
                    />
                    {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>}
                  </div>
                  <div>
                    <Label htmlFor="message" className="text-gray-700">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Your message"
                      {...register('message', { required: 'Message is required' })}
                      className="mt-1 h-32"
                    />
                    {errors.message && <p className="text-red-600 text-sm mt-1">{errors.message.message}</p>}
                  </div>
                  <motion.div {...buttonMotion}>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center"
                    >
                      {isSubmitting ? 'Sending...' : (<>Send Message <Send className="ml-2 h-4 w-4" /></>)}
                    </Button>
                  </motion.div>
                </form>
              </motion.div>

              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Contact Information</h2>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <Mail className="h-6 w-6 text-blue-600 mr-3 mt-1" />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Email</h3>
                      <p className="text-gray-600">newstack8810@gmail.com</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Phone className="h-6 w-6 text-blue-600 mr-3 mt-1" />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Phone</h3>
                      <p className="text-gray-600">7835649916</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <MapPin className="h-6 w-6 text-blue-600 mr-3 mt-1" />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Address</h3>
                      <p className="text-gray-600">Mubarakpur Dabas</p>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Follow Us</h3>
                    <div className="flex space-x-4">
                      <Link href="https://twitter.com" target="_blank" className="text-gray-600 hover:text-blue-600">
                        <Twitter className="h-5 w-5" />
                      </Link>
                      <Link href="https://linkedin.com" target="_blank" className="text-gray-600 hover:text-blue-600">
                        <Linkedin className="h-5 w-5" />
                      </Link>
                      <Link href="https://github.com" target="_blank" className="text-gray-600 hover:text-blue-600">
                        <Github className="h-5 w-5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Map Iframe Section */}
        <section className="mt-20 max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">Our Location</h2>
          <div className="overflow-hidden rounded-xl shadow-xl border border-gray-200">
            <iframe
              title="NewStack Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0198705583884!2d-122.41941538468129!3d37.77492927975914!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c7e4bdb1d%3A0x1ff78e4f2c7c8a70!2sSan+Francisco%2C+CA!5e0!3m2!1sen!2sus!4v1615971283214!5m2!1sen!2sus"
              width="100%"
              height="450"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-[450px] border-0"
            ></iframe>
          </div>
        </section>
      </div>
      <br />
    <Footer/>
    </>
  );
}

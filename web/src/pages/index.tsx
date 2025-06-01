import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  SparklesIcon, 
  HeartIcon, 
  ShareIcon,
  ArrowRightIcon 
} from '@heroicons/react/24/outline';

export default function Home() {
  const [email, setEmail] = useState('');

  const handleGetStarted = () => {
    // TODO: Implement navigation to auth page
    console.log('Get started clicked');
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement email signup
    console.log('Email signup:', email);
  };

  return (
    <>
      <Head>
        <title>GlowUp.ai - See Your Future Glow-Up with AI</title>
        <meta 
          name="description" 
          content="Transform your look with AI-powered beauty recommendations. Upload a selfie and see your potential glow-up with personalized product suggestions." 
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-accent-500/10 blur-3xl"></div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 sm:pt-24 sm:pb-20">
            <div className="text-center">
              <motion.h1 
                className="text-4xl sm:text-6xl lg:text-7xl font-bold text-neutral-900 mb-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                See Your Future{' '}
                <span className="bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text text-transparent">
                  Glow-Up
                </span>
              </motion.h1>

              <motion.p 
                className="text-xl sm:text-2xl text-neutral-600 mb-10 max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                AI-powered beauty transformations with personalized product recommendations. 
                Upload a selfie and discover your perfect look.
              </motion.p>

              <motion.div 
                className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <button
                  onClick={handleGetStarted}
                  className="group bg-gradient-to-r from-primary-500 to-accent-500 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
                >
                  Try It Now
                  <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>

                <button className="text-neutral-700 px-8 py-4 rounded-2xl font-medium text-lg border-2 border-neutral-200 hover:border-primary-300 transition-colors">
                  Watch Demo
                </button>
              </motion.div>

              {/* Demo preview */}
              <motion.div 
                className="relative max-w-4xl mx-auto"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.6 }}
              >
                <div className="bg-white rounded-3xl shadow-2xl p-8 border border-neutral-200">
                  <div className="aspect-video bg-gradient-to-br from-neutral-100 to-neutral-200 rounded-2xl flex items-center justify-center">
                    <div className="text-neutral-500 text-center">
                      <SparklesIcon className="w-16 h-16 mx-auto mb-4 text-primary-400" />
                      <p className="text-lg">Demo Video Coming Soon</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-5xl font-bold text-neutral-900 mb-6">
                How It Works
              </h2>
              <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
                Three simple steps to discover your perfect glow-up
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <motion.div 
                className="text-center group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="bg-gradient-to-br from-primary-100 to-primary-200 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <SparklesIcon className="w-10 h-10 text-primary-600" />
                </div>
                <h3 className="text-2xl font-bold text-neutral-900 mb-4">Upload Your Selfie</h3>
                <p className="text-neutral-600">
                  Take or upload a clear selfie. Our AI analyzes your facial features, skin tone, and unique characteristics.
                </p>
              </motion.div>

              <motion.div 
                className="text-center group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="bg-gradient-to-br from-accent-100 to-accent-200 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <HeartIcon className="w-10 h-10 text-accent-600" />
                </div>
                <h3 className="text-2xl font-bold text-neutral-900 mb-4">Get Personalized Picks</h3>
                <p className="text-neutral-600">
                  Receive curated beauty and wellness products tailored to your features and trending styles.
                </p>
              </motion.div>

              <motion.div 
                className="text-center group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <div className="bg-gradient-to-br from-secondary-100 to-secondary-200 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <ShareIcon className="w-10 h-10 text-secondary-600" />
                </div>
                <h3 className="text-2xl font-bold text-neutral-900 mb-4">See Your Glow-Up</h3>
                <p className="text-neutral-600">
                  View your AI-generated transformation and share your glow-up with friends on social media.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-primary-500 to-accent-500">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-5xl font-bold text-white mb-6">
              Ready to See Your Glow-Up?
            </h2>
            <p className="text-xl text-white/90 mb-10">
              Join thousands who have discovered their perfect look with AI
            </p>

            <form onSubmit={handleEmailSubmit} className="max-w-md mx-auto">
              <div className="flex gap-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-6 py-4 rounded-2xl border-0 text-neutral-900 placeholder-neutral-500 focus:ring-4 focus:ring-white/20"
                  required
                />
                <button
                  type="submit"
                  className="bg-white text-primary-600 px-8 py-4 rounded-2xl font-semibold hover:bg-neutral-50 transition-colors"
                >
                  Get Started
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>
    </>
  );
}
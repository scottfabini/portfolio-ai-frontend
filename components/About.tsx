'use client'

import React from 'react'
import { motion } from 'framer-motion'

const About = () => {
  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            About Me
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Bridging technical expertise with customer success
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg"
          >
            <div className="space-y-6">
              <div className="prose dark:prose-invert max-w-none">
                <p className="text-lg leading-relaxed">
                  As a Senior Software Engineer on the Customer Engineering Team at Adobe, I specialize in transforming complex technical challenges into customer success stories. My role uniquely combines deep technical expertise with customer-facing responsibilities, allowing me to bridge the gap between engineering and customer needs.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                  <div className="bg-primary-50 dark:bg-primary-900/20 p-4 rounded-lg">
                    <h3 className="font-semibold text-primary-600 dark:text-primary-400 mb-2">Performance Optimization</h3>
                    <p className="text-gray-700 dark:text-gray-300">Scaled systems to handle 100M+ leads and billions of activities annually</p>
                  </div>
                  <div className="bg-primary-50 dark:bg-primary-900/20 p-4 rounded-lg">
                    <h3 className="font-semibold text-primary-600 dark:text-primary-400 mb-2">Customer-Centric Development</h3>
                    <p className="text-gray-700 dark:text-gray-300">Drive product roadmap decisions and architectural improvements</p>
                  </div>
                  <div className="bg-primary-50 dark:bg-primary-900/20 p-4 rounded-lg">
                    <h3 className="font-semibold text-primary-600 dark:text-primary-400 mb-2">Technical Leadership</h3>
                    <p className="text-gray-700 dark:text-gray-300">Co-architected platform data-streams and mentor team members</p>
                  </div>
                </div>

                <p className="text-lg leading-relaxed mt-8">
                  My background in hardware engineering and software development provides a unique perspective on system architecture. This diverse experience enables me to deliver comprehensive solutions that address both technical and business needs.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About 
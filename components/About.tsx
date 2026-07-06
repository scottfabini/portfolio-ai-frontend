"use client";

import React from "react";
import { motion } from "framer-motion";

const About = () => {
  return (
    <section id="about" className="py-20 bg-gray-50 dark:bg-gray-800">
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
            className="bg-white dark:bg-gray-700 rounded-lg p-8 shadow-sm"
          >
            <div className="space-y-6">
              <div className="prose dark:prose-invert max-w-none">
                <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-300">
                  As a Senior Software Engineer on Adobe&apos;s Customer Engineering
                  Team, I specialize in owning hard technical problems end-to-end
                  for our largest enterprise accounts, from root-cause diagnosis
                  through production fixes. My role uniquely combines deep
                  technical depth with customer-facing responsibility, bridging
                  the gap between engineering and customer needs.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                  <div className="bg-primary-50 dark:bg-primary-900/20 p-4 rounded-lg">
                    <h3 className="font-semibold text-primary-600 dark:text-primary-400 mb-2">
                      Database Migration at Scale
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      Led the AWS Aurora migration, pruning 30TB+ and 20B+ rows
                      and cutting downtime from 1000+ minutes to a 99.9%
                      availability SLA
                    </p>
                  </div>
                  <div className="bg-primary-50 dark:bg-primary-900/20 p-4 rounded-lg">
                    <h3 className="font-semibold text-primary-600 dark:text-primary-400 mb-2">
                      Revenue-Generating Systems
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      Designed a Splunk-based Performance Tiers system that
                      generated $10M in first-year revenue
                    </p>
                  </div>
                  <div className="bg-primary-50 dark:bg-primary-900/20 p-4 rounded-lg">
                    <h3 className="font-semibold text-primary-600 dark:text-primary-400 mb-2">
                      Embedded Technical Leadership
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      Spent 7 years as the primary customer-facing technical
                      lead for AWS, Adobe&apos;s largest customer
                    </p>
                  </div>
                </div>

                <p className="text-lg leading-relaxed mt-8 text-gray-600 dark:text-gray-300">
                  Before software, I spent 10 years in hardware systems
                  architecture at Motorola and Radisys, including a
                  co-invented patent for a re-configurable PCI-Express
                  switching device, a background that still shapes how I
                  think about systems end-to-end. More recently, I&apos;ve
                  been exploring how tools like Claude, LLM Skills, and MCP
                  can streamline enhancement workflows on our platform.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;

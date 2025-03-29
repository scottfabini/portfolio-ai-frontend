'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface Skill {
  category: string
  items: string[]
}

const skills: Skill[] = [
  {
    category: 'Customer-centric',
    items: ['Presenting and Listening to Customers', 'Domain Knowledge: Marketing Automation','Product, Project, and Roadmap Management']
  },
  {
    category: 'SRE Observability - finding and fixing bottlenecks',
    items: ['Splunk', 'Vivid Cortex', 'AWS Performance Insights for RDS', 'Grafana', 'Prometheus', 'New Relic', 'Wavefront', 'Datadog']
  },
  {
    category: 'Performance Benchmarking & Unit Testing',
    items: ['Taurus', 'Selenium', 'Sysbench', 'JUnit', 'Jest']
  },
  {
    category: 'Backend',
    items: ['Java', 'Spring Boot', 'Controller-Service-Repository Pattern', 'Node.js']
  },
  {
    category: 'Datastores & Streaming',
    items: ['MySQL', 'PostgreSQL', 'Kafka', 'Provider-Consumer Pattern', 'MongoDB', 'Redis', 'Solr']
  },
  {
    category: 'Frontend',
    items: ['JavaScript', 'TypeScript', 'React', 'Redux', 'Next.js', 'Tailwind CSS']
  },
]

const Skills = () => {
  return (
    <section id="skills" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Skills
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Technologies and tools I work with
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <h3 className="text-xl font-semibold text-primary-600 dark:text-primary-400 mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
                {skill.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {skill.items.map((item) => (
                  <span
                    key={item}
                    className="px-3 py-1.5 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors duration-200"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills 
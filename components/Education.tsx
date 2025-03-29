'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface Education {
  school: string
  degree: string
  field: string
  startDate: string
  endDate: string
  description: string
}

const education: Education[] = [
  {
    school: 'Portland State University',
    degree: 'Masters of Science',
    field: 'Computer Science',
    startDate: '2014',
    endDate: '2017',
    description: 'Focused on software engineering fundamentals including enterprise design patterns, full-stack web development, functional programming, and machine learning via project-focused coursework.',
  },
  {
    school: 'Purdue University',
    degree: 'Bachelor of Science',
    field: 'Electrical Engineering',
    startDate: '1995',
    endDate: '2000',
    description: 'Focused on hardware engineering fundamentals including C coding, VLSI FPGA programming, microprocessor design, digital logic design, and analog filter design.'
  }
]

const Education = () => {
  return (
    <section id="education" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Education
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            My academic background and qualifications
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {education.map((edu, index) => (
            <motion.div
              key={edu.school}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-700 rounded-lg p-6 shadow-sm mb-6"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {edu.school}
                </h3>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {edu.startDate} - {edu.endDate}
                </span>
              </div>
              <h4 className="text-lg font-medium text-primary-600 mb-2">
                {edu.degree} in {edu.field}
              </h4>
              <p className="text-gray-600 dark:text-gray-300">
                {edu.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Education 
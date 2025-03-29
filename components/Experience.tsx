'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface Position {
  title: string
  description: string
}

interface Experience {
  company: string
  positions: Position[]
  startDate: string
  endDate: string
  technologies: string[]
}

const experience: Experience[] = [
  {
    company: 'Adobe / Marketo',
    positions: [{
      title: 'Senior Software Engineer - Customer Engineering Team',
      description: `• Break-down our two largest customers' performance bottlenecks and pain points, enabling scalability to 100M+ leads and billions of activities per year over 8 years
• Co-architect on platform data-streams project, enabling customers to leverage their data to build automation at scale 
•  Product Management and Architecture background to drive roadmap and strategy to meet enterprise customer needs`
    }],
    startDate: '2017',
    endDate: 'Present',
    technologies: ['Performance', 'MySQL', 'Splunk', 'New Relic', 'Java', 'Kafka', 'Solr'],
  },
  {
    company: 'Portland State University',
    positions: [
      {
        title: 'Grader - CS551 Numerical Methods',
        description: 'Graded graduate level math-heavy course assignments for ~10 students per class, solving Taylor Series and other interpolation and approximation problems.'
      },
      {
        title: 'Facilitator - CS202 Object Oriented / Data Structures Lab',
        description: 'Demonstrated introductory object oriented concepts and data structures for ~30 students per class in weekly whiteboard sessions.'
      },
    ],
    startDate: '2015',
    endDate: '2016',
    technologies: ['Java', 'OOP'],
  },
  {
    company: 'Radisys',
    positions: [{
      title: 'Product Line Manager / Systems Architect',
      description: `• Developed business case justifying the project and presented to executive management for project approval
• Defined hardware architecture and software requirements
• Drove the project schedule, ensuring engineering team met deliverables
• Engaged in face-to-face meetings with customers to drive sales
• Product annual revenues ranged from $3M-$15M`
    }],
    startDate: '2010',
    endDate: '2014',
    technologies: ['COM-Express', 'Intel', 'PowerPC', '2U Server'],
  },
  {
    company: 'Motorola',
    positions: [{
      title: 'Systems Architect / Hardware Engineer',
      description: `• Defined hardware architecture for CompactPCI and AdvancedTCA high-availability (5-nines) telecom systems
• Designed Backplanes, I/O Transition Modules, and an IPMI Management Controller featuring a 150k gate FPGA
• Led system integration and testing for high-availability telecom platforms
• Collaborated with cross-functional teams to deliver enterprise-grade solutions`
    }],
    startDate: '2000',
    endDate: '2010',
    technologies: ['5 Nines', 'IPMI', 'Telecom Backplane'],
  },
]

const Experience = () => {
  return (
    <section id="experience" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Experience
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            My professional journey and work experience
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {experience.map((exp, index) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative pl-8 pb-8 last:pb-0"
            >
              <div className="absolute left-0 top-0 w-4 h-4 bg-primary-600 rounded-full" />
              <div className="absolute left-1.5 top-4 w-0.5 h-full bg-gray-200 dark:bg-gray-700" />
              <div className="bg-white dark:bg-gray-700 rounded-lg p-6 shadow-sm">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {exp.company === 'Adobe / Marketo' ? (
                      <span>
                        <span className="text-[rgb(261,51,32)]">Adobe</span> / <span className="text-[rgb(147,51,234)]">Marketo</span>
                      </span>
                    ) : (
                      exp.company
                    )}
                  </h3>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {exp.startDate} - {exp.endDate}
                  </span>
                </div>
                <div className="space-y-4">
                  {exp.positions.map((pos, i) => (
                    <div key={i} className="space-y-2">
                      <div className="text-lg font-medium text-primary-600">
                        {pos.title}
                      </div>
                      <div className="text-gray-600 dark:text-gray-300">
                        {pos.description.split('\n').map((bullet, j) => (
                          <p key={j} className="flex items-start">
                            <span className="text-primary-600 mr-2">•</span>
                            {bullet.replace('•', '').trim()}
                          </p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2 mt-4">
                  {exp.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-primary-100 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Experience 
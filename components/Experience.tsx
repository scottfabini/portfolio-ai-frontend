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
    positions: [
      {
        title: 'Senior Software Engineer - Customer Engineering',
        description: `• Led the Aurora migration, pruning 30TB+ and 20B+ rows and cutting UI downtime from 1000+ minutes to a 99.9% SLA for AWS, our largest customer
• Designed a Splunk-based Performance Tiers system generating $10M in first-year revenue
• Drove a Smart Campaign POST API enhancement positioning the platform for agentic workflow automation via LLM Skills and MCP
• Built a Claude Skill automating enhancement-request submission through Jira, used to process 26 team requests
• Compiled CSO and RCA data to defend against $100K+ per-incident service credit claims`
      },
      {
        title: 'Software Engineer',
        description: `• Designed a Java Spring Boot microservices suite streaming platform events over Kafka, enabling 10 enterprise customers to audit activity and monitor usage
• Benchmarked MySQL scalability across Google Cloud and AWS Aurora, achieving 80K queries/second and confirming a cloud migration was viable at scale
• Served as Customer Lead for AWS for 4 years, driving dozens of RCAs and enhancement requests as the primary embedded technical point of contact`
      },
      {
        title: 'Associate Software Engineer',
        description: `• Reduced navigation tree load time from 20 seconds to under 2 seconds for Microsoft, our largest customer at the time, by fixing a memory-inefficient deserialization step
• Extended the Smart Campaign API to support GET queries, laying groundwork for customer-built campaign automation`
      },
    ],
    startDate: '2017',
    endDate: 'Present',
    technologies: ['AWS', 'MySQL', 'Splunk', 'Java', 'Spring Boot', 'Kafka', 'Claude', 'MCP'],
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
      title: 'Product Line Manager',
      description: `• Developed business cases for 4 generations of Intel Core/Atom processors in small form factor motherboards, driving revenues ranging from $3M-$15M
• Contributed to the PICMG standards committee defining the COM Express hardware specification`
    }],
    startDate: '2010',
    endDate: '2014',
    technologies: ['COM Express', 'Intel', 'PICMG'],
  },
  {
    company: 'Motorola',
    positions: [{
      title: 'Systems Architect',
      description: `• Defined hardware architecture for 40GbE routers, dual-socket compute blades, power supplies and backplanes for 99.999% high-availability telecom products
• Led hardware architecture for a 15-engineer design team in Shenzhen, China
• Co-inventor, US Patent 7,516,263: Re-configurable PCI-Express switching device`
    }],
    startDate: '2000',
    endDate: '2010',
    technologies: ['40GbE', 'High Availability', 'PCI-Express'],
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
'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'

interface Project {
  title: string
  description: string
  technologies: string[]
  image: string
  link: string
  githubLink?: string
}

const projects: Project[] = [
  {
    title: 'An Interview with Susan B. Anthony',
    description: 'Winner AVIOS.org NLP competition - An interactive interview experience using Natural Language Processing to simulate conversations with Susan B. Anthony.',
    technologies: ['Java', 'Android', 'NLP', 'API.ai'],
    image: '/susan-b-anthony.png',
    link: 'https://github.com/trvank/Interview_Susan_B_Anthony/releases',
    githubLink: 'https://github.com/vthomas1908/Interview_Susan_B_Anthony'
  },
  {
    title: 'Machine Learning',
    description: 'Implementation of various machine learning algorithms including SVM, K-Means Clustering, and Bayesian Classifier for data analysis and classification.',
    technologies: ['Python', 'Machine Learning', 'Scikit-learn', 'Pandas', 'Matplotlib'],
    image: '/machine-learning.png',
    link: 'https://github.com/scottfabini/machine-learning-perceptron'
  },
  {
    title: 'AI Portfolio',
    description: 'A modern portfolio website that leverages AI to create dynamic content and personalized experiences for visitors.',
    technologies: ['Cursor', 'Claude Sonnet 3.7', 'Next.js', 'TypeScript', 'Tailwind CSS'],
    image: '/ai-portfolio.png',
    link: process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'http://scottfabini.com'
  },
  {
    title: 'Todo List',
    description: 'A full-stack todo list application with real-time updates, built with Next.js and Spring Boot.',
    technologies: ['Next.js', 'Spring Boot', 'MySQL', 'Docker'],
    image: '/todo.png',
    link: '/todo',
    githubLink: 'https://github.com/scottfabini/ai-portfolio'
  },
  {
    title: 'Gomoku',
    description: 'A strategic board game implementation with Java and Android, featuring game logic and multiplayer capabilities.',
    technologies: ['Java', 'Android', 'Game Logic', 'UI/UX'],
    image: '/gomoku.png',
    link: 'https://github.com/tsundin/CS454Group6_Gomoku'
  },
  {
    title: 'Original Portfolio',
    description: 'A previous version of my portfolio website showcasing my earlier work and projects.',
    technologies: ['React', 'JavaScript', 'CSS'],
    image: '/original-portfolio.png',
    link: 'http://scottfabini.com'
  },
  {
    title: 'Calendar',
    description: 'A full-stack calendar application with Node.js backend deployed on AWS EC2, featuring a RESTful API for appointment management.',
    technologies: ['Node.js', 'EC2', 'REST API', 'MongoDB'],
    image: '/calendar.png',
    link: 'https://github.com/scottfabini/apptbook'
  },
  {
    title: 'Album Notes',
    description: 'A modern web application for managing and organizing music album notes, built with React and modern JavaScript features.',
    technologies: ['React', 'ES6', 'CSS', 'JavaScript'],
    image: '/album-notes.png',
    link: 'https://github.com/scottfabini/album-notes'
  }
]

const Projects = () => {
  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Featured Projects
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            A collection of my recent work and personal projects
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="aspect-video bg-gray-100 dark:bg-gray-700 relative">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-primary-100 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary flex items-center gap-2 group"
                  >
                    <svg
                      className="w-5 h-5 text-current"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.91-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                    View Project
                    <ArrowTopRightOnSquareIcon className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                  {project.githubLink && (
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-secondary flex items-center gap-2 group"
                    >
                      <svg
                        className="w-5 h-5 text-current"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.91-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                      </svg>
                      GitHub
                      <ArrowTopRightOnSquareIcon className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects 
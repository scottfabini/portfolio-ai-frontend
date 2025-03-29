import React from 'react'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Projects from '@/components/Projects'
import Education from '@/components/Education'
import Experience from '@/components/Experience'
import Skills from '@/components/Skills'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Experience />
      <Education />
      <Projects />
      <About />
      <Skills />
    </main>
  )
} 
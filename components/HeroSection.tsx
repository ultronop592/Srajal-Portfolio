"use client"

import { Github, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"
import ResumeDownloadButton from "./ResumeDownloadButton"

export default function HeroSection() {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto text-center">
        <div className="mb-8">
          <img
            src="/profile.jpg"
            alt="Srajal Tiwari"
            className="w-48 h-48 rounded-full mx-auto mb-6 shadow-2xl border-4 border-white dark:border-gray-700 hover:scale-105 transition-transform duration-300"
          />
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">Srajal Tiwari</h1>
          <p className="text-lg text-blue-600 dark:text-blue-400 font-semibold mb-2">
            AI/ML Engineering Student | Machine Learning & Gen AI Learner
          </p>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            "Turning Data into Decisions | Building Smart Systems with AI"
          </p>

          {/* Enhanced Button Section */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {/* Primary Resume Download Button */}
            <ResumeDownloadButton variant="primary" size="lg" />

            {/* Social Media Buttons */}
            <Button
              variant="outline"
              size="lg"
              className="hover:bg-gray-100 dark:hover:bg-gray-800 transform hover:scale-105 transition-all duration-300 bg-transparent border-2"
              onClick={() => window.open("https://github.com/ultronop592", "_blank")}
            >
              <Github className="h-5 w-5 mr-2" />
              GitHub
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="hover:bg-gray-100 dark:hover:bg-gray-800 transform hover:scale-105 transition-all duration-300 bg-transparent border-2"
              onClick={() => window.open("https://linkedin.com/in/srajal-tiwari-7229172b9", "_blank")}
            >
              <Linkedin className="h-5 w-5 mr-2" />
              LinkedIn
            </Button>
          </div>

          {/* Secondary Resume Download Option */}
          <div className="mt-6">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
              📄 Get my latest resume with all projects and certifications
            </p>
            <ResumeDownloadButton variant="secondary" size="md" className="mx-auto" />
          </div>
        </div>
      </div>
    </section>
  )
}

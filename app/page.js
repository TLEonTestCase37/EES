"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Menu,
  ChevronRight,
  Calendar,
  BookOpen,
  Award,
  Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Image from "next/image";
export default function Home() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const staggerContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const menuItems = [
    { name: "About", href: "#about" },
    { name: "Academics", href: "#academics" },
    { name: "Research", href: "#research" },
    { name: "Student Helm", href: "#student-life" },
    { name: "News", href: "#news" },
  ];

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Top Bar */}
      {/* <div className="bg-gray-900 text-white py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0 text-sm">
          <div className="flex flex-wrap justify-center sm:justify-start space-x-4 sm:space-x-6">
            <a href="#" className="hover:text-gray-300">
              Quick Links
            </a>
            <a href="#" className="hover:text-gray-300">
              Directory
            </a>
            <a href="#" className="hover:text-gray-300">
              Contact
            </a>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto justify-center sm:justify-end">
            <Input
              placeholder="Search..."
              className="w-48 sm:w-64 h-8 bg-gray-800 border-gray-700 text-white placeholder-gray-400"
            />
            <Search className="h-4 w-4" />
          </div>
        </div>
      </div> */}

      {/* Main Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-800 rounded-full flex items-center justify-center mr-2 sm:mr-3">
                  <Image src={"/EES.jpg"} width={100} height={100} alt="some" />
                </div>
                <div>
                  <h1 className="text-lg sm:text-xl font-bold text-gray-900">
                    Electronics Engineering Society
                  </h1>
                  <p className="text-xs text-gray-600 hidden sm:block">
                    Excellence in Innovation
                  </p>
                </div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {menuItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-red-800 px-3 py-2 text-sm font-medium border-b-2 border-transparent hover:border-red-800 transition-all"
                >
                  {item.name}
                </a>
              ))}
            </div>

            {/* Mobile menu button */}
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-white">
                <div className="flex flex-col space-y-6 mt-8">
                  {menuItems.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="text-lg font-medium text-gray-700 hover:text-red-800"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gray-50 py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <motion.h1
                variants={fadeInUp}
                className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4 sm:mb-6"
              >
                Advancing Excellence in{" "}
                <span className="text-red-800 font-serif">
                  Electronics Engineering
                </span>
              </motion.h1>
              <motion.p
                variants={fadeInUp}
                className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8 leading-relaxed"
              >
                The Electronics Engineering Society fosters innovation, academic
                excellence, and professional development through cutting-edge
                research, collaborative learning, and industry partnerships.
              </motion.p>
              <motion.div
                variants={fadeInUp}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Button
                  className="cursor-pointer bg-red-800 hover:bg-red-900 text-white px-6 sm:px-8 py-3"
                  size="lg"
                  onClick={() => {
                    router.push("/fest");
                  }}
                >
                  Explore Fest
                </Button>
                <Button
                  variant="outline"
                  className="cursor-pointer border-red-800 text-red-800 hover:bg-red-50 px-6 sm:px-8 py-3 bg-transparent"
                  size="lg"
                  onClick={() => {
                    router.push("/dashboard");
                  }}
                >
                  Join EES
                </Button>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative mt-8 lg:mt-0"
            >
              <div className="bg-white rounded-lg shadow-xl p-6 sm:p-8 border">
                <div className="grid grid-cols-2 gap-4 sm:gap-6">
                  <div className="text-center">
                    <div className="text-2xl sm:text-3xl font-bold text-red-800">
                      500+
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600">
                      Active Members
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl sm:text-3xl font-bold text-red-800">
                      5
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600">
                      Annual Events
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl sm:text-3xl font-bold text-red-800">
                      25+
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600">
                      Research Projects
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl sm:text-3xl font-bold text-red-800">
                      15
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600">
                      Years of Excellence
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* Highlighted Voices Section */}
      <section className="py-12 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
          {/* First Quote - Image Right */}
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-10 group">
            <div className="flex-1">
              <blockquote className="text-xl sm:text-2xl font-serif text-gray-800 relative pl-4 border-l-4 border-red-800 transition-all duration-300 group-hover:pl-6">
                <p className="text-gray-700">
                  Our department team secured{" "}
                  <span className="font-semibold text-gray-900">
                    3rd place in the national-level C2S Hackathon
                  </span>
                  , showcasing innovative problem-solving and technical
                  excellence. Proud moment for the ECE community and a testament
                  to our collaborative spirit!
                </p>
              </blockquote>
            </div>
            <div className="flex-1">
              <Image
                src="/win1.jpg"
                alt="Industry collaboration"
                width={600}
                height={400}
                className="rounded-lg shadow-lg transform transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          </div>

          {/* Second Quote - Image Left */}
          <div className="flex flex-col lg:flex-row-reverse items-center lg:items-start gap-10 group">
            <div className="flex-1">
              <blockquote className="text-xl sm:text-2xl font-serif text-gray-800 relative pl-4 border-l-4 border-blue-800 transition-all duration-300 group-hover:pl-6">
                <p>
                  “EES gave me the opportunity to lead multiple tech research
                  projects with guidance from top professors and industry
                  mentors — it changed my career path.”
                </p>
              </blockquote>
            </div>
            <div className="flex-1">
              <Image
                src="/gyansh_photo.jpeg"
                alt="Student Research"
                width={600}
                height={400}
                className="rounded-lg shadow-lg transform transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          </div>

          {/* Third Quote - Image Right */}
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-10 group">
            <div className="flex-1">
              <blockquote className="text-xl sm:text-2xl font-serif text-gray-800 relative pl-4 border-l-4 border-green-800 transition-all duration-300 group-hover:pl-6">
                <p>
                  “Every year concludes with a high-energy celebration — a fest
                  where we unwind, showcase our achievements, and bond as a
                  community after a year of innovation and hustle.”
                </p>
              </blockquote>
            </div>
            <div className="flex-1">
              <Image
                src="/final_image.png"
                alt="Startup Mentorship"
                width={600}
                height={400}
                className="rounded-lg shadow-lg transform transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          </div>
        </div>
      </section>
      {/* Featured News */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Latest News & Announcements
            </h2>
            <div className="w-24 h-1 bg-red-800 mx-auto"></div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <Card className="border-l-4 border-l-red-800 transition-transform duration-300 transform hover:scale-105">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge
                    variant="secondary"
                    className="bg-red-100 text-red-800"
                  >
                    <Calendar className="h-3 w-3 mr-1" />
                    Jan 15, 2024
                  </Badge>
                </div>
                <CardTitle className="text-xl">
                  EES Annual TechFest 2024
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 mb-4">
                  Registration now open for our flagship technical festival
                  featuring competitions, workshops, and industry exhibitions.
                </CardDescription>
                <a
                  href="#"
                  className="text-red-800 font-medium hover:text-red-900 flex items-center"
                >
                  Learn More <ChevronRight className="h-4 w-4 ml-1" />
                </a>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-blue-600 transition-transform duration-300 transform hover:scale-105">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge
                    variant="secondary"
                    className="bg-blue-100 text-blue-800"
                  >
                    <Calendar className="h-3 w-3 mr-1" />
                    Jan 10, 2024
                  </Badge>
                </div>
                <CardTitle className="text-xl">
                  Research Excellence Award
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 mb-4">
                  EES members receive national recognition for groundbreaking
                  work in sustainable electronics and IoT applications.
                </CardDescription>
                <a
                  href="#"
                  className="text-blue-600 font-medium hover:text-blue-700 flex items-center"
                >
                  Read More <ChevronRight className="h-4 w-4 ml-1" />
                </a>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-green-600 transition-transform duration-300 transform hover:scale-105">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge
                    variant="secondary"
                    className="bg-green-100 text-green-800"
                  >
                    <Calendar className="h-3 w-3 mr-1" />
                    Jan 5, 2024
                  </Badge>
                </div>
                <CardTitle className="text-xl">
                  Industry Partnership Program
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 mb-4">
                  New collaborations with leading tech companies provide
                  internship and career opportunities for EES members.
                </CardDescription>
                <a
                  href="#"
                  className="text-green-600 font-medium hover:text-green-700 flex items-center"
                >
                  Explore <ChevronRight className="h-4 w-4 ml-1" />
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Academic Excellence */}
      <section id="academics" className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Academic Excellence
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive programs combine theoretical knowledge with
              practical application, preparing students for leadership in the
              electronics industry.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Card 1 */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <Card className="h-full transition-transform transform duration-300 hover:scale-105 group">
                <CardHeader>
                  <Image
                    src="/image1_event.jpeg"
                    width={600}
                    height={400}
                    alt="Workshop"
                    className="rounded-md mb-4"
                  />
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                    <BookOpen className="h-6 w-6 text-red-800" />
                  </div>
                  <CardTitle className="text-xl">
                    <span className="relative inline-block after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-0.5 after:bg-red-800 after:transition-all after:duration-300 group-hover:after:w-full">
                      Technical Workshops
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">
                    Hands-on learning experiences covering the latest
                    technologies in electronics, embedded systems, and digital
                    signal processing.
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>

            {/* Card 2 */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <Card className="h-full transition-transform transform duration-300 hover:scale-105 group">
                <CardHeader>
                  <Image
                    src="/event2_image.jpeg"
                    width={600}
                    height={400}
                    alt="Research"
                    className="rounded-md mb-4"
                  />
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <Award className="h-6 w-6 text-blue-800" />
                  </div>
                  <CardTitle className="text-xl">
                    <span className="relative inline-block after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-0.5 after:bg-blue-800 after:transition-all after:duration-300 group-hover:after:w-full">
                      Research Projects
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">
                    Collaborative research initiatives in areas such as
                    renewable energy systems, artificial intelligence, and
                    advanced communication technologies.
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>

            {/* Card 3 */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <Card className="h-full transition-transform transform duration-300 hover:scale-105 group">
                <CardHeader>
                  <Image
                    src="/image3_event.jpeg"
                    width={600}
                    height={400}
                    alt="Industry"
                    className="rounded-md mb-4"
                  />
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                    <Globe className="h-6 w-6 text-green-800" />
                  </div>
                  <CardTitle className="text-xl">
                    <span className="relative inline-block after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-0.5 after:bg-green-800 after:transition-all after:duration-300 group-hover:after:w-full">
                      Industry Connections
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">
                    Strong partnerships with leading technology companies
                    provide internship opportunities and career pathways for our
                    members.
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section id="student-life" className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Student Leadership
            </h2>
            <p className="text-lg sm:text-xl text-gray-600">
              Meet the dedicated students leading EES initiatives
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <Card className="text-center transition-transform transform duration-300 hover:scale-105">
              <CardHeader className="pb-4">
                <div className="w-30 h-30 sm:w-24 sm:h-24 bg-red-800 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Image
                    src={"/sameer_shashwat.png"}
                    width={200}
                    height={200}
                    alt="some"
                  />
                </div>
                <CardTitle className="text-lg">Sameer Shaswat</CardTitle>
                <CardDescription className="text-green-800 font-medium">
                  Co-convener
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Final Year Student @IIT BHU'26 | Competitive Programmer |
                  Co-convener @EES'25
                </p>
              </CardContent>
            </Card>
            <Card className="text-center transition-transform transform duration-300 hover:scale-105">
              <CardHeader className="pb-4">
                <div className="w-30 h-30 sm:w-24 sm:h-24 bg-red-800 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Image
                    src={"/aryan_pandey.jpeg"}
                    width={200}
                    height={200}
                    alt="some"
                  />
                </div>
                <CardTitle className="text-lg">Aryan Pandey</CardTitle>
                <CardDescription className="text-red-800 font-medium">
                  General Secretary
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  B.Tech Electronics Engineering (IIT BHU) | RISC-V CPU Designer
                  | Specialized in Verilog, FPGA, Digital Communication Systems
                  & Photonics | Innovator in Hardware Design and Optimization
                </p>
              </CardContent>
            </Card>

            <Card className="text-center transition-transform transform duration-300 hover:scale-105">
              <CardHeader className="pb-4">
                <div className="w-30 h-30 sm:w-24 sm:h-24 bg-red-800 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Image
                    src={"/chaitanya.jpeg"}
                    width={200}
                    height={200}
                    alt="some"
                  />
                </div>
                <CardTitle className="text-lg">Chaitanya Gambali</CardTitle>
                <CardDescription className="text-blue-800 font-medium">
                  Jt. General Secretary
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  IIT BHU ECE '26 | Embedded Systems Intern @ JLR | GSoC'25 @
                  OpenROAD | LFX'25 @ RISCV International | GSoC'24 @ Apertium |
                  Summer Research Fellow 2024 @ IIT Bombay
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-12 sm:py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">About EES</h3>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Mission & Vision
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    History
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Leadership
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Annual Report
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Academics</h3>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Programs
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Workshops
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Certifications
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Resources
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Research</h3>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Current Projects
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Publications
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Collaborations
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Funding
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Connect</h3>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Newsletter
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Social Media
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Alumni Network
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 text-gray-400 py-6 sm:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-red-800 rounded-full flex items-center justify-center mr-3">
                <Image src={"/EES.jpg"} width={100} height={100} alt="some" />
              </div>
              <span className="font-semibold text-center md:text-left">
                Electronics Engineering Society
              </span>
            </div>
            <div className="text-sm text-center md:text-right">
              © 2024 Electronics Engineering Society. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

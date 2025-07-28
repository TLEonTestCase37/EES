"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Menu, Search, ChevronRight, Calendar, Users, Zap } from "lucide-react";
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
import { Input } from "@/components/ui/input";

export default function FestPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const galleryRef = useRef(null);

  const scrollToGallery = () => {
    galleryRef.current?.scrollIntoView({ behavior: "smooth" });
  };

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
    { name: "Home", href: "/" },
    { name: "Events", href: "#events" },
    { name: "Gallery", href: "#gallery" },
    { name: "Achievements", href: "#achievements" },
    { name: "Registration", href: "#registration" },
  ];

  const events = [
    {
      title: "CASSANDRA",
      description:
        "Data Analytics and Machine Learning Competition - Dive deep into the world of data science and artificial intelligence.",
      image: "/images/CASSANDRA.svg",
      category: "Technical",
      participants: "150+",
      duration: "2 Days",
    },
    {
      title: "DEVBITS",
      description:
        "Software Development Challenge - Build innovative solutions and showcase your coding prowess in this intensive hackathon.",
      image: "/images/DEVBITS.svg",
      category: "Development",
      participants: "200+",
      duration: "24 Hours",
    },
    {
      title: "COMMNET",
      description:
        "Communication Networks Symposium - Explore the latest in networking technologies and communication systems.",
      image: "/images/COMMNET.svg",
      category: "Networks",
      participants: "100+",
      duration: "1 Day",
    },
    {
      title: "DIGISIM",
      description:
        "Digital Circuit Simulation Contest - Design and simulate complex digital systems using industry-standard tools.",
      image: "/images/DIGISIM.svg",
      category: "Hardware",
      participants: "80+",
      duration: "3 Hours",
    },
    {
      title: "MOSAIC",
      description:
        "Multidisciplinary Innovation Showcase - Present your interdisciplinary projects and creative solutions.",
      image: "/images/events-mosaic-background.svg",
      category: "Innovation",
      participants: "120+",
      duration: "Full Day",
    },
    {
      title: "FUNCKIT",
      description:
        "Fun Circuit Design Workshop - Learn electronics through hands-on activities and interactive demonstrations.",
      image: "/images/FUNCKIT.svg",
      category: "Workshop",
      participants: "60+",
      duration: "4 Hours",
    },
  ];

  return (
    <div className="min-h-screen bg-white">


      {/* Main Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-800 rounded-full flex items-center justify-center mr-2 sm:mr-3">
                  <Image src={"/EES.jpg"} width={100} height={100} alt="some" />
                </div>
                <div>
                  <h1 className="text-lg sm:text-xl font-bold text-gray-900">
                    EES TechFest 2024
                  </h1>
                  <p className="text-xs text-gray-600 hidden sm:block">
                    Electronics Engineering Society
                  </p>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-red-800 px-3 py-2 text-sm font-medium border-b-2 border-transparent hover:border-red-800 transition-all"
                >
                  {item.name}
                </Link>
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
                    <Link
                      key={item.name}
                      href={item.href}
                      className="text-lg font-medium text-gray-700 hover:text-red-800"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>

      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-red-800">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-gray-900 font-medium">EES TechFest</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative bg-gray-50 py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="text-center"
          >
            <motion.div variants={fadeInUp} className="mb-6">
              <Badge
                variant="outline"
                className="border-red-800 text-red-800 mb-4"
              >
                Annual Technical Festival
              </Badge>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4 sm:mb-6"
            >
              EES <span className="text-red-800">TechFest</span> 2024
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8 leading-relaxed max-w-3xl mx-auto"
            >
              Join us for the most anticipated technical festival of the year.
              Compete in cutting-edge challenges, attend workshops, and network
              with industry professionals.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
            >
              <Button
                className="bg-red-800 hover:bg-red-900 text-white px-6 sm:px-8 py-3"
                size="lg"
              >
                Register Now
              </Button>
              <Button
                variant="outline"
                className="border-red-800 text-red-800 hover:bg-red-50 px-6 sm:px-8 py-3 bg-transparent"
                size="lg"
                onClick={scrollToGallery}
              >
                View Gallery
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={fadeInUp}
              className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8 max-w-4xl mx-auto"
            >
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-red-800">
                  6
                </div>
                <div className="text-xs sm:text-sm text-gray-600">
                  Major Events
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-red-800">
                  500+
                </div>
                <div className="text-xs sm:text-sm text-gray-600">
                  Participants
                </div>
              </div>
             
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-red-800">
                  3
                </div>
                <div className="text-xs sm:text-sm text-gray-600">Months</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Events Section */}
      <section id="events" className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Featured Events
            </h2>
            <div className="w-24 h-1 bg-red-800 mx-auto mb-4"></div>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Explore our diverse range of technical competitions, workshops,
              and innovation challenges.
            </p>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          >
            {events.map((event, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full hover:shadow-lg transition-all duration-300 group border-l-4 border-l-red-800">
                  <div className="relative w-full aspect-video overflow-hidden">
                    <Image
                      src={event.image || "/placeholder.svg"}
                      alt={event.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-red-800 text-white">
                        {event.category}
                      </Badge>
                    </div>
                  </div>

                  <CardHeader>
                    <CardTitle className="text-xl text-gray-900 group-hover:text-red-800 transition-colors">
                      {event.title}
                    </CardTitle>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        {event.participants}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {event.duration}
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <CardDescription className="text-gray-600 mb-4 leading-relaxed">
                      {event.description}
                    </CardDescription>

                    <div className="flex flex-col sm:flex-row gap-2">
                      <Button className="bg-red-800 hover:bg-red-900 text-white flex-1">
                        Register
                      </Button>
                      <Button
                        variant="outline"
                        className="border-gray-300 text-gray-700 hover:bg-gray-50 flex-1 bg-transparent"
                      >
                        Problem Statement
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Gallery Section */}
      <section
        ref={galleryRef}
        id="gallery"
        className="py-12 sm:py-16 bg-gray-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Event Gallery
            </h2>
            <div className="w-24 h-1 bg-red-800 mx-auto mb-4"></div>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Relive the excitement and innovation from previous TechFest
              editions.
            </p>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
          >
            {[1, 2, 3, 4, 5].map((i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div className="aspect-video relative">
                  <Image
                    alt={`Gallery image ${i}`}
                    src={`/images/gallery/gallery${i}.jpg`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="font-semibold">TechFest 2023</p>
                    <p className="text-sm">Event Highlights</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <div className="text-center mt-8">
            <Button
              variant="outline"
              className="border-red-800 text-red-800 hover:bg-red-50 bg-transparent"
            >
              View More Photos
            </Button>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 sm:py-16 bg-red-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h2
              variants={fadeInUp}
              className="text-2xl sm:text-3xl font-bold mb-4"
            >
              Ready to Join TechFest 2024?
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-lg sm:text-xl mb-6 sm:mb-8 opacity-90 max-w-2xl mx-auto"
            >
              Don't miss out on this incredible opportunity to showcase your
              skills, learn from experts, and connect with fellow innovators.
            </motion.p>
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button
                className="bg-white text-red-800 hover:bg-gray-100 px-6 sm:px-8 py-3"
                size="lg"
              >
                Register Now
              </Button>
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-red-800 px-6 sm:px-8 py-3 bg-transparent"
                size="lg"
              >
                Download Brochure
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 text-gray-400 py-6 sm:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-red-800 rounded-full flex items-center justify-center mr-3">
                <Zap className="h-4 w-4 text-white" />
              </div>
              <span className="font-semibold text-center md:text-left">
                EES TechFest 2024
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

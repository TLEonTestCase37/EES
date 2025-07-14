"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { NavigationMenuDemo } from "@/components/navmain";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import Image from "next/image";
const fadeUpVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};
import Link from "next/link";
const events = [
  {
    title: "CASSANDRA",
    img: "/images/CASSANDRA.svg",
    ps: "/ps/cassandra",
    register: "/register/cassandra",
  },
  {
    title: "COMMNET",
    img: "/images/COMMNET.svg",
    ps: "/ps/commnet",
    register: "/register/commnet",
  },
  {
    title: "DEVBITS",
    img: "/images/DEVBITS.svg",
    ps: "/ps/devbits",
    register: "/register/devbits",
  },
  {
    title: "DIGISIM",
    img: "/images/DIGISIM.svg",
    ps: "/ps/digisim",
    register: "/register/digisim",
  },
  {
    title: "FUNCKIT",
    img: "/images/FUNCKIT.svg",
    ps: "/ps/funckit",
    register: "/register/funckit",
  },
  {
    title: "MOSAIC",
    img: "/images/events-mosaic-background.svg",
    ps: "/ps/mosaic",
    register: "/register/mosaic",
  },
];
function AnimateOnScroll({ children }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      variants={fadeUpVariant}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  return (
    <div className="relative min-h-screen text-white font-[family-name:var(--font-geist-sans)] scroll-smooth">
      {/* Background image */}
      <div className="fixed inset-0 z-0 bg-[url('/Alumni_Background.png')] bg-cover bg-center bg-no-repeat bg-fixed" />
      <div className="fixed inset-0 z-0 bg-black/50" />

      <div className="relative z-10 p-8 sm:p-20">
        {/* Navigation */}
        <div className="sticky top-0 z-50 flex justify-center">
          <div className="bg-white/80 backdrop-blur-md px-6 py-3 rounded-xl shadow-md w-full max-w-2xl mx-auto flex items-center justify-center">
            <NavigationMenuDemo />
          </div>
        </div>

        {/* Hero */}
        <section className="min-h-screen flex items-center justify-center text-center px-4">
          <AnimateOnScroll>
            <div className="space-y-6">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600 bg-clip-text text-transparent drop-shadow-glow animate-fade-in">
                Welcome to EES — The Electronics Engineering Society
              </h1>
              <p className="text-base sm:text-lg md:text-xl max-w-3xl mx-auto text-white/90 leading-relaxed animate-fade-in-delay">
                Igniting innovation, building community, and celebrating the
                legacy of electronics engineering.
                <br className="hidden sm:inline" />
                Whether you are an alumnus or a curious student, you are always
                part of the EES family.
              </p>
            </div>
          </AnimateOnScroll>
        </section>

        {/* About */}
        <section
          id="about"
          className="w-full py-24 px-4 sm:px-8 md:px-16 lg:px-24"
        >
          <AnimateOnScroll>
            <div className="flex flex-col lg:flex-row items-center gap-12 max-w-7xl mx-auto text-left">
              {/* Left: Department Image */}
              <div className="w-full lg:w-1/2">
                <div className="relative w-full h-72 sm:h-96 rounded-xl overflow-hidden shadow-lg">
                  <Image
                    src="/department.jpg" // 🔁 update with your real path
                    alt="Department of Electronics Engineering"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Right: Department Description */}
              <div className="w-full lg:w-1/2 space-y-6">
                <h2 className="text-3xl sm:text-4xl font-bold text-white drop-shadow-glow">
                  About the Department
                </h2>
                <p className="text-white/90 text-base sm:text-lg leading-relaxed">
                  The Department of Electronics Engineering was established in
                  1971 as an offshoot of the Electrical Engineering Department,
                  thanks to the visionary efforts of Prof. S.S. Banerjee. That
                  same year, the Banaras Engineering College (BENCO), College of
                  Mining and Metallurgy, and College of Technology were merged
                  to form the Institute of Technology–Banaras Hindu University
                  (IT-BHU).
                </p>
                <p className="text-white/90 text-base sm:text-lg leading-relaxed">
                  The department offers Bachelor, Master, and Doctoral programs
                  in Electronics Engineering, focusing on Microelectronics,
                  Microwave Engineering, Digital Techniques & Instrumentation,
                  and Communication Systems. With active research since
                  inception, the department received its first major funding of
                  ₹1 Crore in 1980 from the Department of Electronics (DoE),
                  Govt. of India, to develop High Power Microwave Tubes.
                </p>
              </div>
            </div>
          </AnimateOnScroll>
        </section>

        {/* News */}
        <section id="news" className="w-full py-20 text-center">
          <AnimateOnScroll>
            <div>
              <h2 className="text-3xl sm:text-4xl font-semibold mb-6">
                Latest News
              </h2>
              <div className="max-w-4xl mx-auto space-y-4">
                {[
                  "🎉 Alumni Meet 2025 scheduled for January",
                  "🚀 Alumni startup secures Series A funding",
                  "📢 Mentorship Program applications open",
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.02 }}
                    className="bg-white/10 p-4 rounded-lg backdrop-blur-md"
                  >
                    {item}
                  </motion.div>
                ))}
              </div>
            </div>
          </AnimateOnScroll>
        </section>

        <section
          id="events"
          className="w-full py-24 px-4 sm:px-8 md:px-16 lg:px-24 text-center"
        >
          <AnimateOnScroll>
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-bold mb-12 drop-shadow-glow text-white">
                Our Signature Events
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                {events.map((event) => (
                  <div
                    key={event.title}
                    className="bg-white/5 backdrop-blur-md p-6 rounded-xl shadow-xl border border-white/10 hover:border-white/30 transition duration-300 flex flex-col items-center text-white"
                  >
                    <div className="relative w-full h-40 mb-4">
                      <Image
                        src={event.img}
                        alt={event.title}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <h3 className="text-xl font-semibold mb-4">
                      {event.title}
                    </h3>
                    <div className="flex flex-col sm:flex-row gap-3 w-full">
                      <Link
                        href={event.ps}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm transition"
                      >
                        Check Out PS
                      </Link>
                      <Link
                        href={event.register}
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-lg text-sm transition"
                      >
                        Register
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AnimateOnScroll>
        </section>
        {/* Gallery */}
        <section id="gallery" className="w-full py-20 text-center">
          <AnimateOnScroll>
            <h2 className="text-3xl sm:text-4xl font-semibold mb-12">
              Gallery
            </h2>
            <div className="max-w-6xl mx-auto">
              <Carousel className="w-full max-w-5xl mx-auto">
                <CarouselContent>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <CarouselItem
                      key={i}
                      className="relative flex justify-center items-center h-[400px] md:h-[500px] rounded-2xl overflow-hidden group"
                    >
                      <div className="relative w-full h-full rounded-2xl overflow-hidden border-2 border-white/30 group-hover:border-white transition duration-500 shadow-xl glow-border">
                        <Image
                          src={`/images/gallery/gallery${i}.jpg`}
                          alt={`Gallery ${i}`}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
          </AnimateOnScroll>
        </section>

        {/* Contact */}
        <section id="contact" className="w-full py-20 text-center">
          <AnimateOnScroll>
            <div>
              <h2 className="text-3xl sm:text-4xl font-semibold mb-6">
                Contact Us
              </h2>
              <p className="mb-4">📧 alumni@college.edu</p>
              <form className="max-w-md mx-auto space-y-4">
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full p-3 rounded-lg bg-white/80 text-black placeholder-gray-600"
                  required
                />
                <textarea
                  rows={4}
                  placeholder="Your message"
                  className="w-full p-3 rounded-lg bg-white/80 text-black placeholder-gray-600"
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-900 transition"
                >
                  Send Message
                </button>
              </form>
            </div>
          </AnimateOnScroll>
        </section>
      </div>
    </div>
  );
}

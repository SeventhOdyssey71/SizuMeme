"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Space_Grotesk } from "next/font/google"

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] })

const nftImages = [
  "https://pbs.twimg.com/media/GlXsX6RWcAAxF8_?format=jpg&name=900x900",
  "https://pbs.twimg.com/media/Gla57qeWUAAoYFs?format=jpg&name=large",
  "https://pbs.twimg.com/media/GlXjQLdXgAA7_t-?format=jpg&name=900x900",
  "https://pbs.twimg.com/media/GlOCUq-XIAArHY5?format=jpg&name=medium",
  "https://pbs.twimg.com/media/GlXTCWlXMAA7HUC?format=jpg&name=900x900",
]

export default function LandingPage() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const scrollContainer = scrollRef.current
    if (!scrollContainer) return

    let scrollInterval: NodeJS.Timeout

    const startScroll = () => {
      scrollInterval = setInterval(() => {
        if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
          scrollContainer.scrollLeft = 0
        } else {
          scrollContainer.scrollLeft += 1
        }
      }, 30)
    }

    const stopScroll = () => {
      clearInterval(scrollInterval)
    }

    if (!isHovered) {
      startScroll()
    }

    return () => {
      stopScroll()
    }
  }, [isHovered])

  return (
    <div className={`min-h-screen bg-black text-white ${spaceGrotesk.className}`}>
      {/* Grid Background */}
      <div
        className="fixed inset-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />

      {/* Content */}
      <div className="relative">
        {/* Navigation */}
        <nav className="fixed w-full z-50 bg-black/90 backdrop-blur-sm border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-center h-16">
              {/* Center Logo */}
              <Link href="/">
                <Image
                  src="https://pbs.twimg.com/profile_images/1873961061159755776/g9DigXps_400x400.jpg"
                  alt="Sizu Logo"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              </Link>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <main className="pt-32 pb-20 text-center relative z-10">
          <div className="max-w-4xl mx-auto px-4">
            <div className="inline-flex items-center gap-2 bg-white/5 rounded-full px-4 py-1 mb-8">
              <span className="bg-red-600 text-white text-xs font-medium px-2 py-0.5 rounded-full">New</span>
              <span className="text-sm">The Future of Digital Ownership is Here</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Own the Future of
              <br />
              Digital Collectibles
            </h1>

            <p className="text-gray-400 text-lg mb-12 max-w-2xl mx-auto">
              Discover, trade, and showcase unique NFTs in a decentralized marketplace
              <br />
              built for creators and collectors.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/marketplace">
                <Button className="bg-red-600 hover:bg-red-700 text-white font-medium text-lg px-8 py-3 w-full sm:w-auto">
                  Visit Store
                </Button>
              </Link>
              <Link href="https://app.cetus.zone/swap/?from=0xa7b184cdd17cc2753b9aa2d3c1a4fcb1ae7e2fd8670ee42180369343bdac9c08::sizu::SIZU&to=0x2::sui::SUI">
                <Button className="bg-black border border-white hover:bg-white/10 text-white font-medium text-lg px-8 py-3 w-full sm:w-auto">
                  Buy $SIZU
                </Button>
              </Link>
            </div>
          </div>

          {/* NFT Showcase */}
          <div className="max-w-full mx-auto mt-20 overflow-hidden">
            <div
              ref={scrollRef}
              className="flex gap-4 w-[200%]"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {[...nftImages, ...nftImages].map((src, i) => (
                <div
                  key={i}
                  className="w-64 h-64 flex-shrink-0 rounded-3xl overflow-hidden bg-gradient-to-b from-white/10 to-white/5 hover:scale-105 transition-transform duration-300"
                >
                  <Image
                    src={src || "/placeholder.svg"}
                    alt={`NFT ${i}`}
                    width={256}
                    height={256}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}


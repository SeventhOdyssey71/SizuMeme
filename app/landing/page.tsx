"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Space_Grotesk } from "next/font/google"

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] })

const navItems = [
  {
    title: "Community",
    items: ["Discord", "Twitter", "Blog", "Documentation"],
  },
  {
    title: "Collections",
    items: ["Featured", "Trending", "New Releases", "All Collections"],
  },
  {
    title: "Explore",
    items: ["All NFTs", "Art", "Gaming", "Music", "Photography"],
  },
  {
    title: "Marketplace",
    items: ["Buy", "Sell", "Create", "Analytics"],
  },
  {
    title: "About Us",
    items: ["Team", "Careers", "Press", "Contact"],
  },
]

const nftImages = [
  "/placeholder.svg?height=256&width=256",
  "/placeholder.svg?height=256&width=256",
  "/placeholder.svg?height=256&width=256",
  "/placeholder.svg?height=256&width=256",
  "/placeholder.svg?height=256&width=256",
  "/placeholder.svg?height=256&width=256",
  "/placeholder.svg?height=256&width=256",
  "/placeholder.svg?height=256&width=256",
  "/placeholder.svg?height=256&width=256",
  "/placeholder.svg?height=256&width=256",
]

export default function LandingPage() {
  const [openMenu, setOpenMenu] = useState<string | null>(null)
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
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-8">
                {navItems.map((section) => (
                  <div
                    key={section.title}
                    className="relative"
                    onMouseEnter={() => setOpenMenu(section.title)}
                    onMouseLeave={() => setOpenMenu(null)}
                  >
                    <button className="flex items-center gap-1 text-sm text-gray-300 hover:text-white transition-colors">
                      {section.title}
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    {openMenu === section.title && (
                      <div className="absolute top-full left-0 w-48 py-2 mt-1 bg-black/90 backdrop-blur-sm border border-white/10 rounded-lg">
                        {section.items.map((item) => (
                          <Link
                            key={item}
                            href="#"
                            className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5"
                          >
                            {item}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Logo */}
              <Link href="/" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-22%20150308-z6DVKZLcaDVvgwCjx9CMVLaYzem4AQ.png"
                  alt="Logo"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              </Link>

              {/* Auth Buttons */}
              <div className="flex items-center gap-4">
                <Button variant="ghost" className="text-sm">
                  Log In
                </Button>
                <Button className="bg-[#c4f82a] hover:bg-[#b3e626] text-black font-medium">Get Started</Button>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <main className="pt-32 pb-20 text-center relative z-10">
          <div className="max-w-4xl mx-auto px-4">
            <div className="inline-flex items-center gap-2 bg-white/5 rounded-full px-4 py-1 mb-8">
              <span className="bg-[#c4f82a] text-black text-xs font-medium px-2 py-0.5 rounded-full">New</span>
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

            <Link href="/">
              <Button className="bg-[#c4f82a] hover:bg-[#b3e626] text-black font-medium text-lg px-8 py-6 h-auto">
                Visit Store
              </Button>
            </Link>
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
                  className="w-64 h-64 flex-shrink-0 rounded-3xl overflow-hidden bg-gradient-to-b from-white/10 to-white/5 transform hover:-translate-y-2 transition-transform duration-300"
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


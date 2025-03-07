"use client"

import { Header } from "@/components/Header"
import { NFTCard } from "@/components/NFTCard"
import { TransactionTicker } from "@/components/TransactionTicker"
import Footer from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { useRef, useEffect } from "react"

export default function Home() {
  const carouselRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const carousel = carouselRef.current
    if (!carousel) return

    let scrollInterval: NodeJS.Timeout

    const startScroll = () => {
      scrollInterval = setInterval(() => {
        if (carousel.scrollLeft >= carousel.scrollWidth - carousel.clientWidth) {
          carousel.scrollLeft = 0
        } else {
          carousel.scrollLeft += 1
        }
      }, 20)
    }

    const stopScroll = () => {
      clearInterval(scrollInterval)
    }

    startScroll()

    carousel.addEventListener("mouseenter", stopScroll)
    carousel.addEventListener("mouseleave", startScroll)

    return () => {
      stopScroll()
      carousel.removeEventListener("mouseenter", stopScroll)
      carousel.removeEventListener("mouseleave", startScroll)
    }
  }, [])

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Radial gradient background */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,rgba(91,64,12,0.2)_0%,rgba(0,0,0,1)_100%)]" />

      {/* Content */}
      <div className="relative flex-grow">
        <Header />
        <TransactionTicker />

        {/* Main Content */}
        <main className="container mx-auto px-4 py-6">
          {/* Categories */}
          <div className="flex flex-wrap gap-2 mb-8">
            {["All", "PFP", "Art", "Music", "Gaming", "Photography"].map((category, i) => (
              <button
                key={category}
                className={`px-4 py-1.5 rounded-full text-sm transition-colors ${
                  i === 0 ? "bg-white/10 text-white" : "text-gray-400 hover:text-white"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Featured Collections */}
          <section className="mb-12 overflow-hidden">
            <div className="relative">
              <div
                ref={carouselRef}
                className="flex gap-12 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
                style={{ scrollBehavior: "smooth" }}
              >

                <NFTCard
                  image="https://pbs.twimg.com/media/Gj6qCAKWIAAmQNp?format=png&name=900x900"
                  title="Sizu Collection"
                  verified
                  floorPrice="29"
                />

                <NFTCard
                  image="https://pbs.twimg.com/media/GkYeuGTXUAA9b3U?format=jpg&name=large"
                  title="Axol Collection"
                  verified
                  floorPrice="34"
                />
                <NFTCard
                  image="https://pbs.twimg.com/profile_images/1865841231126827008/C0y6LKdy_400x400.jpg"
                  title="SuiHeads by Chop"
                  verified
                  floorPrice="15"
                />
                <NFTCard
                  image="https://pbs.twimg.com/media/GlGLpDmX0AAWbp_?format=jpg&name=large"
                  title="Azur Collection"
                  verified
                  floorPrice="25"
                />
               
              </div>
            </div>
          </section>

          {/* New Collections */}
          <section className="mb-12">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-lg font-medium">New Collections</h2>
                <p className="text-sm text-gray-400">Check out new Sizu NFT Collections</p>
              </div>
              <Button variant="link" className="text-sm text-gray-400">
                See more →
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array(8)
                .fill(0)
                .map((_, i) => (
                  <NFTCard
                    key={i}
                    image="https://pbs.twimg.com/media/GkQIYMsWMAELRI4?format=jpg&name=medium"
                    title={`Azur Collection #${i + 1}`}
                    verified
                    floorPrice="29"
                    collectionId={`sizu-${i + 1}`}
                  />
                ))}
            </div>
          </section>

          {/* Hot NFTs */}
          <section>
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-lg font-medium">Hot NFTs</h2>
                <p className="text-sm text-gray-400">Check out trending Sizu NFTs</p>
              </div>
              <Button variant="link" className="text-sm text-gray-400">
                See more →
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array(8)
                .fill(0)
                .map((_, i) => (
                  <NFTCard
                    key={i}
                    image="https://pbs.twimg.com/media/GkYeuGTXUAA9b3U?format=jpg&name=large"
                    title={`Axol Collection #${i + 1}`}
                    verified
                    floorPrice="29"
                    collectionId={`sizu-hot-${i + 1}`}
                  />
                ))}
            </div>
          </section>
        </main>
      </div>

      <Footer />
    </div>
  )
}


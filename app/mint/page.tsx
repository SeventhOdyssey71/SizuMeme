"use client"

import { useState } from "react"
import Image from "next/image"
import { Header } from "@/components/Header"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import Footer from "@/components/Footer"

// Sample mint collections
const mintCollections = [
  {
    id: 1,
    name: "Kumo Genesis",
    image: "https://pbs.twimg.com/media/GdZXJaIWIAATE-w?format=jpg&name=medium",
    description: "The first official Kumo NFT collection with unique traits and utilities.",
    price: "25",
    totalSupply: 1000,
    minted: 750,
    maxPerWallet: 5,
    status: "live",
    launchDate: new Date(),
  },
  {
    id: 2,
    name: "Azur Legends",
    image: "https://pbs.twimg.com/media/GlGLpDmX0AAWbp_?format=jpg&name=large",
    description: "Legendary Azur NFTs with special powers in the Sizu ecosystem.",
    price: "18",
    totalSupply: 2000,
    minted: 0,
    maxPerWallet: 3,
    status: "upcoming",
    launchDate: new Date(Date.now() + 86400000 * 2), // 2 days from now
  },
  {
    id: 3,
    name: "Sizu Elite",
    image: "https://pbs.twimg.com/media/GlWke3bWgAALk_f?format=jpg&name=large",
    description: "Elite collection of Sizu with exclusive community benefits.",
    price: "30",
    totalSupply: 500,
    minted: 500,
    maxPerWallet: 2,
    status: "sold_out",
    launchDate: new Date(Date.now() - 86400000 * 5), // 5 days ago
  },
]

export default function MintPage() {
  const [mintCounts, setMintCounts] = useState<Record<number, number>>({})

  const handleMintCountChange = (collectionId: number, count: number) => {
    setMintCounts({
      ...mintCounts,
      [collectionId]: Math.max(
        0,
        Math.min(count, mintCollections.find((c) => c.id === collectionId)?.maxPerWallet || 0),
      ),
    })
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "live":
        return <span className="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded-full">Live</span>
      case "upcoming":
        return <span className="bg-blue-500/20 text-blue-400 text-xs px-2 py-1 rounded-full">Upcoming</span>
      case "sold_out":
        return <span className="bg-gray-500/20 text-gray-400 text-xs px-2 py-1 rounded-full">Sold Out</span>
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Radial gradient background */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,rgba(91,64,12,0.2)_0%,rgba(0,0,0,1)_100%)]" />

      {/* Content */}
      <div className="relative flex-grow">
        <Header />

        <main className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-2">NFT Minting</h1>
          <p className="text-gray-400 mb-8">Mint new NFTs from exclusive collections</p>

          <div className="space-y-12">
            {mintCollections.map((collection) => (
              <div key={collection.id} className="bg-white/5 rounded-xl overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-1/3">
                    <div className="aspect-square relative">
                      <Image
                        src={collection.image || "/placeholder.svg"}
                        alt={collection.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <div className="p-6 md:w-2/3">
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                      <div>
                        <div className="flex items-center gap-3">
                          <h2 className="text-2xl font-bold">{collection.name}</h2>
                          {getStatusBadge(collection.status)}
                        </div>
                        <p className="text-gray-400 mt-2">{collection.description}</p>
                      </div>
                      <div className="bg-black/30 rounded-lg px-4 py-2 text-sm">
                        {collection.status === "upcoming" ? (
                          <div>
                            <p className="text-gray-400">Launch Date</p>
                            <p className="font-medium">{formatDate(collection.launchDate)}</p>
                          </div>
                        ) : (
                          <div>
                            <p className="text-gray-400">Price</p>
                            <p className="font-medium flex items-center gap-1">
                              {collection.price}{" "}
                              <Image
                                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/SuiLogo-6MCJ2s77dJVZVw6F0OOnQrQ304TAIo.png"
                                alt="SUI"
                                width={14}
                                height={14}
                                className="inline-block"
                              />
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="mb-6">
                      <div className="flex justify-between text-sm mb-2">
                        <span>Mint Progress</span>
                        <span>
                          {collection.minted}/{collection.totalSupply} minted
                        </span>
                      </div>
                      <Progress value={(collection.minted / collection.totalSupply) * 100} className="h-2" />
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-4">
                      <div className="flex items-center">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-10 w-10 rounded-r-none"
                          onClick={() => handleMintCountChange(collection.id, (mintCounts[collection.id] || 0) - 1)}
                          disabled={collection.status !== "live"}
                        >
                          -
                        </Button>
                        <Input
                          type="number"
                          value={mintCounts[collection.id] || 0}
                          onChange={(e) => handleMintCountChange(collection.id, Number.parseInt(e.target.value) || 0)}
                          className="h-10 w-20 rounded-none text-center bg-black/50 border-gray-700"
                          min="0"
                          max={collection.maxPerWallet}
                          disabled={collection.status !== "live"}
                        />
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-10 w-10 rounded-l-none"
                          onClick={() => handleMintCountChange(collection.id, (mintCounts[collection.id] || 0) + 1)}
                          disabled={
                            collection.status !== "live" || (mintCounts[collection.id] || 0) >= collection.maxPerWallet
                          }
                        >
                          +
                        </Button>
                      </div>
                      <div className="text-sm text-gray-400">
                        {collection.status === "live" && `Max ${collection.maxPerWallet} per wallet`}
                      </div>
                      <Button
                        className="bg-red-600 hover:bg-red-700 flex-1"
                        disabled={collection.status !== "live" || !(mintCounts[collection.id] || 0)}
                      >
                        {collection.status === "live"
                          ? `Mint Now (${((mintCounts[collection.id] || 0) * Number(collection.price)).toFixed(2)} SUI)`
                          : collection.status === "upcoming"
                            ? "Coming Soon"
                            : "Sold Out"}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      <Footer />
    </div>
  )
}


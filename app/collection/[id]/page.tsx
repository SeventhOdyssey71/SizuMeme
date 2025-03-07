"use client"

import Image from "next/image"
import { Search, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CollectionNFTCard } from "@/components/CollectionNFTCard"
import { Header } from "@/components/Header"
import { useRouter } from "next/navigation"

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-sm text-gray-400">{label}</p>
      <p className="text-lg font-medium flex items-center gap-1">
        {value}
        {label.includes("Price") || label.includes("Bid") || label.includes("Volume") ? (
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/SuiLogo-6MCJ2s77dJVZVw6F0OOnQrQ304TAIo.png"
            alt="SUI"
            width={16}
            height={16}
            className="inline-block"
          />
        ) : null}
      </p>
    </div>
  )
}

const backgroundColors = [
  "bg-purple-500",
  "bg-green-500",
  "bg-orange-500",
  "bg-red-500",
  "bg-blue-500",
  "bg-pink-500",
  "bg-yellow-500",
  "bg-indigo-500",
]

export default function CollectionPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      {/* Back Button */}
      <button
        onClick={() => router.push("/marketplace")}
        className="fixed top-20 left-4 z-50 flex items-center gap-2 px-4 py-2 text-sm text-white/80 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>

      {/* Banner */}
      <div className="relative h-48  overflow-hidden">
        <div className="absolute inset-0 mix-blend-overlay">
          <Image
            src="https://pbs.twimg.com/profile_banners/1850244894905753600/1738193560/1080x360"
            alt="Collection Banner"
            fill
            className="object-cover opacity-50"
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-between px-4 md:px-12"></div>
      </div>

      {/* Collection Info */}
      <div className="container mx-auto px-4 -mt-20 relative z-10">
        <div className="flex flex-col md:flex-row items-start md:items-end gap-6 mb-8">
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-xl overflow-hidden border-4 border-black">
            <Image
              src="https://pbs.twimg.com/media/Gj6qCAKWIAAmQNp?format=png&name=900x900"
              alt="Collection Thumbnail"
              width={160}
              height={160}
              className="object-cover"
            />
          </div>
          <div className="flex-grow">
            <div className="flex items-center gap-2 mb-4">
              <h1 className="text-2xl font-bold">Sizu Collection</h1>
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Checkmark-1muoqNhe1DRmsGaKUe7zKHaSN9olMP.png"
                alt="Verified"
                width={20}
                height={20}
              />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white/5 rounded-xl p-4">
              <Stat label="Floor Price" value="61" />
              <Stat label="Top Bid" value="73" />
              <Stat label="24h Volume" value="313.9" />
              <Stat label="Supply" value="2,182" />
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input type="search" placeholder="Search by name or traits" className="pl-10 bg-white/5 border-gray-800" />
          </div>
          <div className="flex gap-4">
            <Select defaultValue="low-to-high">
              <SelectTrigger className="w-full md:w-48 bg-white/5 border-gray-800">
                <SelectValue placeholder="Price" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low-to-high">Price: Low to High</SelectItem>
                <SelectItem value="high-to-low">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger className="w-full md:w-32 bg-white/5 border-gray-800">
                <SelectValue placeholder="See all" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">See all</SelectItem>
                <SelectItem value="listed">Listed</SelectItem>
                <SelectItem value="unlisted">Unlisted</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* NFT Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
          {Array(8)
            .fill(0)
            .map((_, i) => (
              <CollectionNFTCard
                key={i}
                number={i + 1}
                price="29"
                color={`${backgroundColors[i % backgroundColors.length]} bg-opacity-20`}
              />
            ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row justify-end gap-4 py-4 border-t border-white/10">
          <Button variant="outline" className="w-full md:w-auto text-white border-white/20">
            List NFTs (2)
          </Button>
          <Button className="w-full md:w-auto bg-red-600 hover:bg-red-700">Make a bid</Button>
        </div>
      </div>
    </div>
  )
}


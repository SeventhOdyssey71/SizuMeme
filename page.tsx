import Image from "next/image"
import { Search, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Footer from "./components/Footer"
import { NFTCard } from "./components/NFTCard"

export default function NFTMarketplace() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Radial gradient background */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,rgba(91,64,12,0.2)_0%,rgba(0,0,0,1)_100%)]" />

      {/* Content */}
      <div className="relative flex-grow">
        {/* Header */}
        <header className="flex items-center justify-between px-4 py-3 bg-black/40 backdrop-blur-sm border-b border-white/5">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <Image src="/placeholder.svg" alt="SizuStore" width={32} height={32} className="rounded-full" />
              <span className="text-xl font-bold">SizuStore</span>
            </div>
            <nav className="hidden md:flex items-center gap-6 text-sm">
              <span className="hover:text-primary/90 transition-colors">$SIZU</span>
              <span className="hover:text-primary/90 transition-colors">Trade NFTs</span>
              <span className="hover:text-primary/90 transition-colors">Raffle</span>
              <span className="hover:text-primary/90 transition-colors">Mint</span>
              <span className="hover:text-primary/90 transition-colors">Staking</span>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="search"
                placeholder="Search NFT Collections"
                className="w-64 pl-10 bg-black/20 border-gray-800 text-gray-300 focus:ring-primary"
              />
            </div>
            <Button className="bg-red-600 hover:bg-red-700 text-white text-sm px-6">Connect Wallet</Button>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-6">
          {/* Categories */}
          <div className="flex gap-2 mb-8">
            {["All", "PFP", "Art", "Music", "Gaming", "Photography"].map((category, i) => (
              <button
                key={category}
                className={`px-6 py-1.5 rounded-full text-sm transition-colors ${
                  i === 0 ? "bg-white/10 text-white" : "text-gray-400 hover:text-white"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Featured Collections */}
          <section className="mb-12">
            <div className="relative">
              <div className="flex gap-4 overflow-hidden">
                <NFTCard
                  image="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-22%20150246-4ipA4Ni6RXv1nq1k3a4TLVuDvkGKhW.png"
                  title="Sizu Collection"
                  verified
                  floorPrice="29"
                />
                <NFTCard
                  image="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-22%20150246-4ipA4Ni6RXv1nq1k3a4TLVuDvkGKhW.png"
                  title="Alien Collection"
                  verified
                  floorPrice="34"
                />
                <NFTCard
                  image="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-22%20150246-4ipA4Ni6RXv1nq1k3a4TLVuDvkGKhW.png"
                  title="SuiHeads by Chop"
                  verified
                  floorPrice="15"
                />
                <NFTCard
                  image="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-22%20150246-4ipA4Ni6RXv1nq1k3a4TLVuDvkGKhW.png"
                  title="Sizu #4"
                  verified
                  floorPrice="25"
                />
              </div>
              <button className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-black/50">
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-black/50">
                <ChevronRight className="h-6 w-6" />
              </button>
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
            <div className="grid grid-cols-4 gap-4">
              {Array(8)
                .fill(0)
                .map((_, i) => (
                  <NFTCard
                    key={i}
                    image="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-22%20150246-4ipA4Ni6RXv1nq1k3a4TLVuDvkGKhW.png"
                    title={`Sizu #${i + 1}`}
                    verified
                    floorPrice="29"
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
            <div className="grid grid-cols-4 gap-4">
              {Array(8)
                .fill(0)
                .map((_, i) => (
                  <NFTCard
                    key={i}
                    image="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-22%20150246-4ipA4Ni6RXv1nq1k3a4TLVuDvkGKhW.png"
                    title={`Sizu #${i + 1}`}
                    verified
                    floorPrice="29"
                  />
                ))}
            </div>
          </section>
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}


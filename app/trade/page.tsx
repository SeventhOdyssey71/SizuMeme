"use client"

import { useState } from "react"
import Image from "next/image"
import { Header } from "@/components/Header"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Footer from "@/components/Footer"

// Sample NFT data
const myNFTs = [
  { id: 1, name: "Sizu #142", image: "https://pbs.twimg.com/media/GlXTCWlXMAA7HUC?format=jpg&name=900x900", price: "45" },
  { id: 2, name: "Sizu #287", image: "https://pbs.twimg.com/media/GlXjQLdXgAA7_t-?format=jpg&name=900x900", price: "52" },
  { id: 3, name: "Axol #19", image: "https://pbs.twimg.com/media/GladGxVWcAEb_xZ?format=jpg&name=large", price: "38" },
  { id: 4, name: "Azur #76", image: "https://pbs.twimg.com/media/GlGLpDmX0AAWbp_?format=jpg&name=large", price: "22" },
]

const listedNFTs = [
  { id: 5, name: "Sizu #301", image: "https://pbs.twimg.com/media/GlWke3bWgAALk_f?format=jpg&name=large", price: "61", owner: "0x6da9...8149" },
  { id: 6, name: "Axol #42", image: "https://pbs.twimg.com/media/Gexnhq-XYAAxtdM?format=jpg&name=medium", price: "47", owner: "0xc963...0891" },
  { id: 7, name: "SuiHeads #103", image: "https://pbs.twimg.com/media/GladGxVWcAEb_xZ?format=jpg&name=large", price: "33", owner: "0x8f21...7e32" },
  { id: 8, name: "Azur #55", image: "https://pbs.twimg.com/media/GdZXJaIWIAATE-w?format=jpg&name=medium", price: "29", owner: "0x3a4b...9c01" },
]

export default function TradeNFTs() {
  const [selectedNFT, setSelectedNFT] = useState<number | null>(null)
  const [selectedListedNFT, setSelectedListedNFT] = useState<number | null>(null)
  const [listPrice, setListPrice] = useState("")
  const [bidAmount, setBidAmount] = useState("")
  const [swapNFT, setSwapNFT] = useState<number | null>(null)
  const [swapTarget, setSwapTarget] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Radial gradient background */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,rgba(91,64,12,0.2)_0%,rgba(0,0,0,1)_100%)]" />

      {/* Content */}
      <div className="relative flex-grow">
        <Header />

        <main className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Trade NFTs</h1>

          <Tabs defaultValue="sell" className="w-full">
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger value="sell">Sell NFTs</TabsTrigger>
              <TabsTrigger value="swap">Swap NFTs</TabsTrigger>
              <TabsTrigger value="bid">Bid on NFTs</TabsTrigger>
            </TabsList>

            {/* Sell NFTs Tab */}
            <TabsContent value="sell" className="space-y-6">
              <div className="bg-white/5 rounded-xl p-6">
                <h2 className="text-xl font-medium mb-4">List Your NFTs for Sale</h2>
                <p className="text-gray-400 mb-6">Select an NFT from your collection to list on the marketplace.</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
                  {myNFTs.map((nft) => (
                    <div
                      key={nft.id}
                      className={`rounded-xl overflow-hidden bg-white/5 cursor-pointer transition-all ${
                        selectedNFT === nft.id ? "ring-2 ring-red-500 scale-[1.02]" : ""
                      }`}
                      onClick={() => setSelectedNFT(nft.id)}
                    >
                      <div className="aspect-square relative">
                        <Image src={nft.image || "/placeholder.svg"} alt={nft.name} fill className="object-cover" />
                      </div>
                      <div className="p-4">
                        <h3 className="font-medium">{nft.name}</h3>
                        <p className="text-sm text-gray-400 flex items-center gap-1">
                          Current Value: {nft.price}{" "}
                          <Image
                            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/SuiLogo-6MCJ2s77dJVZVw6F0OOnQrQ304TAIo.png"
                            alt="SUI"
                            width={14}
                            height={14}
                            className="inline-block"
                          />
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {selectedNFT && (
                  <div className="bg-white/5 rounded-xl p-6">
                    <h3 className="text-lg font-medium mb-4">Set Your Price</h3>
                    <div className="flex flex-col md:flex-row gap-4 items-end">
                      <div className="w-full md:w-1/3">
                        <Label htmlFor="price" className="text-sm text-gray-400 mb-2 block">
                          Listing Price (SUI)
                        </Label>
                        <Input
                          id="price"
                          type="number"
                          placeholder="Enter price"
                          value={listPrice}
                          onChange={(e) => setListPrice(e.target.value)}
                          className="bg-black/50 border-gray-700"
                        />
                      </div>
                      <Button className="bg-red-600 hover:bg-red-700 w-full md:w-auto">List for Sale</Button>
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>

            {/* Swap NFTs Tab */}
            <TabsContent value="swap" className="space-y-6">
              <div className="bg-white/5 rounded-xl p-6">
                <h2 className="text-xl font-medium mb-4">Swap NFTs</h2>
                <p className="text-gray-400 mb-6">
                  Select one of your NFTs to swap with another NFT. Pay the difference in $SIZU tokens.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Your NFT</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {myNFTs.map((nft) => (
                        <div
                          key={nft.id}
                          className={`rounded-xl overflow-hidden bg-white/5 cursor-pointer transition-all ${
                            swapNFT === nft.id ? "ring-2 ring-red-500 scale-[1.02]" : ""
                          }`}
                          onClick={() => setSwapNFT(nft.id)}
                        >
                          <div className="aspect-square relative">
                            <Image src={nft.image || "/placeholder.svg"} alt={nft.name} fill className="object-cover" />
                          </div>
                          <div className="p-4">
                            <h3 className="font-medium">{nft.name}</h3>
                            <p className="text-sm text-gray-400 flex items-center gap-1">
                              Value: {nft.price}{" "}
                              <Image
                                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/SuiLogo-6MCJ2s77dJVZVw6F0OOnQrQ304TAIo.png"
                                alt="SUI"
                                width={14}
                                height={14}
                                className="inline-block"
                              />
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-4">NFT to Swap With</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {listedNFTs.map((nft) => (
                        <div
                          key={nft.id}
                          className={`rounded-xl overflow-hidden bg-white/5 cursor-pointer transition-all ${
                            swapTarget === nft.id ? "ring-2 ring-red-500 scale-[1.02]" : ""
                          }`}
                          onClick={() => setSwapTarget(nft.id)}
                        >
                          <div className="aspect-square relative">
                            <Image src={nft.image || "/placeholder.svg"} alt={nft.name} fill className="object-cover" />
                          </div>
                          <div className="p-4">
                            <h3 className="font-medium">{nft.name}</h3>
                            <p className="text-sm text-gray-400 flex items-center gap-1">
                              Price: {nft.price}{" "}
                              <Image
                                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/SuiLogo-6MCJ2s77dJVZVw6F0OOnQrQ304TAIo.png"
                                alt="SUI"
                                width={14}
                                height={14}
                                className="inline-block"
                              />
                            </p>
                            <p className="text-xs text-gray-500 truncate">Owner: {nft.owner}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {swapNFT && swapTarget && (
                  <div className="mt-8 bg-white/5 rounded-xl p-6">
                    <h3 className="text-lg font-medium mb-4">Swap Details</h3>
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-6">
                      <div className="text-center">
                        <p className="text-sm text-gray-400 mb-2">Your NFT</p>
                        <p className="font-medium">
                          {myNFTs.find((nft) => nft.id === swapNFT)?.name} (
                          {myNFTs.find((nft) => nft.id === swapNFT)?.price} SUI)
                        </p>
                      </div>
                      <div className="text-2xl">↔️</div>
                      <div className="text-center">
                        <p className="text-sm text-gray-400 mb-2">Target NFT</p>
                        <p className="font-medium">
                          {listedNFTs.find((nft) => nft.id === swapTarget)?.name} (
                          {listedNFTs.find((nft) => nft.id === swapTarget)?.price} SUI)
                        </p>
                      </div>
                    </div>

                    <div className="bg-black/30 rounded-lg p-4 mb-6">
                      <p className="text-sm text-gray-400 mb-2">Price Difference</p>
                      <p className="font-medium text-lg">
                        {Number(listedNFTs.find((nft) => nft.id === swapTarget)?.price) -
                          Number(myNFTs.find((nft) => nft.id === swapNFT)?.price)}{" "}
                        $SIZU
                      </p>
                    </div>

                    <Button className="bg-red-600 hover:bg-red-700 w-full">Propose Swap</Button>
                  </div>
                )}
              </div>
            </TabsContent>

            {/* Bid on NFTs Tab */}
            <TabsContent value="bid" className="space-y-6">
              <div className="bg-white/5 rounded-xl p-6">
                <h2 className="text-xl font-medium mb-4">Bid on Listed NFTs</h2>
                <p className="text-gray-400 mb-6">Place bids on NFTs currently listed on the marketplace.</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
                  {listedNFTs.map((nft) => (
                    <div
                      key={nft.id}
                      className={`rounded-xl overflow-hidden bg-white/5 cursor-pointer transition-all ${
                        selectedListedNFT === nft.id ? "ring-2 ring-red-500 scale-[1.02]" : ""
                      }`}
                      onClick={() => setSelectedListedNFT(nft.id)}
                    >
                      <div className="aspect-square relative">
                        <Image src={nft.image || "/placeholder.svg"} alt={nft.name} fill className="object-cover" />
                      </div>
                      <div className="p-4">
                        <h3 className="font-medium">{nft.name}</h3>
                        <p className="text-sm text-gray-400 flex items-center gap-1">
                          Listed Price: {nft.price}{" "}
                          <Image
                            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/SuiLogo-6MCJ2s77dJVZVw6F0OOnQrQ304TAIo.png"
                            alt="SUI"
                            width={14}
                            height={14}
                            className="inline-block"
                          />
                        </p>
                        <p className="text-xs text-gray-500 truncate">Owner: {nft.owner}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {selectedListedNFT && (
                  <div className="bg-white/5 rounded-xl p-6">
                    <h3 className="text-lg font-medium mb-4">Place Your Bid</h3>
                    <div className="flex flex-col md:flex-row gap-4 items-end">
                      <div className="w-full md:w-1/3">
                        <Label htmlFor="bid" className="text-sm text-gray-400 mb-2 block">
                          Bid Amount (SUI)
                        </Label>
                        <Input
                          id="bid"
                          type="number"
                          placeholder="Enter bid amount"
                          value={bidAmount}
                          onChange={(e) => setBidAmount(e.target.value)}
                          className="bg-black/50 border-gray-700"
                        />
                      </div>
                      <Button className="bg-red-600 hover:bg-red-700 w-full md:w-auto">Place Bid</Button>
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>

      <Footer />
    </div>
  )
}


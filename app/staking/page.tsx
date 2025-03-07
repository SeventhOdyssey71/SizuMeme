"use client"

import { useState } from "react"
import Image from "next/image"
import { Header } from "@/components/Header"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Footer from "@/components/Footer"

// Sample NFT data
const myNFTs = [
  {
    id: 1,
    name: "Sizu #142",
    image: "https://pbs.twimg.com/media/GlXTCWlXMAA7HUC?format=jpg&name=900x900",
    collection: "Sizu Collection",
    rarity: "Rare",
  },
  {
    id: 2,
    name: "Sizu #287",
    image: "https://pbs.twimg.com/media/GlXjQLdXgAA7_t-?format=jpg&name=900x900",
    collection: "Sizu Collection",
    rarity: "Common",
  },
  {
    id: 3,
    name: "Axol #19",
    image: "https://pbs.twimg.com/media/GladGxVWcAEb_xZ?format=jpg&name=large",
    collection: "Axol Collection",
    rarity: "Epic",
  },
  {
    id: 4,
    name: "Kumo #76",
    image: "https://pbs.twimg.com/media/GdZXJaIWIAATE-w?format=jpg&name=medium",
    collection: "Kumo Collection",
    rarity: "Uncommon",
  },
]

// Sample staked NFTs
const stakedNFTs = [
  {
    id: 5,
    name: "Sizu #301",
    image: "https://pbs.twimg.com/media/GlXTCWlXMAA7HUC?format=jpg&name=900x900",
    collection: "Sizu Collection",
    rarity: "Legendary",
    stakedAt: new Date(Date.now() - 86400000 * 15), // 15 days ago
    duration: 30, // 30 days
    rewards: 45,
  },
  {
    id: 6,
    name: "Axol #42",
    image: "https://pbs.twimg.com/media/GladGxVWcAEb_xZ?format=jpg&name=large",
    collection: "Axol Collection",
    rarity: "Rare",
    stakedAt: new Date(Date.now() - 86400000 * 7), // 7 days ago
    duration: 14, // 14 days
    rewards: 12,
  },
]

// Staking plans
const stakingPlans = [
  { days: 7, apy: "5%" },
  { days: 14, apy: "8%" },
  { days: 30, apy: "15%" },
  { days: 90, apy: "25%" },
]

export default function StakingPage() {
  const [selectedNFTs, setSelectedNFTs] = useState<number[]>([])
  const [stakingDuration, setStakingDuration] = useState("30")

  const toggleNFTSelection = (id: number) => {
    if (selectedNFTs.includes(id)) {
      setSelectedNFTs(selectedNFTs.filter((nftId) => nftId !== id))
    } else {
      setSelectedNFTs([...selectedNFTs, id])
    }
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const calculateProgress = (stakedAt: Date, durationDays: number) => {
    const now = new Date()
    const endDate = new Date(stakedAt.getTime() + durationDays * 86400000)
    const totalDuration = endDate.getTime() - stakedAt.getTime()
    const elapsed = now.getTime() - stakedAt.getTime()

    return Math.min(100, Math.max(0, (elapsed / totalDuration) * 100))
  }

  const calculateRemainingDays = (stakedAt: Date, durationDays: number) => {
    const now = new Date()
    const endDate = new Date(stakedAt.getTime() + durationDays * 86400000)
    const remainingMs = endDate.getTime() - now.getTime()

    return Math.max(0, Math.ceil(remainingMs / 86400000))
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Radial gradient background */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,rgba(91,64,12,0.2)_0%,rgba(0,0,0,1)_100%)]" />

      {/* Content */}
      <div className="relative flex-grow">
        <Header />

        <main className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold">NFT Staking</h1>
              <p className="text-gray-400 mt-2">Stake your NFTs to earn $SIZU rewards</p>
            </div>
            <div className="mt-4 md:mt-0 bg-white/5 rounded-lg px-4 py-2 text-sm">
              <p>
                Your $SIZU Balance: <span className="font-medium">247.32</span>
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {stakingPlans.map((plan) => (
              <div key={plan.days} className="bg-white/5 rounded-xl p-6 text-center">
                <h3 className="text-xl font-medium mb-2">{plan.days} Days</h3>
                <p className="text-4xl font-bold text-red-500 mb-4">{plan.apy}</p>
                <p className="text-gray-400">Annual Percentage Yield</p>
              </div>
            ))}
          </div>

          <Tabs defaultValue="my-nfts" className="w-full">
            <TabsList className="grid grid-cols-2 mb-8">
              <TabsTrigger value="my-nfts">My NFTs</TabsTrigger>
              <TabsTrigger value="staked-nfts">Staked NFTs</TabsTrigger>
            </TabsList>

            {/* My NFTs Tab */}
            <TabsContent value="my-nfts" className="space-y-6">
              <div className="bg-white/5 rounded-xl p-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                  <h2 className="text-xl font-medium">Available NFTs for Staking</h2>
                  <div className="mt-4 md:mt-0 flex items-center gap-4">
                    <Select value={stakingDuration} onValueChange={setStakingDuration}>
                      <SelectTrigger className="w-[180px] bg-black/50 border-gray-700">
                        <SelectValue placeholder="Select Duration" />
                      </SelectTrigger>
                      <SelectContent>
                        {stakingPlans.map((plan) => (
                          <SelectItem key={plan.days} value={plan.days.toString()}>
                            {plan.days} Days ({plan.apy} APY)
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button className="bg-red-600 hover:bg-red-700" disabled={selectedNFTs.length === 0}>
                      Stake Selected ({selectedNFTs.length})
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {myNFTs.map((nft) => (
                    <div
                      key={nft.id}
                      className={`rounded-xl overflow-hidden bg-white/5 cursor-pointer transition-all ${
                        selectedNFTs.includes(nft.id) ? "ring-2 ring-red-500 scale-[1.02]" : ""
                      }`}
                      onClick={() => toggleNFTSelection(nft.id)}
                    >
                      <div className="aspect-square relative">
                        <Image src={nft.image || "/placeholder.svg"} alt={nft.name} fill className="object-cover" />
                        {selectedNFTs.includes(nft.id) && (
                          <div className="absolute top-2 right-2 bg-red-500 rounded-full w-6 h-6 flex items-center justify-center">
                            ✓
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="font-medium">{nft.name}</h3>
                        <p className="text-sm text-gray-400">{nft.collection}</p>
                        <div className="mt-2 flex items-center justify-between">
                          <span className="text-xs px-2 py-1 bg-white/10 rounded-full">{nft.rarity}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Staked NFTs Tab */}
            <TabsContent value="staked-nfts" className="space-y-6">
              <div className="bg-white/5 rounded-xl p-6">
                <h2 className="text-xl font-medium mb-6">Your Staked NFTs</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {stakedNFTs.map((nft) => (
                    <div key={nft.id} className="bg-white/5 rounded-xl overflow-hidden">
                      <div className="md:flex">
                        <div className="md:w-1/3">
                          <div className="aspect-square relative">
                            <Image src={nft.image || "/placeholder.svg"} alt={nft.name} fill className="object-cover" />
                          </div>
                        </div>
                        <div className="p-4 md:w-2/3">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 className="font-medium">{nft.name}</h3>
                              <p className="text-sm text-gray-400">{nft.collection}</p>
                            </div>
                            <span className="text-xs px-2 py-1 bg-white/10 rounded-full">{nft.rarity}</span>
                          </div>

                          <div className="space-y-4 mt-4">
                            <div>
                              <div className="flex justify-between text-sm mb-1">
                                <span>Staking Progress</span>
                                <span>{calculateRemainingDays(nft.stakedAt, nft.duration)} days left</span>
                              </div>
                              <Progress value={calculateProgress(nft.stakedAt, nft.duration)} className="h-2" />
                            </div>

                            <div className="grid grid-cols-2 gap-2 text-sm">
                              <div>
                                <p className="text-gray-400">Staked Date</p>
                                <p>{formatDate(nft.stakedAt)}</p>
                              </div>
                              <div>
                                <p className="text-gray-400">Duration</p>
                                <p>{nft.duration} Days</p>
                              </div>
                              <div>
                                <p className="text-gray-400">Rewards Earned</p>
                                <p className="text-red-400">{nft.rewards} $SIZU</p>
                              </div>
                              <div>
                                <p className="text-gray-400">Unlock Date</p>
                                <p>{formatDate(new Date(nft.stakedAt.getTime() + nft.duration * 86400000))}</p>
                              </div>
                            </div>

                            <Button
                              variant="outline"
                              className="w-full mt-2"
                              disabled={calculateRemainingDays(nft.stakedAt, nft.duration) > 0}
                            >
                              {calculateRemainingDays(nft.stakedAt, nft.duration) > 0
                                ? "Locked"
                                : "Unstake & Claim Rewards"}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {stakedNFTs.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-gray-400">You don't have any staked NFTs yet.</p>
                    <Button className="mt-4 bg-red-600 hover:bg-red-700">Stake Your First NFT</Button>
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


"use client"

import { useState } from "react"
import Image from "next/image"
import { Header } from "@/components/Header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import Footer from "@/components/Footer"

// Sample raffle data
const raffles = [
  {
    id: 1,
    name: "Sizu #301",
    image: "https://pbs.twimg.com/media/GlXTCWlXMAA7HUC?format=jpg&name=900x900",
    ticketPrice: "5",
    ticketsSold: 78,
    maxTickets: 100,
    endTime: new Date(Date.now() + 86400000), // 24 hours from now
  },
  {
    id: 2,
    name: "Azur #42",
    image: "https://pbs.twimg.com/media/GlGLpDmX0AAWbp_?format=jpg&name=large",
    ticketPrice: "3",
    ticketsSold: 45,
    maxTickets: 100,
    endTime: new Date(Date.now() + 172800000), // 48 hours from now
  },
  {
    id: 3,
    name: "Sizu #103",
    image: "https://pbs.twimg.com/media/GlWke3bWgAALk_f?format=jpg&name=large",
    ticketPrice: "2",
    ticketsSold: 92,
    maxTickets: 100,
    endTime: new Date(Date.now() + 43200000), // 12 hours from now
  },
  {
    id: 4,
    name: "Kumo #55",
    image: "https://pbs.twimg.com/media/GdZXJaIWIAATE-w?format=jpg&name=medium",
    ticketPrice: "4",
    ticketsSold: 23,
    maxTickets: 100,
    endTime: new Date(Date.now() + 259200000), // 72 hours from now
  },
]

export default function RafflePage() {
  const [ticketCounts, setTicketCounts] = useState<Record<number, number>>({})

  const handleTicketChange = (raffleId: number, count: number) => {
    setTicketCounts({
      ...ticketCounts,
      [raffleId]: Math.max(0, count),
    })
  }

  const formatTimeRemaining = (endTime: Date) => {
    const now = new Date()
    const diff = endTime.getTime() - now.getTime()

    if (diff <= 0) return "Ended"

    const hours = Math.floor(diff / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

    return `${hours}h ${minutes}m`
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
              <h1 className="text-3xl font-bold">NFT Raffles</h1>
              <p className="text-gray-400 mt-2">Buy tickets for a chance to win exclusive NFTs</p>
            </div>
            <div className="mt-4 md:mt-0 bg-white/5 rounded-lg px-4 py-2 text-sm">
              <p>
                Your Tickets: <span className="font-medium">0</span>
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {raffles.map((raffle) => (
              <div key={raffle.id} className="bg-white/5 rounded-xl overflow-hidden">
                <div className="aspect-square md:aspect-[4/3] relative">
                  <Image src={raffle.image || "/placeholder.svg"} alt={raffle.name} fill className="object-cover" />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-xl font-medium">{raffle.name}</h2>
                      <p className="text-sm text-gray-400 flex items-center gap-1">
                        Ticket Price: {raffle.ticketPrice}{" "}
                        <Image
                          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/SuiLogo-6MCJ2s77dJVZVw6F0OOnQrQ304TAIo.png"
                          alt="SUI"
                          width={14}
                          height={14}
                          className="inline-block"
                        />
                      </p>
                    </div>
                    <div className="bg-black/30 rounded-lg px-3 py-1 text-sm">
                      <span className="text-red-400">{formatTimeRemaining(raffle.endTime)}</span> left
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span>Progress</span>
                      <span>
                        {raffle.ticketsSold}/{raffle.maxTickets} tickets sold
                      </span>
                    </div>
                    <Progress value={(raffle.ticketsSold / raffle.maxTickets) * 100} className="h-2" />
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 rounded-r-none"
                        onClick={() => handleTicketChange(raffle.id, (ticketCounts[raffle.id] || 0) - 1)}
                      >
                        -
                      </Button>
                      <Input
                        type="number"
                        value={ticketCounts[raffle.id] || 0}
                        onChange={(e) => handleTicketChange(raffle.id, Number.parseInt(e.target.value) || 0)}
                        className="h-8 w-16 rounded-none text-center bg-black/50 border-gray-700"
                        min="0"
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 rounded-l-none"
                        onClick={() => handleTicketChange(raffle.id, (ticketCounts[raffle.id] || 0) + 1)}
                      >
                        +
                      </Button>
                    </div>
                    <Button className="bg-red-600 hover:bg-red-700 flex-1">
                      Buy Tickets ({((ticketCounts[raffle.id] || 0) * Number(raffle.ticketPrice)).toFixed(2)} SUI)
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-white/5 rounded-xl p-6">
            <h2 className="text-xl font-medium mb-4">Past Winners</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 px-4">NFT</th>
                    <th className="text-left py-3 px-4">Winner</th>
                    <th className="text-left py-3 px-4">Tickets Sold</th>
                    <th className="text-left py-3 px-4">Date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-white/5">
                    <td className="py-3 px-4">Sizu #189</td>
                    <td className="py-3 px-4 text-gray-400">0x6da9...8149</td>
                    <td className="py-3 px-4">100/100</td>
                    <td className="py-3 px-4">Mar 5, 2025</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-3 px-4">Axol #17</td>
                    <td className="py-3 px-4 text-gray-400">0xc963...0891</td>
                    <td className="py-3 px-4">100/100</td>
                    <td className="py-3 px-4">Mar 3, 2025</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">SuiHeads #42</td>
                    <td className="py-3 px-4 text-gray-400">0x8f21...7e32</td>
                    <td className="py-3 px-4">100/100</td>
                    <td className="py-3 px-4">Feb 28, 2025</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  )
}


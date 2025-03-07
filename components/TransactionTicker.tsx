"use client"

import { useRef, useEffect } from "react"
import Image from "next/image"

interface Transaction {
  id: string
  type: "Sold" | "Bought"
  amount: string
  currency: string
  address: string
  avatar: string
}

const transactions: Transaction[] = [
  {
    id: "1",
    type: "Sold",
    amount: "100,000,000",
    currency: "$Flepe",
    address: "0x6da9...8149",
    avatar: "/placeholder.svg?height=24&width=24",
  },
  {
    id: "2",
    type: "Sold",
    amount: "316,776.19",
    currency: "$DOGE",
    address: "0xc963...0891",
    avatar: "/placeholder.svg?height=24&width=24",
  },
  {
    id: "3",
    type: "Bought",
    amount: "491,166.67",
    currency: "$GOOSE",
    address: "0xc963...0891",
    avatar: "/placeholder.svg?height=24&width=24",
  },
  // Add more transactions as needed
]

export function TransactionTicker() {
  const tickerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ticker = tickerRef.current
    if (!ticker) return

    let scrollInterval: NodeJS.Timeout

    const startScroll = () => {
      scrollInterval = setInterval(() => {
        if (ticker.scrollLeft >= ticker.scrollWidth - ticker.clientWidth) {
          ticker.scrollLeft = 0
        } else {
          ticker.scrollLeft += 1
        }
      }, 30)
    }

    const stopScroll = () => {
      clearInterval(scrollInterval)
    }

    startScroll()

    ticker.addEventListener("mouseenter", stopScroll)
    ticker.addEventListener("mouseleave", startScroll)

    return () => {
      stopScroll()
      ticker.removeEventListener("mouseenter", stopScroll)
      ticker.removeEventListener("mouseleave", startScroll)
    }
  }, [])

  return (
    <div className="w-full bg-black/40 backdrop-blur-sm border-b border-white/5">
      <div
        ref={tickerRef}
        className="flex gap-8 py-2 overflow-x-hidden whitespace-nowrap scrollbar-hide"
        style={{ scrollBehavior: "smooth" }}
      >
        {/* Duplicate transactions for continuous scroll */}
        {[...transactions, ...transactions, ...transactions].map((tx, i) => (
          <div key={`${tx.id}-${i}`} className="flex items-center gap-2 text-sm">
            <div className="w-6 h-6 rounded-full overflow-hidden">
              <Image
                src={tx.avatar || "/placeholder.svg"}
                alt="Avatar"
                width={24}
                height={24}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="font-mono text-gray-400">{tx.address}</span>
            <span className={tx.type === "Sold" ? "text-red-400" : "text-green-400"}>{tx.type}</span>
            <span className="text-white">{tx.amount}</span>
            <span className="text-gray-400">{tx.currency}</span>
          </div>
        ))}
      </div>
    </div>
  )
}


"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useState } from "react"

interface CollectionNFTCardProps {
  number: number
  price: string
  color: string
}

export function CollectionNFTCard({ number, price, color }: CollectionNFTCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="group rounded-xl overflow-hidden bg-white/5"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`aspect-square ${color} relative`}>
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_40%,rgba(255,255,255,0.1)_60%)]" />
        <Image
          src="https://pbs.twimg.com/media/GkjA3ekWEAAC37B?format=jpg&name=large"
          alt={`Sizu #${number}`}
          fill
          className="object-cover mix-blend-overlay"
        />
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <h3 className="font-medium">Sizu Collection #{number}</h3>
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Checkmark-1muoqNhe1DRmsGaKUe7zKHaSN9olMP.png"
            alt="Verified"
            width={16}
            height={16}
          />
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-400 flex items-center gap-1">
            Floor Price: {price}{" "}
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/SuiLogo-6MCJ2s77dJVZVw6F0OOnQrQ304TAIo.png"
              alt="SUI"
              width={14}
              height={14}
              className="inline-block"
            />
          </p>
        </div>
        <div className={`mt-3 transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`}>
          <Button className="w-full bg-red-600 hover:bg-red-700">Buy now</Button>
        </div>
      </div>
    </div>
  )
}


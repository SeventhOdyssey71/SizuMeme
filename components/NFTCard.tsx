"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"

interface NFTCardProps {
  image: string
  title: string
  verified: boolean
  floorPrice: string
  collectionId?: string
  large?: boolean
}

export function NFTCard({ image, title, verified, floorPrice, collectionId, large = false }: NFTCardProps) {
  const router = useRouter()
  const id = collectionId || title.toLowerCase().replace(/\s+/g, "-")

  return (
    <div
      className={`relative group ${large ? "w-[500px]" : "w-[300px]"} flex-shrink-0 cursor-pointer`}
      onClick={() => router.push(`/collection/${id}`)}
    >
      <div className={`${large ? "aspect-[3/2]" : "aspect-square"} rounded-xl overflow-hidden bg-black/20`}>
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          width={large ? 500 : 300}
          height={large ? 333 : 300}
          className="object-cover w-full h-full transition-transform group-hover:scale-105"
        />
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 via-black/60 to-transparent">
        <div className="flex items-center gap-2">
          <h3 className="font-medium text-sm">{title}</h3>
          {verified && (
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Checkmark-1muoqNhe1DRmsGaKUe7zKHaSN9olMP.png"
              alt="Verified"
              width={16}
              height={16}
              className="inline-block"
            />
          )}
        </div>
        <p className="text-sm text-gray-400 flex items-center gap-1">
          Floor Price: {floorPrice}{" "}
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
  )
}


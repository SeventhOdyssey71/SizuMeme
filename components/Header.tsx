"use client"

import Image from "next/image"
import Link from "next/link"
import { Search, Menu } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems = [
    { name: "$SIZU", href: "https://app.cetus.zone/swap/?from=0xa7b184cdd17cc2753b9aa2d3c1a4fcb1ae7e2fd8670ee42180369343bdac9c08::sizu::SIZU&to=0x2::sui::SUI" },
    { name: "Trade NFTs", href: "/trade" },
    { name: "Raffle", href: "/raffle" },
    { name: "Mint", href: "/mint" },
    { name: "Staking", href: "/staking" },
  ]

  return (
    <header className="flex flex-wrap items-center justify-between px-4 py-3 bg-black/40 backdrop-blur-sm border-b border-white/5">
      <div className="flex items-center">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="https://pbs.twimg.com/profile_images/1873961061159755776/g9DigXps_400x400.jpg"
            alt="SizuStore"
            width={32}
            height={32}
            className="rounded-full"
          />
          <span className="text-xl font-bold text-white">SizuStore</span>
        </Link>
      </div>

      <div className="flex md:hidden">
        <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <Menu className="h-6 w-6 text-white" />
        </Button>
      </div>

      <nav
        className={`${isMenuOpen ? "flex" : "hidden"} md:flex flex-col md:flex-row items-center gap-6 w-full md:w-auto mt-4 md:mt-0`}
      >
        {navItems.map((item) => (
          <Link key={item.name} href={item.href} className="text-white hover:text-primary/90 transition-colors">
            {item.name}
          </Link>
        ))}
      </nav>

      <div className={`${isMenuOpen ? "flex" : "hidden"} md:flex items-center gap-4 w-full md:w-auto mt-4 md:mt-0`}>
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="search"
            placeholder="Search NFT Collections"
            className="w-full pl-10 bg-black/20 border-gray-800 text-gray-300 focus:ring-primary"
          />
        </div>
        <Button className="w-full md:w-auto mt-4 md:mt-0 bg-red-600 hover:bg-red-700 text-white text-sm px-6">
          Connect Wallet
        </Button>

        
      </div>
    </header>
  )
}


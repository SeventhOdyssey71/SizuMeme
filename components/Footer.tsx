import { Facebook, Twitter, Instagram, Youtube, Twitch } from "lucide-react"
import Link from "next/link"

const Footer = () => {
  return (
    <footer className="bg-black/80 backdrop-blur-sm border-t border-white/10 text-white/80 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-lg font-semibold mb-4">SizuStore</h3>
            <p className="text-sm mb-4">The premier marketplace for Sizu NFTs</p>
            <div className="flex space-x-4">
              <Link href="#" className="hover:text-white">
                <Twitter size={20} />
              </Link>
              <Link href="#" className="hover:text-white">
                <Instagram size={20} />
              </Link>
              <Link href="#" className="hover:text-white">
                <Facebook size={20} />
              </Link>
              <Link href="#" className="hover:text-white">
                <Youtube size={20} />
              </Link>
              <Link href="#" className="hover:text-white">
                <Twitch size={20} />
              </Link>
            </div>
          </div>
          <div>
            <h4 className="font-medium mb-4">Marketplace</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="hover:text-white">
                  All NFTs
                </Link>
              </li>
              <Link href="#" className="hover:text-white">
                Art
              </Link>
              <Link href="#" className="hover:text-white">
                Gaming
              </Link>
              <Link href="#" className="hover:text-white">
                Music
              </Link>
              <Link href="#" className="hover:text-white">
                Photography
              </Link>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-4">My Account</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="hover:text-white">
                  Profile
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Favorites
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Watchlist
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  My Collections
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Settings
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="hover:text-white">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Platform Status
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Partners
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Newsletter
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="hover:text-white">
                  About
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Ventures
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Grants
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-white/10 text-sm text-center">
          <p>&copy; 2025 SizuStore, Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer


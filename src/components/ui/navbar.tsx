import React from 'react'
import { Button } from './button'
import { IconCube } from '@tabler/icons-react'
import Link from 'next/link'
import { readFileSync, readdirSync } from 'fs'
import path from 'path'
import matter from 'gray-matter'

// const links = [
//   { id: '1', href: '/#about', label: 'About' },
//   { id: '2', href: '/#process', label: 'Our Process' },
//   { id: '3', href: '/#deals-in', label: 'We Deal In' },
// ]

const Navbar = () => {
  const contentFolderPath = path.join(process.cwd(), '/content')
  const allfiles = readdirSync(contentFolderPath)

  return (
    <header
      id="page-header"
      className="z-50 sticky top-0 flex flex-none items-center py-4 bg-accent-foreground"
    >
      {/* Main Header Content */}
      <div className="container mx-auto flex flex-col space-y-4 px-4 text-center md:flex-row md:items-center md:justify-between md:space-y-0 lg:px-8">
        <div>
          <Link
            href="/"
            className="inline-flex items-center space-x-2 text-lg font-bold tracking-wide text-white"
          >
            <IconCube className="size-7 text-accent" />
            <span>
              Titan Alloys <span className="text-amber-400">LLC</span>
            </span>
          </Link>
        </div>
        <div className="flex flex-col space-y-4 text-center md:flex-row md:items-center md:justify-between md:space-x-10 md:space-y-0">
          <nav className="space-x-3 md:space-x-6 hidden lg:block">
            {/* {links.map(({ id, href, label }) => (
              <Link
                className="text-sm font-semibold text-white hover:text-accent"
                key={id}
                href={href}
              >
                {label}
              </Link>
            ))} */}
            {
              allfiles.map((metalSlug, index) => {
                const filePath = path.join(contentFolderPath, metalSlug)
                const pageContent = matter(readFileSync(filePath, 'utf-8'))
                return (
                  <Link
                    key={index}
                    className="text-sm font-semibold text-white hover:text-accent"
                    href={`/deals-in/${metalSlug.split('.mdx')[0]}`}
                  >
                    {pageContent.data.title}

                  </Link>
                )
              })
            }

          </nav>
          <Link href="/scrap-pricing">
            <Button variant="secondary">Get a Quote</Button>
          </Link>
        </div>
      </div>
      {/* END Main Header Content */}
    </header>
  )
}

export default Navbar

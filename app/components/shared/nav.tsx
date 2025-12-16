import CustomLink from '../ui/CustomLink'
import { ThemeSwitch } from './theme-switch'
import { socialLinks } from 'app/lib/config'

const navItems = {
  '/': { name: 'Home' },
  '/blog': { name: 'Blog' }
}

export function Navbar() {
  return (
    <nav className='fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-[624px] px-2  backdrop-blur-md bg-primary-light/80 dark:bg-primary-dark/80 shadow-sm rounded-lg'>
      <div className='flex flex-col md:flex-row gap-4 md:items-center justify-between py-3 p-1.5'>
        <div className='flex flex-row gap-3 items-center'>
          {Object.entries(navItems).map(([path, { name }]) => (
            <CustomLink
              key={path}
              href={path}
              className='transition-all hover:text-secondary-dark dark:hover:text-secondary-light flex items-center relative'
            >
              {name}
            </CustomLink>
          ))}
          <CustomLink
            className='transition-all hover:text-secondary-dark dark:hover:text-secondary-light flex items-center relative'
            href={socialLinks.github}
          >
            Github
          </CustomLink>

          <div className='flex md:hidden'>
            <ThemeSwitch />
          </div>
        </div>

        {/* Right side (desktop only) */}
        <div className='hidden md:flex flex-row gap-4 items-center'>
          <ThemeSwitch />
        </div>
      </div>
    </nav>
  )
}

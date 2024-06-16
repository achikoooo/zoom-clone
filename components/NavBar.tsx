import Image from 'next/image'
import Link from 'next/link'

import MobileNav from './MobileNav'

const NavBar = () => {
  return (
    <nav className='flex flex-between fixed z-50 w-full bg-dark-1 px-6 py-4 lg:px-10'>
      <Link className='flex items-center gap-1' href='/'>
        <Image
          className='max-sm:size-10'
          src='/icons/logo.svg'
          width={32}
          height={32}
          alt='Yoom logo'
        />
        <p className='text-[26px] font-extrabold text-white max-sm:hidden'>
          Yoom
        </p>
      </Link>
      <div className='flex flex-between gap-5'>
        {/*TODO:Clerk -User Managment */}
        <MobileNav />
      </div>
    </nav>
  )
}

export default NavBar


import Image from 'next/image';
import Link from 'next/link';
import { SearchHero } from '@/components/search-hero';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 md:p-24 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Ikatan Alumni Kimia Unpad
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <Link
            href="/login"
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          >
            <h2 className={`mb-3 text-2xl font-semibold`}>
              Login{' '}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </h2>
            <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
              Access for verified Alumni & Admins
            </p>
          </Link>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center w-full flex-1 px-4 text-center mt-10 md:mt-0">
        <div className="relative flex place-items-center mb-8">
          {/* Logo placeholder - using text for now or generate one? */}
          <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500 pb-2">
            IAKU Gravity
          </h1>
        </div>

        <p className="mb-8 text-lg text-gray-600 dark:text-gray-300 max-w-2xl">
          Database Alumni Kimia Universitas Padjadjaran. Find your friends, connect, and grow together.
        </p>

        <SearchHero />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl opacity-50 hover:opacity-100 transition-opacity">
          <Link href="/stats" className="p-6 border rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition">
            <h3 className="text-xl font-bold mb-2">Statistics</h3>
            <p>View distribution by sector, year, and region.</p>
          </Link>
          {/* Other links */}
        </div>

      </div>
    </main>
  );
}

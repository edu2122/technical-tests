import { ModeToggle } from '@/components/moddle-toggle'
export function Header() {
  const dictionaryHeader = {
    en: {
      home: 'Home',
      categories: 'Categories',
      about: 'About'
    }
  } as const
  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-[1700px] flex items-center justify-between py-4 px-16">
        <a
          href="https://flowbite.com/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8"
            alt="Flowbite Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Book App
          </span>
        </a>

        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium items-center flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            {
              Object.keys(dictionaryHeader.en).map((key) => (
                <li key={key}>
                  <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100">
                    {dictionaryHeader.en[key as keyof typeof dictionaryHeader.en]}
                  </a>
                </li>
              ))
            }
            <li>
              <ModeToggle />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

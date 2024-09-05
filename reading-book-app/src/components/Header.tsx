import { ModeToggle } from '@/components/moddle-toggle'
export function Header() {
  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-[1700px] flex items-center justify-between py-4 px-16">
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium items-center flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <ModeToggle />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

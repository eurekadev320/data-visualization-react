import { useRouter } from "next/router";
import { usePathname } from "next/navigation";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import classNames from "classnames";
import { useState } from "react";

const navigation = [
  { name: "Dashboard", href: "/" },
  { name: "Store", href: "/store" },
];

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const handleClick = (href: string) => {
    router.push(href);
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex">
            <div className="flex flex-shrink-0 items-center">
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                className="text-gray-100"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="100%" height="100%" rx="16" fill="currentColor" />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
                  fill="black"
                />
              </svg>
            </div>
            <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleClick(item.href)}
                  className={classNames(
                    pathname === item.href
                      ? "border-slate-500 text-gray-900"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                    "inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                  )}
                  aria-current={pathname === item.href ? "page" : undefined}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center"></div>
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={() => setOpen(!open)}
              className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
            >
              <span className="sr-only">Open main menu</span>
              {open ? (
                <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

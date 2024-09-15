import { useRouter } from "next/router";
import DarkModeToggle from "./DarkModeToggle";
import { ChevronLeftIcon } from "@heroicons/react/24/outline"; // Import ChevronLeftIcon

const Header = ({ title, back }: { title: string; back: boolean }) => {
  const router = useRouter();

  return (
    <header
      className={` p-4 dark:bg-gray-800 dark:text-white bg-gray-800 text-white`}>
      <div className="container mx-auto flex items-center justify-between">
        {back ? (
          <button
            onClick={() => router.back()}
            className="flex items-center space-x-2 hover:text-gray-300 focus:outline-none">
            <ChevronLeftIcon className="h-6 w-6" />
            <h1 className="text-md font-bold">{title}</h1>
          </button>
        ) : (
          <h1 className="text-md font-bold">{title}</h1>
        )}
        <DarkModeToggle />
      </div>
    </header>
  );
};

export default Header;

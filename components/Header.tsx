import { useState } from "react";
import { useRouter } from "next/router";
import DarkModeToggle from "./DarkModeToggle";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";

const Header = ({
  title,
  back,
}: {
  title: string;
  back: boolean;
  searchQuery?: string;
  setSearchQuery?: (params?: any) => void;
}) => {
  const router = useRouter();
  const [showSearch, setShowSearch] = useState(false);

  return (
    <header className="p-4 dark:bg-indigo-800 rounded-t-2xl dark:text-white bg-indigo-800 text-white">
      <div className="container mx-auto flex items-center justify-between">
        {/* Back button */}
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

        {/* Dark Mode Toggle */}
        <DarkModeToggle />
      </div>
    </header>
  );
};

export default Header;

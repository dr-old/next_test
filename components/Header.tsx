import DarkModeToggle from "./DarkModeToggle";

const Header = () => {
  return (
    <header
      className={`flex items-center justify-between p-4 dark:bg-gray-800 dark:text-white bg-gray-800 text-white`}>
      <h1 className="text-2xl font-bold">Product List</h1>
      <DarkModeToggle />
    </header>
  );
};

export default Header;

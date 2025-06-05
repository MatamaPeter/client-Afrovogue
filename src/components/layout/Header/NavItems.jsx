import { Link } from "react-router-dom";

const NavItems = ({ items }) => {
  return (
    <>
      {items.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-all duration-200 font-medium text-sm uppercase tracking-wider px-4 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
        >
          {item.name}
        </Link>
      ))}
    </>
  );
};

export default NavItems;
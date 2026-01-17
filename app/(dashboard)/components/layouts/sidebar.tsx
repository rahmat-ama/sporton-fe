"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FiBox,
  FiCreditCard,
  FiLayers,
  FiLogOut,
  FiShoppingCart,
} from "react-icons/fi";

const Sidebar = () => {
  const pathName = usePathname();

  const menuItems = [
    {
      name: "Products",
      icon: FiBox,
      link: "/admin/products",
    },
    {
      name: "Categories",
      icon: FiLayers,
      link: "/admin/categories",
    },
    {
      name: "Transactions",
      icon: FiShoppingCart,
      link: "/admin/transactions",
    },
    {
      name: "Bank Information",
      icon: FiCreditCard,
      link: "/admin/bank-info",
    },
  ];
  return (
    <aside className="w-80 min-h-screen bg-white border-r border-gray-100 flex flex-col fixed left-0 top-0">
      <div className="py-8.25 px-13 border-b border-gray-200">
        <Image
          src={"/images/logo-admin.svg"}
          alt="logo admin"
          width={215}
          height={36}
        />
      </div>
      <div className="flex flex-col gap-2 mt-5 p-5.5">
        {menuItems.map((menu, index) => {
          const isActive = menu.link === pathName;

          return (
            <Link
              href={menu.link}
              key={index}
              className={`flex gap-3 items-center py-3 px-4.5 rounded-lg font-medium duration-300 ${
                isActive ? "bg-primary-light text-primary" : "hover:bg-gray-100"
              }`}
            >
              <menu.icon size={24} />
              <span>{menu.name}</span>
            </Link>
          );
        })}
      </div>
      <Link
        href={"#"}
        className="flex gap-3 font-medium py-3 px-4.5 mx-5.5 hover:bg-gray-100 duration-300 rounded-lg mt-auto mb-6"
      >
        <FiLogOut size={24} /> Log Out
      </Link>
    </aside>
  );
};

export default Sidebar;

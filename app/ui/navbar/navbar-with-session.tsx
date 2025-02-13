"use client";

import { Bars3Icon, XMarkIcon, PowerIcon } from "@heroicons/react/24/solid"; // Importing the Power Icon
import Image from "next/image";
import { useState } from "react";
import LocaleSwitcher from "../locale-switcher";
import LotteryButton from "../lottery-button";
import OrdersToggle from "../orders/orders-toggle";
import { signOut } from "next-auth/react";
import { useTranslations } from "next-intl";

export default function NavbarWithSession() {
    const t = useTranslations("Navbar");
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = () => {
        signOut({ redirect: true, callbackUrl: "/" });
    };

    return (
        <nav className="fixed top-0 right-0 w-full bg-white shadow-md z-50 px-6 py-3 flex items-center justify-between">
            <button
                className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 text-gray-700"
                onClick={handleLogout}
            >
                <PowerIcon className="w-6 h-6" />
            </button>

            {/* Menú en móviles */}
            <div className="md:hidden">
                <OrdersToggle />
                <div className={`absolute top-20 left-0 w-full bg-white shadow-md flex flex-col items-center gap-4 py-4 transition-all duration-300 ${isOpen ? "block" : "hidden"}`}>
                    <LotteryButton />
                    <LocaleSwitcher />
                    <button
                        className="px-4 py-2 text-white bg-red-500 rounded-full mt-4"
                        onClick={handleLogout}
                    >
                        {t("logout")}
                    </button>
                </div>
            </div>

            {/* Menú en escritorio */}
            <div className="hidden md:flex flex-1 items-center gap-6">
                <Image src="/restaurant.svg" alt="Logo Restaurant" width={50} height={50} />
                <OrdersToggle />
                <LotteryButton />
                <LocaleSwitcher />
            </div>

            {/* Botón hamburguesa */}
            <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <XMarkIcon className="w-8 h-8 text-gray-700" /> : <Bars3Icon className="w-8 h-8 text-gray-700" />}
            </button>
        </nav>
    );
}

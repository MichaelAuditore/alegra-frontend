"use client";

import Image from "next/image";
import LocaleSwitcher from "../locale-switcher";

export default function NavbarWithoutSession() {
    return (
        <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50 px-6 py-3 flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
                <Image src="/restaurant.svg" alt="Logo Restaurant" width={50} height={50} />
            </div>

            {/* Botones separados */}
            <div className="flex items-center gap-4">
                <LocaleSwitcher />
            </div>
        </nav>
    );
}

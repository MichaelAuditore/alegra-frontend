"use client";

import { useState, useRef } from "react";
import OrdersList from "./orders-list";
import { useTranslations } from "next-intl";

export default function OrdersToggle() {
    const t = useTranslations("Orders");
    const [isOpen, setIsOpen] = useState(false);
    const toggleRef = useRef<HTMLButtonElement>(null);

    return (
        <div className="relative">
            <button
                ref={toggleRef}
                onClick={() => setIsOpen((prev) => !prev)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md"
            >
                {!isOpen ? t("showReceivedOrders") : t("hideReceivedOrders")}
            </button>

            {isOpen && (
                <div
                    className="fixed top-18 left-0 w-80 max-h-[80vh] overflow-auto bg-white shadow-lg rounded-lg p-4 border border-gray-200 z-50"
                >
                    <OrdersList />
                </div>
            )}
        </div>
    );
}

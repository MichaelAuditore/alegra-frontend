"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Fragment, useState } from "react";
import { createPortal } from "react-dom";
import { createOrder } from "../lib/orders";

export default function LotteryButton() {
    const [showNotification, setShowNotification] = useState(false);
    const t = useTranslations("Lottery");

    async function handleClick() {
        await createOrder()
            .then(() => setShowNotification(true))
            .finally(() => setTimeout(() => setShowNotification(false), 1000));
    }

    return (
        <Fragment>
            <motion.button
                whileTap={{ scale: 0.85 }}
                className="bg-red-600 text-white text-xl font-bold px-6 rounded-full shadow-lg border-4 border-red-800
                           hover:bg-red-700 active:bg-red-800 transition-all"
                onClick={handleClick}
            >
                🎟️ {t("buttonName")}
            </motion.button>

            {/* Notificación */}
            {showNotification &&
                createPortal(
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="fixed inset-0 flex justify-center items-center z-50"
                    >
                        <div className="bg-white text-red-700 text-lg font-bold px-6 py-3 rounded-lg shadow-lg border-2 border-red-500">
                            📢 {t("orderReceived")}
                        </div>
                    </motion.div>,
                    document.body
                )}
        </Fragment>
    );
}

"use client";

import { OrderStatus } from "@/app/lib/definitions";
import {
    CheckCircleIcon,
    ClockIcon,
    FireIcon,
    QuestionMarkCircleIcon
} from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";

interface OrderCardProps {
    order: OrderStatus;
}

export default function OrderCard({ order }: OrderCardProps) {
    const { progress_status, recipe } = order;
    const t = useTranslations("OrdersStatus");

    return (
        <div className="bg-white p-4 rounded-lg shadow-lg w-full sm:w-72 max-w-sm mx-auto">
            <div className="relative flex flex-col items-center p-4 border rounded-lg shadow-lg gap-3">
                {/* Icono según el estado */}
                {progress_status === "pending" && (
                    <ClockIcon className="w-8 h-8 text-yellow-500" />
                )}
                {progress_status === "cooking" && (
                    <FireIcon className="w-8 h-8 text-red-500 animate-bounce" />
                )}
                {progress_status === "ready" && (
                    <CheckCircleIcon className="w-8 h-8 text-green-500" />
                )}
                {progress_status === "unknown" && (
                    <QuestionMarkCircleIcon className="w-8 h-8 text-gray-500" />
                )}

                {/* Imagen de la receta con animaciones */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="w-32 h-32 flex justify-center items-center"
                >
                    <Image
                        src={recipe.image_url}
                        alt={recipe.key_name}
                        width={128}
                        height={128}
                        className="rounded-lg object-cover"
                        priority={true}
                    />
                </motion.div>

                {/* Información de la receta */}
                <p className="mt-2 text-gray-700 font-semibold text-center">
                    {t(`recipes.${recipe.key_name}`)}
                </p>
                <p className="text-sm text-gray-500 text-center">
                    {t(`descriptions.${recipe.description}`)}
                </p>
            </div>
        </div>
    );
}

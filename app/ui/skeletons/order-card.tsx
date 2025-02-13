'use client';

import { motion } from "framer-motion";

export function OrderItemSkeleton() {
    return (
        <div className="p-4 bg-white rounded-lg shadow-md animate-pulse">
            <div className="h-6 bg-gray-300 rounded w-2/3 mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-5/6"></div>
        </div>
    );
}

export function OrderCardSkeleton() {
    return (
        <div className="bg-white p-4 rounded-lg shadow-lg w-full sm:w-72 max-w-sm mx-auto">
            <div className="relative flex flex-col items-center p-4 border rounded-lg shadow-lg gap-3">
                {/* Icono de carga */}
                <div className="w-8 h-8 bg-gray-300 rounded-full animate-pulse" />

                {/* Imagen de carga */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="w-32 h-32 bg-gray-300 rounded-lg animate-pulse"
                />

                {/* Texto de carga */}
                <div className="mt-2 w-3/4 h-4 bg-gray-300 rounded animate-pulse" />
                <div className="w-2/3 h-3 bg-gray-200 rounded animate-pulse" />
            </div>
        </div>
    );
}

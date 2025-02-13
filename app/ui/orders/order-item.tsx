"use client";

import { Order } from "@/app/lib/definitions";
import Image from "next/image";
import { useState } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function OrderItem({ order, t }: { order: Order; t: any }) {
    const [imageSrc, setImageSrc] = useState(`/${order.key_name}.svg`);

    return (
        <li className="p-3 border rounded-lg shadow flex items-center gap-3">
            <Image
                src={imageSrc}
                alt={order.key_name}
                width={40}
                height={40}
                className="w-10 h-10"
                priority={true}
                onError={() => {
                    setImageSrc((prev) =>
                        prev.includes(".svg") ? `/${order.key_name}.webp` :
                            prev.includes(".webp") ? `/${order.key_name}.png` :
                                "/fallback-image.png"
                    );
                }}
            />
            <div>
                <h3 className="font-semibold text-md">🛒 {t(order.key_name)}</h3>
                <p className="text-gray-700 text-sm">🆔 {order.id.slice(28)}</p>
                <ul className="mt-1 text-gray-600 text-sm">
                    {Object.entries(order.ingredients).map(([ingredient, quantity]) => (
                        <li key={ingredient}>
                            <Image
                                src={`/${ingredient}.svg`}
                                alt={order.key_name}
                                width={40}
                                height={40}
                                className="w-4 h-4"
                                onError={() => {
                                    setImageSrc((prev) =>
                                        prev.includes(".svg") ? `/${order.key_name}.webp` :
                                            prev.includes(".webp") ? `/${order.key_name}.png` :
                                                "/fallback-image.png"
                                    );
                                }}
                            /> {t(`ingredients.${ingredient}`)}: <span className="font-semibold">{quantity}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </li>
    );
}

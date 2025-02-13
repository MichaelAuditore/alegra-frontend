"use client";

import { Recipe } from "@/app/lib/definitions";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";

interface RecipeMenuProps {
    recipes: Recipe[];
}

export default function RecipeMenu({ recipes }: RecipeMenuProps) {
    const t = useTranslations("Recipes");

    return (
        <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 right-0 lg:h-screen pt-[90px] h-full w-72 bg-white shadow-lg p-4 overflow-y-auto z-30"
        >
            <div className="flex justify-between items-center border-b pb-2">
                <h2 className="text-lg font-semibold">{t("title")}</h2>
            </div>

            {/* Lista de recetas */}
            <ul className="mt-4 space-y-4">
                {recipes.map((recipe) => (
                    <li key={recipe.id} className="py-4 flex items-center space-x-4">
                        <Image
                            className="size-12 rounded-full"
                            src={recipe.image_url}
                            width={48}
                            height={48}
                            alt={recipe.description}
                            priority={true}
                        />
                        <div>
                            <h3 className="text-sm font-medium text-gray-900">
                                {t(recipe.key_name)}
                            </h3>
                            <h4 className="text-xs font-semibold text-gray-600 mt-1">
                                {t("ingredients.title")}
                            </h4>
                            <ul className="text-xs text-gray-500">
                                {Object.entries(recipe.ingredients).map(([ingredient, quantity], index) => (
                                    <li key={index}>
                                        {t(`ingredients.${ingredient}`)}: {quantity} {t('portion')}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </li>
                ))}
            </ul>
        </motion.div>
    );
}
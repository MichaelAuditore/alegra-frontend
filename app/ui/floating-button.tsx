"use client";

import { Fragment, useState } from "react";
import { BookOpenIcon } from "@heroicons/react/24/solid";
import RecipeMenu from "./recipeMenu";
import { Recipe } from "../lib/definitions";

interface FloatingButtonProps {
    recipes: Recipe[];
}

export default function FloatingButton({ recipes }: FloatingButtonProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Fragment>
            {/* Botón flotante */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="z-40 fixed bottom-6 right-6 bg-orange-500 text-white p-4 rounded-full shadow-lg hover:bg-orange-600 transition"
            >
                <BookOpenIcon className="h-8 w-8" />
            </button>

            {isOpen && <RecipeMenu recipes={recipes} />}
        </Fragment>
    );
}

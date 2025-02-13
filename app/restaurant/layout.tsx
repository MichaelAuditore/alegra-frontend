import { Metadata } from "next";
import { getMenuRecipes } from "../lib/menu";
import FloatingButton from "../ui/floating-button";

export const metadata: Metadata = {
    title: "Restaurant - Dashboard",
    description: "Dashboard"
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const recipes = await getMenuRecipes();

    return (
        <div>
            <FloatingButton recipes={recipes} />
            {children}
        </div >
    );
}

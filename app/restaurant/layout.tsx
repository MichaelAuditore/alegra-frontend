import { getMenuRecipes } from "@/app/lib/menu";
import FloatingButton from "@/app/ui/floating-button";
import { Metadata } from "next";

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

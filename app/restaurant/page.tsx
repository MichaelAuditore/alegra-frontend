import IngredientList from "@/app/ui/ingredients/ingredient-list";
import OrdersListByStatus from "@/app/ui/orders/orders-list-by-status";
import PurchasesTable from "@/app/ui/purchases/purchases-list";
import { authOptions } from "@/auth.config";
import { getUserLocale } from "@/services/locale";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Page() {
    const session = await getServerSession(authOptions);
    const locale = await getUserLocale();

    if (!session) {
        redirect("/");
    }

    return (
        <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6 auto-rows-auto">
            {/* Órdenes distribuidas en diferentes estados */}
            <OrdersListByStatus status="unknown" />
            <OrdersListByStatus status="pending" />
            <OrdersListByStatus status="cooking" />
            <OrdersListByStatus status="ready" />

            {/* Listado de ingredientes y compras expandiéndose en pantallas grandes */}
            <div className="lg:col-span-4 md:col-span-2">
                <IngredientList />
            </div>
            <div className="lg:col-span-4 md:col-span-3">
                <PurchasesTable locale={locale} />
            </div>
        </main>
    );
}

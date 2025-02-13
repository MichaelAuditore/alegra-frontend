import { authOptions } from "@/auth.config";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import IngredientList from "../ui/ingredients/ingredient-list";
import OrdersListByStatus from "../ui/orders/orders-list-by-status";
import PurchasesTable from "../ui/purchases/purchases-list";

export default async function Page() {
    const session = await getServerSession(authOptions);

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
                <PurchasesTable />
            </div>
        </main>
    );
}

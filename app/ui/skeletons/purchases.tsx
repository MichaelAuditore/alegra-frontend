export default function PurchasesSkeleton() {
    return (
        <div className="col-span-2 bg-white shadow-lg rounded-lg p-4 overflow-auto">
            <div className="col-span-1 md:col-span-2">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">📋 Compras al Mercado</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
                        <thead>
                            <tr className="bg-gray-100 text-gray-700">
                                <th className="px-4 py-2 border">Producto</th>
                                <th className="px-4 py-2 border">Cantidad Comprada</th>
                                <th className="px-4 py-2 border">Fecha de Compra</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.from({ length: 5 }).map((_, index) => (
                                <tr key={index} className="text-center border-t animate-pulse">
                                    <td className="px-4 py-2 border">
                                        <div className="h-4 bg-gray-300 rounded w-24 mx-auto"></div>
                                    </td>
                                    <td className="px-4 py-2 border">
                                        <div className="h-4 bg-gray-300 rounded w-16 mx-auto"></div>
                                    </td>
                                    <td className="px-4 py-2 border">
                                        <div className="h-4 bg-gray-300 rounded w-32 mx-auto"></div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

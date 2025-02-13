export function OrderItemSkeleton() {
    return (
        <li className="p-3 border rounded-lg shadow flex items-center gap-3 animate-pulse">
            {/* Image Placeholder */}
            <div className="w-10 h-10 bg-gray-300 rounded-full"></div>

            {/* Text Content */}
            <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-300 rounded w-3/4"></div> {/* Title */}
                <div className="h-3 bg-gray-300 rounded w-1/2"></div> {/* Order ID */}

                {/* Ingredients List */}
                <ul className="mt-1 space-y-1">
                    {Array.from({ length: 3 }).map((_, index) => (
                        <li key={index} className="h-3 bg-gray-300 rounded w-2/3"></li>
                    ))}
                </ul>
            </div>
        </li>
    );
}
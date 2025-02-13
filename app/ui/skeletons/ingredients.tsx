export function IngredientSkeleton() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6 bg-gray-100 min-h-screen flex justify-center items-center">
            {Array(3).fill(0).map((_, index) => (
                <div key={index} className="bg-white p-6 rounded-3xl shadow-xl animate-pulse">
                    <div className="flex flex-col items-center">
                        <div className="w-24 h-24 rounded-full bg-gray-300 mb-4"></div>
                        <div className="h-4 w-32 bg-gray-300 mb-2"></div>
                        <div className="h-3 w-20 bg-gray-300"></div>
                    </div>
                </div>
            ))}
        </div>
    );
} 
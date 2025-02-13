export async function fetchWithErrorHandling<T>(url: string, options?: RequestInit): Promise<T> {
    try {
        const response = await fetch(url, { cache: "no-store", ...options });

        if (!response.ok) {
            const errorText = await response.text(); // Get server error response
            throw new Error(`Error ${response.status}: ${errorText || response.statusText}`);
        }

        return response.json();
    } catch (error) {
        console.error(`Fetch Error: ${url}`, error);
        throw new Error(error instanceof Error ? error.message : "An unknown error occurred");
    }
}

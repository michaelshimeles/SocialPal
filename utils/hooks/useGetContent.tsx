import { useQuery } from "@tanstack/react-query";

async function fetchContent() {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/content`);
        const result = await response.json()

        return result
    } catch (error) {
        return error;
    }
}

export const useGetContent = () => {
    return useQuery({
        queryKey: ["get-content"],
        queryFn: () => fetchContent(),
    });
};

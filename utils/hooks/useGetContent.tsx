import { useQuery } from "@tanstack/react-query";

async function fetchContent(brandId: string) {
    try {
        const response = await fetch(`/api/content`, {
            method: "POST",
            body: JSON.stringify({
                brandId: brandId
            })
        });
        const result = await response.json()

        return result
    } catch (error) {
        return error;
    }
}

export const useGetContent = (brandId: string) => {
    return useQuery({
        queryKey: ["get-content", brandId],
        queryFn: () => fetchContent(brandId),
    });
};

import { useQuery } from "@tanstack/react-query";

async function fetchContentPillars(brandId: string) {
    try {
        const response = await fetch(`/api/brand/pillars/read`, {
            method: "POST",
            body: JSON.stringify({
                brand_id: brandId
            })
        });
        const result = await response.json()

        return result
    } catch (error) {
        return error;
    }
}

export const useGetContentPillars = (brandId: string) => {
    return useQuery({
        queryKey: ["get-content-pillars", brandId],
        queryFn: () => fetchContentPillars(brandId),
    });
};

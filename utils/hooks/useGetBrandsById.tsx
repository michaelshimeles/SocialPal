import { useQuery } from "@tanstack/react-query";

async function fetchBrandsById(brandId: string) {
    try {
        const response = await fetch(`/api/brand/read/id`, {
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

export const useGetBrandsById = (brandId: string) => {
    return useQuery({
        queryKey: ["get-brands-by-id", brandId],
        queryFn: () => fetchBrandsById(brandId),
    });
};

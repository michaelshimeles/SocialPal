import { useQuery } from "@tanstack/react-query";

async function fetchBrands() {
    try {
        const response = await fetch(`/api/brand/read`);
        const result = await response.json()

        return result
    } catch (error) {
        return error;
    }
}

export const useGetBrands = () => {
    return useQuery({
        queryKey: ["get-brands"],
        queryFn: () => fetchBrands(),
    });
};

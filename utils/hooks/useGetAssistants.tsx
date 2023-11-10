import { readAssitant } from "@/server/db/read-assistant";
import { useQuery } from "@tanstack/react-query";

async function fetchAssistants(brand_id: string) {
    try {
       const result = await readAssitant(brand_id)

       return result
    } catch (error) {
        return error;
    }
}

export const useGetAssistants = (brand_id: string) => {
    return useQuery({
        queryKey: ["get-assistants", brand_id],
        queryFn: () => fetchAssistants(brand_id),
    });
};

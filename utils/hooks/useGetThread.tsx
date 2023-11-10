import { useQuery } from "@tanstack/react-query";

async function fetchThreads(threadId: string) {
    console.log("thread", threadId)
    if (!threadId) return null

    try {
        const response = await fetch("/api/assistant/message", {
            method: "POST",
            body: JSON.stringify({
                threadId
            })
        })

        const result = await response.json()

        return result
    } catch (error) {
        return error;
    }
}

export const useGetThreads = (threadId: string) => {
    return useQuery({
        queryKey: ["get-threads", threadId],
        queryFn: () => fetchThreads(threadId),
        enabled: !!threadId, // The query will not run until userId is truthy
    });
};

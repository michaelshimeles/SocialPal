import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "../ui/button"
import { DialogClose } from "@radix-ui/react-dialog"
interface PillarCardProps {
    title: string,
    description: string,
    pillar: string,
    refetch: any,
    handlePillarInfo: any,
    setShowPillar: any
}

const PillarCard: React.FC<PillarCardProps> = ({ title, description, pillar, refetch, handlePillarInfo, setShowPillar }) => {

    const deletePillar = async () => {
        try {
            const response = await fetch("/api/brand/pillars/delete", {
                method: "POST",
                body: JSON.stringify({
                    pillar_id: pillar
                })
            })
            // refetch pillars
            refetch()
            setShowPillar(null)

            const result = await response.json()
            return result
        } catch (error) {
            return error
        }
    }

    return (
        <article className="rounded-lg border light:border-gray-100 p-4 shadow-sm transition hover:shadow-lg sm:p-6 w-[350px]">
            <div className='flex justify-between items-center w-full'>
                <span className="inline-block rounded bg-blue-600 p-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path d="M12 14l9-5-9-5-9 5 9 5z" />
                        <path
                            d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                        />
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                        />
                    </svg>
                </span>
                <Dialog>
                    <DialogTrigger>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trash-2"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /><line x1="10" x2="10" y1="11" y2="17" /><line x1="14" x2="14" y1="11" y2="17" /></svg>
                        </div>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Are you sure you want to delete?</DialogTitle>
                            <DialogDescription>
                                This will delete the content pillars you have created
                            </DialogDescription>
                        </DialogHeader>
                        <DialogClose asChild>
                            <DialogFooter>
                                <Button onClick={deletePillar}>Confirm</Button>
                            </DialogFooter>
                        </DialogClose>
                    </DialogContent>
                </Dialog>

            </div>

            <h3 className="mt-3 text-lg font-medium">
                {title}
            </h3>

            <p className="mt-2 line-clamp-3 text-sm/relaxed">
                Content Pillars for brand&apos;s social media
            </p>

            <div
                onClick={() => handlePillarInfo(description)}
                className="mt-4 inline-flex items-center gap-1 text-sm font-medium"
            >
                Read more

                <span
                    aria-hidden="true"
                    className="block transition-all group-hover:ms-0.5 rtl:rotate-180"
                >
                    &rarr;
                </span>
            </div>
        </article >
    );
}

export default PillarCard;
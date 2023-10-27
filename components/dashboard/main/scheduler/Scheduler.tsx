import { useToast } from '@/components/ui/use-toast';
import { UploadButton } from '@/utils/uploadthing';
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
interface SchedulerProps {

}

const Scheduler: React.FC<SchedulerProps> = ({ }) => {
    const { toast } = useToast()
    const [content, setContent] = useState<any>(null)

    useEffect(() => {
        const getContent = async () => {
            const response = await fetch(`http://localhost:3000/api/content`)

            const result = await response.json()

            console.log("Fired", result)
            setContent(result)
            return result
        }

        getContent()
    }, [])

    console.log('content', content)
    return (
        <div className='flex flex-col'>
            <UploadButton
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                    console.log("Files: ", res);
                    toast({
                        title: "Upload Complete",
                    })
                }}
                onUploadError={(error: Error) => {
                    console.log("Failed", error)
                    alert(`ERROR! ${error.message}`);
                    toast({
                        title: "Upload Failed",
                        description: error.message,
                        variant: "destructive"
                    })
                }}
            />
            <div className='flex flex-wrap space-x-3 mt-[1rem]'>
                {content?.map((file: any, index: number) => {
                    return (<Image key={index} src={file?.file_url} width={300} height={100} alt="" className='rounded-md drop-shadow-lg'/>)
                })}
            </div>
        </div>
    );
}

export default Scheduler;
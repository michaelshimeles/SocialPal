import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React from 'react'

interface AssistantProps {

}

const Assistant: React.FC<AssistantProps> = ({ }) => {
    return (
        <div className="flex flex-col w-[100%] min-h-[88vh] overflow-hidden">
            <div className="flex flex-col flex-1 overflow-y-scroll p-4 space-y-2">
            </div>
            <div className="flex flex-col gap-1">
                <form className="flex items-center gap-2 p-2 border-t">
                    <Input className="flex-grow" placeholder="Type a message" />
                    <Button>Send</Button>
                </form>
            </div>
        </div>
    );
}

export default Assistant;
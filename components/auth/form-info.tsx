import { cn } from "@/lib/utils";
import { AlertCircle, CheckCircle } from "lucide-react";

type FormInfoProps = {
    message?: string,
    isError?: boolean,
}

export const FormInfo = ({ message, isError = false }: FormInfoProps) => {
    if (!message) return null;

    const className = isError ? "bg-destructive" : "bg-teal-400";

    return (
        <div className={cn(className, "flex items-center gap-2 text-secondary-foreground p-3 rounded-md")}>
            {
                isError ? <AlertCircle className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />
            }
            <p>{message}</p>
        </div>
    )

};
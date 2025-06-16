import DashboardNav from "@/components/navigation/dashboard-nav";
import { auth } from "@/server/auth";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    const session = await auth();

    return (
        <div>
            <DashboardNav session={session} />
            {children}
        </div>
    )
}

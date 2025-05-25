import { HomeLayout } from "@/components/HomeLayout";
import JobLayout from "@/modules/jobs/layouts/form-layout";
import { auth } from "@clerk/nextjs/server";
interface HomeLayoutProps {
    children: React.ReactNode;
}

const JobPageLayout = async ({ children }: HomeLayoutProps) => {
    const { sessionClaims, userId } = await auth();
    return (
        <>
            <HomeLayout role={sessionClaims?.metadata.role} userId={userId || undefined}>
                 <JobLayout>{children}</JobLayout>
            </HomeLayout>
        </>
    )
}

export default JobPageLayout;
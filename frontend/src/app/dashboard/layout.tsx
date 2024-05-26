import NavigationSidebar from "@/app/dashboard/_components/NavigationSidebar";
import PreviewSidebar from "@/app/dashboard/_components/PreviewSidebar";

export default async function DashboardLayout({children}: Readonly<{
    children: React.ReactNode;
}>) {
    return <main className="flex bg-dashboard-background min-h-screen" style={{
        ['--bg-background' as any]: 'var(--gray-100)'
    }}>
        <NavigationSidebar className={'min-w-[360px] min-h-full'}/>
        <div className={'w-full h-full pt-[80px]'}>
            <div className={'w-[600px] mx-auto'}>
                {children}
            </div>
        </div>
        <PreviewSidebar className={'min-w-[600px] min-h-full'}/>

    </main>
}

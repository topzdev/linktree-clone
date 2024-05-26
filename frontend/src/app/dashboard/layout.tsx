import NavigationSidebar from "@/app/dashboard/_components/NavigationSidebar";
import PreviewSidebar from "@/app/dashboard/_components/PreviewSidebar";
import MobileNavigationBottomBar, {mobileNavbarHeight} from "@/app/dashboard/_components/MobileNavigationBottomBar";
import {Button} from "@/components/ui/button";
import MaterialSymbolsVisibilityOutline from "@/components/icons/MaterialSymbolsVisibilityOutline";
import MobileNavbar from "@/app/dashboard/_components/MobileNavbar";
export default async function DashboardLayout({children}: Readonly<{
    children: React.ReactNode;
}>) {
    return <main className="flex bg-dashboard-background min-h-screen relative" style={{
        ['--bg-background' as any]: 'var(--gray-100)'
    }}>
        <MobileNavbar className={'md:hidden'}/>
        <NavigationSidebar className={'min-w-[250px] lg:min-w-[300px] 2xl:min-w-[360px] min-h-full max-md:hidden'}/>
        <div className={'w-full h-full pt-[90px] md:pt-[80px]'}>
            <div className={'max-lg px-4 max-w-[600px] mx-auto'}>
                {children}
            </div>
        </div>
        <PreviewSidebar className={'min-w-[250px] lg:min-w-[300px] xl:min-w-[400px] 2xl:min-w-[600px] min-h-full max-md:hidden'}/>

        <Button rounded size={'xl'} className={'fixed left-1/2 bottom-[103px] -translate-x-1/2 md:hidden shadow'} style={{
        }} color='primary' variant={'tonal'} iconLeft={<MaterialSymbolsVisibilityOutline/>}>Preview</Button>
        <MobileNavigationBottomBar className={'flex md:hidden'}/>
    </main>
}

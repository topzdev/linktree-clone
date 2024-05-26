import NavigationSidebar from "@/app/dashboard/_components/NavigationSidebar";
import PreviewSidebar from "@/app/dashboard/_components/PreviewSidebar";
import MobileNavigationBottomBar from "@/app/dashboard/_components/MobileNavigationBottomBar";
import MobileNavbar from "@/app/dashboard/_components/MobileNavbar";

export default function DashboardLayout({children}: Readonly<{
    children: React.ReactNode;
}>) {
    return <>
        <MobileNavbar className={'md:hidden'}/>
        <NavigationSidebar className={'min-w-[250px] lg:min-w-[300px] 2xl:min-w-[360px] min-h-full max-md:hidden'}/>
        <div className={'w-full h-full pt-[90px] md:pt-[80px]'}>
            <div className={'max-lg px-4 max-w-[600px] mx-auto'}>
                {children}
            </div>
        </div>
        <PreviewSidebar
            className={'min-w-[250px] lg:min-w-[300px] xl:min-w-[400px] 2xl:min-w-[600px] min-h-full max-md:hidden'}/>
        <MobileNavigationBottomBar className={'flex md:hidden'}/>
    </>
}

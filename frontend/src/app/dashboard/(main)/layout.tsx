import NavigationSidebar from "@/app/dashboard/_components/NavigationSidebar";
import PreviewSidebar from "@/app/dashboard/_components/PreviewSidebar";
import MobileNavigationBottomBar from "@/app/dashboard/_components/MobileNavigationBottomBar";
import MobileNavbar from "@/app/dashboard/_components/MobileNavbar";

export default function DashboardLayout({children}: Readonly<{
    children: React.ReactNode;
}>) {
    return <>
        <MobileNavbar className={'lg:hidden z-[9999]'}/>
        <NavigationSidebar className={'sticky top-0 min-w-[250px] lg:min-w-[300px] 2xl:min-w-[360px] min-h-full max-h-screen max-lg:hidden'}/>
        <div className={'w-full h-full pt-[90px] lg:pt-[80px] pb-[160px]'}>
                {children}
        </div>
        <PreviewSidebar
            className={'sticky top-0 min-w-[250px] lg:min-w-[300px] xl:min-w-[400px] 2xl:min-w-[600px] min-h-full !max-h-screen max-lg:hidden'}/>
        <MobileNavigationBottomBar className={'flex lg:hidden'}/>
    </>
}

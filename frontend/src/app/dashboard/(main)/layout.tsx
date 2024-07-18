import PreviewSidebar from "@/app/dashboard/_components/PreviewSidebar";
import MobileNavigationBottomBar from "@/app/dashboard/_components/MobileNavigationBottomBar";
import MobileNavbar from "@/app/dashboard/_components/MobileNavbar";
import NavigationSidebar from "@/app/dashboard/_components/NavigationSidebar";

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <MobileNavbar className={"z-50 lg:hidden"} />
            <NavigationSidebar
                className={
                    "sticky top-0 max-h-screen min-h-full min-w-[250px] max-lg:hidden lg:min-w-[300px] 2xl:min-w-[360px]"
                }
            />
            <div className={"h-full w-full pb-[160px] pt-[90px] lg:pt-[80px]"}>
                {children}
            </div>
            <PreviewSidebar
                className={
                    "sticky top-0 !max-h-screen min-h-full min-w-[250px] max-lg:hidden lg:min-w-[300px] xl:min-w-[400px] 2xl:min-w-[600px]"
                }
            />
            <MobileNavigationBottomBar className={"flex lg:hidden"} />
        </>
    );
}

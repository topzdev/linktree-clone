import AppHeader from "@/app/(guest)/_components/AppHeader";

export default async function GuestLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <AppHeader />
            {children}
        </>
    );
}

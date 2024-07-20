"use client";

import React from "react";
import DashboardContainer from "@/app/dashboard/(main)/_components/DashboardContainer";
import { Card, CardContent } from "@/components/ui/card";
import Typography from "@/components/ui/typography";
import { useSession } from "next-auth/react";
import useFetchAppearance from "@/hooks/api/useFetchAppearance";
import useAppAuth from "@/hooks/useAppAuth";
import { Button } from "@/components/ui/button";
import MaterialSymbolsAccountCircleOutline from "@/components/icons/MaterialSymbolsAccountCircleOutline";
import MaterialSymbolsRoutineOutlineRounded from "@/components/icons/MaterialSymbolsRoutineOutlineRounded";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "next-themes";
import MaterialSymbolsPassword from "@/components/icons/MaterialSymbolsPassword";
import Link from "@/components/ui/link";
import pageRoutes from "@/configs/page-routes";
import AccountAvatar from "@/app/dashboard/_components/AccountAvatar";

type Props = {};
const DashboardMorePage = (props: Props) => {
    const { theme, setTheme } = useTheme();
    const { data: session } = useSession();
    const { data } = useFetchAppearance();
    const { logout, user } = useAppAuth();

    const handleLogout = async () => {
        await logout();
    };

    const handleToggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };

    const isDarkTheme = theme === "dark";

    return (
        <DashboardContainer className={"flex flex-col gap-y-10 lg:gap-y-12"}>
            <Card>
                <CardContent className={"flex items-center gap-x-4"}>
                    <AccountAvatar className={"h-14 w-14"} />
                    <div>
                        <Typography className={"leading-none"} variant={"h4"}>
                            {user?.firstname} {user?.lastname}
                        </Typography>
                        <Typography
                            foreground="secondary"
                            className="mt-1"
                            variant={"p"}
                        >
                            link.hub/{user.username}
                        </Typography>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardContent className={"flex flex-col gap-y-5 -mx-4"}>
                    <Button
                        asChild
                        size={"lg"}
                        className="justify-start"
                        color={"accent"}
                        variant="text"
                        iconLeft={<MaterialSymbolsAccountCircleOutline />}
                    >
                        <Link href={pageRoutes.dashboard.more.myAccount.href}>
                            My Account
                        </Link>
                    </Button>
                    <Button
                        size={"lg"}
                        className="justify-start"
                        color={"accent"}
                        variant="text"
                        iconLeft={<MaterialSymbolsPassword />}
                    >
                        <Link
                            href={pageRoutes.dashboard.more.changePassword.href}
                        >
                            Change Password
                        </Link>
                    </Button>

                    <Button
                        key={"more-theme-button"}
                        asChild
                        size={"lg"}
                        className="justify-start capitalize"
                        color={"accent"}
                        iconLeft={<MaterialSymbolsRoutineOutlineRounded />}
                        variant={"text"}
                    >
                        <div
                            onClick={handleToggleTheme}
                            className={"flex justify-start items-center"}
                        >
                            Dark Mode
                            {theme && (
                                <Switch
                                    checked={isDarkTheme}
                                    className={"ml-auto"}
                                />
                            )}
                        </div>
                    </Button>
                </CardContent>
            </Card>

            <Button
                size={"lg"}
                onClick={handleLogout}
                color={"accent"}
                variant={"outlined"}
            >
                Logout
            </Button>
        </DashboardContainer>
    );
};
export default DashboardMorePage;

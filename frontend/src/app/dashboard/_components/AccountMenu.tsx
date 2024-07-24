import { useSession } from "next-auth/react";
import useFetchAppearance from "@/hooks/api/useFetchAppearance";
import useAppAuth from "@/hooks/useAppAuth";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import Typography, { TypographySkeleton } from "@/components/ui/typography";
import MaterialSymbolsAccountCircleOutline from "@/components/icons/MaterialSymbolsAccountCircleOutline";
import MaterialSymbolsRoutineOutlineRounded from "@/components/icons/MaterialSymbolsRoutineOutlineRounded";
import { Separator } from "@/components/ui/separator";
import React, { useMemo } from "react";
import { useTheme } from "next-themes";
import { Switch } from "@/components/ui/switch";
import MaterialSymbolsPassword from "@/components/icons/MaterialSymbolsPassword";
import AccountAvatar, {
    AccountAvatarSkeleton,
} from "@/app/dashboard/_components/AccountAvatar";
import pageRoutes from "@/configs/page-routes";
import Link from "next/link";

type Props = {};
const AccountMenu = (props: Props) => {
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

    const isDarkTheme = useMemo(() => theme === "dark", [theme]);

    return session && data ? (
        <Popover>
            <PopoverTrigger asChild className="mt-auto w-full">
                <Button
                    color={"accent"}
                    variant="outlined"
                    className={
                        "w-full justify-start p-2 gap-3 md:h-auto mt-auto "
                    }
                >
                    <AccountAvatar className={"h-12 w-12"} />@{user?.username}
                </Button>
            </PopoverTrigger>
            <PopoverContent
                sideOffset={10}
                align="center"
                className="max-w-full"
            >
                <div className={"flex items-center gap-4 pb-4"}>
                    <AccountAvatar className={"h-10 w-10"} />

                    <div>
                        <Typography className={"leading-none"} variant={"p"}>
                            {user?.firstname} {user?.lastname}
                        </Typography>
                        <Typography
                            foreground="secondary"
                            className="mt-1"
                            variant={"body"}
                        >
                            link.hub/{user?.username}
                        </Typography>
                    </div>
                </div>
                <div className="flex flex-col gap-y-2.5 -mx-3">
                    <Button
                        asChild
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
                        asChild
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
                        asChild
                        onClick={handleToggleTheme}
                        className="justify-start capitalize"
                        color={"accent"}
                        iconLeft={<MaterialSymbolsRoutineOutlineRounded />}
                        variant={"text"}
                    >
                        <div className={"flex justify-start items-center"}>
                            Dark Mode
                            <Switch
                                checked={isDarkTheme}
                                className={"ml-auto"}
                            />
                        </div>
                    </Button>
                </div>
                <div className={"flex mt-4 gap-y-4 flex-col"}>
                    <Separator />
                    <Button
                        onClick={handleLogout}
                        color={"accent"}
                        variant={"outlined"}
                    >
                        Logout
                    </Button>
                </div>
            </PopoverContent>
        </Popover>
    ) : (
        <></>
    );
};

export const AccountMenuSkeleton = () => {
    return (
        <Button
            variant={"outlined"}
            color={"accent"}
            className={"w-full justify-start p-2 gap-3 md:h-auto mt-auto "}
        >
            <AccountAvatarSkeleton className={"min-h-12 w-12"} />
            <TypographySkeleton>@username</TypographySkeleton>
        </Button>
    );
};

export default AccountMenu;

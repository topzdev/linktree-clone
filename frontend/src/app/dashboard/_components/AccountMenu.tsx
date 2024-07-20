import { useSession } from "next-auth/react";
import useFetchAppearance from "@/hooks/api/useFetchAppearance";
import useAppAuth from "@/hooks/useAppAuth";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Typography from "@/components/ui/typography";
import MaterialSymbolsAccountCircleOutline from "@/components/icons/MaterialSymbolsAccountCircleOutline";
import MaterialSymbolsRoutineOutlineRounded from "@/components/icons/MaterialSymbolsRoutineOutlineRounded";
import { Separator } from "@/components/ui/separator";
import React, { useCallback, useMemo } from "react";
import { useTheme } from "next-themes";
import { Switch } from "@/components/ui/switch";

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
            <PopoverTrigger className="mt-auto w-full">
                <Button
                    color={"accent"}
                    variant="outlined"
                    className={
                        "w-full justify-start p-2 gap-3 md:h-auto mt-auto "
                    }
                >
                    <Image
                        className={
                            "h-12 w-12 items-start overflow-hidden rounded-full"
                        }
                        src={data?.profile_avatar_url}
                        alt={data?.profile_title}
                        width={54}
                        height={54}
                    />
                    @{data?.profile_title}
                </Button>
            </PopoverTrigger>
            <PopoverContent>
                <div className={"flex items-center gap-4 pb-4"}>
                    <Image
                        className={
                            "h-10 w-10 items-start overflow-hidden rounded-full"
                        }
                        src={data?.profile_avatar_url}
                        alt={data?.profile_title}
                        width={54}
                        height={54}
                    />
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
                <div className="flex flex-col gap-y-2.5">
                    <Button
                        className="justify-start -mx-2"
                        color={"accent"}
                        variant="text"
                        iconLeft={<MaterialSymbolsAccountCircleOutline />}
                    >
                        My Account
                    </Button>
                    <Button
                        onClick={handleToggleTheme}
                        className="justify-start -mx-2 capitalize"
                        color={"accent"}
                        iconLeft={<MaterialSymbolsRoutineOutlineRounded />}
                        variant={"text"}
                    >
                        Dark Mode
                        <Switch checked={isDarkTheme} className={"ml-auto"} />
                    </Button>
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
export default AccountMenu;

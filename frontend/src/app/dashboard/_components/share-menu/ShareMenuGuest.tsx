import Typography from "@/components/ui/typography";
import { APP_NAME } from "@/configs/app-config";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import pageRoutes from "@/configs/page-routes";

type Props = {};
const ShareMenuGuest = (props: Props) => {
    return (
        <div className={"flex flex-col border-t border-border !mt-5 py-4"}>
            <Typography className={"mb-1"} variant={"h3"}>
                Create your own {APP_NAME}
            </Typography>
            <Typography foreground={"secondary"} variant={"p"}>
                The only link in bio trusted by 50M+ people.
            </Typography>
            <div className={"flex gap-x-4 mt-4"}>
                <Button className={"w-full"} asChild size={"lg"}>
                    <Link href={pageRoutes.register.href}>Sign Up free</Link>
                </Button>
                <Button
                    className={"w-full"}
                    asChild
                    variant={"outlined"}
                    size={"lg"}
                >
                    <Link href={pageRoutes.login.href}>Login</Link>
                </Button>
            </div>
        </div>
    );
};
export default ShareMenuGuest;

"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import pageRoutes from "@/configs/page-routes";
import { useState } from "react";
import Typography from "@/components/ui/typography";

type Props = {};
const UsernameForm = (props: Props) => {
    const [username, setUsername] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const handleClick = () => {
        if (username) {
            setLoading(true);
            router.push(pageRoutes.register.href + "?u=" + username);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value.replace(/[^a-zA-Z0-9_.]/g, "");
        setUsername(newValue);
    };

    return (
        <div className="mx-auto flex items-center gap-4 max-lg:flex-col md:gap-5 lg:w-[500px]">
            <Input
                leftAdornment={
                    <Typography className={"text-base"}>linktree/</Typography>
                }
                value={username}
                onChange={handleInputChange}
                className={"w-full"}
                placeholder={"username"}
            />
            <Button
                loading={loading}
                disabled={!username}
                className={"!min-h-full max-lg:w-full"}
                onClick={handleClick}
                size={"lg"}
            >
                Let's Get Started!
            </Button>
        </div>
    );
};
export default UsernameForm;

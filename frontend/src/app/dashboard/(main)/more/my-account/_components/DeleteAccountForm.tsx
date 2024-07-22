import { Button } from "@/components/ui/button";
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { AuthUser } from "../../../../../../../types/next-auth";
import { useMutation } from "@tanstack/react-query";
import { FetchError } from "ofetch";
import useAppAuth from "@/hooks/useAppAuth";
import { useToast } from "@/components/ui/use-toast";
import Countdown from "@/components/utils/Countdown";
import accountServices from "@/services/account";
import { Input } from "@/components/ui/input";

type Props = {
    value: AuthUser;
};
const DeleteAccountForm = ({ value }: Props) => {
    const { update, logout } = useAppAuth();
    const { toast } = useToast();
    const [code, setCode] = useState();
    const [countdown, setCountdown] = useState(0);

    const isMatched = code === value.username;

    const useUpdateContent = useMutation({
        mutationFn: async (code: string) => {
            await accountServices.deleteAccount(code);
        },
        onSuccess: async (data, variables, context) => {
            setCountdown(5);
            setTimeout(async () => {
                await logout();
            }, 5000);
        },
        onError(error: FetchError, variables, context) {
            toast({
                title: "Something went wrong",
                description: error.data.message,
                variant: "destructive",
            });
        },
    });

    const handleDelete = async () => {
        await useUpdateContent.mutate(code);
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant={"outlined"} color="error" size={"lg"}>
                    Delete Account
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        {countdown ? "Account Deleted" : "Delete Account"}
                    </AlertDialogTitle>
                </AlertDialogHeader>

                {countdown ? (
                    <>Account successfully deleted. Thank you and good bye</>
                ) : (
                    <>
                        <AlertDialogDescription>
                            To confirm the account deletion please enter your
                            &nbsp;
                            <b>username</b>
                        </AlertDialogDescription>
                        <Input
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            placeholder={"Enter your username here"}
                        />
                    </>
                )}
                <AlertDialogFooter>
                    {!countdown && (
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                    )}

                    <Button
                        size={"lg"}
                        loading={useUpdateContent.isPending}
                        disabled={!isMatched || useUpdateContent.isPending}
                        onClick={handleDelete}
                    >
                        {countdown ? (
                            <span>
                                Signing out in{" "}
                                <Countdown initialSeconds={countdown} />s
                            </span>
                        ) : (
                            "Continue"
                        )}
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};
export default DeleteAccountForm;

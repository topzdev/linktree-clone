import Typography from "@/components/ui/typography";
import UsernameForm from "@/app/(guest)/_components/UsernameForm";

type Props = {};
const Page = (props: Props) => {
    return (
        <div
            className={
                "flex min-h-screen w-screen flex-col items-center justify-center text-foreground"
            }
        >
            <div className="mx-auto w-full space-y-7 text-center max-lg:px-5 lg:w-[800px]">
                <h1
                    className={
                        "text-center text-[50px] leading-[100%] md:text-[100px]"
                    }
                >
                    One
                    <b>
                        <i>link </i>
                    </b>
                    <br />
                    to rule them all
                </h1>
                <Typography variant={"lead"}>
                    One link to help you share everything you create, curate
                    from Instagram, TikTok, Twitter, YouTube and other social
                    media profiles.
                </Typography>

                <UsernameForm />
            </div>
        </div>
    );
};
export default Page;

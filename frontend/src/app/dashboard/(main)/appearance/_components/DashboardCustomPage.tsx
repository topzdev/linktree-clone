import DashboardContainer from "@/app/dashboard/(main)/_components/DashboardContainer";
import CustomThemeSection from "@/app/dashboard/(main)/appearance/_components/custom/CustomThemeSection";
import ButtonSection from "@/app/dashboard/(main)/appearance/_components/buttons/ButtonSection";
import FontSection from "@/app/dashboard/(main)/appearance/_components/buttons/FontSection";

type Props = {};
const DashboardCustomPage = (props: Props) => {
    return (
        <DashboardContainer className={"flex flex-col gap-y-12"}>
            <CustomThemeSection />
            <ButtonSection />
            <FontSection />
        </DashboardContainer>
    );
};

export default DashboardCustomPage;

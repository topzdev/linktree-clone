import React from "react";
import {Card} from "@/components/ui/card";
import {UserSocials} from "@/services/socials";
import {Social} from "../../../../../../types/models";
import SocialListForm, {SocialListFormSkeleton} from "@/app/dashboard/(main)/settings/_components/SocialListForm";
import SocialAlignmentForm, {
    SocialAlignmentFormSkeleton
} from "@/app/dashboard/(main)/settings/_components/SocialAlignmentForm";
import {Separator} from "@/components/ui/separator";

type Props = {
    children?: React.ReactNode,
    value: UserSocials
}

export type SocialForm = {
    socials?: Social[],
    alignment: string,
}


const SocialForm = ({value}: Props) => {
    return <Card>
        <SocialListForm value={value}/>
        <Separator/>
        <SocialAlignmentForm value={value}/>
    </Card>
}

export const SocialFormSkeleton = () => {
    return <Card>
        <SocialListFormSkeleton/>
        <SocialAlignmentFormSkeleton/>
    </Card>
}

export default SocialForm;
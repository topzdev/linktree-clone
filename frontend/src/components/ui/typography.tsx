import React from "react";
import {cn} from "@/lib/utils";

export type TypographyProps = {
    children?: React.ReactNode,
    variant?: keyof typeof typographies;
    className?: string,
    as?: keyof JSX.IntrinsicElements;
    foreground?: keyof typeof foregrounds
}

const typographies = {
    h1: {className: 'scroll-m-20 text-3xl md:text-4xl font-extrabold tracking-tight lg:text-5xl', element: 'h1'},
    h2: {className: 'scroll-m-20 text-2xl md:text-3xl font-semibold tracking-tight first:mt-0', element: 'h2'},
    h3: {className: 'scroll-m-20 text-xl md:text-2xl font-semibold tracking-tight', element: 'h3'},
    h4: {className: 'scroll-m-20 text-lg md:text-xl font-semibold tracking-tight', element: 'h4'},
    p: {className: 'leading-7 text-base', element: 'p'},
    body: {className: 'text-sm leading-6', element: 'p'},
    'body-medium': {className: 'text-sm leading-6 font-medium', element: 'p'},
    small: {className: 'text-sm leading-3.5', element: 'p'},
    detail: {className: 'text-xs leading-5', element: 'p'},
    blockqoute: {className: 'mt-6 border-l-2 pl-6 italic', element: 'blockqoute'},
    list: {className: 'my-6 ml-6 list-disc [&>li]:mt-2', element: 'p'},
    code: {
        className: 'relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold',
        element: 'code'
    },
    lead: {className: 'text-xl text-muted-foreground', element: 'p'},
    large: {className: 'text-md font-semibold leading-7', element: 'p'},
    overline: {className: 'text-sm tracking-tight uppercase', element: 'p'},
    subtitle: {className: 'text-sm leading-5', element: 'p'}
}

const foregrounds = {
    inherit: '',
    primary: 'text-foreground-primary',
    secondary: 'text-foreground-secondary',
    disabled: 'text-foreground-disabled',
}

const Typography = ({as: Element, variant = 'p', foreground = 'inherit', children, className}: TypographyProps) => {
    const as = Element ? Element : typographies[variant]['element'];
    const elementStyle = typographies[variant]['className'];
    const foregroundStyle = foregrounds[foreground];
    const TypographyComponent = React.createElement(as, {
        className: cn(elementStyle, foregroundStyle, className),
    }, children);
    return TypographyComponent;

}

export default Typography;
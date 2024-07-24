import * as React from "react";
import { Slot, Slottable } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export const iconSizes = {
    sm: "text-lg",
    base: "text-xl",
    lg: "text-2xl",
    xl: "text-3xl",
};

export const variants = {
    primary: {
        filled: "border bg-primary text-primary-foreground border-primary hover:bg-primary-600 hover:border-primary-600 hover:text-primary-foreground",
        outlined:
            "border border-primary text-primary hover:border-primary/75 hover:text-primary/75",
        text: "text-primary hover:text-primary-400",
        tonal: "bg-primary/10 text-primary hover:bg-primary/20",
    },
    error: {
        filled: "border bg-destructive text-destructive-foreground border-destructive hover:bg-destructive-600 hover:border-destructive-600 hover:text-destructive-foreground",
        outlined:
            "border border-destructive text-destructive hover:border-destructive/75 hover:text-destructive/75",
        text: "text-destructive hover:text-destructive-400",
        tonal: "bg-destructive/10 text-destructive hover:bg-destructive/20",
    },
    accent: {
        filled: "border bg-accent text-accent-foreground border-accent hover:bg-accent-600 hover:border-accent-600 hover:text-accent-foreground",
        outlined:
            "border border-border text-accent hover:text-accent/75 hover:border-border/75",
        text: "text-accent hover:text-accent/75",
        tonal: "bg-accent/10 text-accent hover:bg-accent/20",
    },
};

const buttonVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
    {
        variants: {
            size: {
                sm: "h-[29px] md:h-[32px] rounded-md px-2.5 text-sm ",
                base: "h-[37px] md:h-[40px] rounded-md px-4 text-base",
                lg: "h-[45px] md:h-[48px] rounded-md px-5 text-base",
                xl: "h-[52px] md:h-[55px] rounded-md px-5 text-lg",
            },

            rounded: {
                true: "!rounded-full",
                false: "",
            },
        },

        defaultVariants: {
            size: "base",
            rounded: false,
        },
    },
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    asChild?: boolean;
    size?: "sm" | "base" | "lg" | "xl";
    variant?: "filled" | "outlined" | "text" | "tonal";
    color?: "primary" | "accent" | "error";
    iconLeft?: React.ReactNode;
    iconRight?: React.ReactNode;
    rounded?: boolean;
    loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            className,
            variant = "filled",
            children,
            iconRight,
            iconLeft,
            color = "primary",
            size = "base",
            rounded = true,
            asChild = false,
            loading = false,
            ...props
        },
        ref,
    ) => {
        const Comp = asChild ? Slot : "button";
        const style = variants[color][variant];
        const iconSize = iconSizes[size ? size : "base"];

        return (
            <Comp
                className={cn(
                    style,
                    buttonVariants({ size, rounded }),
                    className,
                )}
                ref={ref}
                {...props}
            >
                {loading && <Loader2 className="animate-spin mr-1" />}
                {!loading && iconLeft && (
                    <span className={cn("mr-2", iconSize)}>{iconLeft}</span>
                )}
                <Slottable>{children}</Slottable>
                {iconRight && (
                    <span className={cn("ml-2 ", iconSize)}>{iconRight}</span>
                )}
            </Comp>
        );
    },
);

export const ButtonSkeleton = ({
    size,
    rounded = true,
    className,
    children,
}: ButtonProps) => {
    return (
        <Skeleton className={cn(buttonVariants({ size, rounded, className }))}>
            {children}
        </Skeleton>
    );
};

Button.displayName = "Button";

export { Button, buttonVariants };

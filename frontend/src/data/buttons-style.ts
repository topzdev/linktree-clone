import React from "react";

const commonStyle: React.CSSProperties = {
    color: 'var(--btn-text-color)'
}
const backgroundStyle: React.CSSProperties = {
    background: 'var(--btn-color)'
};

const borderStyle: React.CSSProperties = {
    borderColor: 'var(--btn-color)'
}

const outlineClassname = 'border-[2px] border-primary';
const softShadowStyle: React.CSSProperties = {
    boxShadow: '0px 4px 4px 0px var(--btn-soft-shadow-color)'
};
const hardShadowClassname: React.CSSProperties = {
    boxShadow: '0px 6px 0px 0px var(--btn-shadow-color)'
};

const roundedClassname = 'rounded-xl';
const circularClassname = 'rounded-full';

type ButtonStyleItem = {
    className: string | string[],
    style?: React.CSSProperties
}

export const buttonsStyle  = {
    fill: {
        className: [''],
        style: {
            ...commonStyle,
            ...backgroundStyle,

        }
    },
    fillrounded: {
        className: [roundedClassname],
        style: {
            ...commonStyle,
            ...backgroundStyle,
        }
    },
    fillcircular: {
        className: [circularClassname],
        style: {
            ...commonStyle,
            ...backgroundStyle,
        }
    },
    outline: {
        className: [outlineClassname, ''],
        style: {
            ...commonStyle,
            ...borderStyle,
        }
    },
    outlinerounded: {
        className: [outlineClassname, roundedClassname],
        style: {
            ...commonStyle,
            ...borderStyle,
        }
    },
    outlinecircular: {
        className: [outlineClassname, circularClassname],
        style: {
            ...commonStyle,
            ...borderStyle,
        }
    },
    softshadow: {
        className: [],
        style: {
            ...commonStyle,
            ...backgroundStyle,
            ...softShadowStyle,
        }
    },
    softshadowrounded: {
        className: [roundedClassname, ''],
        style: {
            ...commonStyle,
            ...backgroundStyle,
            ...softShadowStyle,
        }
    },
    softshadowcircular: {
        className: [circularClassname, ''],
        style: {
            ...commonStyle,
            ...backgroundStyle,
            ...softShadowStyle,
        }
    },
    hardshadow: {
        className: [],
        style: {
            ...commonStyle,
            ...backgroundStyle,
            ...hardShadowClassname
        }
    },
    hardshadowrounded: {
        className: [roundedClassname, ''],
        style: {
            ...commonStyle,
            ...backgroundStyle,
            ...hardShadowClassname,
        }
    },
    hardshadowcircular: {
        className: [circularClassname, ''],
        style: {
            ...commonStyle,
            ...backgroundStyle,
            ...hardShadowClassname
        }
    },
}
export type ButtonStyleTypes = keyof typeof buttonsStyle;

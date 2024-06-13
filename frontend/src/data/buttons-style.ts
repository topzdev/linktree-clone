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
    id: string,
    "title": string,
    "key": string,
    "group_id": number,
    className: string | string[],
    style?: React.CSSProperties
}

export const buttonsStyle  = {
    fill: {
        id: 1,
        className: [''],
        "title": "Fill",
        "key": "fill",
        "group_id": 1,
        style: {
            ...commonStyle,
            ...backgroundStyle,
        }
    },
    fillrounded: {
        id: 2,
        "title": "Fill Rounded",
        "key": "fillrounded",
        "group_id": 1,
        className: [roundedClassname],
        style: {
            ...commonStyle,
            ...backgroundStyle,
        }
    },
    fillcircular: {
        id: 3,
        "title": "Fill Circular",
        "key": "fillcircular",
        "group_id": 1,
        className: [circularClassname],
        style: {
            ...commonStyle,
            ...backgroundStyle,
        }
    },
    outline: {
        id: 4,
        "title": "Outline",
        "key": "outline",
        "group_id": 2,
        className: [outlineClassname, ''],
        style: {
            ...commonStyle,
            ...borderStyle,
        }
    },
    outlinerounded: {
        id: 5,
        "title": "Outline Rounded",
        "key": "outlinerounded",
        "group_id": 2,
        className: [outlineClassname, roundedClassname],
        style: {
            ...commonStyle,
            ...borderStyle,
        }
    },
    outlinecircular: {
        id: 6,
        "title": "Outline Circular",
        "key": "outlinecircular",
        "group_id": 2,
        className: [outlineClassname, circularClassname],
        style: {
            ...commonStyle,
            ...borderStyle,
        }
    },
    softshadow: {
        id: 7,
        "title": "Soft shadow",
        "key": "softshadow",
        "group_id": 3,
        className: [],
        style: {
            ...commonStyle,
            ...backgroundStyle,
            ...softShadowStyle,
        }
    },
    softshadowrounded: {
        id: 8,
        "title": "Soft shadow Rounded",
        "key": "softshadowrounded",
        "group_id": 3,
        className: [roundedClassname, ''],
        style: {
            ...commonStyle,
            ...backgroundStyle,
            ...softShadowStyle,
        }
    },
    softshadowcircular: {
        id: 9,
        "title": "Soft shadow Circular",
        "key": "softshadowcircular",
        "group_id": 3,
        className: [circularClassname, ''],
        style: {
            ...commonStyle,
            ...backgroundStyle,
            ...softShadowStyle,
        }
    },
    hardshadow: {
        id: 10,
        "title": "Hardshadow",
        "key": "hardshadow",
        "group_id": 4,
        className: [],
        style: {
            ...commonStyle,
            ...backgroundStyle,
            ...hardShadowClassname
        }
    },
    hardshadowrounded: {
        id: 11,
        "title": "Hard shadow Rounded",
        "key": "hardshadowrounded",
        "group_id": 4,
        className: [roundedClassname, ''],
        style: {
            ...commonStyle,
            ...backgroundStyle,
            ...hardShadowClassname,
        }
    },
    hardshadowcircular: {
        id: 12,
        "title": "Hard shadow Circular",
        "key": "hardshadowcircular",
        "group_id": 4,
        className: [circularClassname, ''],
        style: {
            ...commonStyle,
            ...backgroundStyle,
            ...hardShadowClassname
        }
    },
}
export type ButtonStyleTypes = keyof typeof buttonsStyle;

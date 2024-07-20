const pageRoutes = {
    home: { href: "/" },
    login: { href: "/login" },
    register: { href: "/register" },
    profile: (username: string) => {
        return {
            href: `/${username}`,
        };
    },
    dashboard: (() => {
        const _path = "/dashboard";
        return {
            links: {
                href: `${_path}`,
            },
            profile: {
                href: `${_path}/profile`,
            },
            appearance: (() => {
                const subPath = `${_path}/appearance`;

                return {
                    href: subPath,
                    fonts: (() => {
                        const sectionHash = "#fonts";
                        return {
                            href: subPath + sectionHash,
                        };
                    })(),
                    buttons: (() => {
                        const sectionHash = "#buttons";
                        return {
                            href: subPath + sectionHash,
                        };
                    })(),
                    themes: (() => {
                        return {
                            href: subPath + "/themes",
                        };
                    })(),
                };
            })(),
            settings: (() => {
                const subPath = _path + "/settings";

                return {
                    href: subPath,

                    socials: (() => {
                        const subPath = _path + "/settings";
                        const sectionHash = "#socials";
                        return {
                            href: subPath + sectionHash,
                            list: {
                                href: subPath + "/list" + sectionHash,
                            },
                            add: (social_id: string) => {
                                return {
                                    href:
                                        subPath +
                                        "/add/" +
                                        social_id +
                                        sectionHash,
                                };
                            },
                            edit: (id: string) => {
                                return {
                                    href: subPath + "/edit/" + id + sectionHash,
                                };
                            },
                        };
                    })(),
                };
            })(),
            preview: {
                href: `${_path}/preview`,
            },
            more: (() => {
                const subPath = _path + "/more";
                return {
                    href: subPath,
                    myAccount: {
                        href: `${subPath}/my-account`,
                    },
                    changePassword: {
                        href: `${subPath}/change-password`,
                    },
                };
            })(),
        };
    })(),
};

export default pageRoutes;

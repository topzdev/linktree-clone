const pageRoutes = {
    home: {href: '/'},
    login: {href: '/login'},
    register: {href: '/register'},
    profile: (username: string) => {
        return {
            href: `/${username}`
        }
    },
    dashboard: (() => {
        const _path = '/dashboard'
        return {
            links: {
                href: `${_path}`
            },
            profile: {
                href: `${_path}/profile`
            },
            theme: {
                href: `${_path}/themes`
            },
            buttons: {
                href: `${_path}/buttons`
            },
            analytics: {
                href: `${_path}/analytics`
            },

            settings: (() => {
                const subPath = _path + '/settings';

                return {
                    href: subPath,
                    fonts: (() => {
                        const subPath = _path + '/settings';
                        const sectionHash = '#fonts'
                        return {
                            href: subPath + sectionHash,
                            list: {
                                href: subPath + '/list' + sectionHash
                            },
                        }
                    })(),
                    socials: (() => {
                        const subPath = _path + '/settings';
                        const sectionHash = '#socials'
                        return {
                            href: subPath + sectionHash,
                            list: {
                                href: subPath + '/list' + sectionHash
                            },
                            add:(social_id: string) => {
                                return  {
                                    href: subPath + '/add/' + social_id + sectionHash
                                }
                            },
                            edit: (id: string) => {
                                return {
                                    href: subPath + '/edit/'+ id + sectionHash
                                }
                            }
                        }
                    })(),
                }

            })(),
            preview: {
                href: `${_path}/preview`
            },
        }
    })()
};

export default pageRoutes
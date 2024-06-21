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
            fonts: {
                href: `${_path}/fonts`
            },
            analytics: {
                href: `${_path}/analytics`
            },
            socials: (() => {
                const subPath = _path + '/socials';

                return {
                    href: subPath,
                    list: {
                        href: subPath + '/list'
                    },
                    add:(social_id: string) => {
                        return  {
                            href: subPath + '/add/' + social_id
                        }
                    },
                    edit: (id: string) => {
                        return {
                            href: subPath + '/edit/'+ id
                        }
                    }
                }
            })(),
            preview: {
                href: `${_path}/preview`
            },
        }
    })()
};

export default pageRoutes
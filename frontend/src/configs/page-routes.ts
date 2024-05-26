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
            settings: {
                href: `${_path}/settings`
            },
            preview: {
                href: `${_path}/preview`
            },
        }
    })()
};

export default pageRoutes
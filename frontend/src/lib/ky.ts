import ky from 'ky';


const instance = ky.create({
    prefixUrl: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Referer': process.env.NEXT_PUBLIC_REFERER
    },
    hooks: {
        beforeRequest: [
            request => {
                let token = '';
                if (typeof window !== 'undefined') {
                    token = window.localStorage.getItem('access_token') || '';
                }

                if (token) {
                    request.headers.set('Authorization', `Bearer ${token}`);
                }
            }
        ]
    }
});

export default instance;


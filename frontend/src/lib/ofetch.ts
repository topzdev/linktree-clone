import {FetchOptions, $Fetch, FetchRequest, MappedResponseType, ofetch} from "ofetch";

type $NewFetch = $Fetch & {
    post: (request: FetchRequest, options?: FetchOptions<"json">) => Promise<MappedResponseType<"json", any>>
    get: (request: FetchRequest, options?: FetchOptions<"json">) => Promise<MappedResponseType<"json", any>>
    put: (request: FetchRequest, options?: FetchOptions<"json">) => Promise<MappedResponseType<"json", any>>
    delete: (request: FetchRequest, options?: FetchOptions<"json">) => Promise<MappedResponseType<"json", any>>
};

const instance  = ofetch.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Referer': process.env.NEXT_PUBLIC_REFERER
    },
    onRequest({request, options}) {
        let token = '';
        if (typeof window !== 'undefined') {
            token = window.localStorage.getItem('access_token') || '';
        }

        if (token) {
            options.headers['Authorization'] = `Bearer ${token}`;
        }

    },


});

const get = function (request: FetchRequest, options?: FetchOptions<"json">): Promise<MappedResponseType<"json", any>>
{
    return instance(request, {
        method: 'GET',
        ...options
    });
}


const post = function (request: FetchRequest, options?: FetchOptions<"json">): Promise<MappedResponseType<"json", any>>
{
    return instance(request, {
        method: 'POST',
        ...options
    });
}


const put = function (request: FetchRequest, options?: FetchOptions<"json">): Promise<MappedResponseType<"json", any>>
{
    return instance(request, {
        method: 'PUT',
        ...options
    });
}


const _delete = function (request: FetchRequest, options?: FetchOptions<"json">): Promise<MappedResponseType<"json", any>>
{
    return instance(request, {
        method: 'DELETE',
        ...options
    });
}

export const apiClient =  {
    ...instance,
    delete: _delete,
    get,
    put,
    post,
}

export default instance;
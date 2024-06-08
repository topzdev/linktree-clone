import {FetchOptions, $Fetch, FetchRequest, MappedResponseType, ofetch, FetchError as OFetchError} from "ofetch";
import {array} from "yup";


export type FetchError = Error & {
    data: {
        message: string,
        errors: Record<string, string[]>
    }
}



const instance  = ofetch.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    onRequest({request, options}) {
        let token = '';

        options.headers = {
            'Accept': 'application/json',
            'Referer': process.env.NEXT_PUBLIC_REFERER || '',
            ...options.headers,
        }

        if (typeof window !== 'undefined') {
            token = window.localStorage.getItem('access-token') || '';
        }

        if (token) {
            options.headers = {
                ...options.headers,
                'Authorization': `Bearer ${token}`,
            };
        }

    },

});


const get = function<T>(request: FetchRequest, options?: FetchOptions<"json">): Promise<MappedResponseType<"json", T>>
{
    return instance(request, {
        method: 'GET',
        ...options
    });
}


const post = function<T>(request: FetchRequest, options?: FetchOptions<"json">): Promise<MappedResponseType<"json", T>>
{
    return instance(request, {
        method: 'POST',
        ...options
    });
}


const put = function<T>(request: FetchRequest, options?: FetchOptions<"json">): Promise<MappedResponseType<"json", T>>
{
    return instance(request, {
        method: 'PUT',
        ...options
    });
}


const _delete = function<T>(request: FetchRequest, options?: FetchOptions<"json">): Promise<MappedResponseType<"json", T>>
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
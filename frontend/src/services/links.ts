import {apiClient} from "@/lib/ofetch";
import {Link} from "../../types/models";

const basePath = '/links'

export type AddLink = {
    title: string,
    url?: string,
    type: string,
}

export type UpdateLink = {
    title: string,
    url?: string,
}

const linkServices = {
    getAll: async () => {
        return apiClient.get<Link[]>(`${basePath}/`);
    },
    getOne: async (id: string) => {
        return apiClient.get<Link>(`${basePath}/${id}`);
    },
    add: async (link: AddLink) => {
        return apiClient.post(`${basePath}/`, {
            body: link,
        })
    },
    update: async (id: string, link: UpdateLink) => {
        return apiClient.put(`${basePath}/update/${id}`, {
            body: link
        })
    },
    updateThumbnail: async (id: string, image: File) => {
        const formData = new FormData();
        formData.append('image', image);
        return apiClient.put(`${basePath}/update/${id}/thumbnail`, {
            body: formData,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },
    delete: async (id: string) => {
        return apiClient.delete(`${basePath}/${id}`);
    }
}

export default linkServices;
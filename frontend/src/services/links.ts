import {apiClient} from "@/lib/ofetch";
import {Link} from "../../types/models";
import {LinkForm} from "@/app/dashboard/(main)/_components/links/LinksList";

const basePath = '/links'

export type AddLink = {
    title: string,
    url?: string,
    type: string,
}

export type UpdateThumbnail = {
    url: string,
    filename: string,
    source: string
}

export type UpdateLink = Pick<LinkForm, 'title' | 'url'>


const linkServices = {
    getAll: async () => {
        return apiClient.get<Link[]>(`${basePath}/`);
    },
    getOne: async (id: number) => {
        return apiClient.get<Link>(`${basePath}/${id}`);
    },
    add: async (link: AddLink) => {
        return apiClient.post(`${basePath}/`, {
            body: link,
        })
    },
    update: async (id?: number, link?: UpdateLink) => {
        return apiClient.post(`${basePath}/update/${id}`, {
            body: link
        })
    },
    updateToggle: async (id?: number, is_enabled?: boolean) => {
        return apiClient.post(`${basePath}/update/${id}/toggle`, {
            body: {
                is_enabled: is_enabled ? 1 : 0,
            }
        })
    },
    updateThumbnail: async (id?: number, image?: File) => {
        const formData = new FormData();

        if (image) {
            formData.append('image', image);
        }
        return apiClient.post<UpdateThumbnail>(`${basePath}/update/${id}/thumbnail`, {
            body: formData,
        })
    },
    updatePositions: async (ids: number[]) => {
        const body = {
            ids: ids.join(',')
        };
        return apiClient.post(`${basePath}/update/positions`, {
            body
        })
    },
    delete: async (id: string) => {
        return apiClient.delete(`${basePath}/${id}`);
    },
}

export default linkServices;
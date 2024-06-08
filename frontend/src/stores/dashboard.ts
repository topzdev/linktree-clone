import {create} from 'zustand'

interface DashboardState {
    previewTimestamp: number
    updatePreview: () => void,
    type: string,
    setType: (value: string) => void
}

const useDashboardStore = create<DashboardState>()((set) => ({
    previewTimestamp: Date.now(),
    type:'0',
    updatePreview: () => set((state) => ({previewTimestamp: Date.now()})),
    setType: (value: string) => set((state) => ({type: value})),

}))

export default useDashboardStore;
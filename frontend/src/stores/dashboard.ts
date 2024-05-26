import {create} from 'zustand'

interface DashboardState {
    previewTimestamp: number
    updatePreview: () => void
}

const useDashboardStore = create<DashboardState>()((set) => ({
    previewTimestamp: Date.now(),
    updatePreview: () => set((state) => ({previewTimestamp: Date.now()})),
}))

export default useDashboardStore;
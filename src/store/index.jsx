import { create } from 'zustand'

const useMacbookStore = create((set) => ({
  color: '#2e2c2e',
  setColor: (color) => set({ color }),

  scale: 0.08,
  setScale: (scale) => set({ scale }),

  textureVideo: '/videos/feature-1.mp4',
  setTextureVideo: (texture) => set({ textureVideo: texture }),

  reset: () => set({ color: '#2e2c2e', scale: 0.08, textureVideo: '/videos/feature-1.mp4' })
}))

export default useMacbookStore

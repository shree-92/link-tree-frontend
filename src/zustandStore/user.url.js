import { create } from 'zustand';

export const useUrlStore = create((set) => ({
  setUrl: {
    url: ""
  },
  updateUrl: (newUrl) => set((state) => ({
    setUrl: {
      ...state.setUrl,
      url: newUrl
    }
  }))
}));

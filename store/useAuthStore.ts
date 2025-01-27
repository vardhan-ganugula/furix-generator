import { create } from 'zustand'; 

export interface userDetails{
    email: string,
    username: string,
    tokens: number,
}

export interface AuthStore {
    userDetails?: userDetails;
    setDetails: (details: userDetails) => void;
}

const useAuthStore = create<AuthStore>((set) => ({
    setDetails: (details: userDetails) => set({ userDetails: details }),
    userDetails: undefined,
}));

export default useAuthStore;
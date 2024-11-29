import { create } from "zustand";
import {persist} from "zustand/middleware"

// Variables o estados globales
// const useUserStore = create((set)=>({
//     user: null,
//     setUser: (newUser) => set({user: newUser}),
//     clearUser: () => set({user: null})
// }));

// Persistencia global
const useUserStore = create(
    persist((set, get)=>({
        user: null,
        isAdmin: false,
        setUser: (newUser) => set({user: newUser}),
        clearUser: () => set({user: null, isAdmin: false}),
        hasSession: () => get().user !== null,
        isAdmin: () => get().isAdmin
    }),
    {name: "user-storage"}
));

export default useUserStore;
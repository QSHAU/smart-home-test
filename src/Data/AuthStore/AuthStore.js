import { writable } from "svelte/store";

export const user = writable(null);

export function loginUser(token, userId) {
    user.set({token})
    user.set({userId})
}

export function logoutUser() {
    user.set(null);
    localStorage.removeItem('token');
}

export function getToken() {
    return localStorage.getItem('token');
}
import { writable } from "svelte/store";

export const popup_shown = writable(false);

export const backend_url = writable("http://localhost:5000");
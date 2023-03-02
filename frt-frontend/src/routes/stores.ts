import { writable } from "svelte/store";

export const popup_shown = writable(false);

export const cookie = writable(false);

export const user = writable({});
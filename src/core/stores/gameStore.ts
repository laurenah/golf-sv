import type { Game } from '$lib/types';
import { writable, type Writable } from 'svelte/store';

export const gameStore: Writable<Game> = writable();

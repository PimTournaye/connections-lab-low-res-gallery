import { writable, type Writable } from "svelte/store";
import type { Player, ProjectInfo } from "./types";

	// Socket setup
	import { io } from "socket.io-client";

	export const socket = io("https://round-ahead-salt.glitch.me");


/**
 * Stores the info for a project you are viewing. Is null if you are not viewing a project.
 */
export const info: Writable<ProjectInfo> = writable();

/**
 * A store to indicate whether or not you are viewing a project.
 */
export const viewing: Writable<boolean> = writable(false);

/**
 * A store that keeps track of the other players in the room.
 */
export const otherPlayers: Writable<Player[]> = writable([]);

export const player = writable({
  username: "",
  color: '#000000',
  x: 0,
  y: 0,
  z: 0,
})

export const submittedInfo = writable(false);
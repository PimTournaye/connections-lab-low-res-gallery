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
export const allPlayers: Writable<Player[]> = writable([]);

export const player = writable({
  id: '',
  username: "",
  color: '#000000',
  x: 0,
  y: 0,
  z: 0,
})
/**
 *  A check to see if the user has submitted their username and color
 */
export const submittedInfo = writable(false);

export const projectPositions = [
  [5, 0, -3], [5, 0, -7], [5, 0, -11], [0, 0, -7], [0, 0, -11], [-5, 0, -3], [-5, 0, -7], [-5, 0, -11]
]

// <Sensor data={projects[0]} position={[5, 0, -3] } />
// <Sensor data={projects[1]} position={[5, 0, -7] } />
// <Sensor data={projects[2]} position={[5, 0, -11]  } />

// <Sensor data={projects[4]} position={[0, 0, -7]   } />
// <Sensor data={projects[5]} position={[0, 0, -11]  } />

// <Sensor data={projects[3]} position={[-5, 0, -3]  } />
// <Sensor data={projects[6]} position={[-5, 0, -7]  } />
// <Sensor data={projects[7]} position={[-5, 0, -11] } />

//if player is standing within position [x,y,z]

//display info of array number from data file
<script lang="ts">
	import { T, useThrelte } from '@threlte/core';
	import { AutoColliders, CollisionGroups } from '@threlte/rapier';
	import { projects } from '$lib/data';
	import { info, viewing, player, projectPositions, allPlayers } from '$lib';

	import { Environment, GLTF, OrbitControls } from '@threlte/extras'
	import { tweened } from 'svelte/motion';
	import { cubicInOut } from 'svelte/easing';
	import Sensor from './Sensor.svelte';
	import Player from './Player.svelte';
	import OtherPlayer from './OtherPlayer.svelte';

	const { size } = useThrelte();

	// Camera stuff
	let zoomLevel = 5000;
	$: if ($viewing) {
		zoomLevel = 800;
		camera.set(zoomLevel)
	} else {
		zoomLevel = 1000;
		camera.set(zoomLevel)
	}
	// Smooth camera zoom
	const camera = tweened(zoomLevel, {
		duration: 400,
		easing: cubicInOut
	});
	// Camera zoom based on window size
	$: zoom = $size.width / $camera;

	// Checking if we are viewing a project
	$: if($player) {
		// if player position x, y and z one of the positions in the array of positions of the projects, then log that project
		const pos = [
			Math.round($player.x),
			Math.round($player.y - 2), //adjusting for charcter pos in y axis
			Math.round($player.z)
		]
		// Checking for player position in array of project positions
		for (let i = 0; i < projectPositions.length; i++){
			if(pos[0] === projectPositions[i][0] && pos[1] === projectPositions[i][1] && pos[2] === projectPositions[i][2]) {
					info.set(projects[i])
			}
		}
}
	
</script>

<T.AmbientLight intensity={0.5} />

<Environment files="./HDRI.jpg" isBackground={true} />

<T.PerspectiveCamera
  makeDefault
  position={[0, 10, 20]}
  on:create={({ ref }) => {
    ref.lookAt(0, 1, 0)
  }}
	{zoom}
>
	<OrbitControls />
</T.PerspectiveCamera>

<!--
	The ground needs to be on both group 15 which is the group
	to detect the groundedness of the player as well as on group
	0 which is the group that the player is actually physically
	interacting with.
 -->
<CollisionGroups groups={[0, 15]}>
	<AutoColliders shape="trimesh">
		<GLTF url="./models/Gallery.gltf" position={[0,-1,-8]}/>
	</AutoColliders>
</CollisionGroups>

<!-- All physically interactive stuff should be on group 0 -->
<CollisionGroups groups={[0]}>
	<Player position={[0,2, 0]} name={$player.username} color={$player.color}/>
	{#each $allPlayers as otherPlayer}
		{console.log($allPlayers)}
		{#if otherPlayer.username !== $player.username}
			<OtherPlayer position={[otherPlayer.x, otherPlayer.y, otherPlayer.z]} name={otherPlayer.username} color={otherPlayer.color}/>
		{/if}
	{/each}
</CollisionGroups>
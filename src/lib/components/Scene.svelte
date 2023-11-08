<script lang="ts">
	import { T, useFrame, useThrelte } from '@threlte/core';
	import { AutoColliders, CollisionGroups, Debug } from '@threlte/rapier';
	import { spring } from 'svelte/motion';
	import { Mesh, Vector3 } from 'three';
	import Player from './OtherPlayer.svelte';
	import { projects } from '$lib/data';
	import { info, viewing } from '$lib';


	import { Environment, GLTF, HTML, OrbitControls } from '@threlte/extras'
	import { tweened } from 'svelte/motion';
	import { cubicInOut } from 'svelte/easing';
	import OtherPlayer from './Player.svelte';
	import Sensor from '$lib/Sensor.svelte';

	let playerMesh: Mesh;
	let positionHasBeenSet = false;
	const smoothPlayerPosX = spring(0);
	const smoothPlayerPosZ = spring(0);
	const t3 = new Vector3();

	useFrame(() => {
		if (!playerMesh) return;
		playerMesh.getWorldPosition(t3);
		smoothPlayerPosX.set(t3.x, {
			hard: !positionHasBeenSet
		});
		smoothPlayerPosZ.set(t3.z, {
			hard: !positionHasBeenSet
		});
		if (!positionHasBeenSet) positionHasBeenSet = true;
	});

	const { size } = useThrelte();

	// Camera stuff
	let zoomLevel = 16;
	$: if ($viewing) {
		zoomLevel = 8;
		camera.set(zoomLevel)
	} else {
		zoomLevel = 16;
		camera.set(zoomLevel)
	}
	// Smooth camera zoom
	const camera = tweened(zoomLevel, {
		duration: 400,
		easing: cubicInOut
	});
	// Camera zoom based on window size
	$: zoom = $size.width / $camera;
</script>

<!-- <T.DirectionalLight castShadow position={[8, 20, -3]} /> -->
<T.AmbientLight intensity={0.5} />

<Environment files="./HDRI.jpg" isBackground={true} />

<T.PerspectiveCamera
  makeDefault
  position={[0, 10, 20]}
  on:create={({ ref }) => {
    ref.lookAt(0, 1, 0)
  }}
>
	<OrbitControls />
</T.PerspectiveCamera>

<!-- <T.GridHelper args={[50]} position.y={0.01} /> -->

<Debug depthTest={false} depthWrite={false} />

<!-- {#each player in players}
	<Player position={[0, 0, 0]} color={player.color} />
{/each} -->

<!-- <Sensor data={projects[0]} position={[0, 1, 0]} />
<Sensor data={projects[1]} position={[5, 1, 0]} />
<Sensor data={projects[2]} position={[-5, 1, 0]} /> -->

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

<Sensor data={projects[0]} position={[5, 0, -3]} />
<Sensor data={projects[1]} position={[5, 0, -7]} />
<Sensor data={projects[2]} position={[5, 0, -11]} />

<Sensor data={projects[4]} position={[0, 0, -7]} />
<Sensor data={projects[5]} position={[0, 0, -11]} />

<Sensor data={projects[3]} position={[-5, 0, -3]} />
<Sensor data={projects[6]} position={[-5, 0, -7]} />
<Sensor data={projects[7]} position={[-5, 0, -11]} />

<!--
	All physically interactive stuff should be on group 0
-->
<CollisionGroups groups={[0]}>
	<Player position={[0,2, 0]} />
</CollisionGroups>

<OtherPlayer position={[0, 0, 0]} />
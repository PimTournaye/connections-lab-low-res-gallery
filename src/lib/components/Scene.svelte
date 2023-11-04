<script lang="ts">
	import { T, useFrame, useThrelte } from '@threlte/core';
	import { AutoColliders, CollisionGroups, Debug, RigidBody } from '@threlte/rapier';
	import { spring } from 'svelte/motion';
	import { Mesh, Vector3 } from 'three';
	import Ground from '../Ground.svelte';
	import Player from './Player.svelte';
	import { projects } from '$lib/data';
	import { viewing } from '$lib';
	import TestSceneWithCamera from './models/TestSceneWithCamera.svelte';

	import { tweened } from 'svelte/motion';
	import { cubicInOut } from 'svelte/easing';
	import TestV2 from './models/TestV2.svelte';

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

<!-- <T.DirectionalLight castShadow position={[8, 20, -3]} />
<T.AmbientLight intensity={0.5} /> -->


<!-- <T.GridHelper args={[50]} position.y={0.01} /> -->

<Debug depthTest={false} depthWrite={false} />

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
	<RigidBody>
		<AutoColliders shape="trimesh">
			<!-- <TestSceneWithCamera /> -->
			<TestV2 project={projects[0]}/>
		</AutoColliders>
	</RigidBody>
</CollisionGroups>

<!--
	All physically interactive stuff should be on group 0
-->
<CollisionGroups groups={[0]}>
	<Player bind:playerMesh position={[0,2, 0]} />
</CollisionGroups>

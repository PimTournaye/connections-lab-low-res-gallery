<script lang="ts">
	import { CapsuleGeometry, Color, Mesh, MeshStandardMaterial, Vector3 } from 'three';
	import { T, useFrame } from '@threlte/core';
	import { HTML } from '@threlte/extras';
	import { player, socket } from '$lib';

	export let position = [0, 0, 0];
	export let color: string = '#000000';
	export let name: string = 'Me';

	let y = 0;

	const material = new MeshStandardMaterial({ color: new Color(color as string) });

	function levitate() {
		const time = Date.now() / 1000;
		const speed = 1.8;
		const offset = 1;
		y = Math.sin(time * speed) + offset;
		requestAnimationFrame(levitate);
	}
	levitate();

	const speed = 0.03;
	const keys = {
		up: false,
		down: false,
		left: false,
		right: false
	};

	// Listening for arrow keys
	function onKeyDown(e: KeyboardEvent) {
		// console.log(e.key, 'down');
		switch (e.key) {
			case 'ArrowDown':
				keys.down = true;
				break;
			case 'ArrowUp':
				keys.up = true;
				break;
			case 'ArrowLeft':
				keys.left = true;
				break;
			case 'ArrowRight':
				keys.right = true;
				break;
			default:
				break;
		}
	}

	function onKeyUp(e: KeyboardEvent) {
		// console.log(e.key, 'up');
		switch (e.key) {
			case 'ArrowDown':
				keys.down = false;
				break;
			case 'ArrowUp':
				keys.up = false;
				break;
			case 'ArrowLeft':
				keys.left = false;
				break;
			case 'ArrowRight':
				keys.right = false;
				break;
			default:
				break;
		}
	}

	let oldPosition = [...position];

	useFrame(() => {
		let newPos = [...position]; // create a new array
		if (keys.down) newPos[2] += speed;
		if (keys.up) newPos[2] -= speed;
		if (keys.left) newPos[0] -= speed;
		if (keys.right) newPos[0] += speed;

		// If our position has changed, emit it to the server
		if (
			oldPosition[0] !== newPos[0] ||
			oldPosition[1] !== newPos[1] ||
			oldPosition[2] !== newPos[2]) {
			socket.emit('location', $player);
		}
		position = [...newPos];
		// Update our old position 
		oldPosition = [...newPos];

		// Update our player info
		player.set({
			id: socket.id,
			username: $player.username,
			color: $player.color,
			x: newPos[0],
			y: newPos[1],
			z: newPos[2]
		});
	});
</script>

<svelte:window on:keydown={onKeyDown} on:keyup={onKeyUp} />

<T.Mesh
	{position}
	position.y={-0.2 + y / 12}
	receiveShadow
	castShadow
	geometry={new CapsuleGeometry(0.3, 1.8 - 0.3 * 2)}
	{material}
	scale={0.8}
/>

<HTML {position} position.y={1}>
	<div class="player-name">
		<p>{name}</p>
	</div>
</HTML>

<style>
	p {
		text-align: center;
		font-size: 24px;
		color: white;
		text-shadow: 0 0 10px black;
		font-weight: bold;
	}
</style>

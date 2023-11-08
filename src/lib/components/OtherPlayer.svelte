<script lang="ts">
	import { CapsuleGeometry, Color, MeshStandardMaterial } from 'three';
	import { T } from '@threlte/core';
	import { HTML } from '@threlte/extras';

	export let position = [0, 0, 0];
	export let color: string = '#ff0000';
	export let name: string = 'Player';
	let y = 0;

	const material = new MeshStandardMaterial({ color: new Color(color as string) });

	function levitate() {
		const time = Date.now() / 1000;
		const speed = 0.8;
		const offset = 1;
		y = Math.sin(time * speed) + offset;
		requestAnimationFrame(levitate);
	};
	levitate();

</script>

<T.Mesh
	position.x={position[0]}
	position.y={0}
	position.z={position[2]}
	receiveShadow
	castShadow
	geometry={new CapsuleGeometry(0.3, 1.8 - 0.3 * 2)}
	{material}
	scale={0.8}
/>

<HTML {position}>
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
		opacity: 0.5;
	}
</style>
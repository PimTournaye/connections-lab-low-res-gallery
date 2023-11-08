<script lang="ts">
	import { info, viewing } from '$lib';
	import type { ProjectInfo } from '$lib/types';
	import { redirect } from '@sveltejs/kit';
	import { T } from '@threlte/core';
	import { HTML } from '@threlte/extras';
	import { Collider } from '@threlte/rapier';
	import { spring } from 'svelte/motion';

	export let position: [number, number, number] = [0, 0, 0];
	export let scale: [number, number, number] = [1, 1, 1];
	
  let sensed = false;

  $: present(sensed)

  const present = (state: boolean) => {
    info.set(state ? data : null);
    viewing.set(state);
  }


	let isHovering = false
  let isPointerDown = false
  let htmlPosZ = spring(0)
  $: htmlPosZ.set(isPointerDown ? -0.15 : isHovering ? -0.075 : 0, {
    hard: isPointerDown
  })

	const onClick = () => {
		console.log('clicked');
		
		if (data) {
			redirect(300, data.link as string);
		}
	};

	export let data: ProjectInfo;
</script>

<T.Group {position}>
	<Collider
		on:sensorenter={() => sensed = true}
		on:sensorexit={() => sensed = false}
		sensor
		shape={'cuboid'}
		args={scale}
	/>
</T.Group>

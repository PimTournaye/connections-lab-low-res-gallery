<script lang="ts">
	import { info, viewing } from '$lib';
	import type { ProjectInfo } from '$lib/types';
	import { T } from '@threlte/core';
	import { Collider } from '@threlte/rapier';

	export let position: [number, number, number] = [0, 0, 0];
	export let scale: [number, number, number] = [1, 1, 1];
	
  let sensed = false;

  $: present(sensed)

  const present = (state: boolean) => {
    info.set(state ? data : null);
    viewing.set(state);
  }

	export let data: ProjectInfo | null = null;
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

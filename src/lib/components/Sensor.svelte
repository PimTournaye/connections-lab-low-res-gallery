<script lang="ts">
	import { info, viewing } from '$lib';
	import { T } from '@threlte/core';
	import { Collider } from '@threlte/rapier';

	export let position: [number, number, number] = [0, 0, 0];
	
  let sensed = false;

  $: present(sensed)

  const present = (state: boolean) => {
    info.set(state ? data : null);
    viewing.set(state);
  }

	export let data: {
		title: string;
		description: string;
		image: string;
	};
</script>

<T.Group {position}>
	<Collider
		on:sensorenter={() => sensed = true}
		on:sensorexit={() => sensed = false}
		sensor
		shape={'cuboid'}
		args={[1, 1, 1]}
	/>
</T.Group>

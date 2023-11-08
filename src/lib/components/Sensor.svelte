<script lang="ts">
	import { info, player, viewing } from '$lib';
	import type { ProjectInfo } from '$lib/types';
	import { T } from '@threlte/core';
	import { Collider } from '@threlte/rapier';

	export let position: [number, number, number] = [0, 0, 0];
	export let scale: [number, number, number] = [1, 1, 1];
	
	// Boolean to indicate whether a player is in range of the sensor
  let sensed = false;
	// Reactive variable to indicate whether the sensor is being viewed
  $: present(sensed)

  const present = (state: boolean) => {
    info.set(state ? data : null);
    viewing.set(state);
  }
	
	// Update sensed state based on proximity to player
$: if ($player) {
  const playerPos = {
    x: $player.x,
    y: $player.y,
    z: $player.z,
  };

  const center = {
    x: position[0] + 0.5 * scale[0],
    y: position[1] + 0.5 * scale[1],
    z: position[2] + 0.5 * scale[2],
  };

  const distance = Math.sqrt(
    Math.pow(playerPos.x - center.x, 2) +
      Math.pow(playerPos.y - center.y, 2) +
      Math.pow(playerPos.z - center.z, 2)
  );

  if (distance < 0.5 * Math.min(...scale)) {
		console.log('sensed');
    sensed = true;
  } else {
    sensed = false;
  }
}
	export let data: ProjectInfo;
</script>

<T.Group {position}>
	<!-- <Collider
		on:sensorenter={() => sensed = true}
		on:sensorexit={() => sensed = false}
		sensor
		shape={'cuboid'}
		args={scale}
	/> -->
</T.Group>

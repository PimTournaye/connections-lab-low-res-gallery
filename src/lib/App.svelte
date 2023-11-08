<script lang="ts">
  import { Canvas } from '@threlte/core'
  import { Debug, World } from '@threlte/rapier'
  import Scene from './components/Scene.svelte'
	// import Maramtest2 from './components/models/Maramtest2.svelte';
</script>

<Canvas>
  <World>
    <Scene />
  </World>
</Canvas>

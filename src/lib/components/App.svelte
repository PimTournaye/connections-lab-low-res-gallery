<script lang="ts">
  import { Canvas } from '@threlte/core'
  import Scene from './Scene.svelte'
  import { World } from '@threlte/rapier'
	import Test from './models/Test.svelte';
</script>

<Canvas>
  <World>
    <Scene />
    <Test />
  </World>
</Canvas>

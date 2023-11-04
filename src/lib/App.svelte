<script lang="ts">
  import { Canvas } from '@threlte/core'
  import { Debug, World } from '@threlte/rapier'
  import Scene from './components/Scene.svelte'
</script>

<Canvas>
  <World>
    <Debug />
    <Scene />
  </World>
</Canvas>

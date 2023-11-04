<script lang="ts">
	import { player } from '$lib';
  import type { RigidBody as RapierRigidBody } from '@dimforge/rapier3d-compat'
  import { T, useFrame } from '@threlte/core'
  import { BasicPlayerController } from '@threlte/rapier'
  import { CapsuleGeometry, Color, Mesh, MeshStandardMaterial, Vector3 } from 'three'

  export let position: Parameters<Vector3['set']> | undefined = undefined

  export let playerMesh: Mesh
  let rigidBody: RapierRigidBody

  const playerPos = new Vector3()
  const ballPos = new Vector3()
  const maxF = 0.05
  const min = new Vector3(-maxF, 0, -maxF)
  const max = new Vector3(maxF, 0, maxF)
  const material = new MeshStandardMaterial({color: new Color($player.color as string)})

  let y = 0;

  function levitate() {
		const time = Date.now() / 1000
		const speed = 1
		const offset = 1
		y = Math.sin(time * speed) + offset
    
		requestAnimationFrame(levitate)
	}
  levitate()

  useFrame(() => {
    if (!playerMesh || !rigidBody) return
    playerMesh.getWorldPosition(playerPos)

    const diff = playerPos.sub(ballPos).divideScalar(2000)
    diff.y = 0

    const f = diff.clamp(min, max)

    rigidBody.applyImpulse(f, true)
  })
</script>

<!-- To detect the groundedness of the player, a collider on group 15 is used -->
<BasicPlayerController
  {position}
  speed={3}
  radius={0.3}
  height={1.8}
  jumpStrength={2}
  groundCollisionGroups={[15]}
  playerCollisionGroups={[0]}
>
  <T.Mesh
    bind:ref={playerMesh}
    position.y={0.9 + (y /36)}
    receiveShadow
    castShadow
    geometry={new CapsuleGeometry(0.3, 1.8 - 0.3 * 2)}
    material={material}
  />
</BasicPlayerController>
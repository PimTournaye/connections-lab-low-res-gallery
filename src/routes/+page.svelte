<script lang="ts">
	import { info, viewing } from '$lib';
	import App from '$lib/App.svelte';
	$: if ($viewing === false) {
		info.set(null);
	}
	$: console.log($info);

	$: submittedInfo = true;
</script>

{#if submittedInfo === false}
	<form>

  </form>
{:else}
	<div>
		<App />
	</div>
  <section>
test
  </section>
{/if}

<style>
	:global(body) {
		margin: 0;
		overflow: hidden;
		font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
	}

	div {
		width: 80vw;
		height: 100vh;
		background: rgb(13, 19, 32);
		background: linear-gradient(180deg, rgba(13, 19, 32, 1) 0%, rgba(8, 12, 21, 1) 100%);
		position: absolute;
	}

  section {
    width: 20vw;
    height: 100vh;
    background: rgb(13, 19, 32);
    background: linear-gradient(180deg, rgba(13, 19, 32, 1) 0%, rgba(8, 12, 21, 1) 100%);
    position: absolute;
    right: 0;
    color: white;
  }
</style>

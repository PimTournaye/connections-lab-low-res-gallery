<script lang="ts">
  import { info, viewing } from '$lib';
  import App from '$lib/App.svelte';
  
  $: if ($viewing === false) {
    info.set(null);
  }
  $: console.log($info);

</script>


{#if $info}
	<h1>{$info.title}</h1>
	<h2>{$info.author}</h2>
	<img src={$info.image} alt="" />
	<p>{$info.description}</p>
	{#if $info.link}
		<a href={$info.link}>Link</a>
	{/if}
{/if}

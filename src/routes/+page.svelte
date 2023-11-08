<script lang="ts">
	import "../app.css"

	socket.on('connect', () => {
    console.log('Client side connected');
    console.log(socket.id);
	});

	socket.on('disconnect', () => {
		console.log('Client side disconnected');
	});



	import { info, socket, submittedInfo, viewing } from '$lib';
	import App from '$lib/App.svelte';
	import Form from "$lib/components/Form.svelte";
	import Chatbox from "$lib/components/Chatbox.svelte";

	$: if ($viewing === false) {
		info.set(null);
	}
	$: console.log($info);

</script>

<svelte:head>
	<title>Low Res Gallery</title>
</svelte:head>

{#if $submittedInfo === false}
	<Form />
{:else}
	<aside style:viewing={'opacity: 1'}>
		{#if $info}
			<h1>{$info.title}</h1>
			<h2>{$info.author}</h2>
			<img src={$info.image} alt="">
			<p>{$info.description}</p>
			{#if $info.link}
				<a href={$info.link}>Link</a>
			{/if}
		{/if}
	</aside>
	<div>
		<h1>Gallery Floor</h1>
		<App />
	</div>
  <section>
		<Chatbox />
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
		z-index: 1;
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

	h1 {
		margin: 0;
		width: 80vw;
		color: white;
		background-color: #FCFCE0;
	}

	aside {
		z-index: 2;
		position: absolute;
		bottom: 0;
		left: 0;
		width: 20vw;
		height: 40vh;
		background-color: white;
		opacity: 0;
	}
</style>

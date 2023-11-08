<script lang="ts">
	import "../app.css"
	import "../small-logo.png"

	socket.on('connect', () => {
    console.log('Client side connected');
    console.log(socket.id);
	});

	socket.on('disconnect', () => {
		console.log('Client side disconnected');
		socket.emit('disconnect', $player);
	});

	socket.on("location", (players: Player[]) => {
		allPlayers.set(players);
	});


	import { allPlayers, info, player, socket, submittedInfo, viewing } from '$lib';
	import App from '$lib/App.svelte';
	import Form from "$lib/components/Form.svelte";
	import Chatbox from "$lib/components/Chatbox.svelte";
	import ProjectInfo from "$lib/components/ProjectInfo.svelte";
	import type { Player } from "$lib/types";

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
	<aside>
		<ProjectInfo />
	</aside>
	<div>
		<h1>GALLERY FLOOR</h1>
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
		font-family: 'Montserrat', sans-serif;
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
	background-color: #fcfce0;
    position: absolute;
    right: 0;
    color: white;
  }

	h1 {
		margin: 0;
		width: 80vw - 5px;
		height: auto;
		color: #A994B3;
		background-color: #D9D9D9;
		font-size: 20px;
		padding: 5px;
		font-weight: 600;
	}

	aside {
		z-index: 2;
		position: absolute;
		bottom: 0;
		left: 0;
		width: 79vw;
		height: 30vh;
		background-color: #fcfce0;
		padding: 5px;
		/* margin: 10px; */
	}
</style>

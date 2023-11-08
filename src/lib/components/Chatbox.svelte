<script lang="ts">
	import { player, socket } from '$lib';
	import type { ChatMessage } from '$lib/types';
	import { writable } from 'svelte/store';

	// Setting up functionality for chat room
	// Message variable is binded to the input field to react to user input
	let message = '';
	// Making the array of the chat history reactive to easily add new messages
	let chat = writable<ChatMessage[]>([]);

	$: console.log(message);
	

	// Sending messages
	const sendMessage = () => {
		// If the message is empty, don't send it
		if (message === '') return;
		const msgInfo = {
			username: $player.username,
			color: $player.color,
			message: message
		};
		// Emitting the message to the server
		socket.emit('message', msgInfo);
		// Reset the message variable
		message = '';
	};

	// Listening for messages
	socket.on('message', (msgInfo: ChatMessage) => {
		// Adding the new message to the chat history
		chat.update((oldChat) => [...oldChat, msgInfo]);
	});
</script>

<div>
	<section id="logo">
		<img src="small-logo.png" alt="small logo of gallery" />
	</section>
	<section id="chat-room">
		<h2>CHAT ROOM</h2>
		<section id="messages-section">
			{#each $chat as message}
			<p>
				<span style="color: {message.color}">{message.username}</span>: {message.message}
			</p>
			{/each}
		</section>
		<section id="form">
			<input id="chat-input" type="text" bind:value={message}>
			<section id="btn-input">
				<button on:click|preventDefault={sendMessage}>SEND</button>
			</section>
		</section>
	</section>
</div>

<style>
	#logo {
		width: 20vw;
		height: auto;
	}

	img {
		margin-top: 30px;
		width: 100%;
		height: auto;
;
	}

	span {
		color: rgb(34, 34, 34);
		font-size: 13px;
	}

	#chat-room {
		width: 20vw;
		height: auto;
		/* padding-bottom: 200px; */
		background-color: #a994b3;
	}

	#messages-section {
		background-color: #c0b6c5;
		margin: 10px;
		padding: 5px;
		height: 70vh;
		/* position: fixed;
        bottom: 20px;
        right: 150px;
        width: auto;
        height: auto; */
	}

	#form {
		margin: 10px;
		/* width: 100%; */
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		flex-wrap: wrap;
		align-items: justify;
		align-content: center;
	}

	input {
		width: 70%;
		margin: 3px 0px;
		margin-bottom: 10px;
	}

	p {
		font-size: 13px;
		color: #222222;
		display: flex;
		background-color: white;
		border-radius: 3px;
		border-color: white;
		border-width: 0.5px;
		border-style: solid;
		padding: 5px;
		width: fit-content;
	}

	h2 {
		color: #fcfce0;
		font-weight: 600;
		font-size: 20px;
		padding: 3px 5px;
		margin-bottom: 0;
	}

	div {
		background-color: #fcfce0;
		font-family: 'Montserrat', sans-serif;
		width: 100vw;
		height: 100vh;
	}
	#btn-input {
		margin: 3px 0px;
		margin-bottom: 10px;
	}

	button {
		font-family: 'Montserrat', sans-serif;
		font-size: 14px;
		color: #a994b3;
		font-weight: 600;
		/* -webkit-text-stroke: 0.5px grey; */
		background-color: #fcfce0;
		border-style: none;
		border-radius: 5px;
		cursor: pointer;
	}
</style>

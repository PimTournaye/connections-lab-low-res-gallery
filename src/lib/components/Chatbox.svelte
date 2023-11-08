<script lang="ts">
</script>

<div>
	<section id="chat-room">
		<h2>Chat Room</h2>
		<section id="messages-section" />
		<form id="form">
			<input id="chat-input" />
			<button>Send</button>
		</form>
	</section>
</div>

<style>
	span {
		color: rgb(34, 34, 34);
	}

	#chat-room {
		background-color: #a994b3;
	}

	#messages-section {
		background-color: #c0b6c5;
		margin: 10px;
		padding: 5px;
		/* position: fixed;
        bottom: 20px;
        right: 150px;
        width: auto;
        height: auto; */
	}

	p {
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
	}

	div {
		background-color: #fcfce0;
		font-family: 'Montserrat', sans-serif;
		width: 100vw;
		height: 100vh;
	}
</style>

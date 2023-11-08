<script lang="ts">
</script>

<div>
	<section id="logo">
		<img src="small-logo.png" alt="small logo of gallery">
	</section>
	<section id="chat-room">
		<h2>CHAT ROOM</h2>
		<section id="messages-section" />
		<form id="form">
			<input id="chat-input" /><br>
			<section id="btn-input">
			<button>SEND</button>
			</section>
		</form>
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
	}

	span {
		color: rgb(34, 34, 34);
	}

	#chat-room {
		width: 20vw;
		height: auto;
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

	form {
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
		font-weight: 600;
		font-size: 20px;
		padding: 3px 5px;
	}

	div {
		background-color: #fcfce0;
		font-family: 'Montserrat', sans-serif;
		width: 100vw;
		height: 100vh;
	}
	#btn-input {
		margin: 3px 0px;
	}

	button {
		font-family: 'Montserrat', sans-serif;
		font-size: 14px;
		color: #a994b3;
		font-weight: 600;
		/* -webkit-text-stroke: 0.5px grey; */
		background-color: #FCFCE0;
		border-style: none;
		border-radius: 5px;
		cursor: pointer;
	}
</style>

<script lang="ts">
  import { info, viewing } from '$lib';
  import App from '$lib/App.svelte';
  
  $: if ($viewing === false) {
    info.set(null);
  }
  // $: console.log($info);

</script>


{#if $info}
	<div>
		<section id="image-sect">
			<img src={$info.image} alt="" />
		</section>
		<section id="info-sect">
			<h1>{$info.title}</h1>
			<h2>{$info.author}</h2>
			<p>{$info.description}</p>
			{#if $info.link}
				<p> More can be found out <a href={$info.link} target="_blank">here</a> <p>
			{/if}
		</section>
	</div>
	
{/if}


<style>
	div {
		background-color: #FCFCE0;
		font-family: 'Montserrat', sans-serif;
		/* width: 100vw;
		height: 100vh; */
		width: 100%;
		display: flex;
		flex-direction: row;
		/* margin-top: 8px; */
		/* flex-wrap: wrap; */
		/* justify-content: center; */
		/* align-items: center; */
	}

	#info-sect {
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
		/* justify-content: center; */
		align-items: flex-start;
		margin-left: 16px;
		margin-right: 16px;
		width: 60%;
	}

	h1 {
		font-size: 25px;
		margin-bottom: 4px;
	}

	h2{
		font-size: 20px;
		font-style: italic;
	}

	p {
		font-size: 16px;
		color: #222222;
	}

	#image-sect{
		margin: 0 ;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		/* justify-content: center; */
		/* align-items: center; */
		width: 40%;
		height: 100%;
	}

	img {
		max-width: 100%;
		max-height: 100%;
	}
</style>
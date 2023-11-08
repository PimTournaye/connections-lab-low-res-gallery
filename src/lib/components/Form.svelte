<script lang="ts">
  import { player, socket, submittedInfo } from "$lib";
  // Bind input values
  let username: string = "";
  let color: string = "#000000";

  const onClick = (e: Event) => {
    console.log("clicked");
    
    // Update our player info
    player.set({ 
      username: username,
      color: color,
      x: 0,
      y: 0,
      z: 0,
     });
    // emit data
    socket.emit('data', $player);

    // Update our submittedInfo
    submittedInfo.set(true);
  };
</script>

<div>
  <h1>IMA Low Res Gallery</h1>
  <section>
    <form>
        <label for="username">Username:</label><br>
        <input type="text" id="username" name="username" bind:value={username}><br>
        <label for="lname">Color:</label><br>
        <input type="color" id="color" name="color" bind:value={color}>
        <button id="btn" type="submit" on:click|preventDefault={onClick}>Go</button>
    </form>
  </section>
</div>

<style>

  h1 {
    background-color: #FCFCE0;
    font-family: 'Montserrat', sans-serif;
    margin: 0;
  }

  div {
    background-color: #FCFCE0;
    font-family: 'Montserrat', sans-serif;
    width: 100vw;
    height: 100vh;
  }
    
</style>
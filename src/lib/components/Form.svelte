<script lang="ts">
  import { player, socket, submittedInfo } from "$lib";

  import "../small-logo.png";

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
  <section id="logo">
  <img src="small-logo.png" alt="logo for gallery">
  </section>
  <section id="form-section">
    <form>
        <section id="username-input">
          <label for="username">USERNAME:</label><br>
          <input type="text" id="username" name="username" bind:value={username}>
        </section>
        <br>
        <section id="color-input">
          <label for="lname">COLOR:</label><br>
        <input type="color" id="color" name="color" bind:value={color}>
        </section>
        <br><br><br><br>
        <section id=btn-input>
        <button id="btn" type="submit" on:click|preventDefault={onClick}>GO ></button>
        </section>
    </form>
  </section>
</div>

<style>

  #logo {
    width: 100%;
    height: 30vh;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    align-content: center;
  }

  img {
    width: 700px;
    height: auto;
  }

  div {
    background-color: #FCFCE0;
    font-family: 'Montserrat', sans-serif;
    width: 100vw;
    height: 100vh;
  }

  #form-section {
    display: flex;
    text-align: center;
    align-items: center;
    flex-direction: row;
    flex-wrap: wrap;
    align-content: center;
    justify-content: center;
    width: auto;
    height: 50vh;
  }

  form {
    /* margin: 40vh; */
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: center;
    align-content: space-around;
    align-items: stretch;
    width: 380px;
    height: auto;
  }

  #username-input {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
    align-items: center;
    align-content: center;
    width: 100%;
  }

  #username {
    width: 55%;
  }

  #color-input {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
    align-items: center;
    align-content: center;
    width: 100%;
  }

  #color {
    width: 57%;
  }

  label {
    color: #562C86;
    font-weight: 500;
    font-size: 20px;
  }

  #btn-input {
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
    align-items: center;
    align-content: center;
    width: 100%
  }

  button {
    width: 30%;
    font-family: 'Montserrat', sans-serif;
    font-size: 20px;
    font-weight: 600;
    color: white;
    background-color: #A994B3;
    border-style: none;
    border-radius: 5px;
    padding: 5px;
    cursor: pointer;
  }
    
</style>
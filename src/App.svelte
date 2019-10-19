<!--suppress HtmlUnknownAttribute -->
<script>
  import Trains from "./Trains.svelte"

  let result = {TrainAnnouncement: []};

  async function getRandomNumber() {
    const res = await fetch(`.netlify/functions/node-fetch/direction=n`);
    const text = await res.text();

    if (res.ok) {
      return text;
    } else {
      throw new Error(text);
    }
  }

  async function handleClick() {
    result = JSON.parse(await getRandomNumber())
  }
</script>

<button on:click={handleClick}>northbound</button>

<Trains result={result}></Trains>

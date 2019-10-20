<!--suppress HtmlUnknownAttribute -->
<script>
  import locations from './locations'
  import * as grid from "./grid"
  import Trains from "./Trains.svelte"

  let result = {TrainAnnouncement: []};

  function getCurrent(direction) {
    return async () => {
      const res = await fetch(`.netlify/functions/node-fetch?direction=${direction}`);
      const json = await res.json();

      if (res.ok) {
        result = json;
      } else {
        throw new Error(json);
      }
    }
  }
</script>

<style>
  polygon {
    stroke-width: 0.02px
  }

  polygon.clicked {
    fill: gray
  }

  polygon.loaded {
    fill: hsl(240, 100%, 50%)
  }
</style>


<svg viewBox="-4 -6 8 12">
  <polygon
      points={grid.leftTriangle()}
      stroke="#005CFF"
      fill="#f5f5f5"
      on:click={getCurrent("n")}
  />
  <polygon
      points={grid.rightTriangle()}
      stroke="#005CFF"
      fill="#f5f5f5"
      on:click={getCurrent("s")}
  />
  <g>
    <text className="timestamp" textAnchor="middle" x="-1.5" y="-0.5">
    </text>
  </g>
</svg>
<Trains result={result} stations={locations()} />

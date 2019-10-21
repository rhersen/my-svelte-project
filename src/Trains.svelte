<script>
  import _ from "lodash"
  import branchDivider from "./branchDivider"
  import currentTrains from "./currentTrains"

  export let result;
  export let stations;

  $: grouped = _.groupBy(currentTrains(result.TrainAnnouncement, stations), train => branchDivider(train, stations))

  function stationName(locationSignature, stations) {
    return ((stations && stations[locationSignature] && stations[locationSignature].AdvertisedShortLocationName) || locationSignature)
  }
</script>

{#each _.keys(grouped) as key}
  <h3>{key}</h3>
  <ol>
    {#each grouped[key] as announcement}
      <li>{announcement.AdvertisedTrainIdent} {announcement.ActivityType} {stationName(announcement.LocationSignature, stations)}</li>
    {/each}
  </ol>
{/each}

<script>
  import _ from "lodash"
  import branchDivider from "./branchDivider"
  import currentTrains from "./currentTrains"

  export let result;
  export let stations;

  $: grouped = _.groupBy(
      currentTrains(result.TrainAnnouncement, stations),
      train => branchDivider(train, stations)
  )

  function stationName(locationSignature, stations) {
    return (
        (stations &&
            stations[locationSignature] &&
            stations[locationSignature].AdvertisedShortLocationName) ||
        locationSignature
    )
  }
</script>

{#if result.TrainAnnouncement}
  <p>There are {_.keys(grouped).length} announcements</p>
  <ol>
    {#each result.TrainAnnouncement as announcement}
      <li>{announcement.AdvertisedTrainIdent} {announcement.ActivityType} {stationName(announcement.LocationSignature, stations)}</li>
    {/each}
  </ol>
{/if}

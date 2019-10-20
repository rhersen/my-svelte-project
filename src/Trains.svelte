<script>
  export let result;
  export let stations;

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
  <p>There are {result.TrainAnnouncement.length} announcements</p>
  <ol>
    {#each result.TrainAnnouncement as announcement}
      <li>{announcement.AdvertisedTrainIdent} {announcement.ActivityType} {stationName(announcement.LocationSignature, stations)}</li>
    {/each}
  </ol>
{/if}

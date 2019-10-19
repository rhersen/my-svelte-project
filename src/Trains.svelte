<script>
  export let result;
</script>

{#if result.TrainAnnouncement}
  <p>There are {result.TrainAnnouncement.length} announcements</p>
  <ul>
    {#each result.TrainAnnouncement as announcement}
      <li>{announcement.AdvertisedTrainIdent} {announcement.ActivityType} {announcement.LocationSignature}</li>
    {/each}
  </ul>
{/if}

<script lang="ts">
  import { asset } from '$app/paths';

  const character = asset('/character.svg');
</script>

<img class="h-16 w-16 rotate-270" src={character} alt="Character" />

<script lang="ts">
  import GameView from '$lib/components/GameView.svelte';
  import { userState } from '$lib/userstate.svelte.ts';
  import { resolve } from '$app/paths';
  import { goto } from '$app/navigation';

  let username = $derived(userState.username);

  if (!username) {
    goto(resolve('/'));
  }
</script>

<!-- Fix to avoid websocket connecting -->
{#if username}
  <GameView {username}></GameView>
{/if}

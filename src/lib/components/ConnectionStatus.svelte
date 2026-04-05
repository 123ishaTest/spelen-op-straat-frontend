<script lang="ts">
  import WifiConnected from '$lib/components/icons/WifiConnected.svelte';
  import WifiDisconnected from '$lib/components/icons/WifiDisconnected.svelte';

  interface Props {
    isConnected: boolean;
  }

  let { isConnected }: Props = $props();
</script>

{#if isConnected}
  <WifiConnected />
{:else}
  <WifiDisconnected />
{/if}

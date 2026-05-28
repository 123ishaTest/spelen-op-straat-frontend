<script lang="ts">
  import WifiDisconnected from '$lib/components/icons/WifiDisconnected.svelte';

  interface Props {
    isConnected: boolean;
  }

  let { isConnected }: Props = $props();
</script>

{#if !isConnected}
  <WifiDisconnected />
{/if}

<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    children: Snippet;
  }

  let { children }: Props = $props();
</script>

<p class="text-2xl text-white text-shadow-lg text-shadow-zinc-800">
  {@render children()}
</p>

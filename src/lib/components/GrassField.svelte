<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    children: Snippet;
  }

  let { children }: Props = $props();
</script>

<div class="grass">
  {@render children()}
</div>

<style>
  .grass {
    background: repeating-linear-gradient(90deg, #31d978, #31d978 20px, #2ecc71 20px, #2ecc71 40px);
    background-size: 40px 100%;
    background-position: center;
  }
</style>

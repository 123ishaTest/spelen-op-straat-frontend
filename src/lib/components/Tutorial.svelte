<script lang="ts">
  import GrassField from '$lib/components/GrassField.svelte';
  import { goto } from '$app/navigation';
  import { resolve } from '$app/paths';
  import TurnLeft from '$lib/components/icons/TurnLeft.svelte';
  import TurnRight from '$lib/components/icons/TurnRight.svelte';
  import Paragraph from '$lib/components/Paragraph.svelte';
  import CannonballLogo from '$lib/components/CannonballLogo.svelte';
  import Character from '$lib/components/Character.svelte';

  const play = () => {
    goto(resolve('/play'));
  };
</script>

<GrassField>
  <div class="flex h-screen flex-col items-center justify-between p-4">
    <CannonballLogo />

    <Paragraph>Cannonball is a multiplayer street game where you control a soccer player.</Paragraph>

    <Paragraph>
      Your character always moves forward and can be rotated by pressing the left or right arrow keys.
    </Paragraph>

    <div class="flex w-full flex-row justify-around">
      <TurnLeft />
      <Character />
      <TurnRight />
    </div>

    <Paragraph>Score in other goals to gain points!</Paragraph>

    <Paragraph>Have fun!</Paragraph>

    <button
      class="mb-16 w-full cursor-pointer border-4 border-white bg-green-600 p-4 font-bold text-white shadow-2xl drop-shadow-2xl"
      onclick={() => play()}
    >
      <Paragraph>Join!</Paragraph>
    </button>
  </div>
</GrassField>

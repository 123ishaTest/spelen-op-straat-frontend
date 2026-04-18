<script lang="ts">
  import { Direction } from '$lib/model/Direction.ts';
  import TurnLeft from '$lib/components/icons/TurnLeft.svelte';
  import TurnRight from '$lib/components/icons/TurnRight.svelte';

  interface Props {
    onDirectionChanged: (direction: Direction) => void;
  }

  let { onDirectionChanged }: Props = $props();

  let isLeftDown = $state(false);
  let isRightDown = $state(false);
  let latest: Direction = $state(Direction.NONE);

  let direction: Direction = $derived.by(() => {
    if (isLeftDown && isRightDown) {
      return latest;
    }
    if (isLeftDown) {
      return Direction.LEFT;
    }
    if (isRightDown) {
      return Direction.RIGHT;
    }

    return Direction.NONE;
  });

  $effect(() => {
    onDirectionChanged(direction);
  });

  const downLeft = () => {
    isLeftDown = true;
    latest = Direction.LEFT;
  };
  const upLeft = () => {
    isLeftDown = false;
  };

  const downRight = () => {
    isRightDown = true;
    latest = Direction.RIGHT;
  };
  const upRight = () => {
    isRightDown = false;
  };

  const onKeyDown = (e: KeyboardEvent) => {
    switch (e.key) {
      case 'a':
      case 'ArrowLeft':
        downLeft();
        break;
      case 'd':
      case 'ArrowRight':
        downRight();
    }
  };
  const onKeyUp = (e: KeyboardEvent) => {
    switch (e.key) {
      case 'a':
      case 'ArrowLeft':
        upLeft();
        break;
      case 'd':
      case 'ArrowRight':
        upRight();
    }
  };
</script>

<svelte:window
  on:touchstart||preventDefault|passive={() => false}
  on:keydown|preventDefault={onKeyDown}
  on:keyup|preventDefault={onKeyUp}
/>
<div class="flex h-full flex-row">
  <div
    role="button"
    tabindex="-2"
    class="flex flex-1 cursor-pointer flex-col items-center justify-center {isLeftDown ? 'bg-gray-600/20' : ''}"
    onpointerdown={downLeft}
    onpointerup={upLeft}
  >
    <TurnLeft />
  </div>

  <div class="border-2 border-white"></div>
  <div
    role="button"
    tabindex="-1"
    class="flex flex-1 cursor-pointer flex-col items-center justify-center {isRightDown ? 'bg-gray-600/20' : ''}"
    onpointerdown={downRight}
    onpointerup={upRight}
  >
    <TurnRight />
  </div>
</div>

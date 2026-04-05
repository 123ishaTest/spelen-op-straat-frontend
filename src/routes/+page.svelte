<script lang="ts">
  import TurnLeft from '$lib/components/TurnLeft.svelte';
  import TurnRight from '$lib/components/TurnRight.svelte';
  import { onMount } from 'svelte';
  import { Direction } from '$lib/model/Direction.ts';

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

  const sendDirection = (direction: Direction) => {
    // TODO(@Isha): Websocket send
    webSocket.send(
      JSON.stringify({
        type: 'input',
        direction: direction,
      }),
    );
  };

  const webSocket = new WebSocket('ws://localhost:9080');

  onMount(() => {
    return setInterval(() => {
      sendDirection(direction);
    }, 100);
  });
</script>

<div class="grass flex h-screen touch-none flex-col select-none">
  <div class="flex flex-row justify-center border-b-4 border-white">
    <span class="p-4 text-xl font-bold text-white">Spelen op Straat</span>
  </div>
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
</div>

<style>
  .grass {
    background: repeating-linear-gradient(90deg, #31d978, #31d978 20px, #2ecc71 20px, #2ecc71 40px);
    background-size: 40px 100%;
    background-position: center;
  }
</style>

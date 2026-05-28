<script lang="ts">
  import { Direction } from '$lib/model/Direction.ts';
  import ConnectionStatus from '$lib/components/ConnectionStatus.svelte';
  import { PUBLIC_WEBSOCKET_SERVER } from '$env/static/public';
  import type { ServerMessage } from '$lib/model/ServerMessage.js';
  import type { ClientRequest } from '$lib/model/ClientRequest.js';
  import GameController from '$lib/components/GameController.svelte';
  import GrassField from '$lib/components/GrassField.svelte';
  import Paragraph from '$lib/components/Paragraph.svelte';
  import Refresh from '$lib/components/icons/Refresh.svelte';
  import { onMount } from 'svelte';

  let username = $state('Could not connect');
  let color = $state('aaaaaa');

  const sendDirection = (direction: Direction) => {
    sendRequest({ type: 'change-direction', direction: direction });
  };

  const sendHeartbeat = () => {
    sendRequest({ type: 'heartbeat' });
  };

  const sendRequest = (request: ClientRequest) => {
    if (webSocket.readyState === webSocket.OPEN) {
      webSocket.send(JSON.stringify(request));
    }
  };

  const webSocket = new WebSocket(PUBLIC_WEBSOCKET_SERVER);
  let isConnected = $state(false);

  webSocket.addEventListener('open', () => {
    isConnected = true;
  });
  webSocket.addEventListener('close', () => {
    isConnected = false;
  });
  webSocket.addEventListener('error', (e) => {
    console.warn(e);
  });

  const acceptMessage = (data: ServerMessage) => {
    switch (data.type) {
      case 'character-created':
        color = data.color;
        username = data.username;
    }
  };

  webSocket.addEventListener('message', (e) => {
    const data = JSON.parse(e.data);
    acceptMessage(data);
  });

  const onDirectionChanged = (direction: Direction) => {
    if (!isConnected) {
      return;
    }

    sendDirection(direction);
  };

  const refresh = () => {
    window.location.reload();
  };

  onMount(() => {
    const interval = setInterval(() => {
      sendHeartbeat();
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  });
</script>

<GrassField>
  <div class="flex h-screen touch-none flex-col select-none">
    <div
      class="flex flex-row items-center justify-center space-x-4 border-b-4 border-white p-4"
      style="background: #{color};"
    >
      <Paragraph>{username}</Paragraph>
      <ConnectionStatus {isConnected} />
    </div>
    {#if isConnected}
      <GameController {onDirectionChanged} {color} />
    {:else}
      <div class="flex h-full flex-col items-center justify-center">
        <button onclick={() => refresh()}>
          <div class="h-64 w-64">
            <Refresh />
            <Paragraph>Refresh</Paragraph>
          </div>
        </button>
      </div>
    {/if}
  </div>
</GrassField>

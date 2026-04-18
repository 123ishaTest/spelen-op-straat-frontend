<script lang="ts">
  import { Direction } from '$lib/model/Direction.ts';
  import ConnectionStatus from '$lib/components/ConnectionStatus.svelte';
  import { PUBLIC_WEBSOCKET_SERVER } from '$env/static/public';
  import type { ServerMessage } from '$lib/model/ServerMessage.ts';
  import type { ClientRequest } from '$lib/model/ClientRequest.ts';
  import GameController from '$lib/components/GameController.svelte';
  import GrassField from '$lib/components/GrassField.svelte';

  interface Props {
    username: string;
  }

  let { username = 'Anonieme Piet' }: Props = $props();

  let color = $state('aaaaaa');

  const sendDirection = (direction: Direction) => {
    sendRequest({ type: 'change-direction', direction: direction });
  };

  const sendUsername = (username: string) => {
    sendRequest({ type: 'set-name', name: username });
  };

  const sendRequest = (request: ClientRequest) => {
    webSocket.send(JSON.stringify(request));
  };

  const webSocket = new WebSocket(PUBLIC_WEBSOCKET_SERVER);
  let isConnected = $state(false);

  webSocket.addEventListener('open', () => {
    isConnected = true;
    sendUsername(username);
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
</script>

<GrassField>
  <div class="flex h-screen touch-none flex-col select-none">
    <div class="flex flex-row items-center justify-center border-b-4 border-white" style="background: #{color};">
      <span class="p-4 text-xl font-bold text-white">Spelen op Straat ({username})</span>
      <ConnectionStatus {isConnected} />
    </div>
    <GameController {onDirectionChanged} />
  </div>
</GrassField>

<script lang="ts">
  import GrassField from '$lib/components/GrassField.svelte';
  import { goto } from '$app/navigation';
  import { resolve } from '$app/paths';
  import { userState } from '$lib/userstate.svelte.ts';

  const onChange = (event: Event) => {
    const target = event.target as HTMLSelectElement;
    userState.username = target.value;
    goto(resolve('/play'));
  };
</script>

<GrassField>
  <div class="flex h-screen flex-col items-center justify-center">
    <div class="flex-col items-center space-y-4">
      <div class="text-center text-2xl font-bold text-white">Wat is je naam?</div>

      <div>
        <input autofocus onchange={onChange} />
      </div>

      <button
        class="w-full cursor-pointer border-4 border-white bg-green-600 p-4 text-center text-xl font-bold text-white"
      >
        Doe mee!
      </button>
    </div>
  </div>
</GrassField>

<script lang="ts">
	import GradientHeading from '$lib/GradientHeading.svelte';
	import Button from '$lib/ui/Button.svelte';
	import { fly } from 'svelte/transition';
</script>

<header
	in:fly={{ x: -500, duration: 250, delay: 0 }}
	out:fly={{ x: -500, duration: 250 }}
	class="flex h-screen w-screen flex-col items-center justify-center"
>
	<GradientHeading>Welcome to Dataset Gibberskit</GradientHeading>
	<Button><a href="./chart-list">CHART LIST</a></Button>
	<Button><a href="./grid">GRID</a></Button>
</header>

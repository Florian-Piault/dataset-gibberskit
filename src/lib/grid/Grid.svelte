<script lang="ts">
	import { onMount } from 'svelte';
	import GridItem from './GridItem.svelte';
	import { gridStore, unitWidth } from './GridStore';
	import type { Coordinates, Item } from './grid.type';

	export const dimension = 10;
	const DRAG_HOVER_CLASS = 'bg-gray-200';
	let clientWidth = -1;

	$: unitWidth.set(Math.round(clientWidth / dimension));
	$: style = `height: ${$unitWidth}px; width: ${$unitWidth}px`;

	let draggedItemId: string;
	let coordinates: Coordinates[][] = [];
	onMount(() => {
		coordinates = new Array(dimension)
			.fill({})
			.map((_, x) => new Array(dimension).fill({}).map((_, y) => ({ x, y })));
	});

	const onDrag = (e: CustomEvent<{ item: Item; $event: DragEvent }>) => {
		draggedItemId = e.detail.item.id;
		console.log('drag', draggedItemId);
	};

	const allowDrop = ($event: DragEvent) => {
		$event.preventDefault();
		$event.stopPropagation();
		if ($event.dataTransfer?.dropEffect) {
			if (draggedItemId) $event.dataTransfer.dropEffect = 'copy';
			else $event.dataTransfer.dropEffect = 'none';
		}
	};

	const onDragEnter = ($event: DragEvent) => {
		if (draggedItemId) ($event.target as HTMLDivElement).classList.add(DRAG_HOVER_CLASS);
	};

	const onDragLeave = ($event: DragEvent) => {
		if (draggedItemId) ($event.target as HTMLDivElement).classList.remove(DRAG_HOVER_CLASS);
	};

	const dropItem = ($event: DragEvent, cell: Coordinates) => {
		gridStore.editCoords(draggedItemId, cell, $unitWidth);
		draggedItemId = '';
		($event.target as HTMLDivElement).classList.remove(DRAG_HOVER_CLASS);
	};
</script>

<div bind:clientWidth>
	{#if coordinates.length > 0 && $unitWidth > 0}
		<div class="relative flex flex-row">
			{#each $gridStore as item}
				<GridItem {item} on:dragItem={onDrag} />
			{/each}
			{#each coordinates as row}
				<div class="flex flex-col">
					{#each row as cell}
						<div
							class="border"
							on:dragenter={onDragEnter}
							on:dragleave={onDragLeave}
							on:dragover={allowDrop}
							on:drop={($event) => dropItem($event, cell)}
							{style}
						/>
					{/each}
				</div>
			{/each}
		</div>
	{/if}
</div>

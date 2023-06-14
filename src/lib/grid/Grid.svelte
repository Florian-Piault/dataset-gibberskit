<script lang="ts">
	import { onMount } from 'svelte';
	import GridItem from './GridItem.svelte';
	import { gridStore, unitWidth } from './GridStore';
	import type { Coordinates, Item } from './grid.type';

	export const dimension = 12;
	const hoveredClasses = [
		'bg-slate-300',
		'dark:bg-slate-500',
		'border-slate-300',
		'dark:border-slate-500'
	];
	let clientWidth = -1;
	let draggedItem: Item | undefined;
	let coordinates: Coordinates[][] = [];

	$: unitWidth.set(Math.round(clientWidth / dimension));
	$: style = `height: ${$unitWidth}px; width: ${$unitWidth}px`;

	onMount(() => {
		coordinates = new Array(dimension)
			.fill({})
			.map((_, x) => new Array(dimension * 2).fill({}).map((_, y) => ({ x, y })));
	});

	const onDrag = (e: CustomEvent<{ item: Item; event: DragEvent }>) => {
		draggedItem = e.detail.item;
	};

	const allowDrop = ($event: DragEvent) => {
		$event.preventDefault();
		$event.stopPropagation();
		if ($event.dataTransfer?.dropEffect) {
			if (draggedItem) $event.dataTransfer.dropEffect = 'copy';
			else $event.dataTransfer.dropEffect = 'none';
		}
	};

	const onDragEnter = ($event: DragEvent, cell: Coordinates) => {
		if (draggedItem) {
			const widthSpan = Math.round(draggedItem.width / $unitWidth) - 1;
			const heightSpan = Math.round(draggedItem.height / $unitWidth) - 1;
			const xStart = cell.x;
			const yStart = cell.y;

			setTimeout(() => {
				for (let x = xStart; x <= xStart + widthSpan; x++)
					for (let y = yStart; y <= yStart + heightSpan; y++) {
						const el = document.querySelector(`[data-cell-x="${x}"][data-cell-y="${y}"]`);
						if (el) el.classList.add(...hoveredClasses);
					}
			}, 0);
		}
	};

	const removeHoverClass = () => {
		const hoveredElements = document.getElementsByClassName(hoveredClasses[0]);
		if (hoveredElements) {
			Array.from(hoveredElements).forEach((el) => el.classList.remove(...hoveredClasses));
		}
	};

	const onDragLeave = ($event: DragEvent) => removeHoverClass();

	const dropItem = ($event: DragEvent, cell: Coordinates) => {
		if (draggedItem) {
			gridStore.editCoords(draggedItem.id, { ...draggedItem, x: cell.x, y: cell.y });
			draggedItem = undefined;
		}
		removeHoverClass();
	};
</script>

<div bind:clientWidth>
	{#if coordinates.length > 0 && $unitWidth > 0}
		<div class="relative flex flex-row">
			{#each $gridStore as item (item.id)}
				<GridItem {item} on:dragItem={onDrag} />
			{/each}
			{#each coordinates as row}
				<div class="flex flex-col">
					{#each row as cell}
						<div
							class="border border-slate-100 dark:border-slate-700"
							data-cell-x={cell.x}
							data-cell-y={cell.y}
							on:dragenter={($event) => onDragEnter($event, cell)}
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

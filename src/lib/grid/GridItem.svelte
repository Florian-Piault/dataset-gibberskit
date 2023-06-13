<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { Direction, Item } from './grid.type';
	import Resizeable from './Resizeable.svelte';
	import { gridStore, unitWidth } from './GridStore';
	import { writable } from 'svelte/store';

	const dragDispatch = createEventDispatcher<{ dragItem: { item: Item; $event: DragEvent } }>();

	export let item: Item;
	const isGhost = writable<boolean>(false);
	$: leftOffset = Math.floor($unitWidth * item.x);
	$: topOffset = Math.floor($unitWidth * item.y);

	const onDrag = ($event: DragEvent) => {
		$isGhost = true;
		$event.stopPropagation();
		$event.preventDefault();
		dragDispatch('dragItem', { item, $event });
	};

	const onDragEnd = () => {
		$isGhost = false;
	};

	const onResizeX = (e: CustomEvent<{ movement: number; direction: Direction }>) => {
		const { direction, movement } = e.detail;
		if (direction === 'e') {
			item.width += movement;
		}
		if (direction === 'w') {
			item.width -= movement;
			item.x += movement / $unitWidth;
		}
	};

	const onResizeY = (e: CustomEvent<{ movement: number; direction: Direction }>) => {
		const { direction, movement } = e.detail;
		if (direction === 's') {
			item.height += movement;
		}
		if (direction === 'n') {
			item.height -= movement;
			item.y += movement / $unitWidth;
		}
	};
	$: style = `height: ${item.height}px; width: ${item.width}px; position: absolute; left: ${
		$unitWidth * item.x
	}px; top: ${topOffset}px;`;
</script>

<div
	draggable="true"
	on:drag={onDrag}
	on:dragend={onDragEnd}
	class="h-4 w-4 rounded border border-slate-400 bg-gray-50 hover:fill-neutral-200 hover:brightness-110"
	class:translate-x-[9999px]={$isGhost}
	{style}
>
	<div class="absolute h-full w-full overflow-scroll p-4">
		<p>x,y: ({item.x}, {item.y})</p>
		<p>offset: ({leftOffset}, {topOffset})</p>
		<p>size: ({item.width}, {item.height})</p>
	</div>
	<Resizeable on:resizeX={onResizeX} on:resizeY={onResizeY} />
</div>

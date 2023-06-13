<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { Direction, Item } from './grid.type';
	import Resizeable from './Resizeable.svelte';
	import { gridStore, unitWidth } from './GridStore';
	import { writable } from 'svelte/store';

	const dragDispatch = createEventDispatcher<{ dragItem: { item: Item; event: DragEvent } }>();
	const blockClass =
		'absolute h-4 w-4 rounded border border-slate-400 bg-gray-50 hover:fill-neutral-200 hover:brightness-110';
	export let item: Item;
	const isGhost = writable<boolean>(false);

	const onDrag = (event: DragEvent) => {
		$isGhost = true;
		event.stopPropagation();
		event.preventDefault();
		dragDispatch('dragItem', { item, event });
	};

	const onResizeOver = () => {
		gridStore.editCoords(item.id, {
			x: Math.floor(leftOffset / $unitWidth),
			y: Math.floor(topOffset / $unitWidth)
		});

		gridStore.editSize(item.id, {
			width: Math.round(item.width / $unitWidth) * $unitWidth,
			height: Math.round(item.height / $unitWidth) * $unitWidth
		});
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

	$: leftOffset = Math.floor($unitWidth * item.x);
	$: topOffset = Math.floor($unitWidth * item.y);
	$: style = `height: ${item.height}px; width: ${item.width}px; left: ${leftOffset}px; top: ${topOffset}px;`;
</script>

<div
	draggable="true"
	on:drag={onDrag}
	on:dragend={onDragEnd}
	class={blockClass}
	class:translate-x-[9999px]={$isGhost}
	{style}
>
	<div class="absolute h-full w-full overflow-scroll p-4">
		<p>x,y: ({item.x}, {item.y})</p>
		<p>offset: ({leftOffset}, {topOffset})</p>
		<p>size: ({item.width}, {item.height})</p>
	</div>
	<Resizeable on:resizeOver={onResizeOver} on:resizeX={onResizeX} on:resizeY={onResizeY} />
</div>

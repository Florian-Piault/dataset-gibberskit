<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { Direction, Item } from './grid.type';
	import Resizeable from './Resizeable.svelte';
	import { unitWidth } from './GridStore';
	import BarChart from '$lib/chart/BarChart.svelte';
	const dragDispatch = createEventDispatcher<{ dragItem: { item: Item; $event: DragEvent } }>();

	export let item: Item;
	let isGhost = false;
	const onDrag = ($event: DragEvent) => {
		$event.stopPropagation();
		$event.preventDefault();
		hideItem();
		dragDispatch('dragItem', { item, $event });
	};

	const hideItem = () => (isGhost = true);

	const onResizeX = (e: CustomEvent<{ movement: number; direction: Direction }>) => {
		const { direction, movement } = e.detail;
		console.log(movement, direction);
		if (direction === 'e') {
			item.width += movement;
		}
		if (direction === 'w') {
			item.width -= movement;
			STYLE_LEFT += movement;
		}
	};

	const onResizeY = (e: CustomEvent<{ movement: number; direction: Direction }>) => {
		const { direction, movement } = e.detail;
		console.log(movement, direction);
		if (direction === 's') {
			item.height += movement;
		}
		if (direction === 'n') {
			item.height -= movement;
			STYLE_TOP += movement;
		}
	};

	let STYLE_LEFT = $unitWidth * item.x;
	let STYLE_TOP = $unitWidth * item.y;

	$: style = `height: ${item.height}px; width: ${item.width}px; position: absolute; left: ${STYLE_LEFT}px; top: ${STYLE_TOP}px`;
</script>

<div
	draggable="true"
	on:drag={onDrag}
	class="h-4 w-4 rounded border border-slate-400 bg-gray-50 hover:fill-neutral-200 hover:brightness-110 {isGhost
		? 'translate-x-[9999px]'
		: ''}"
	{style}
>
	<div class="absolute h-full w-full overflow-scroll p-4">
		<BarChart />
	</div>
	<Resizeable on:resizeX={onResizeX} on:resizeY={onResizeY} />
</div>

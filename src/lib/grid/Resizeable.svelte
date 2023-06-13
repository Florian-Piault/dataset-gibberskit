<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { Direction } from './grid.type';
	const dispatchEvent = createEventDispatcher();

	let dragging: '' | 'cursor-col-resize' | 'cursor-row-resize' = '';
	let direction: Direction;

	const onInitResize = (
		$event: MouseEvent,
		_class: 'cursor-col-resize' | 'cursor-row-resize',
		_direction: Direction
	) => {
		$event.preventDefault();
		dragging = _class;
		direction = _direction;
		document.body.classList.add(dragging);
	};

	const onResize = ($event: MouseEvent) => {
		if (dragging === 'cursor-col-resize')
			dispatchEvent('resizeX', { movement: $event.movementX, direction });
		else if (dragging === 'cursor-row-resize')
			dispatchEvent('resizeY', { movement: $event.movementY, direction });
	};

	const onMouseUp = (_: MouseEvent) => {
		dispatchEvent('resizeOver');
		document.body.classList.remove(dragging);
		dragging = '';
	};
</script>

<svelte:document on:mouseup={dragging ? onMouseUp : ''} />
<svelte:body on:mousemove={dragging ? onResize : undefined} />

<div>
	<div
		class="absolute top-0 h-2 w-full hover:cursor-row-resize hover:bg-slate-300"
		on:mousedown={($event) => onInitResize($event, 'cursor-row-resize', 'n')}
	/>
	<div
		class="absolute right-0 h-full w-2 hover:cursor-col-resize hover:bg-slate-300"
		on:mousedown={($event) => onInitResize($event, 'cursor-col-resize', 'e')}
	/>
	<div
		class="absolute bottom-0 h-2 w-full hover:cursor-row-resize hover:bg-slate-300"
		on:mousedown={($event) => onInitResize($event, 'cursor-row-resize', 's')}
	/>
	<div
		class="absolute left-0 h-full w-2 hover:cursor-col-resize hover:bg-slate-300"
		on:mousedown={($event) => onInitResize($event, 'cursor-col-resize', 'w')}
	/>
</div>

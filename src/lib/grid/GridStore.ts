import { writable } from 'svelte/store';
import type { Coordinates, Item } from './grid.type';

function createGridStore() {
	const { update, subscribe } = writable<Item[]>([
		{ id: crypto.randomUUID().toString(), width: 100, height: 100, x: 2, y: 2 }
	]);

	const addItem = () =>
		update((items) => [
			...items,
			{
				id: crypto.randomUUID().toString(),
				width: 100,
				height: 100,
				x: 0,
				y: 0
			}
		]);

	const deleteItem = (id: string) => update((items) => items.filter((i) => i.id !== id));

	const editCoords = (id: string, cell: Coordinates, size: number) =>
		update((items) => {
			const item = items.find((i) => i.id === id);
			if (item) {
				item.x = cell.x;
				item.y = cell.y;
				// item.height = size;
				// item.width = size;
				return [...items, item];
			}
			return items;
		});

	return { addItem, deleteItem, editCoords, subscribe };
}

export const unitWidth = writable(-1);

export const gridStore = createGridStore();

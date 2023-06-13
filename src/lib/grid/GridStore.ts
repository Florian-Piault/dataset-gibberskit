import { writable } from 'svelte/store';
import type { Coordinates, Item, Size } from './grid.type';

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

	const editCoords = (id: string, cell: Coordinates) => {
		update((items) => {
			return items.map((i) => {
				if (i.id === id) return { ...i, ...cell };
				return i;
			});
		});
	};

	const editSize = (id: string, size: Size) => {
		update((items) =>
			items.map((i) => {
				if (i.id === id) return { ...i, ...size };
				else return i;
			})
		);
	};

	return { addItem, deleteItem, editCoords, editSize, subscribe };
}

export const unitWidth = writable(-1);

export const gridStore = createGridStore();

export type Item = {
	id: string;
	height: number;
	width: number;
	x: number;
	y: number;
};

export type Coordinates = { x: number; y: number };
export type Size = { width: number; height: number };
export type Direction = 'n' | 'e' | 's' | 'w';

<script lang="ts">
	type Variant = 'primary' | 'secondary' | 'light';

	export let variant: Variant = 'primary';
	export let customClass: string = '';
	const variantStyle: { [index: string]: string } = {
		primary: 'text-blue-200 bg-gradient-to-r from-blue-700 to-blue-800 hover:bg-none ring-2 ',
		secondary:
			'dark:text-blue-300 hover:text-blue-200 text-blue-900 ring-blue-600 bg-gradient-to-r hover:from-blue-600 hover:to-blue-700 ring-2 ',
		light:
			'dark:text-blue-300  text-blue-900 ring-0 hover:bg-gradient-to-r hover:from-blue-800/20 hover:to-blue-950/20'
	};
</script>

<button
	class="{variantStyle[
		variant
	]} {customClass} max-w-sm rounded px-8 py-2 duration-150 hover:scale-110 active:scale-95"
	on:click
	><slot />
</button>

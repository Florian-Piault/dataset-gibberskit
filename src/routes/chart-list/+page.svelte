<script lang="ts">
	import { LineChart, BarChart, PieChart } from '$lib/chart';
	import { BarChartIcon, LineChartIcon, PieChartIcon } from '$lib/icons';
	import Button from '$lib/ui/Button.svelte';

	const charts = [
		{
			id: 'bar',
			name: 'Diagramme en barre',
			icon: BarChartIcon
		},
		{
			id: 'line',
			name: 'Diagramme en ligne',
			icon: LineChartIcon
		},
		{
			id: 'pie',
			name: 'Diagramme cumulatif',
			icon: PieChartIcon
		}
	];
</script>

<main class="w-full bg-gradient-to-br from-slate-50 to-slate-200 sm:w-80">
	<div class="flex flex-col gap-4 p-4">
		{#each charts as chart}
			<Button variant="secondary">
				<span class="flex flex-row items-center justify-center gap-4">
					<svelte:component this={chart.icon} />
					<span>{chart.name}</span>
				</span>
			</Button>
		{/each}
	</div>
</main>

<div class="m-8 resize overflow-hidden rounded border p-8">
	<BarChart />
</div>

<div class="m-8 resize overflow-hidden rounded border p-8">
	<LineChart />
</div>

<div class="m-8 resize overflow-hidden rounded border p-8">
	<PieChart />
</div>

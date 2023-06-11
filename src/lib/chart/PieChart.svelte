<script lang="ts">
	import Chart from 'chart.js/auto';
	import { onMount } from 'svelte';

	let canvas: HTMLCanvasElement;
	let chart: Chart<'pie'>;

	onMount(() => {
		chart = new Chart(canvas, {
			type: 'pie',
			data: {
				labels: ['Label 1', 'Label 2', 'Label 3'],
				datasets: [
					{
						label: 'Données',
						data: [10, 20, 30],
						backgroundColor: ['#8ecae6', '#219ebc', '#023047', '#ffb703', '#fb8500'],
						borderColor: 'rgba(75, 192, 192, 1)',
						borderWidth: 1
					}
				]
			},
			options: {
				responsive: true,
				maintainAspectRatio: false,
				scales: {
					y: {
						beginAtZero: true
					}
				}
			}
		});
	});
</script>

<canvas bind:this={canvas} />

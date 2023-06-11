<script lang="ts">
	import Chart from 'chart.js/auto';
	import { onMount } from 'svelte';

	let canvas: HTMLCanvasElement;
	let chart: Chart<'bar'>;

	onMount(() => {
		chart = new Chart(canvas, {
			type: 'bar',
			data: {
				labels: ['Label 1', 'Label 2', 'Label 3'],
				datasets: [
					{
						label: 'Données',
						data: [10, 20, 30],
						backgroundColor: 'rgba(75, 192, 192, 0.2)',
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

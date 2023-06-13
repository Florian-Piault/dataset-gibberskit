<script>
	import '../app.css';
</script>

<header class="flex h-10 w-screen items-center justify-center shadow-md dark:bg-slate-800">
	<a class="color p-4 text-blue-500 hover:underline hover:brightness-110" href="/">ACCUEIL</a>
</header>
<main
	class="h-full w-screen overflow-scroll bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-900 dark:to-slate-950"
>
	<slot />
</main>

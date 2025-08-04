<script lang="ts">
	import '/src/styles/global.scss';
	import '/src/i18n.svelte.ts';
	import { localeStore } from '../i18n.svelte';
	import { onMount } from 'svelte';
	import { _ } from 'svelte-i18n';

	let { children } = $props();

	let localeLoaded = $derived(!localeStore.isLoading && localeStore.locale);
	let title = $state('');
	onMount(() => {
		document.body.classList.add('loaded');
		if (localeLoaded) {
			title = $_('meta.title');
		}
	});
</script>

<svelte:head>
	<title>{title}</title>
	<meta property="og:title" content="효욱 & 지은 결혼식에 초대합니다 💍" />
	<meta property="og:description" content="2025.9.6 토요일 오후 1시" />
	<meta property="og:image" content="https://our-wedding-invitation-7gp.pages.dev/preview.jpg" />
	<meta property="og:url" content="https://our-wedding-invitation-7gp.pages.dev/" />
	<meta property="og:type" content="website" />
</svelte:head>

{#if localeLoaded}
	{@render children()}
{/if}

<style lang="scss">
</style>

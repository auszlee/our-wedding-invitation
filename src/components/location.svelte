<script lang="ts">
	import { onMount } from 'svelte';
	import locationDeco from '$lib/assets/location-deco.svg';
	import { _ } from 'svelte-i18n';
	import { localeStore } from '../i18n.svelte';
	import { Clipboard, Github } from '@lucide/svelte';
	import { slide } from 'svelte/transition';

	function initializeMap() {
		const container = document.getElementById('kakaomap');
		const center = new kakao.maps.LatLng(37.59203234903392, 127.03569422628917);
		const options = {
			center,
			level: 3
		};
		const map = new kakao.maps.Map(container, options);
		const marker = new kakao.maps.Marker({ position: center });
		marker.setMap(map);
	}

	onMount(() => {
		const waitForKakao = () => {
			if (typeof kakao !== 'undefined' && kakao.maps) {
				kakao.maps.load(() => {
					initializeMap();
				});
			} else {
				setTimeout(waitForKakao, 100);
			}
		};
		waitForKakao();
	});

	function copyAddress() {
		const address = $_('location.address');

		navigator.clipboard
			.writeText(address)
			.then(() => alert($_(address)))
			.catch(() => null);
	}
</script>

<svelte:head>
	<script
		src="//dapi.kakao.com/v2/maps/sdk.js?appkey=a6f047a232b41430897e05564b19c29f&autoload=false"
	></script>
</svelte:head>

<section class="location">
	<h2 class="title {localeStore.locale}">{$_('location.title')}</h2>
	<p class="venue {localeStore.locale}">{$_('location.venue')}</p>
	<button class="copy-address {localeStore.locale}" onclick={copyAddress}>
		<span class="clipboard-icon">
			<Clipboard size="1.1em" />
		</span>
		<span class="address">{$_('location.address')}</span></button
	>
	<div id="kakaomap" class="map"></div>

	<!-- <div class="map">
		<iframe
			class="google-maps"
			title="google maps"
			allowfullscreen
			referrerpolicy="no-referrer-when-downgrade"
			src={googleMapsUrl}
		></iframe>
	</div> -->
	<div class="content {localeStore.locale}" transition:slide={{ duration: 350 }}>
		<div class="transportation-info">
			<div class="info-group">
				<p class="info-title {localeStore.locale}">{$_('transportation.subway_title')}</p>
				<p class="info-content {localeStore.locale}">{$_('transportation.subway_content')}</p>
			</div>
			<div class="info-group">
				<p class="info-title {localeStore.locale}">{$_('transportation.bus_title')}</p>
				<p class="info-content {localeStore.locale}">{$_('transportation.bus_content1')}</p>
				<p class="info-content {localeStore.locale}">{$_('transportation.bus_content2')}</p>
				<p class="info-content {localeStore.locale}">{$_('transportation.bus_content3')}</p>
			</div>
			<div class="info-group">
				<p class="info-title {localeStore.locale}">{$_('transportation.parking_title')}</p>
				<p class="info-content {localeStore.locale}">{$_('transportation.parking_content')}</p>
			</div>
		</div>
	</div>
	<p class="signature en">made with ♡ by Ji Eun & Hyo Wook</p>
	<a class="github-icon" href="https://github.com/jeleedev/our-wedding-invitation" target="_blank"
		><Github size="1.1em" strokeWidth={1} /></a
	>
	<img class="location-deco" src={locationDeco} alt="" />
</section>

<style lang="scss">
	section.location {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		position: relative;
		background-color: $bg-color-1;
		padding: 1em 2em 1em 2em;
	}

	h2.title {
		color: $primary-color;
		text-align: center;
		margin-bottom: 1em;

		&.kr {
			@extend .title-font-kr;
			letter-spacing: 1px;
		}

		&.en {
			@extend .title-font-en;
			letter-spacing: 1px;
		}
	}

	p.venue {
		&.kr {
			@extend .title-font-kr;
			color: $font-color-default;
			font-size: 1.1rem;
			font-weight: 500;
		}
	}

	button.copy-address {
		display: flex;
		align-items: center;
		margin-top: 0.5em;

		.clipboard-icon {
			height: 1em;
			display: inline-block;
			margin-right: 0.2em;
			color: $font-color-default;
		}

		.address {
			display: inline-block;
			font-size: 0.9rem;
		}
	}

	.map {
		margin-top: 2em;
		width: 100%;
		height: 16em;
		margin-bottom: 2em;
	}

	iframe.google-maps {
		width: 100%;
		height: 100%;
		border: none;
		border-radius: 8px;
		box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
	}

	p.signature {
		font-size: 1rem;
	}
	.github-icon {
		margin-top: 0.2em;
		color: $font-color-default;
		cursor: pointer;
	}

	img.location-deco {
		position: absolute;
		bottom: 1.5em;
		right: 1.5em;
	}

	.transportation-info {
		margin-top: 2em;
		width: 100%;
		margin-bottom: 5em;

		.info-group {
			margin-bottom: 1.5em;

			&:last-child {
				margin-bottom: 0;
			}

			.info-title {
				font-weight: 500;
				margin-bottom: 0.5em;
				color: $font-color-default;
				font-size: 1.1rem;
			}

			.info-content {
				font-size: 0.9rem;
				line-height: 1.5;
				color: $font-color-default;
			}
		}
	}
</style>

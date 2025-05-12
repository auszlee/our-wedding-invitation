<script lang="ts">
	import locationTopWave from '$lib/assets/location-top-wave.svg';

	import { _ } from 'svelte-i18n';
	import { localeStore } from '../i18n.svelte';
	import { Clipboard, ChevronDown } from '@lucide/svelte';
	import { slide } from 'svelte/transition';

	let isGroomOpen = false;
	let isBrideOpen = false;

	const {
		VITE_GROOM_BANK_ACCOUNT,
		VITE_GROOM_FATHER_BANK_ACCOUNT,
		VITE_GROOM_MOTHER_BANK_ACCOUNT,
		VITE_BRIDE_BANK_ACCOUNT,
		VITE_BRIDE_FATHER_BANK_ACCOUNT,
		VITE_BRIDE_MOTHER_BANK_ACCOUNT
	} = import.meta.env;

	function copyAccount(account: string | undefined) {
		if (!account) return;
		navigator.clipboard
			.writeText(account)
			.then(() => alert(`${account} 복사`))
			.catch(() => null);
	}
</script>

<img src={locationTopWave} class="location-top-wave" alt="" />
<section class="account">
	{#if localeStore.locale === 'kr'}
		<h2 class="title {localeStore.locale}">{$_('account.title')}</h2>
		<p class="sub-title {localeStore.locale}">{$_('account.sub_title')}</p>
		<div class="account-info">
			<div class="accordion">
				<div class="heading">
					<button class="trigger {localeStore.locale}" onclick={() => (isGroomOpen = !isGroomOpen)}>
						신랑측
					</button>
					<div class="chevron-down-container {localeStore.locale}" class:rotate={isGroomOpen}>
						<ChevronDown strokeWidth={1.25} />
					</div>
				</div>
				{#if isGroomOpen}
					<div class="content {localeStore.locale}" transition:slide={{ duration: 350 }}>
						<div class="account-group">
							<p class="account-title">신랑 | 김효욱</p>
							<button class="copy-account" onclick={() => copyAccount(VITE_GROOM_BANK_ACCOUNT)}>
								<span class="clipboard-icon">
									<Clipboard size="1.1em" />
								</span>
								<span class="account-number"
									>국민은행 <span class="number-only">{VITE_GROOM_BANK_ACCOUNT}</span></span
								>
							</button>
						</div>
						<div class="account-group">
							<p class="account-title">신랑 아버지 | 김용현</p>
							<button
								class="copy-account"
								onclick={() => copyAccount(VITE_GROOM_FATHER_BANK_ACCOUNT)}
							>
								<span class="clipboard-icon">
									<Clipboard size="1.1em" />
								</span>
								<span class="account-number"
									>하나은행
									<span class="number-only">{VITE_GROOM_FATHER_BANK_ACCOUNT}</span></span
								>
							</button>
						</div>
						<div class="account-group">
							<p class="account-title">신랑 어머니 | 신지원</p>
							<button
								class="copy-account"
								onclick={() => copyAccount(VITE_GROOM_MOTHER_BANK_ACCOUNT)}
							>
								<span class="clipboard-icon">
									<Clipboard size="1.1em" />
								</span>
								<span class="account-number"
									>국민은행
									<span class="number-only">{VITE_GROOM_MOTHER_BANK_ACCOUNT}</span></span
								>
							</button>
						</div>
					</div>
				{/if}
			</div>
			<div class="accordion">
				<div class="heading">
					<button class="trigger {localeStore.locale}" onclick={() => (isBrideOpen = !isBrideOpen)}>
						신부측
					</button>
					<div class="chevron-down-container {localeStore.locale}" class:rotate={isBrideOpen}>
						<ChevronDown strokeWidth={1.25} />
					</div>
				</div>
				{#if isBrideOpen}
					<div class="content {localeStore.locale}" transition:slide={{ duration: 350 }}>
						<div class="account-group">
							<p class="account-title">신부 | 이지은</p>
							<button class="copy-account" onclick={() => copyAccount(VITE_BRIDE_BANK_ACCOUNT)}>
								<span class="clipboard-icon">
									<Clipboard size="1.1em" />
								</span>
								<span class="account-number"
									>토스뱅크 <span class="number-only">{VITE_BRIDE_BANK_ACCOUNT}</span></span
								>
							</button>
						</div>
						<div class="account-group">
							<p class="account-title">신부 아버지 | 이한욱</p>
							<button
								class="copy-account"
								onclick={() => copyAccount(VITE_BRIDE_FATHER_BANK_ACCOUNT)}
							>
								<span class="clipboard-icon">
									<Clipboard size="1.1em" />
								</span>
								<span class="account-number"
									>농협은행
									<span class="number-only">{VITE_BRIDE_FATHER_BANK_ACCOUNT}</span></span
								>
							</button>
						</div>
						<div class="account-group">
							<p class="account-title">신부 어머니 | 신현하</p>
							<button
								class="copy-account"
								onclick={() => copyAccount(VITE_BRIDE_MOTHER_BANK_ACCOUNT)}
							>
								<span class="clipboard-icon">
									<Clipboard size="1.1em" />
								</span>
								<span class="account-number"
									>농협은행
									<span class="number-only">{VITE_BRIDE_MOTHER_BANK_ACCOUNT}</span></span
								>
							</button>
						</div>
					</div>
				{/if}
			</div>
		</div>
	{/if}
</section>

<style lang="scss">
	img.location-top-wave {
		max-width: $content-max-width;
		margin: auto;
	}

	section.account {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		background-color: $bg-color-1;
		padding: 2em;
	}

	h2.title {
		color: $primary-color;
		text-align: center;
		margin-bottom: 0.5em;

		&.kr {
			@extend .title-font-kr;
			letter-spacing: 1px;
		}

		&.en {
			@extend .title-font-en;
			letter-spacing: 1px;
		}
	}

	p.sub-title {
		text-align: center;
		white-space: pre-line;
		&.kr {
			margin-top: 0.9em;
			font-size: 0.9rem;
		}

		&.en {
			margin-top: 0.5em;
			font-size: 1.2rem;
		}
	}

	.account-info {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		width: 100%;
		max-width: $content-max-width;

		.bank-name {
			font-size: 0.9rem;
			font-weight: 400;
			text-align: left;
			color: $font-color-default;
		}
	}

	.accordion {
		width: 100%;
		margin-bottom: 1em;

		.heading {
			border-top: 1px solid $primary-color-light;
			position: relative;
		}

		button.trigger {
			color: $primary-color;
			width: 100%;
			background: none;
			border: none;
			cursor: pointer;
			text-align: left;
			padding: 0.6em 0;

			&.en {
				letter-spacing: 1px;
				font-weight: 600;
				font-size: 1.3rem;
			}

			&.kr {
				letter-spacing: 1px;
				font-weight: 500;
				font-size: 1.1rem;
				padding: 0.8em 0;
			}
		}

		.chevron-down-container {
			position: absolute;
			width: 1.5em;
			height: 1.5em;
			right: 0.6em;
			color: $primary-color;
			transition: transform 350ms ease;

			&.en {
				top: 1.05em;
			}

			&.kr {
				top: 0.9em;
			}

			&.rotate {
				transform: rotate(180deg);
			}
		}

		.content {
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			padding: 0.5em 0.5em 1em 0.5em;
			font-weight: 400;
		}

		.account-number {
			display: inline-block;
			font-size: 1.1rem;
			font-weight: 500;

			&.en {
				@extend .title-font-en;
			}

			&.kr {
				@extend .title-font-kr;
			}
		}
	}

	.account-group {
		margin-bottom: 1.5em;
		text-align: left;

		&:last-child {
			margin-bottom: 0;
		}

		.account-title {
			font-weight: 400;
			margin-bottom: 0.5em;
			font-size: 0.9rem;
			color: $font-color-default;
		}
	}

	button.copy-account {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		margin: 0.5em 0;
		background: none;
		border: none;
		cursor: pointer;
		width: 100%;

		.clipboard-icon {
			height: 1em;
			display: inline-block;
			margin-right: 0.2em;
			color: $font-color-default;
		}

		.account-number {
			display: inline-block;
			font-size: 0.9rem;
			font-weight: 500;

			&.en {
				@extend .title-font-en;
			}

			&.kr {
				@extend .title-font-kr;
			}
		}
	}
</style>

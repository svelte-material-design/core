<svelte:options immutable={true} />

<script lang="ts">
	//#region  imports
	import { Input } from "../internal";
	//#endregion

	//#region exports
	//#region base
	let className: string = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = undefined;
	export let dom: HTMLTextAreaElement = undefined;
	//#endregion

	export let resizable: boolean = false;
	//#endregion

	//#region implementation
	//#endregion
</script>

{#if resizable}
	<span class="mdc-text-field__resizer">
		<Input
			bind:dom
			{id}
			class={className}
			{style}
			textArea
			{resizable}
			{...$$restProps}
		/>
	</span>
{:else}
	<Input
		bind:dom
		{id}
		class={className}
		{style}
		textArea
		{resizable}
		{...$$restProps}
	/>
{/if}

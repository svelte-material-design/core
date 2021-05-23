<svelte:options immutable={true} />

<script lang="ts" context="module">
	let count: number = 0;
</script>

<script lang="ts">
	import { PaperStyles } from ".";

	//#region imports
	//#endregion

	//#region exports
	//#region base
	let className: string = undefined;

	export { className as class };
	export let style: string = undefined;
	export let id: string = `@svmd/paper/Paper:${count++}`;
	export let dom: HTMLDivElement = undefined;
	//#endregion

	export let square: boolean = false;
	export let color: "default" | "primary" | "secondary" = "default";
	export let elevation: number = 1;
	export let transition: boolean = false;
	//#endregion

	//#region implementation
	//#endregion
</script>

<div
	bind:this={dom}
	{id}
	class="
    smui-paper
    {className}
    {elevation !== 0 ? 'mdc-elevation--z' + elevation : ''}
    {!square ? 'smui-paper--rounded' : ''}
    {color === 'primary' ? 'smui-paper--color-primary' : ''}
    {color === 'secondary' ? 'smui-paper--color-secondary' : ''}
    {transition ? 'mdc-elevation-transition' : ''}
  "
	{style}
	{...$$restProps}
>
	<slot />
</div>

<PaperStyles />

<script lang="ts">
	//#region Base
	let className: string = undefined;

	export { className as class };
	export let style: string = undefined;
	export let id: string = undefined;

	export let dom: HTMLDivElement = null;

	import { BaseProps } from "./Props";
	export let props: BaseProps = {};
	//#endregion

	// H2
</script>

<h2 bind:this={dom} {...props} {id} class={className} {style}>
	<slot />
</h2>

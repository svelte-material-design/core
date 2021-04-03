<svelte:options immutable={true} />

<script lang="ts">
	import { MDCTextFieldIcon } from "@material/textfield/icon";
	import type { GraphicDOM } from "packages/common";
	import { onDestroy, onMount, tick } from "svelte";

	export let dom: GraphicDOM;

	let icon: MDCTextFieldIcon;
	onMount(async () => {
		await tick();

		icon = new MDCTextFieldIcon(dom);
	});

	onDestroy(() => {
		icon?.destroy();
	});
</script>

<script lang="ts">
	import { MDCTextFieldIcon } from "@material/textfield/icon";
	import type { GraphicDOM } from "packages/common";
	import { onDestroy, onMount, tick } from "svelte";
	import { getInputFieldContext } from "..";

	export let dom: GraphicDOM;

	const inputFieldContext$ = getInputFieldContext();

	let icon: MDCTextFieldIcon;
	onMount(async () => {
		await tick();

		if (!inputFieldContext$) {
			icon = new MDCTextFieldIcon(dom);
		}
	});

	onDestroy(() => {
		icon?.destroy();
	});
</script>

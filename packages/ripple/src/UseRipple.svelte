<script lang="ts" context="module">
	let count = 0;
</script>

<script lang="ts">
	import { RippleProps } from "./Ripple";
	import { Use } from "@raythurnevoid/svelte-hooks";
	import { onDestroy } from "svelte";
	import { SMUIRipple } from "./SMUIRipple";
	import { parseClassList } from "../../common/functions";

	export let target: HTMLElement;
	export let unbounded: RippleProps["unbounded"] = null;
	export let color: RippleProps["color"] = null;
	export let rippleClasses: string = "";
	export let keyboardEvents: RippleProps["keyboardEvents"] = null;
	let className = "";
	export { className as class };

	let ripple: SMUIRipple;
	let forwardedClasses: string = "";

	$: rippleClasses = parseClassList([
		"mdc-ripple-upgraded",
		[color, "mdc-ripple-surface"],
		[color === "primary", "mdc-ripple-surface--primary"],
		[color === "secondary", "mdc-ripple-surface--accent"],
		forwardedClasses,
	]);

	$: if (ripple) {
		ripple.unbounded = unbounded;
	}

	onDestroy(() => {
		ripple?.destroy();
	});

	function classForward(classList: string[]) {
		forwardedClasses = classList.join(" ");
	}

	function initialize() {
		ripple?.destroy();
		ripple = new SMUIRipple(target, {
			classForward,
			keyboardEvents,
		});
	}

	export function reinitialize() {
		initialize();
	}
</script>

<svelte:options immutable={true} />

<Use once effect hook={initialize} when={!!target} />

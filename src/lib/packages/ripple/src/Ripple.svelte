<svelte:options immutable={true} />

<script lang="ts">
	import { onDestroy, onMount, tick } from "svelte";
	import { SMUIRipple } from "./SMUIRipple";
	import { UseState } from "@raythurnevoid/svelte-hooks";
	import { classList } from "@raythurnevoid/strings-filter";

	export let target: HTMLElement;
	export let unbounded: boolean = undefined;
	export let color: "surface" | "primary" | "secondary" = undefined;
	export let keyboardEvents: boolean = undefined;
	export let rippleClasses: string = "";

	let forwardedClasses: string = "";
	let ripple: SMUIRipple;

	$: rippleClasses = classList([
		"mdc-ripple-upgraded",
		[color, "mdc-ripple-surface"],
		[color === "primary", "mdc-ripple-surface--primary"],
		[color === "secondary", "mdc-ripple-surface--accent"],
		forwardedClasses,
	]);

	$: if (ripple) {
		ripple.unbounded = unbounded;
	}

	onMount(async () => {
		await tick();
		initialize();
	});

	onDestroy(() => {
		ripple?.destroy();
	});

	function classForward(classList: string[]) {
		forwardedClasses = classList.join(" ");
	}

	function initialize() {
		ripple?.destroy();
		ripple = null;
		if (target) {
			ripple = new SMUIRipple(target, {
				classForward,
				keyboardEvents,
			});
		}
	}

	export function reinitialize() {
		initialize();
	}
</script>

<slot {rippleClasses} />
<UseState value={target} onUpdate={initialize} />

<style lang="scss" global>
	@use "smui-theme.scss";
	@use "@material/ripple";
	@use "@material/theme";

	@include ripple.core-styles;

	.mdc-ripple-surface--primary {
		@include ripple.states(theme.$primary);
	}

	.mdc-ripple-surface--secondary {
		@include ripple.states(theme.$secondary);
	}
</style>

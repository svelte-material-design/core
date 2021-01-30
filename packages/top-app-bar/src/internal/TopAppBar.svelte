<svelte:options immutable={true} />

<script lang="ts">
	//#region  imports
	import { MDCTopAppBar } from "@material/top-app-bar";
	import { onMount, onDestroy, createEventDispatcher, tick } from "svelte";
	import { parseClassList } from "../../../common/functions";
	import type {
		TopAppBarVariant,
		TopAppBarColor,
		OnTopAppBarNavClick,
	} from "..";
	import { UseState } from "@raythurnevoid/svelte-hooks";
	//#endregion

	//#region exports
	//#region base
	let className = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = undefined;
	export let dom: HTMLDivElement = undefined;
	//#endregion

	export let variant: TopAppBarVariant = "standard";
	export let color: TopAppBarColor = "primary";
	export let dense: boolean = false;
	export let prominent: boolean = false;
	export let scrollTarget: HTMLElement = undefined;

	let contentClassName: string = undefined;
	export { contentClassName as contentClass };
	//#endregion

	//#region implementation
	const dispatch = createEventDispatcher<{
		beforeInitialization: void;
		afterInitialization: void;
		nav: OnTopAppBarNavClick;
	}>();
	let topAppBar: MDCTopAppBar;

	let contentClass: string;
	$: if (prominent && dense) {
		contentClass = "mdc-top-app-bar--dense-prominent-fixed-adjust";
	} else if (prominent) {
		contentClass = "mdc-top-app-bar--prominent-fixed-adjust";
	} else if (dense) {
		contentClass = "mdc-top-app-bar--dense-fixed-adjust";
	} else {
		contentClass = "mdc-top-app-bar--fixed-adjust";
	}

	onMount(async () => {
		await tick();
		initializeNotified();
	});

	onDestroy(() => {
		topAppBar?.destroy();
	});

	function initializeNotified() {
		dispatch("beforeInitialization");
		initialize();
		dispatch("afterInitialization");
	}

	export function initialize() {
		topAppBar?.destroy();
		topAppBar = new MDCTopAppBar(dom);
		topAppBar.listen("MDCTopAppBar:nav", () => {
			dispatch("nav");
		});
		updateScrollTarget();
	}

	function updateScrollTarget() {
		topAppBar.setScrollTarget(scrollTarget ?? window);
	}
	//#endregion
</script>

<UseState value={[dense, prominent, variant]} onUpdate={initializeNotified} />
<UseState value={scrollTarget} onUpdate={updateScrollTarget} />

<header
	bind:this={dom}
	{id}
	class={parseClassList([
		className,
		"mdc-top-app-bar",
		[variant === "fixed", "mdc-top-app-bar--fixed"],
		[color === "secondary", "svmd-top-app-bar--color--secondary"],
		[prominent, "mdc-top-app-bar--prominent"],
		[dense, "mdc-top-app-bar--dense"],
	])}
	{style}
	{...$$restProps}
>
	<div class="mdc-top-app-bar__row">
		<slot contentClass={contentClassName} />
	</div>
</header>
<slot name="content" className={contentClass} />

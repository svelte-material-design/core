<svelte:options immutable={true} />

<script lang="ts">
	//#region imports
	import { classList } from "@raythurnevoid/strings-filter";
	import { MDCLinearProgress } from "@material/linear-progress";
	import { onMount, onDestroy, tick } from "svelte";
	import { UseDebounce, UseState } from "@raythurnevoid/svelte-hooks";
	//#endregion

	//#region exports
	//#region base
	let className: string = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = undefined;
	export let dom: HTMLDivElement = undefined;
	//#endregion

	export let indeterminate: boolean = false;
	export let reversed: boolean = false;
	export let closed: boolean = false;
	export let progress: number = 0;
	$: if (progress < 0) progress = 0;
	$: if (progress > 1) progress = 1;
	export let buffer: number = 1;
	export let disableMDCInstance: boolean = false;
	//#endregion

	//#region implementation
	let debouncedProgress: number = progress;
	let linearProgress: MDCLinearProgress;

	onMount(() => {
		istantiate();
	});

	$: if (linearProgress) {
		tick().then(() => {
			if (linearProgress.reverse !== reversed) {
				linearProgress.reverse = reversed;
			}

			if (linearProgress.determinate !== !indeterminate) {
				linearProgress.determinate = !indeterminate;
			}

			if (linearProgress.progress !== debouncedProgress) {
				linearProgress.progress = debouncedProgress;
			}

			if (linearProgress.buffer !== buffer) {
				linearProgress.buffer = buffer;
			}
		});
	}

	onDestroy(() => {
		linearProgress?.destroy();
	});

	function istantiate() {
		if (!disableMDCInstance) {
			if (closed) dom.classList.add("mdc-linear-progress--closed");
			linearProgress = new MDCLinearProgress(dom);
		}
	}

	async function handleClosedValueChange() {
		if (linearProgress) {
			if (closed) {
				linearProgress.close();
			} else {
				linearProgress.open();
			}
		}
	}
	//#endregion
</script>

<UseState value={closed} onUpdate={handleClosedValueChange} />
<UseDebounce
	value={progress}
	bind:debounced={debouncedProgress}
	interval={500}
/>

<div
	bind:this={dom}
	{id}
	class={classList([
		className,
		"mdc-linear-progress",
		[indeterminate, "mdc-linear-progress--indeterminate"],
		[reversed, "mdc-linear-progress--reversed"],
	])}
	{style}
	role="progressbar"
	aria-valuemin="0"
	aria-valuemax="1"
	aria-valuenow={indeterminate ? undefined : progress}
	{...$$restProps}
>
	<div class="mdc-linear-progress__buffer">
		<div class="mdc-linear-progress__buffer-bar" />
		<div class="mdc-linear-progress__buffer-dots" />
	</div>
	<div
		class="mdc-linear-progress__bar mdc-linear-progress__primary-bar"
		style="transform: scaleX({progress})"
	>
		<span class="mdc-linear-progress__bar-inner" />
	</div>
	<div class="mdc-linear-progress__bar mdc-linear-progress__secondary-bar">
		<span class="mdc-linear-progress__bar-inner" />
	</div>
</div>

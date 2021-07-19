import { createContextWritableStore } from "@raythurnevoid/svelte-context-enhanced";
import type { GroupBindings } from "@raythurnevoid/svelte-group-components/components-group";

export const [setSliderContext, getSliderContext] =
	createContextWritableStore<SliderContext>();
export const [setRangeContext, getRangeContext] =
	createContextWritableStore<RangeContext>();

export interface SliderContext {
	group: GroupBindings;
	discrete: boolean;
	disabled: boolean;
	step: number;
	handleValueUpdate(): void;
	reistantiate(): void;
}

export interface RangeContext {
	value: number;
	min: number;
	max: number;
	setValue(value: number, event?: "input" | "change");
	setMin(value: number);
	setMax(value: number);
}

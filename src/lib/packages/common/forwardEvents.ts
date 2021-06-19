import { bubble, listen } from "svelte/internal";
import { listenEvents, ListenerOpt } from "./mdcEvents";

const domEvents: DOMEvents[] = [
	"focus",
	"blur",
	"fullscreenchange",
	"fullscreenerror",
	"scroll",
	"cut",
	"copy",
	"paste",
	"keydown",
	"keypress",
	"keyup",
	"auxclick",
	"click",
	"contextmenu",
	"dblclick",
	"mousedown",
	"mouseenter",
	"mouseleave",
	"mousemove",
	"mouseover",
	"mouseout",
	"mouseup",
	"pointerlockchange",
	"pointerlockerror",
	"select",
	"wheel",
	"drag",
	"dragend",
	"dragenter",
	"dragstart",
	"dragleave",
	"dragover",
	"drop",
	"touchcancel",
	"touchend",
	"touchmove",
	"touchstart",
	"pointerover",
	"pointerenter",
	"pointerdown",
	"pointermove",
	"pointerup",
	"pointercancel",
	"pointerout",
	"pointerleave",
	"gotpointercapture",
	"lostpointercapture",
];

export function forwardEventsBuilder(component, additionalEvents = []) {
	const events = [...domEvents, ...additionalEvents];

	function forward(e) {
		bubble(component, e);
	}

	return (node) => {
		const destructors = [];

		for (let i = 0; i < events.length; i++) {
			destructors.push(listen(node, events[i], forward));
		}

		return {
			destroy: () => {
				for (let i = 0; i < destructors.length; i++) {
					destructors[i]();
				}
			},
		};
	};
}

export function listenDOMEvents(node: HTMLElement, opts: ListenerOpt<Event>[]) {
	return listenEvents(node, opts);
}

export function listenAllDOMEvents(
	node: HTMLElement,
	listener: (event: Event) => void
) {
	const domListeners = createDOMEventsListeners(listener);
	const { update: parentUpdate, destroy } = listenEvents(node, domListeners);

	return {
		update(listener: (event: Event) => void) {
			const newDomListeners = createDOMEventsListeners(listener);
			parentUpdate(newDomListeners);
		},
		destroy,
	};
}

function createDOMEventsListeners(
	listener: (event: Event) => void
): ListenerOpt<Event>[] {
	function domEventListener(event: Event) {
		listener(event);
	}

	return domEvents.map((eventName) => ({
		eventName,
		listener: domEventListener,
	}));
}

export type DOMEvents = keyof DocumentEventMap;

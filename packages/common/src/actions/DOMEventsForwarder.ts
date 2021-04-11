import { createEventDispatcher } from "svelte/internal";
import { listenEvents } from "../../mdcEvents";
import type { ListenerOpt } from "../../mdcEvents";

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

const essentialDomEvents: (keyof SMUIDOMEvents)[] = [
	"keydown",
	"keypress",
	"keyup",
	"click",
	"change",
	"select",
	"focus",
	"focusout",
	"focusin",
];

export function DOMEventsForwarder() {
	const dispatch = createEventDispatcher<SMUIDOMEvents>();

	return function forwardAllDOMEvents(node: Node) {
		function listener(event: Event) {
			dispatch(event.type as any, event);
			dispatch("domEvent", event);
		}

		const { destroy } = listenAllDOMEvents(node, listener);

		return {
			destroy,
		};
	};
}

function listenAllDOMEvents(node: Node, listener: (event: Event) => void) {
	const domListeners = createDOMEventsListeners(listener);
	const { update: parentUpdate, destroy } = listenDOMEvents(node, domListeners);

	return {
		update(listener: (event: Event) => void) {
			const newDomListeners = createDOMEventsListeners(listener);
			parentUpdate(newDomListeners);
		},
		destroy,
	};
}

function listenDOMEvents(node: Node, opts: ListenerOpt<Event>[]) {
	return listenEvents(node, opts);
}

function createDOMEventsListeners(
	listener: (event: Event) => void
): ListenerOpt<Event>[] {
	function domEventListener(event: Event) {
		listener(event);
	}

	return essentialDomEvents.map((eventName) => ({
		eventName,
		listener: domEventListener,
	}));
}

export type DOMEvents = keyof DocumentEventMap;

export interface SMUIDOMEvents {
	domEvent: Event;
	keydown: KeyboardEvent;
	keypress: KeyboardEvent;
	keyup: KeyboardEvent;
	click: MouseEvent;
	change: Event;
	select: Event;
	focus: Event;
	focusout: Event;
	focusin: Event;
}

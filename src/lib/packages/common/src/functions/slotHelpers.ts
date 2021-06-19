import { StringListToFilter, filterStringList } from ".";

export function createSlotClassListHandler(
	target: HTMLElement,
	classList: StringListToFilter
): SlotClassListHandler {
	if (!target) {
		return;
	}

	if (target.tagName === "SVELTE-FRAGMENT") {
		return createSvelteFragmentSlotHandler(target, classList);
	} else {
		return createDirectSlotHandler(target, classList);
	}
}

function createDirectSlotHandler(
	target: HTMLElement,
	classList: StringListToFilter
) {
	let directSlotObserver: MutationObserver;
	let directSlotFn: (target: HTMLElement) => void;

	let updateMutationHandler = (classList: StringListToFilter) => {
		directSlotFn = createMutationHandler(classList);
		directSlotFn(target);
	};

	directSlotObserver = new MutationObserver((mutations) => {
		const relevantMutations = mutations.filter((mutation) => {
			return mutation.type === "attributes";
		});

		relevantMutations.forEach(() => {
			directSlotFn(target);
		});
	});

	updateMutationHandler(classList);

	directSlotObserver.observe(target, {
		attributeFilter: ["class"],
		attributes: true,
	});

	return {
		update: (classList: StringListToFilter) => {
			updateMutationHandler(classList);
		},
		destroy: () => {
			directSlotObserver.disconnect();
		},
	};
}

function createSvelteFragmentSlotHandler(
	target: HTMLElement,
	classList: StringListToFilter
): SlotClassListHandler {
	let svelteFragmentSlotObserver: MutationObserver;
	let svelteFragmentChildrenObserver: MutationObserver;
	let svelteFragmentChildFn: (child: HTMLElement) => void;

	let updateMutationHandler = (classList: StringListToFilter) => {
		svelteFragmentChildFn = createMutationHandler(classList);
		elementChilds(target.childNodes).forEach((child) =>
			svelteFragmentChildFn(child as HTMLElement)
		);
	};

	let elementChilds = (childs: NodeListOf<ChildNode> | NodeList) => {
		return Array.from(childs).filter(
			(node) => node.nodeType === Node.ELEMENT_NODE
		);
	};

	svelteFragmentSlotObserver = new MutationObserver((mutations) => {
		const relevantMutations = mutations.filter((mutation) => {
			return mutation.type === "childList" && mutation.addedNodes.length > 0;
		});

		relevantMutations.forEach((mutation) => {
			elementChilds(mutation.addedNodes).forEach((child) => {
				svelteFragmentChildFn(child as HTMLElement);

				svelteFragmentChildrenObserver.observe(child, {
					attributeFilter: ["class"],
					attributes: true,
				});
			});
		});
	});

	svelteFragmentChildrenObserver = new MutationObserver((mutations) => {
		const relevantMutations = mutations.filter((mutation) => {
			return mutation.type === "attributes";
		});

		relevantMutations.forEach((mutation) => {
			svelteFragmentChildFn(mutation.target as HTMLElement);
		});
	});

	updateMutationHandler(classList);

	svelteFragmentSlotObserver.observe(target, {
		childList: true,
	});

	return {
		update: (classList: StringListToFilter) => {
			updateMutationHandler(classList);
		},
		destroy: () => {
			svelteFragmentChildrenObserver.disconnect();
			svelteFragmentSlotObserver.disconnect();
		},
	};
}

export interface SlotClassListHandler {
	update(classList: StringListToFilter): void;
	destroy(): void;
}

export type SlotClassListHandlerFactory = (
	element: HTMLElement
) => SlotClassListHandler;

function createMutationHandler(classList: StringListToFilter) {
	return (target: HTMLElement) => {
		const filteredClassList = filterStringList(classList);
		filteredClassList.forEach((className) => {
			if (!target.classList.contains(className)) {
				target.classList.add(className);
			}
		});
	};
}

export function isSlot(element: Element, slotName: string) {
	let parent = element.parentElement;
	return (
		element.getAttribute("slot") === slotName ||
		parent.getAttribute("slot") === slotName
	);
}

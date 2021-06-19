import {
	MDCRipple,
	MDCRippleAdapter,
	MDCRippleFoundation,
} from "@material/ripple";

interface SMUIRippleProps {
	classForward?: (classList: string[]) => void;
	keyboardEvents?: boolean;
}

export class SMUIRipple {
	public active = false;
	public ripple: MDCRipple;
	#unbounded: boolean = false;

	constructor(
		public root: HTMLElement,
		{ classForward, keyboardEvents }: SMUIRippleProps
	) {
		let classList: string[] = [];

		if (keyboardEvents) {
			this.root.addEventListener("keydown", (event: KeyboardEvent) => {
				if (isSubmitKey(event)) this.active = true;
			});

			this.root.addEventListener("keyup", (event: KeyboardEvent) => {
				if (isSubmitKey(event)) this.active = false;
			});
		}

		const adapter: Partial<MDCRippleAdapter> = {
			...MDCRipple.createAdapter(this),
			addClass: (className: string) => {
				const idx = classList.indexOf(className);
				if (idx === -1) {
					this.root.classList.add(className);
					classList.push(className);

					if (classForward) {
						classForward([...classList]);
					}
				}
			},
			removeClass: (className: string) => {
				const idx = classList.indexOf(className);
				if (idx !== -1) {
					this.root.classList.remove(className);
					classList.splice(idx, 1);

					if (classForward) {
						classForward(classList);
					}
				}
			},
		};

		if (keyboardEvents) {
			adapter.isSurfaceActive = () => this.active;
		}

		const foundation = new MDCRippleFoundation(adapter);

		this.ripple = new MDCRipple(this.root, foundation);

		this.root.addEventListener("focusout", () => {
			this.ripple.deactivate();
		});
	}

	get unbounded() {
		return this.ripple?.unbounded ?? this.#unbounded;
	}

	set unbounded(unbounded: boolean) {
		this.ripple.unbounded = unbounded;
		this.#unbounded = unbounded;
	}

	destroy() {
		this.ripple?.destroy();
	}
}

function isSubmitKey(event: KeyboardEvent) {
	const isEnter = event.key === "Enter";
	const isSpace = event.key === "Space";
	return isEnter || isSpace;
}

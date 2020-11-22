export function initValue(value, min, max, step, range) {
	let _value: [number] | [number, number] = [] as any;

	if (range) {
		_value = value as [number, number];
	} else {
		if (typeof value === "number") {
			_value = [value] as [number];
		} else {
			value = min;
			_value = [min];
		}
	}

	_value.forEach((v, index) => {
		if (v < min) _value[index] = min;
		if (v > max) _value[index] = max;

		const vMod = v % step;
		if (vMod) {
			value[index] = v - vMod;
		}
	});

	if (range) {
		value = _value as [number, number];
	} else {
		value = _value[0];
	}

	return _value;
}

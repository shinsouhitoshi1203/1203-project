function removeField(data, key) {
	// Detect if the key is a regex pattern, will filter all and will delete all keys that match the pattern
	if (key instanceof RegExp) {
		const targetedKeys =
			Object.keys(data).filter((k) => k.match(key)) ?? [];
		targetedKeys.forEach((k) => delete data[k]);
	} else {
		delete data[key];
	}
}

function removeFields(data, keys) {
	keys.forEach((key) => {
		removeField(data, key);
	});
}

const object = {
	removeField,
	removeFields
};

export default object;

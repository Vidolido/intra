export function getItemWithId(data, templateData) {
	// Тука да исхендлам ерори, доколку некое не се совпаѓа, да пријавам на рецепција.
	const newTemplateData = templateData.map((templateItem) => {
		let newItem = templateItem.map(([groupName, id]) => {
			let findCollection = data.find(
				(item) => JSON.stringify(item.groupName) === JSON.stringify(groupName)
			);

			let itemFromId = findCollection.collection.find(
				(item) => item._id === id
			);

			return [groupName, itemFromId];
		});
		return newItem;
	});
	console.log(newTemplateData, 'newTemplate');
	return newTemplateData;
}

export function displayData(data) {
	let newData = data.reduce((acc, currentValue) => {
		if (!acc[currentValue.product]) {
			acc[currentValue.product] = [currentValue];
		} else {
			acc[currentValue.product].push(currentValue);
		}

		return acc;
	}, {});

	return newData;
}

export function getItemWithId(data, templateData) {
	const newTemplateData = templateData.map((item) => {
		let newItem = item.map((tD, i) => {
			let findCollection = data.find(
				(item) => JSON.stringify(item.groupName) === JSON.stringify(tD[0])
			);

			let itemFromId = findCollection.collection.find(
				(item) => item._id === tD[1]
			);

			return [tD[0], itemFromId];
		});
		return newItem;
	});

	return newTemplateData;
}

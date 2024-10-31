export const orderBySector = (businessAreas, items) => {
	const result = [];
	businessAreas.forEach((businessArea) => {
		const filteredItems = items.filter(
			(item) => item.businessArea._id === businessArea._id
		);
		if (!filteredItems.length) return;
		result.push({ name: businessArea.name, items: filteredItems });
	});
	return result;
};

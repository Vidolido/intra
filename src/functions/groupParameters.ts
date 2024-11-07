export const groupParameters = (template) => {
  const newArray = [];
  let currentGroup = null;

  template &&
    template.forEach((currentValue) => {
      if (currentValue.grouped.isGrouped) {
        if (
          !currentGroup ||
          currentGroup._id !== currentValue.grouped.group._id
        ) {
          // Create a new group if there's no current group or the _id is different
          currentGroup = {
            isGroup: true,
            name: currentValue?.grouped?.group?.name,
            _id: currentValue?.grouped?.group?._id,
            items: [],
          };
          newArray.push(currentGroup);
        }
        currentGroup.items.push(currentValue);
      } else {
        currentGroup = null; // Reset the current group
        newArray.push(currentValue); // Push the non-grouped item to the new array
      }
    });

  return newArray;
};

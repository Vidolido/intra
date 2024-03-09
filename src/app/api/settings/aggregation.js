export const getGroupedSettings = [
	{
		$group: {
			_id: '$groupName',
			collection: {
				$push: '$$ROOT',
			},
		},
	},
	{
		$project: {
			_id: 0,
			groupName: '$_id',
			collection: 1,
		},
	},
];

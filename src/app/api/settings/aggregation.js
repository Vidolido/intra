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

export const editGroupedSettings = (lang, setting) => {
	return [
		{
			$match: {
				[`groupName.${lang}`]: setting,
			},
		},
		{
			$group: {
				_id: '$groupName',
				collection: {
					$push: '$$ROOT',
				},
				collectionType: {
					$first: '$collectionType',
				},
			},
		},
		{
			$project: {
				_id: 0,
				groupName: '$_id',
				collection: 1,
				collectionType: 1,
			},
		},
	];
};

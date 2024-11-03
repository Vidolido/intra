import { LanguageMap } from '@/types/type';

type HeadingsProps = {
	parameter: LanguageMap;
	collections: LanguageMap[];
};

interface HeadingsTableRowProps {
	headings: HeadingsProps;
	defaultLanguage: string;
}

const HeadingsTableRow = ({
	headings,
	defaultLanguage,
}: HeadingsTableRowProps) => {
	return (
		<tr>
			<td></td>
			{headings && headings.parameter && (
				<th className='border w-fit text-left px-3'>
					{headings?.parameter[defaultLanguage]}
				</th>
			)}

			{headings &&
				headings?.collections &&
				headings?.collections?.map((collection: LanguageMap, index: number) => (
					<th key={index} className='border w-fit text-left px-3'>
						{collection[defaultLanguage]}
					</th>
				))}
			<td></td>
		</tr>
	);
};

export default HeadingsTableRow;

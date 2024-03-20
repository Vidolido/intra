'use client';

import AnalisysHeader from './AnalisysHeader';
import ParentForm from './ParentForm';
import TemlpateData from './TemlpateData';

export default function AnalisysForm() {
	return (
		<ParentForm>
			<AnalisysHeader />
			<TemlpateData />
		</ParentForm>
	);
}

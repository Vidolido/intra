'use client';

// state/context
import { useAnalisysContext } from '@/app/dashboard/_state/analisys/analisysContext';

export default function TemlpateData() {
	const { templates } = useAnalisysContext();
	console.log(templates, 'the template data');
	return <div>TemlpateData</div>;
}

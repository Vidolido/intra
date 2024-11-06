'use client';
import { useFormState } from 'react-dom';

// state/actions
import { saveTemplateHeader } from '@/data-acceess/templates/saveTemplateHeader';

// components
import ContextButton from '@/components/reusable/ContextButton';
import DocumentStatus from './DocumentStatus';
import Product from './Product';
import TemplateName from './TemplateName';

// types
import {
	ActionResponse,
	DynamicTemplateSettings,
	LaboratoryTemplate,
} from '@/types/type';

interface TemplateHeaderProps {
	defaultLanguage: string;
	settings: DynamicTemplateSettings;
	template: LaboratoryTemplate;
}
const TemplateHeader = ({
	defaultLanguage,
	settings,
	template,
}: TemplateHeaderProps) => {
	const initialState: ActionResponse = {
		data: null,
		success: null,
		error: null,
		message: null,
		component: null,
		isLoading: false,
	};
	const wrappedAction = async (
		prevState: ActionResponse,
		formData: FormData
	) => {
		try {
			if (settings.laboratoryTemplates) {
				formData.append(
					'options-schema',
					JSON.stringify(settings.laboratoryTemplates.optionsSchema)
				);
			}
			const result = await saveTemplateHeader(prevState, formData);
			return result || initialState;
		} catch (error) {
			if (error instanceof Error)
				return {
					...initialState,
					error: true,
					message: error.message,
					isLoading: false,
				};
			return initialState;
		}
	};
	const [state, formAction] = useFormState<ActionResponse, FormData>(
		wrappedAction,
		{
			data: null,
			success: null,
			error: null,
			message: null,
			component: null,
			isLoading: false,
		}
	);

	let hasName = template.templateName ?? null;
	return (
		<form
			action={formAction}
			// action={handleSubmit}
			className='border border-slate-300 rounded w-fit p-2'>
			<input
				type='text'
				className='hidden'
				defaultValue={template?._id?.toString()}
				name='document_id'
			/>
			<div className='flex gap-2 mb-1'>
				<Product
					defaultLanguage={defaultLanguage}
					products={settings.products}
					template={template}
				/>
				<TemplateName state={template.templateName} />
				{hasName && (
					<DocumentStatus
						defaultLanguage={defaultLanguage}
						template={template}
					/>
				)}
			</div>
			<ContextButton
				label='Save'
				type='edit'
				onClick={(e) => {
					e.preventDefault();
					const targetForm = (e.target as HTMLButtonElement).form;
					if (targetForm) targetForm.requestSubmit();
				}}
				classes='w-full'
				disabled={state && state.isLoading}
			/>
		</form>
	);
};

export default TemplateHeader;

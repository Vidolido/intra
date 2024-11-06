'use server';
import { z } from 'zod';
import { revalidatePaths } from '@/functions/reavalidatePaths';

// connection/moddels/database functions
import Setting from '@/db/models/Setting';
import LaboratoryTemplate from '@/db/models/LaboratoryTemplate';
import connection from '@/db/connection';

// types
import {
	ActionResponse,
	LaboratoryTemplateSchema,
	ModelType,
	SettingSchema,
} from '@/types/type';

// type ModelType = 'Setting' | 'LaboratoryTemplate';

// // Define the structure of a model configuration
interface ModelConfig {
	model: typeof Setting | typeof LaboratoryTemplate; // Add other model types as needed
	schema: z.ZodSchema;
	revalidatePaths: string[];
}

const MODEL_CONFIG: Record<ModelType, ModelConfig> = {
	Setting: {
		model: Setting,
		schema: SettingSchema,
		revalidatePaths: [
			'/dashboard/settings/draft/[_id]',
			'/dashboard/settings/edit/[_id]',
			'/dashboard/settings/create',
			'/dashboard/settings',
		],
	},
	LaboratoryTemplate: {
		model: LaboratoryTemplate,
		schema: LaboratoryTemplateSchema,
		revalidatePaths: [
			'/dashboard/laboratory-templates/draft/[_id]',
			'/dashboard/laboratory-templates/edit/[_id]',
			'/dashboard/laboratory-templates/create',
			'/dashboard/laboratory-templates',
		],
	},
};

export async function makeDraft(
	modelType: ModelType,
	additionalData?: Record<string, any>
): Promise<ActionResponse> {
	try {
		await connection();
		const config = MODEL_CONFIG[modelType];
		if (!config) {
			throw new Error(`Invalid model type: ${modelType}`);
		}

		const { model, schema, revalidatePaths: paths } = config;

		const draftData = {
			documentStatus: 'draft',
			isDeleted: false,
			...additionalData,
		};
		const draft = await (
			model as typeof Setting & typeof LaboratoryTemplate
		).create(draftData);

		let validatedDraft;
		try {
			validatedDraft = schema.parse(draft);
		} catch (validationError) {
			if (validationError instanceof z.ZodError) {
				return {
					data: null,
					success: false,
					error: true,
					message: validationError.errors.map((e) => e.message).join(', '),
					component: 'createDraft',
					isLoading: false,
				};
			}
			throw validationError;
		}

		revalidatePaths(paths);

		return {
			data: {
				_id: validatedDraft?._id.toString(),
			},
			success: true,
			error: null,
			message: 'Successfully created draft template.',
			component: null,
			isLoading: false,
		};
	} catch (error) {
		console.error('Could not add draft document to database:', error);
		if (error instanceof z.ZodError) {
			return {
				data: null,
				success: false,
				error: true,
				message: error.errors.map((e) => e.message).join(', '),
				component: 'createDraft',
				isLoading: false,
			};
		}

		if (error instanceof Error) {
			return {
				data: null,
				success: false,
				error: true,
				message: `Could not create draft setting to database: ${error.message}`,
				component: 'createDraft',
				isLoading: false,
			};
		}
		return {
			data: null,
			success: false,
			error: true,
			message: `Something bad happend`,
			component: 'createDraft',
			isLoading: false,
		};
	}
}

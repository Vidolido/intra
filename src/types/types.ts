import { Model, ObjectId } from 'mongoose';
import { ReactNode } from 'react';
import { Settings } from './zod/settingSchema';
import { BusinessSchema } from './zod/businessAreaSchema';

// types.ts
export interface RootLayoutProps {
	children: ReactNode;
}

export type Params = LanguageLabels;
export type SearchParamsProps = Record<string, string | string[]>;

//--navigation
export type LanguageLabels = {
	[key: string]: string;
};

export type LinkItem = {
	label: LanguageLabels;
	path: string;
};

export type LinkContents = LinkItem & {
	additionalLinks?: LinkItem[] | null;
};

export type LinksStateTypes = {
	[key: string]: LinkContents;
};

export type LinksProps = {
	link: LinkItem;
	location: string;
};
export type LinksType = {
	links: LinkItem | LinkItem[];
};
//--navigation

// Setting page.js

// models
//BusinessArea
export interface BusinesAreasDocument extends BusinessSchema, Document {}
export type BusinessModel = Model<BusinesAreasDocument>;
//BusinessArea
//Settings
export interface SettingsDocument extends Settings, Document {}
export type SettingsModel = Model<SettingsDocument>;
//Settings

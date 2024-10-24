// types.ts
//--navigation
export interface LanguageLabels {
	[key: string]: string;
}

export interface LinkItem {
	label: LanguageLabels;
	path: string;
}

export interface LinkContents {
	label: LanguageLabels;
	path: string;
	additionalLinks?: LinkItem[] | null;
}

export interface LinksStateTypes {
	[key: string]: LinkContents;
}

export interface LinksProps {
	link: LinkItem;
	location: string;
}
export type LinksType = {
	links: LinkItem | LinkItem[];
};
//--navigation

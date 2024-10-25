import { ReadonlyURLSearchParams } from 'next/navigation';
import { ReactNode } from 'react';

// types.ts
export interface RootLayoutProps {
  children: ReactNode;
}

// SearchParams props
export function getSearchParam<T = string>(
  searchParams: ReadonlyURLSearchParams,
  key: string
): T | undefined {
  const value = searchParams.get(key);
  return value as T | undefined;
}

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

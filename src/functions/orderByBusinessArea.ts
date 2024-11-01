import { BusinessAreaGroup, BusinessAreas, Setting } from '@/types/type';
import { Types } from 'mongoose';

export const orderByBusinessArea = (
  businessAreas: BusinessAreas[],
  publishedDocuments: Setting[]
): BusinessAreaGroup[] => {
  const result: BusinessAreaGroup[] = [];

  businessAreas.forEach((businessArea) => {
    const filteredItems = publishedDocuments.filter((doc) => {
      if (!doc.businessArea) return false;

      const businessAreaId =
        doc.businessArea instanceof Types.ObjectId
          ? doc.businessArea
          : doc.businessArea._id;

      return businessAreaId.toString() === businessArea._id.toString();
    });

    if (!filteredItems.length) return;

    const areaName =
      typeof businessArea.name === 'string'
        ? businessArea.name
        : Object.values(businessArea.name || {})[0] || 'Unnamed Area';

    result.push({
      name: areaName,
      documents: filteredItems,
    });
  });

  return result;
};

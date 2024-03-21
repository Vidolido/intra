'use client';

import { useGlobalStateContext } from '@/app/_globalState/globalStateContext';
// state/context
import { useAnalisysContext } from '@/app/dashboard/_state/analisys/analisysContext';
import { useCallback } from 'react';

export default function TemlpateData() {
  const { language } = useGlobalStateContext();
  const { templates } = useAnalisysContext();

  const checkForType = useCallback(
    (item, index) => {
      let optionValues = '';
      if (typeof item[item.collectionType] !== 'object')
        optionValues = item[item.collectionType];

      if (
        typeof item[item.collectionType] === 'object' &&
        item[item.collectionType][language]
      )
        optionValues = item[item.collectionType][language];

      if (
        typeof item[item.collectionType] === 'object' &&
        !item[item.collectionType][language]
      )
        optionValues = `${item[item.collectionType].from} - ${
          item[item.collectionType].to
        }`;

      return <span key={index}>{optionValues}</span>;
    },
    [language]
  );

  console.log(templates, 'the template data');
  return templates.map((firstLayer) => {
    return firstLayer.map((secondLayer) => {
      return secondLayer.map(([groupName, item], i) => {
        console.log(item, 'now these');
        return checkForType(item, i);
      });
    });
  });
}

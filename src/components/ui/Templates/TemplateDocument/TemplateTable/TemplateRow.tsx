// components
import DragSvg from '@/../public/files/drag.svg';
import { typeOfValue } from '@/components/ui/Settings/SettingDocument/helpers';
// import RowOptions from './RowOptions';
// import { formatKeyValue } from '@/utils/settings/formatKeyValue';

const TemplateRow = ({ item, templateId, classes = '' }) => {
  return (
    <div
      className={`grid grid-cols-[25px_25%_1fr_1fr_1fr_1fr_1fr_25px] border border-t-0 border-slate-300 ${classes}`}>
      <div className='border-r border-slate-300'>
        <DragSvg className='text-slate-400 hover:text-red-600 text-center w-[25px] h-[25px] cursor-pointer' />
      </div>
      <p className='border-r border-slate-300 pl-2'>
        {item.parameter.name['en']}
      </p>
      {Object.entries(item.collections).map(([_id, collection]) => {
        return (
          <div key={_id}>
            {collection &&
              collection.map((collectionItem) => {
                return (
                  <p
                    key={collectionItem?._id}
                    className='border-r border-slate-300 pl-2'>
                    {typeOfValue(collectionItem, 'en', 'min', 'max')}
                  </p>
                );
              })}
          </div>
        );
      })}
      <p className='border-r border-slate-300 pl-2 bg-slate-100'>
        {item?.result}
      </p>
      <p className='border-r border-slate-300 pl-2 bg-slate-100'>
        {item?.marginError}
      </p>
      <div>{/* <RowOptions templateId={templateId} rowId={item._id} /> */}</div>
    </div>
  );
};

export default TemplateRow;

import { useState } from 'react';

// components
// import EditCollectionItem from './EditCollectionItem';
// import { formatKeyValue } from '@/utils/settings/formatKeyValue';
import ContextButton from '@/components/reusable/ContextButton';

const SingleCollectionItem = ({
  languages,
  state,
  setState,
  selectedCollection,
  item,
}) => {
  const [canEdit, setCanEdit] = useState({
    edit: false,
    id: null,
    value: null,
  });

  const handleSave = (id) => {
    setCanEdit({
      edit: false,
      id: null,
      value: null,
    });
  };

  const handleEdit = (id) => {
    setCanEdit({
      ...canEdit,
      edit: true,
      id,
    });
  };

  const handleDelete = (itemId) => {
    setState((prev) => ({
      ...prev,
      collections: {
        ...prev.collections,
        [selectedCollection]: prev.collections[selectedCollection].filter(
          ({ id, _id }) => id !== itemId && _id !== itemId
        ),
      },
    }));
  };

  let typeOfValue = (item, language) => ({
    simple: item?.value,
    translations: item?.value[language],
    'key/value': {
      key: item?.key,
      value: item?.value,
    },
  });
  return (
    <li className='list-disc border border-slate-50 hover:border-red-200 focus:outline-none'>
      <div className='flex justify-between gap-2'>
        {canEdit.id !== item.id || canEdit.id !== item?._id ? (
          <span className='block border-l border-slate-300 px-2'>
            {typeOfValue(item, languages[0].language)[item.inputType]}
          </span>
        ) : (
          <EditCollectionItem
            languages={languages}
            state={state}
            setState={setState}
            selectedCollection={selectedCollection}
            item={item}
          />
        )}
        <div>
          {canEdit.id !== item.id || canEdit.id !== item?._id ? (
            <ContextButton
              label='edit'
              type='default'
              onClick={() => handleEdit(item?.id || item?._id)}
              classes='border-l border-slate-300 px-2'
            />
          ) : (
            <ContextButton
              label='save'
              type='default'
              classes='border-l border-slate-300 px-2'
              onClick={() => handleSave(item?.id || item?._id)}
            />
          )}
          <ContextButton
            label='delete'
            type='default'
            onClick={() => handleDelete(item?.id || item?._id)}
            classes='border-l border-slate-300 px-2'
          />
        </div>
      </div>
    </li>
  );
};

export default SingleCollectionItem;

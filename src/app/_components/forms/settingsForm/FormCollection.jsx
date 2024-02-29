import TranslateInput from '../../translateInput/TranslateInput';
import Single from './collections/Single';

const switchRender = (type, item, i) => {
  // const languages = ['en', 'mk', 'gr'];
  switch (type) {
    case 'single':
      return <Single key={i} type={type} item={item} />;
    case 'translatedString':
      return <TranslateInput key={i} submitOnEnter={true} />;
    case 'limit':
      return <div>Limit</div>;
    default:
      return <div>NEMA</div>; // Да направам default component
  }
};

const FormCollection = ({ collectionType, formCollection }) => {
  return (
    <div className='flex flex-col gap-2 border-2 border-grey-50 border-opacity-60 bg-grey-500 rounded mb-2 p-1'>
      {formCollection[collectionType]?.map((item, i) => {
        return switchRender(collectionType, item, i);
        // return (
        //   <div key={i} className='flex flex-row justify-between'>
        //     <input
        //       className='inline-block w-3/4 rounded px-3 py-1 focus:outline-none border-2 border-slate-100 border-opacity-90'
        //       name={`${collectionType}[]`}
        //       onChange={(e) => editSetting(e, item)}
        //       value={item}
        //     />
        //     <button
        //       className='bg-slate-500 hover:bg-slate-700 text-white font-bold py-1 px-2 rounded'
        //       onClick={(e) => deleteSetting(e, item)}>
        //       Delete
        //     </button>
        //   </div>
        // );
      })}
    </div>
  );
};

export default FormCollection;

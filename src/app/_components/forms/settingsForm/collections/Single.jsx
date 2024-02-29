const Single = ({ type, item, i }) => {
  return (
    <div key={i} className='flex flex-row justify-between'>
      <input
        className='inline-block w-3/4 rounded px-3 py-1 focus:outline-none border-2 border-slate-100 border-opacity-90'
        name={`${type}[]`}
        onChange={(e) => editSetting(e, item)}
        value={item}
      />
      <button
        className='bg-slate-500 hover:bg-slate-700 text-white font-bold py-1 px-2 rounded'
        onClick={(e) => deleteSetting(e, item)}>
        Delete
      </button>
    </div>
  );
};

export default Single;

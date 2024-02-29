import { useState, useEffect, useRef } from 'react';

const languages = ['en', 'mk', 'gr'];

const initialState = {
  language: '',
  value: '',
};

// const TranslateInput = ({ languages, data, setData }) => {
const TranslateInput = ({ submitOnEnter }) => {
  const [data, setData] = useState([]);
  const [language, setLanguage] = useState('en');
  const [itemByLanguage, setItemByLanguage] = useState(initialState);

  const inputRef = useRef(null);
  const selectRef = useRef(null);

  useEffect(() => {
    inputRef.current.value = '';
  }, [language]);

  useEffect(() => {
    let filtered = data?.find((n) => n.language === language);

    !filtered
      ? setItemByLanguage({ language, value: '' })
      : setItemByLanguage(filtered);
  }, [language, data]);

  const handleOnChange = (e) => {
    console.log(e, 'this is the key');
    const langIndex = data?.findIndex((i) => i.language === language);

    if (langIndex !== -1) {
      setData(
        data.map((d) => {
          if (d.language === language) {
            return { language, value: e.target.value };
          } else {
            return d;
          }
        })
      );
    } else {
      setData((prevData) => [...prevData, { language, value: e.target.value }]);
    }
  };
  // console.log(itemByLanguage, 'bylanguage');
  return (
    <label className='flex flex-row gap-2 flex-wrap'>
      <input
        type='text'
        name='title'
        ref={inputRef}
        className=' border-2 border-grey-50 border-opacity-60 rounded px-3 py-1 hover:border-red-200 focus:outline-none'
        onKeyDown={(e) =>
          e.key === 'Enter' && !submitOnEnter && e.preventDefault()
        }
        onChange={(e) => {
          handleOnChange(e);
        }}
        value={!itemByLanguage ? '' : itemByLanguage.value}
      />

      <select
        name='title'
        id='title'
        ref={selectRef}
        className='border-2 border-grey-50 border-opacity-60 rounded px-3 py-1 hover:border-red-200 focus:outline-none cursor-pointer'
        onChange={(e) => setLanguage(e.target.value)}
        defaultValue={language}>
        {languages.map((lang, i) => (
          <option key={i} value={lang}>
            {lang}
          </option>
        ))}
      </select>
    </label>
  );
};

export default TranslateInput;

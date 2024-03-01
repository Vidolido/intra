import { useState, useEffect, useRef } from 'react';
import { useSettings } from './util/useSettings';

const languages = ['en', 'mk', 'gr'];

const initialState = {
  language: '',
  value: '',
};

const TranslateInput = ({
  submitOnEnter,
  name,
  item = null,
  //   setExtractedData,
}) => {
  const { setExtractedData } = useSettings();
  // const TranslateInput = forwardRef((props, ref) => {
  const [data, setData] = useState(item ? item : []);
  //   const [data, setData] = useState([]);
  const [language, setLanguage] = useState('en');
  const [itemByLanguage, setItemByLanguage] = useState(initialState);

  const inputRef = useRef(null);
  const selectRef = useRef(null);

  //   useImperativeHandle(ref, () => ({
  //     getData: () => {
  //       return data;
  //     },
  //   }));

  //   useImperativeHandle(ref, () => ({
  //     setData: () => {
  //       setData(item ? item : []);
  //     },
  //     getData: () => {
  //       props.setExtractedData(data);
  //       //   setData(data)
  //       return data;
  //     },
  //     // setData: () => {
  //     //   props.setExtractedData(data);
  //     // },
  //     resetData: () => {
  //       setData([]);
  //       setItemByLanguage(initialState);
  //       inputRef.current.value = '';
  //     },
  //   }));
  //   useImperativeHandle(ref, () => ({
  //     getData: () => {
  //       props.setExtractedData(data);
  //       setData(data);
  //     },
  //     // setData: () => {
  //     //   props.setExtractedData(data);
  //     // },
  //     resetData: () => {
  //       setData([]);
  //       setItemByLanguage(initialState);
  //       inputRef.current.value = '';
  //     },
  //   }));

  useEffect(() => {
    let filtered = data?.find((n) => n.language === language);

    !filtered
      ? setItemByLanguage({ language, value: '' })
      : setItemByLanguage(filtered);
  }, [language, data]);

  useEffect(() => {
    setExtractedData({ dataFor: 'Settings Title', data });
  }, [data]);

  const handleOnChange = (e) => {
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

  //   console.log(data, 'the data');
  //   console.log(props, 'the props');
  return (
    <label className='flex flex-row gap-2 flex-wrap'>
      <input
        type='text'
        name={name}
        ref={inputRef}
        className=' border-2 border-grey-50 border-opacity-60 rounded px-3 py-1 hover:border-red-200 focus:outline-none'
        onKeyDown={(e) =>
          e.key === 'Enter' && !submitOnEnter && e.preventDefault()
        }
        onChange={(e) => handleOnChange(e)}
        value={!itemByLanguage ? '' : itemByLanguage.value}
      />

      <select
        name={name + 'lang'}
        id={name + 'lang'}
        ref={selectRef}
        className='border-2 border-grey-50 border-opacity-60 rounded px-3 py-1 hover:border-red-200 focus:outline-none cursor-pointer'
        onChange={(e) => {
          setLanguage(e.target.value);
          inputRef.current.value = '';
        }}>
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

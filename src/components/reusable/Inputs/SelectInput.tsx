import { useEffect, useState } from 'react';
import { cn } from '@/functions/cn';

import {
  LanguageMap,
  OptionType,
  ResetComponentsData,
  SelectInputProps,
} from '@/types/type';

const SelectInput = ({
  data = { state: [], showEmptyOption: false },
  extractData,
  reset,
}: SelectInputProps) => {
  const initializeOptions = (): OptionType[] => {
    const defaultOptions: OptionType[] = [];

    if (data?.showEmptyOption) {
      defaultOptions.push({ _id: null, value: '--' });
    }

    if (data?.state && Array.isArray(data.state)) {
      const stateOptions = data.state.map(({ _id, name }) => ({
        ...(_id && { _id: _id.toString() }),
        value: !data?.defaultLanguage ? name.en : name[data.defaultLanguage], // hardcoded value for now
      }));
      defaultOptions.push(...stateOptions);
    }

    if (defaultOptions.length === 0) {
      defaultOptions.push({ _id: null, value: '--' });
    }

    return defaultOptions;
  };

  const [options, setOptions] = useState<OptionType[]>(initializeOptions);
  const [selected, setSelected] = useState<string | null>(() => {
    if (data?.defaultValue) return data.defaultValue;
    if (
      options.length > 0 &&
      options[0]._id != null &&
      typeof options[0]._id === 'string'
    )
      return options[0]._id;
    return null;
  });

  useEffect(() => {
    const newOptions = initializeOptions();
    setOptions(newOptions);

    const validSelection = newOptions.some((option) => option._id === selected);
    if (
      !validSelection &&
      newOptions.length > 0 &&
      options[0]._id != null &&
      typeof newOptions[0]._id === 'string'
    ) {
      setSelected(newOptions[0]._id?.toString());
    }
  }, [data?.state, data?.showEmptyOption]);

  useEffect(() => {
    if (reset && reset?.components.includes('select')) {
      setSelected(options[0]?._id || null);

      // reset.setReset((prev: LanguageMap) => ({
      // ...prev,
      // components: [],
      // }));
      reset.setReset((prev: ResetComponentsData) => ({
        ...prev,
        components: [],
      }));
    }
  }, [reset?.resetData, reset?.components]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value, id, name, type } = e.target;
    setSelected(value);

    if (extractData) {
      extractData(value, { id, name, type });
    }
  };

  return (
    <fieldset className={cn(data?.fieldSetClass)}>
      {data?.label && (
        <label
          htmlFor={data?.id}
          className={cn(
            'block text-sm font-medium',
            data.error ? 'text-red-500' : 'text-gray-700'
          )}>
          {data.label}
        </label>
      )}
      <select
        id={data?.id}
        name={data?.selectName}
        className={cn(
          data?.selectClasses,
          'box-content border border-grey-50 border-opacity-60 rounded hover:border-red-200 focus:outline-none',
          'cursor-pointer h-[21px] text-sm'
        )}
        onChange={handleChange}
        value={selected || ''}>
        {options.map((option, index) => (
          <option
            key={option._id || index}
            value={option?._id?.toString() || option.value}>
            {option.value}
          </option>
        ))}
      </select>
    </fieldset>
  );
};

export default SelectInput;

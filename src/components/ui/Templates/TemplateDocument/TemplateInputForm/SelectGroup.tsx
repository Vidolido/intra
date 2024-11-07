// state/actions

// components
import ContextButton from '@/components/reusable/ContextButton';
import SelectInput from '@/components/reusable/Inputs/SelectInput';

const SelectGroup = ({ defaultLanguage, setShowOptions, groups, setGroup }) => {
  const handleSelect = (data) => {
    let selectedGroup = groups.find((group) => group?._id.toString() === data);
    setGroup(selectedGroup);
  };
  const handleEnd = () => {
    setGroup({});
    setShowOptions(false);
  };
  return (
    <label className='flex flex-col gap-2'>
      <SelectInput
        data={{
          defaultLanguage: defaultLanguage,
          state: groups,
          defaultValue: groups[0]._id,
          fieldSetClass: 'flex flex-col items-start bg-white px-[2px]',
          selectClasses: 'w-[87%]',
        }}
        extractData={handleSelect}
      />
      <ContextButton label='End group' type='edit' onClick={handleEnd} />
    </label>
  );
};

export default SelectGroup;

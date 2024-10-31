import { Language } from '@/types/type';

interface CollectionInputProps {
  languages: Language[];
  inputType: 'simple' | 'translations' | 'key/value';
  selectedCollection: string;
  initialValue: string | null; // initialValue should be mixed of simple string, languages or key/value pair
  state: string;
  setState: string;
}

const CollectionInput = ({
  languages = [],
  inputType = 'simple',
  selectedCollection,
  onCollectionUpdate,
  initialValue = null,
  onError,
  onSuccess,
  buttonLabel = 'Add',
}: CollectionInputProps) => {
  return <div>CollectionInput</div>;
};

export default CollectionInput;

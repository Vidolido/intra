export const formatKeyValue = (
  key: string,
  value: string,
  keyAlias = 'key',
  valueAlias = 'value'
) => {
  console.log(key, value, 'key/value in formatKeyValue');
  if (!key && !value) {
    return '/';
  }

  if (!value) {
    return `${keyAlias}: ${key}`;
  }

  if (!key) {
    return `${valueAlias}: ${value}`;
  }

  return `${keyAlias}: ${key} / ${valueAlias}: ${value}`;
};

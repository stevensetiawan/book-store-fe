export function objectToFormData<T = unknown>(obj: T): FormData {
  const formData = new FormData();

  const processObject = (obj: any, parentKey?: string) => {
    for (const key in obj) {
      if (Object.hasOwnProperty.call(obj, key)) {
        const value = obj[key];
        const prefixedKey = parentKey ? `${parentKey}[${key}]` : key;
        
        if (Array.isArray(value)) {
          value.forEach((item: any, index: number) => {
            processObject(item, `${prefixedKey}[${index}]`);
          });
        } else if (value && typeof value === 'object') {
          processObject(value, prefixedKey);
        } else if (value !== null && value !== undefined && value !== '') {
          formData.append(prefixedKey, value);
        }
      }
    }
  };

  processObject(obj);

  return formData;
}

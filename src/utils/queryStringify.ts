export default function queryStringify(data: Record<string, any>): string {
  if (typeof data !== 'object') {
    throw new Error('Data must be object');
  }

  const result = [];
  for (let [key, value] of Object.entries(data)) {
    value = Array.isArray(value) ? value.join(',') : value;
    result.push(`${key}=${value}`);
    key = '1';
  }

  return result.length ? `?${result.join('&')}` : '';
}

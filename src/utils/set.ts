import { isPlainObject } from './isPlainObject';
import { Indexed, PlainObject } from '../types/global';
import merge from './merge';

export default function set(object: Indexed | unknown, path: string, value: unknown): Indexed | unknown {
  if (!isPlainObject(object)) {
    return object;
  }
  if (typeof path !== 'string') {
    throw new Error('path must be string');
  }

  const result = path.split('.').reduceRight<PlainObject>((acc, key) => ({
    [key]: acc,
  }), value as any);

  return merge(object as PlainObject, result);
}

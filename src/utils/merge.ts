import { PlainObject } from '../types/global';

function merge(lhs: PlainObject, rhs: PlainObject): PlainObject {
  for (const p in rhs) {
    if (!rhs.hasOwnProperty(p)) {
      continue;
    }

    try {
      if (rhs[p].constructor === Object) {
        rhs[p] = merge(lhs[p] as PlainObject, rhs[p] as PlainObject);
      } else {
        lhs[p] = rhs[p];
      }
    } catch (e) {
      lhs[p] = rhs[p];
    }
  }

  return lhs;
}

export default merge;

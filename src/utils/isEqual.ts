const checkObject = (obj: unknown) => {
  return typeof obj === 'object'
    && obj !== null
    && obj.constructor === Object
    && Object.prototype.toString.call(obj) === '[object Object]';
}

const checkObjOrArray = (val: unknown) => {
  return checkObject(val) || Array.isArray(val);
}

function isEqual(a: object, b: object): boolean {
  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  
  if (keysA.length !== keysB.length) {
    return false;
  }
  
  for (const [key, aValue] of Object.entries(a)) {
    const bValue = b[key as keyof typeof b];
    if (checkObjOrArray(aValue) && checkObjOrArray(bValue)) {
      if (isEqual(aValue, bValue)) {
        continue;
      }
      return false;
    }
    
    if (aValue !== bValue) {
      return false;
    }
  }
  
  return true;
}

export default isEqual
//obj: three object
//types: array of type names (ie. ["AmbientLight", "DirectionalLight"])
export function deepSearchForTypes(obj, types) {
  const found = [];
  if (types.includes(obj.type)) found.push(obj);
  if (obj.children.length > 0) {
    obj.children.forEach((child) => found.push(...deepSearchForTypes(child, types)));
  }
  return found;
}

export function deepRemoveTypes(obj, types, includeObj = false) {
  const removed = [];
  if (includeObj == true) {
    if (types.includes(obj.type)) {
      removed.push(obj);
      return [undefined, removed];
    }
  }
  if (obj.children.length > 0) {
    obj.children.forEach((child) => {
      const [cObj, cRemoved] = deepRemoveTypes(child, types, true);
      removed.push(...cRemoved);

      if (!cObj) obj.remove(child);
    });
  }
  return [obj, removed];
}

export function deepRemoveIds(obj, ids, includeObj = false) {
  const removed = [];
  if (includeObj == true) {
    if (obj.el) {
      if (ids.includes(obj.el.id)) {
        removed.push(obj);
        return [undefined, removed];
      }
    }
  }
  if (obj.children.length > 0) {
    obj.children.forEach((child) => {
      const [cObj, cRemoved] = deepRemoveIds(child, ids, true);
      removed.push(...cRemoved);

      if (!cObj) obj.remove(child);
    });
  }
  return [obj, removed];
}

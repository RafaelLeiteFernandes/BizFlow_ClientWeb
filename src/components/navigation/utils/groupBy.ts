export const groupBy = <T, K extends keyof any>(list: T[], getKey: (item: T) => K): Record<K, T[]> => {
    return list.reduce((result, item) => {
      const key = getKey(item);
      if (!result[key]) {
        result[key] = [];
      }
      result[key].push(item);
      return result;
    }, {} as Record<K, T[]>);
  };
  
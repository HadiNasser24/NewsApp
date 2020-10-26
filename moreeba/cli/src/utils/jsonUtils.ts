const jsonConcat = (o1: any, o2: any) => {
  for (var key in o2) {
    o1[key] = o2[key];
  }

  return o1;
};

export { jsonConcat };

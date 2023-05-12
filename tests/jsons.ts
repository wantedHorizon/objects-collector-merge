const simpleObject = {
  key1: "1",
  key2: null,
  key3: false,
  key4: undefined,
  key5: 2,
};

const test1Collection = {
  key1: ["1"],
  key2: [null],
  key3: [false],
  key4: [undefined],
  key5: [2],
};

const listTest2: { key1: string; key2: number }[] = [];

for (let index = 0; index < 10; index++) {
  const element = {
    key1: index.toString(),
    key2: index,
  };
  listTest2.push(element);
}

export const basicObjects = {
  simpleObject,
  listTest2,
};

export const results = {
  test1: test1Collection,
};

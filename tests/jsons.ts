const simpleObject = {
  key1: "1",
  key2: null,
  key3: false,
  key4: undefined,
  key5: 2,
};

const test1 = {
  key1: ["1"],
  key2: [null],
  key3: [false],
  key4: [undefined],
  key5: [2],
};

const test1Fail = {
  ...test1,
  key3: {
    fail: " ",
  },
};

const listTest2: { key1: string; key2: number }[] = [];

for (let index = 0; index < 10; index++) {
  const element = {
    key1: index.toString(),
    key2: index,
  };
  listTest2.push(element);
}

const complexObject1 = {
  key1: {
    key11: "1",
    key12: "2",
    key13: {
      key131: "3",
      key132: {
        key1321: ["1"],
      },
      key133: null,
    },
  },
};

const complexObject2 = {
  key1: {
    key11: "1",
    key12: "2",
    key13: {
      key131: "3",
      key132: {
        key1322: ["1"],
      },
      key133: null,
    },
  },
  key2: "",
  key3: {
    aa: "",
  },
};

const complexObject2Fail = {
  key1: {
    // key11: {a:" "}, //should fail
    key12: "2",
    key13: {
      key131: { a: 2 }, //fail
      key132: {
        key1322: ["1"],
      },
      key133: null,
    },
  },
  key2: "",
  key3: {
    aa: "",
  },
};

export const basicObjects = {
  simpleObject,
  listTest2,
};

export const level2Objects = {
  complexObject1,
  complexObject2,
  complexObject2Fail,
};

export const results = {
  test1,
  test1Fail,
  complex1: {
    key1: {
      key11: ["1"],
      key12: ["2"],
      key13: { key131: ["3"], key132: { key1321: ["1"] }, key133: [null] },
    },
  },
  complex2: {
    key1: {
      key11: ["1", "1"],
      key12: ["2", "2"],
      key13: {
        key131: ["3", "3"],
        key132: { key1321: ["1"], key1322: ["1"] },
        key133: [null, null],
      },
    },
    key2: [""],
    key3: { aa: [""] },
  },
};

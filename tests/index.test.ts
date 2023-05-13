import  DeepCollector  from "../src/index";
import { basicObjects, level2Objects, results } from "./jsons";

const initNewCollector = () => {
  return new DeepCollector({ skipOnErrors: true,logErrors:false });
};

describe("types validation", () => {
  const collector = initNewCollector();
  test("check null", () => {
    //@ts-expect-error
    expect(collector.checkType(null)).toBe("null");
  });
  test("check array", () => {
    //@ts-expect-error
    expect(collector.checkType([])).toBe("array");
  });
  test("check number", () => {
    //@ts-expect-error
    expect(collector.checkType(2)).toBe("number");
  });
  test("check 'null'", () => {
    //@ts-expect-error
    expect(collector.checkType("null")).toBe("string");
  });
  test("check undefined", () => {
    //@ts-expect-error
    expect(collector.checkType(undefined)).toBe("undefined");
  });
  test("check {}}", () => {
    //@ts-expect-error
    expect(collector.checkType({})).toBe("object");
  });
  test("check simple object {}}", () => {
    //@ts-expect-error
    expect(collector.checkType(basicObjects.simpleObject)).toBe("object");
  });
});
describe("testing simple level 1 ", () => {
  const collector = initNewCollector();

  test("add one object", () => {
    const res = collector.add(basicObjects.simpleObject);

    expect(res).toBe(true);
    expect(collector.countFailed).toBe(0);
    expect(collector.countSuccess).toBe(1);
    expect(collector.collection).toEqual(results.test1);
  });

  test("add string instead of object", () => {
    const res = collector.add("");
    expect(res).toBe(false);
    expect(collector.countFailed).toBe(1);
    expect(collector.countSuccess).toBe(1);
  });

  test("add string instead of object", () => {
    const res = collector.add(results.test1Fail);
    expect(res).toBe(false);
    expect(collector.countFailed).toBe(2);
    expect(collector.countSuccess).toBe(1);
  });
});

describe("testing complex level 2 ", () => {
  const collector = initNewCollector();

  test("add one object", () => {
    const res = collector.add(level2Objects.complexObject1);

    expect(res).toBe(true);
    expect(collector.countFailed).toBe(0);
    expect(collector.countSuccess).toBe(1);

    expect(collector.collection).toEqual(results.complex1);
  });

  test("valid second object", () => {
    const res = collector.add(level2Objects.complexObject2);
    expect(res).toBe(true);
    expect(collector.countFailed).toBe(0);
    expect(collector.countSuccess).toBe(2);
  });

  test("invalid field of object instead of string ", () => {
    const res = collector.add(level2Objects.complexObject2Fail);
    expect(res).toBe(false);
    expect(collector.countFailed).toBe(1);
    expect(collector.countSuccess).toBe(2);
  });
});

import { DeepCollector } from "../src/index";
import { basicObjects, results } from "./jsons";

import structuredClone from "@ungap/structured-clone";
const initNewCollector = () => {
  return new DeepCollector();
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
  console.log("collector", collector);

  test("add one object", () => {
    const res = collector.add(basicObjects.simpleObject);

    expect(res).toBe(true)
    expect(collector.countFailed).toBe(0);
    expect(collector.countSuccess).toBe(1);
    expect(collector.collection).toEqual(results.test1)
  });

  test("add string instead of object", ()=> {
    const res = collector.add("");
    expect(res).toBe(false)
    expect(collector.countFailed).toBe(1);
    expect(collector.countSuccess).toBe(1);

  })
});

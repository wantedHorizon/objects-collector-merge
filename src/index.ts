console.log("asfasf");
import Clone from "@ungap/structured-clone";
class DeepCollector {
  collection: unknown;
  countSuccess: number;
  countFailed: number;
  constructor() {
    this.collection = {};
    this.countSuccess = 0;
    this.countFailed = 0;
  }

  add(object: unknown) {
    if (!(object instanceof Object)) {
      throw new Error("invalid object");
    }

    const newCollection = Clone(this.collection);

    //left addition
  }

  merge = (collection, object) => {
    Object.keys(object).forEach(key => {
      const type = this.checkType(object[key]);
      if (type === "object") {
      } else if (type === "array") {
        if (!collection[key]) {
          collection[key] = [];
        }

        collection[key] = [...collection[key], ...object[key]];
      } else {
        if (!collection[key]) {
          collection[key] = [];
        }

        collection[key].push(object);
      }
    });
  };

  private checkType = (o: unknown) => {
    if (Array.isArray(o)) {
      return "array";
    } else if (o instanceof Object) {
      return "object";
    } else {
      return typeof o;
    }
  };
}

/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import Clone from "@ungap/structured-clone";
interface ICollection {
  [key: string]: ICollection | BasicType[]
}
interface IObject {
  [key: string]: IObject | BasicType
}
interface IOptions {
  skipOnErrors: boolean
  logErrors: boolean
}
type BasicType = string | number | null | undefined | unknown[];
const defaultOptions = {
  skipOnErrors: false,
  logErrors: true
};
class DeepCollector {
  collection: ICollection;
  countSuccess: number;
  countFailed: number;
  options: IOptions;

  constructor (options: IOptions = defaultOptions) {
    this.collection = {};
    this.countSuccess = 0;
    this.countFailed = 0;
    this.options = options;
  }

  add (object: unknown): boolean {
    try {
      if (this.checkType(object) !== "object") {
        throw new Error("invalid object");
      }

      const newCollection = Clone(this.collection);
      this.merge(newCollection, Clone(object) as IObject, "");

      this.collection = newCollection;
      this.countSuccess++;
      return true;
    } catch (e) {
      if (this.options.logErrors) {
        console.log(
          `merge number: ${this.countFailed + this.countSuccess + 1} \n ${e}`
        );
      }

      if (!this.options.skipOnErrors) {
        throw e;
      }
      this.countFailed++;
      return false;
    }

    // left addition
  }

  merge = (collection: ICollection, object: IObject, loc: string): void => {
    Object.keys(object).forEach(key => {
      const type = this.checkType(object[key]);
      if (type === "object") {
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        if (!collection[key]) {
          // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
          collection[key] = {} as ICollection;
        }
        if (Array.isArray(collection[key])) {
          throw new Error(
            "expected BasicType received complex object, location: " + loc
          );
        }
        this.merge(
          collection[key] as ICollection,
          object[key] as IObject,
          (loc += "." + key)
        );
      } else if (type === "array") {
        if (collection[key] != null && !Array.isArray(collection[key])) {
          throw new Error("expected complex object, location: " + loc);
        }
        if (!collection[key]) {
          collection[key] = [];
        }

        const arr: BasicType[] = collection[key] as BasicType[];
        collection[key] = [...arr, ...(object[key] as BasicType[])];
      } else {
        // if (!Array.isArray(collection[key])) {
        //   throw new Error("expected complex object ");
        // }
        if (!collection[key]) {
          collection[key] = [];
        }

        // @ts-expect-error dont check
        collection[key].push(object[key]);
      }
    });
  };

  private readonly checkType = (o: unknown): string => {
    if (Array.isArray(o)) {
      return "array";
    } else if (o instanceof Object) {
      return "object";
    } else if (o === null) {
      return "null";
    } else {
      return typeof o;
    }
  };
}

export default DeepCollector;

import Clone from "@ungap/structured-clone";
interface ICollection {
  [key: string]: ICollection | BasicType[];
}
interface IObject {
  [key: string]: IObject | BasicType;
}
type BasicType = string | number | null | undefined | Array<unknown>;
class DeepCollector {
  collection: ICollection;
  countSuccess: number;
  countFailed: number;
  constructor() {
    this.collection = {};
    this.countSuccess = 0;
    this.countFailed = 0;
  }

  add(object: unknown):boolean {
    try {
      if (this.checkType(object) !== "object") {
        throw new Error("invalid object");
      }

      const newCollection = Clone(this.collection);
      this.merge(newCollection, Clone(object) as IObject);

      this.collection = newCollection;
      this.countSuccess++;
      return true;
    } catch (e) {
      this.countFailed++;
      return false;
    }

    //left addition
  }

  merge = (collection: ICollection, object: IObject) => {
    Object.keys(object).forEach(key => {
      const type = this.checkType(object[key]);
      if (type === "object") {
        if (!collection[key]) {
          collection[key] = {} as ICollection;
        }
        if (Array.isArray(collection)) {
          throw new Error("expected BasicType received complex object ");
        }
        this.merge(collection[key] as ICollection, object[key] as IObject);
      } else if (type === "array") {
        if (!Array.isArray(collection)) {
          throw new Error("expected complex object ");
        }
        if (!collection[key]) {
          collection[key] = [];
        }

        const arr: BasicType[] = collection[key] as BasicType[];
        collection[key] = [...arr, ...(object[key] as BasicType[])];
      } else {
        if (!Array.isArray(collection[key])) {
          throw new Error("expected complex object ");
        }
        if (!collection[key]) {
          collection[key] = [];
        }

        //@ts-ignore
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

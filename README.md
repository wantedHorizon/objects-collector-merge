# objects-collector-merge
  
Objects Collector Merge is an NPM package that provides an easy way to merge multiple objects into one.
This package can handle nested collections of objects

 Each key in the collection holds an array with all the values from collected objects.  
  

# Guidelines 

* objects don't have to follow the same structure.
* collection would be nested as the added objects . 
* basic types like string, boolean, number are collected into one array.
*  If a value is an array, then the arrays are merged into one.
* When adding an object to the collection, an error will occur if the value of "keyX" in the new object is a basic type (string, boolean, number) and the value of "keyX" in the collection is an object. 

```js
//error
object1[key1][key2][keyX] = {... } 
collection[key1][key2][keyX]=["a"]
```
* This error will also occur in reverse: if the value of "keyX" in the new object is an object and the value of "keyX" in the collection is a basic type.

```js
//error
object1[key1][key2][keyX] = "a"
collection[key1][key2][keyX]={...}
```




# Usage examples:

```js
var collector = require('objects-collector-merge')
```
### Basic Example

```js

const simpleObject1 = {
  key1: "1",
  key2: null,
  key3: false,
  key4: undefined,
  key5: 1,
  key6:[1,2]
};

const simpleObject2 = {
  key1: "2",
  key2: null,
  key3: false,
  key4: undefined,
  key5: 2,
  key6:[3,4]

};



collector.countFailed//0
collector.countSuccess//2
console.log(collector.collection)//
// {
//   key1: ["1"."2"],
//   key2: [null,null],
//   key3: [false,false],
//   key4: [undefined,undefined],
//   key5: [1,2],
//   key5: [1,2,3,4],

// };

```

### Complex Example
Let's suppose we have 2 complex JSON objects and we want to merge them.
```js


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

const response = collector.add(complexObject1);//true
console.log(collector.collection)//
// {
//     key1: {
//       key11: ["1"],
//       key12: ["2"],
//       key13: {
//         key131: ["3"],
//         key132: {  key1321: ["1"]  }, 
//         key133: [null] 
//       },
//     },
//   },

   

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


const response = collector.add(complexObject2);//true
console.log(collector.collection)//
// {
//     key1: {
//       key11: ["1", "1"],
//       key12: ["2", "2"],
//       key13: {
//         key131: ["3", "3"],
//         key132: { key1321: ["1"], key1322: ["1"] },
//         key133: [null, null],
//       },
//     },
//     key2: [""],
//     key3: { aa: [""] },
//   }


//wrong addition


const complexObject2Fail = {
  key1: {
    key12: "2",
    key13: {
      key131: { a: 2 }, //will fail here due to object instead of simple value
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

const response = collector.add(complexObject2);//false

collector.countFailed//1
collector.countSuccess//2

```


# Options

```js
{
  skipOnErrors: boolean //  ignores errors and skips the current addition(collection would not be affected)
  logErrors: boolean // wheatear to log the error
}
```


// let firstname: string = 'Farhan';
// console.log(firstname);
// console.log(typeof firstname);

//checkany type------
// let checkAny: any = 10;
// checkAny = 'Hello Word!';
// console.log(checkAny);

// let arr: string[] = [];
// arr.push('hello wolrd!');
// arr.push(' Farhan');

//readonly access modifier ---------
// let arr: readonly string[] = ['hello', ' farhan'];
// arr.push('abcd'); // no push function for readly arrays
// console.log(arr);

//tuple ------
//let ourTuple: [number, boolean, string];
//ourTuple = [10, false, "what's up bro?"];
// changing the order while initializing
//ourTuple = ['hey', 10, true]; // returns compilation error!!
//console.log('🚀 ~ file: index.ts ~ line 22 ~ ourTuple', ourTuple);

//named tuple --------
// let ourTuple: [name: string, age: number, isAdut: boolean] = [
//     'farhan',
//     24,
//     true,
// ];
// console.log('🚀 ~ file: index.ts ~ line 29 ~ ourTuple', ourTuple);

//destructuring tuple------
// const ourTuple: [string, number] = ['farhan', 24];
// const [name, age] = ourTuple;
// console.log('🚀 ~ file: index.ts ~ line 33 ~ name, age', name, age);

//object---------

const person: {
    gender: string;
    name: string;
    isStupid?: boolean; // optional variable!
    age: number;
    isAdult: boolean;
} = {
    gender: 'male',
    name: 'Farhan',
    age: 24,
    isAdult: true,
};
person.isStupid = true; // aasigning the optional variable later!
console.log('🚀 ~ file: index.ts ~ line 43 ~ person', person);
console.log('🚀 ~ file: index.ts ~ line 49 ~ isStupid', person.isStupid);

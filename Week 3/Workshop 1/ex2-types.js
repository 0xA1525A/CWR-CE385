console.log("[PART 1: INITIALISE VARIABLES IN VARIOUS TYPES]");

const stringVar = "abc";
const numberVar = 123;
const booleanVar = true;
const undefinedVar = undefined;
const nullVar = null;
const arrayVar = [0, 1, 2];

console.log(`Value: ${stringVar}\t\t| Type: ${typeof stringVar}`);
console.log(`Value: ${numberVar}\t\t| Type: ${typeof numberVar}`);
console.log(`Value: ${booleanVar}\t\t| Type: ${typeof booleanVar}`);
console.log(`Value: ${undefinedVar}\t| Type: ${typeof undefinedVar}`);
console.log(`Value: ${nullVar}\t\t| Type: ${typeof nullVar}`);
console.log(`Value: ${arrayVar}\t\t| Type: ${typeof arrayVar}`);

console.log("\n[PART 2: Q&A]");

console.log("Q: what's the output of `typeof null`, and in reality, is that correct?");
console.log(`A: the output of \`typeof null\` is "${typeof null}", it is a well-known bug that cannot be fixed easily because everything will just collapse.`);

let undefinedVariable;
console.log("Q: what's the value of an undefined variable?");
console.log(`A: It's "${undefinedVariable}".`);

console.log("Q: what's the routput of `typeof NaN`?");

// Number(v) parsed a `v` value into a number-typed value.
// if failed: this returns `NaN`.
let typeofNaN = typeof Number("abc");
console.log(`A: It's "${typeofNaN}"`);

console.log("\n[PART 3: TYPE CASTING]");

const inputAge = "20";
const inputScore = "85.5";

let inputAgeNumber = Number(inputAge);
    inputAgeNumber = inputAgeNumber + 5;
console.log(`3.1: inputAge: string -> number + 5: ${inputAgeNumber}`);

// note to self: `toFixed` method returns a value of type `STRING` for some reason.
// i hate javascript. nothing makes sense here :(.
let inputScoreNumber = Number(inputScore).toFixed(1);
console.log(`3.2: inputScore: string -> number %f.1 ${inputScoreNumber}`);

// expl: `===` compares both the values AND the types-
// even with the same value, but in a different type will return false.
console.log(`3.3: inputAge === 20 returns ${inputAge === 20}`);
console.log(`     Number(inputAge) === 20 retuns ${Number(inputAge) === 20}`);
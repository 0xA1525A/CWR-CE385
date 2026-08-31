// function declarations -> can be used before declaration:
/*
a() -> valid

function a() {}
*/
function add(a, b) {
    return a + b;
}

// function experessions -> cannot be used before declaration just like `let`-declared variables:
/*
a() {}

const a = function() {} \ neither would works.
const a = () => {}      /
*/
const subtract = function(a, b) {
    return a - b;
}

const multiply = (a, b) => a * b;

console.log(`add(10, 13) = ${add(10, 13)}`);
console.log(`subtract(10, 13) = ${subtract(10, 13)}`);
console.log(`multiply(10, 13) = ${multiply(10, 13)}`);

function createStudent(name, year = 1, isActive = true) {
    return { name, year, isActive };
}

console.log("not passing \`year\` = ", createStudent("Somchai"));
console.log("passed everything  = ", createStudent("Somying", 3, true));
console.log("passed \'undefined\` = ", createStudent("Manee", undefined));
console.log("passed \`null\`      = ", createStudent("Pithi", null));
console.log("passed \`0\`         = ", createStudent("Sujoe", 0));

function sumAll(...nummbers) {
    return nummbers.reduce((total, n) => total + n, 0);
}

console.log(`sumAll(10, 20, 30) = ${sumAll(10, 20, 30)}`);
console.log(`sumAll()           = ${sumAll()}`)

function formatScores(studentName, ...scores) {
    return `${studentName}: ${scores.join(", ")}`;
}

console.log(formatScores("Somchai", 78, 91, 45));

const course = {
    code: "CE385",
    instructor: {
        name: "Sanayu",
        email: "sanayu.jin@dpu.ac.th"
    },
    schedule: {
        day: "Mon",
        room: "5701"
    }
};

console.log(`course.code: ${course.code}`);
console.log(`course.instructor.email: ${course.instructor.email}`);
console.log(`course.assistant ${course.assistant}`); // this is returns undefined.

try {
    console.log(course.assistant.name); // exception is thrown when trying to acccess `name` attribute from an `undefined`.
}
catch (exception) {
    console.log(`course.assistant.name = ${exception.name}: ${exception.message}`);
}

console.log(`course.assistant?.name ${course.assistant?.name}`);
console.log(`?? and ?. combined: ${course.assistant?.name ?? "This course has no assistant."}`);

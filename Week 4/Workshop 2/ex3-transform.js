const STUDENTS= [
    {
        id: "67000000",
        name: "Student 1",
        major: "CE",
        score: 51,
        contact: {
            email: "abc1@dpu.ac.th",
            phone: "0800010001"
        }
    },
    {
        id: "67000001",
        name: "Student 2",
        major: "CE",
        score: 100,
        contact: {
            email: "abc2@dpu.ac.th",
            phone: "0800010002"
        }
    },
    {
        id: "67000002",
        name: "Student 3",
        major: "CE",
        score: 70,
        contact: {
            email: "abc3@dpu.ac.th",
            phone: "0800010003"
        }
    },
    {
        id: "67000003",
        name: "Student 4",
        major: "IT",
        score: 67,
        contact: {
            email: "abc4@dpu.ac.th",
            phone: "0800010004"
        }
    },
    {
        id: "67000004",
        name: "Student 5",
        major: "CE",
        score: 0,
        contact: {
            email: "abc5@dpu.ac.th",
            phone: "0800010005"
        }
    },
    { // this guy has no contact field 0_o!!!
        id: "67000005",
        name: "Student 6",
        major: "IT",
        score: 1,
    },
];

const GRADES_MIN_SCORE = [
    { score: 80, grade: "A" },
    { score: 75, grade: "B+" },
    { score: 70, grade: "B" },
    { score: 65, grade: "C+" },
    { score: 60, grade: "C" },
    { score: 55, grade: "D+" },
    { score: 50, grade: "D" }
];

const toGrade = (
    score
) => GRADES_MIN_SCORE.find((rule) => score >= rule.score)?.grade ?? "F";

const getNames = (
    students
) => students.reduce((names, student) => names.concat([student.name]), []);

const getPassedStudents = (
    students
) => students
    .   filter((student) => student.score >= 50)
    ?.  reduce((passed, student) => passed.concat([student]), []);

const getTotalScore = (
    students
) => students.reduce((score, student) => score + student.score, 0);

const getAverageScore = (
    students
) => (!Array.isArray(students) || students.length == 0)
    ?   0
    :   Number((getTotalScore(students) / students.length).toFixed(2));

const countByGrade = (
    students
) => students.reduce(
        (counts, student) => {
            const grade = toGrade(student.score);
            (!counts[grade])
            ?   counts[grade]  = 1
            :   counts[grade] += 1;
            return counts;
        },
        {}
    );

const getTopStudent = (
    students
) => students.reduce(
        (top, student) => (student.score > (top.score ?? 0))
        ?   student
        :   top,
        {}
    );

(() => {
    console.log("getNames(STUDENTS): ", getNames(STUDENTS));
    console.log("getPassedStudents(STUDENTS): ", getPassedStudents(STUDENTS));
    console.log("getTotalScore(STUDENTS): ", getTotalScore(STUDENTS));
    console.log("getAverageScore(STUDENTS): ", getAverageScore(STUDENTS));
    console.log("countByGrade(STUDENTS): ", countByGrade(STUDENTS));
    console.log("getTopStudent(STUDENTS): ", getTopStudent(STUDENTS));
})();
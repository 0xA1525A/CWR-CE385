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
        score: 82,
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

const findById = (
    students, id
) => students.find((student) => student.id === id);

const findByMajor = (
    students, major
) => students.filter((student) => student.major === major);

const hasFailingStudent = (students) => !!students.find((student) => student.score < 50);

const getEmail = (students, id) => students.find((student) => student.id === id).contact?.email;

(() => {
    console.log("valid find: ", findById(STUDENTS, "67000001"));
    console.log("invalid find: ", findById(STUDENTS, "9999999999999999"));
    console.log("valid major: ", findByMajor(STUDENTS, "CE"));
    console.log("invalid major: ", findByMajor(STUDENTS, "WHAT"));
    console.log("valid email: ", getEmail(STUDENTS, "67000000"));
    console.log("invalid email: ", getEmail(STUDENTS, "67000005"));
    console.log("has failing student: ", hasFailingStudent(STUDENTS));
})();
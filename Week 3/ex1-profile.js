// simulating retreiving student info from db.
function getStudentInfoById(studentId) {
    // imagine there's db code here.
    return {
        personal: {
            firstName: "Natthakit",
            lastName:  "Thawaichai",
            nickname:  "Art",

            studentId: studentId,
            age:       20
        },
        academic: {
            studyField: "CITE-CE",
            classEnrolledThisYear: {
                total:   6,
                classes: ["CE101", "CE306", "CE385", "HW106", "HW384", "GE176"]
            },
            admissionYear:       2026,
            programDurationYear: 4,
            surplusDurationYear: 0,
            currentYear:         3
        },
        // ...
    };
}

function getFieldInfoById(fieldId) {
    // magic.
    return {
        fieldId: fieldId,
        fieldName: "Computer Engineering",
        principalsStaffId: "CITE-CE-P1234",
        // ...
    }
}

function calculateGraduationYear(admissionYear, programDurationYear, surplusDurationYear, currentYear) {
    return admissionYear + (programDurationYear + surplusDurationYear - currentYear);
}

function formatIntroductionCard(studentInfo) {
    const nickname  = studentInfo.personal.nickname;
    const studentId = studentInfo.personal.studentId;
    const age       = studentInfo.personal.age;
    const totalClassEnrolled = studentInfo.academic.classEnrolledThisYear.total;

    const field     = getFieldInfoById(studentInfo.academic.studyField).fieldName;
    const graduationYear = calculateGraduationYear(
                               studentInfo.academic.admissionYear,
                               studentInfo.academic.programDurationYear,
                               studentInfo.academic.surplusDurationYear,
                               studentInfo.academic.currentYear
                           );

    return `\
    ===== Introduction Card =====
    Nickname:\t\t${nickname}
    Student ID:\t\t${studentId}
    Age:\t\t${age}
    Field:\t\t${field}
    Enrolled In:\t${totalClassEnrolled} class(es)
    Graduation Year:\t${graduationYear}
    ==============================`;
}

// main function:
(function() {
    const studentInfo = getStudentInfoById("67111176");
    const introductionCard = formatIntroductionCard(studentInfo);

    console.log(introductionCard);
})();
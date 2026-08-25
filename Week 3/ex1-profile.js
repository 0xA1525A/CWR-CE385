const SYS_CONFIGS = {
    VALID_STUDENT_ID_LENGTH: 8,
    VALID_FIELD_ID_LENGTH: 7
};

// example db and tables structure.
const UniDB = class {
    static Staff = {
        "CITE-CE-P1234": {
            staffId: "CITE-CE-P1234",
            firstName: "Anutin",
            lastName: "Oniichan",
            telCode: "66",
            telNumber: "969439775"
        }
    };

    static Fields = {
        "CITE-CE": {
            fieldId: "CITE-CE",
            fieldName: "Computer Engineering",
            principalsStaffId: this.Staff["CITE-CE-P1234"].staffId,
        }
    };

    static Students = {
        "67111176": {
            studentId: "67111176",
            firstName: "Natthakit",
            lastName:  "Thawaichai",
            nickname:  "Art",
            age: 20,
            studyField: this.Fields["CITE-CE"].fieldId,
            classEnrolledThisYear: 6,
            admissionYear:       2026,
            programDurationYear: 4,
            surplusDurationYear: 0,
            currentYear:         3
        }
    };
};

const StudentRepository = class {
    static getById = function(id) {
        // this is intentional - as it returns undefined if `id` not found.
        return UniDB.Students[id];
    };
};

const FieldRepository = class {
    static getById = function(id) {
        return UniDB.Fields[id];
    };
};

const StudentService = class {
    static isIdValid = function(id) {
        return (
            typeof id === "string"
        &&  id.length === SYS_CONFIGS.VALID_STUDENT_ID_LENGTH
        &&  id.trim() === id
        );
    };

    static getStudentDetailsById = function(id) {
        if (!this.isIdValid(id)) {
            return undefined;
        }

        const studentDetails = StudentRepository.getById(id);
        return studentDetails;
    };

    static getIntroductionProfileById = function(id) {
        const studentInfo = this.getStudentDetailsById(id);
        if (!studentInfo) {
            return { success: false, message: "Student Not Found" };
        }

        const fieldInfo = FieldService.getFieldDetailsById(studentInfo.studyField);
        if (!fieldInfo) {
            return { success: false, message: "Field Not Found" };
        }

        // sends only necessary data.
        return {
            success: true,
            studentId: id,
            nickname: studentInfo.nickname,
            age: studentInfo.age,
            classEnrolled: studentInfo.classEnrolledThisYear,
            field: fieldInfo.fieldName,
            graduationYear: this.calculateGraduationYear(
                studentInfo.admissionYear,
                studentInfo.programDurationYear,
                studentInfo.surplusDurationYear
            )
        };
    };

    static calculateGraduationYear = function(
        admissionYear, programDurationYear, surplusDurationYear
    ) {
        return admissionYear + programDurationYear + surplusDurationYear;
    };
};

const FieldService = class {
    static isIdValid = function(id) {
        return (
            typeof id === "string"
        &&  id.length === SYS_CONFIGS.VALID_FIELD_ID_LENGTH
        &&  id.trim() === id
        );
    };

    static getFieldDetailsById = function(id) {
        if (!this.isIdValid(id)) {
            return undefined;
        }

        const fieldDetails = FieldRepository.getById(id);
        return fieldDetails;
    };
};

const FormatterService = class {
    static removeTemplateSourceIndent = function(message) {
        // this one means replacing any length of whitespace/tab in the beginning of everyline with nothing.
        return message.replace(/^[ \t]+/gm, '');
    };

    static formatIntroductionCard = function(profile) {
        const template = this.removeTemplateSourceIndent(`\
            ===== Introduction Card =====
            Nickname:\t${profile.nickname}
            Student ID:\t${profile.studentId}
            Age:\t\t${profile.age}
            Field:\t\t${profile.field}
            Enrolled In:\t${profile.classEnrolled} class(es)
            Graduation Year:\t${profile.graduationYear}
            ==============================\
        `);

        return template;
    };
};

const StudentView = class {
    static getIntroductionCardById = function(id) {
        const profile = StudentService.getIntroductionProfileById(id);
        if (!profile.success) {
            return profile.message;
        }

        return FormatterService.formatIntroductionCard(profile);
    };
};


// this simulates function call from another function.
(function() {
    const card = StudentView.getIntroductionCardById("67111176");

    console.log(card);
})();
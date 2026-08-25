const SYS_CONFIGS = {
    GRADE_MIN_SCORE: {
        A:      80,
        B_PLUS: 75,
        B:      70,
        C_PLUS: 65,
        C:      60,
        D_PLUS: 55,
        D:      50
    }
};

const GradeService = class {
    static isScoreValid = function(score) {
        if (typeof score !== "number"
            || score < 0
            || score > 100
            || Number.isNaN(score)
            || !Number.isFinite(score)
        ) {
            return false;
        }
        return true;
    };

    static grade = function(score) {
        if (!this.isScoreValid(score)) {
            return "Invalid";
        }

        // this is sorted in descending way because otherwise-
        // you will always get a d.
        if (score >= SYS_CONFIGS.GRADE_MIN_SCORE.A) {
            return "A";
        }
        if (score >= SYS_CONFIGS.GRADE_MIN_SCORE.B_PLUS) {
            return "B+";
        }
        if (score >= SYS_CONFIGS.GRADE_MIN_SCORE.B) {
            return "B";
        }
        if (score >= SYS_CONFIGS.GRADE_MIN_SCORE.C_PLUS) {
            return "C+";
        }
        if (score >= SYS_CONFIGS.GRADE_MIN_SCORE.C) {
            return "C";
        }
        if (score >= SYS_CONFIGS.GRADE_MIN_SCORE.D_PLUS) {
            return "D+";
        }
        if (score >= SYS_CONFIGS.GRADE_MIN_SCORE.D) {
            return "D";
        }
        return "F";
    };
};

const GradeView = class {
    static toGrade = function(score) {
        const grade = GradeService.grade(score);

        return grade;
    };
};

(function() {
    // test cases assign by the assignment.
    const scoreTestCases = [95, 80, 79, 75, 70, 65, 60, 55, 50, 49, 0, -5, 120];

    for (const score of scoreTestCases) {
        const grade = GradeView.toGrade(score);

        console.log(`Score: ${score}\t=> ${grade}`);
    }
})();
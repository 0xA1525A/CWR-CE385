// move things together to make it easier-
// to change things later.
const GRADE_MIN_SCORE = {
    A:      80,
    B_PLUS: 75,
    B:      70,
    C_PLUS: 65,
    C:      60,
    D_PLUS: 55,
    D:      50
};

function isScoreValid(score) {
    return (
        typeof score === "number"
    &&  score >= 0
    &&  score <= 100
    &&  !Number.isNaN(score)
    );
}

function toGrade(score) {
    if (!isScoreValid(score)) {
        return "Invalid";
    }

    // this is sorted in descending way because otherwise-
    // you will always get a d.
    if (score >= GRADE_MIN_SCORE.A) {
        return "A";
    }
    if (score >= GRADE_MIN_SCORE.B_PLUS) {
        return "B+";
    }
    if (score >= GRADE_MIN_SCORE.B) {
        return "B";
    }
    if (score >= GRADE_MIN_SCORE.C_PLUS) {
        return "C+";
    }
    if (score >= GRADE_MIN_SCORE.C) {
        return "C";
    }
    if (score >= GRADE_MIN_SCORE.D_PLUS) {
        return "D+";
    }
    if (score >= GRADE_MIN_SCORE.D) {
        return "D";
    }
    return "F";
};

(function() {
    // test cases assign by the assignment.
    const scoreTestCases = [95, 80, 79, 75, 70, 65, 60, 55, 50, 49, 0, -5, 120];

    for (const score of scoreTestCases) {
        const grade = toGrade(score);

        console.log(`Score: ${score}\t=> ${grade}`);
    }
})();
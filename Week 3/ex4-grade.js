function isScoreValid(score) {
    if (typeof score !== typeof 0
        || score < 0
        || score > 100
        || Number.isNaN(score)
        || !Number.isFinite(score)
    ) {
        return false;
    }
    return true;
}

function labelGradeByScore(score) {
    if (score >= 80) {
        return "A";
    }
    if (score >= 75) {
        return "B+";
    }
    if (score >= 70) {
        return "B";
    }
    if (score >= 65) {
        return "C+";
    }
    if (score >= 60) {
        return "C";
    }
    if (score >= 55) {
        return "D+";
    }
    if (score >= 50) {
        return "D";
    }
    return "F";
}

function getGrade(score) {
    if (!isScoreValid(score)) {
        return undefined;
    }

    const grade = labelGradeByScore(score);

    return grade;
}

(function() {
    const scoreTestCases = [95, 80, 79, 75, 70, 65, 60, 55, 50, 49, 0, -5, 120];

    for (const score of scoreTestCases) {
        const grade = getGrade(score);
        console.log(`Score: ${score}\t=> ${grade} grade.`);
    }
})();
const GRADES_MIN_SCORE = [
    { score: 80, grade: "A" },
    { score: 75, grade: "B+" },
    { score: 70, grade: "B" },
    { score: 65, grade: "C+" },
    { score: 60, grade: "C" },
    { score: 55, grade: "D+" },
    { score: 50, grade: "D" }
];

const isValidScore = (score) => (
    typeof score === "number"
&&  score >= 0
&&  score <= 100
);

const toGrade = (score) => {
    if (!isValidScore(score)) {
        return undefined;
    }

    return GRADES_MIN_SCORE.find((rule) => score >= rule.score)?.grade ?? "F";
};

const calculateWorkshopScore = (
    raw, full = 60, weight = 20
) => raw / full * weight;

const calculateTotal = (
    workshop, attendance, project, midterm, final
) => workshop + attendance + project + midterm + final;

(() => {
    const scoreTestCases = [95, 80, 79, 75, 70, 65, 60, 55, 50, 49, 0, -5, 120];

    for (const score of scoreTestCases) {
        const grade = toGrade(score);

        console.log(`Score: ${score}\t=> ${grade}`);
    }

})();
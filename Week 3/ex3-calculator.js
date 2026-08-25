const SYS_CONFIGS = {
    FULL_RAW_WORKSHOP_SCORE: 60,
    FULL_RESCALRED_WORKSHOP_SCORE: 20,
    FULL_TOTAL_SCORE:    100,
    PERCENT_DENOMINATOR: 100,
    MAX_DECIMAL_POINTS:  2,
    COMPARISON_SCORE_TARGET: 80,
    VALID_STUDENT_ID_LENGTH: 8,
    VALID_SUBJECT_ID_LENGTH: 5
};

const CEScoreDB = class {
    static CE385 = {
            "69674200": {
                workshop:   48,
                attendance: 9,
                project:    17,
                midterm:    15,
                final:      24
        }
    };
};

const ScoreRepository = class {
    // this is intentional - as it returns undefined if `id` not found.
    static getScoreById = function(subjectId, studentId) {
        return CEScoreDB[subjectId]?.[studentId];
    };
};

const ScoreService = class {
    static rescaleScore = function(score, denominator, multiplier) {
        return Number((score / denominator * multiplier).toFixed(SYS_CONFIGS.MAX_DECIMAL_POINTS));
    };

    static calculateSumOfScores = function(score, scaledWorkshop) {
        return score.attendance + score.project + score.midterm + score.final + scaledWorkshop;
    };

    static calculateDifference = function(target, score) {
        return target - score;
    };

    static isSubjectIdValid = function(id) {
        return (
            typeof id === "string"
        &&  id.length === SYS_CONFIGS.VALID_SUBJECT_ID_LENGTH
        &&  id.trim() === id
        );
    };

    static isStudentIdValid = function(id) {
        return (
            typeof id === "string"
        &&  id.length === SYS_CONFIGS.VALID_STUDENT_ID_LENGTH
        &&  id.trim() === id
        );
    };

    static getScoreSummary(subjectId, studentId) {
        if (!this.isSubjectIdValid(subjectId)) {
            return { success: false, message: "Invalid Subject ID" };
        }

        if (!this.isStudentIdValid(studentId)) {
            return { success: false, message: "Invalid Student ID" };
        }

        const score = ScoreRepository.getScoreById(subjectId, studentId);
        if (!score) {
            return { success: false, message: "Score Not Found" };
        }

        // calculate x out of z when x out of y; while the actual score is 20 out of z.
        const scaledWorkshop = this.rescaleScore(score.workshop, SYS_CONFIGS.FULL_RAW_WORKSHOP_SCORE, SYS_CONFIGS.FULL_RESCALRED_WORKSHOP_SCORE);

        const total = this.calculateSumOfScores(score, scaledWorkshop);
        const totalInPercent = this.rescaleScore(total, SYS_CONFIGS.PERCENT_DENOMINATOR, SYS_CONFIGS.FULL_TOTAL_SCORE);

        // leave negative value as is as the assignment says.
        const targetDifference = this.calculateDifference(SYS_CONFIGS.COMPARISON_SCORE_TARGET, total);

        const summary = {
            success: true,
            total: total,
            totalInPercent: totalInPercent,
            scaledWorkshop: scaledWorkshop,
            rawWorkshop: score.workshop,
            attendance: score.attendance,
            project: score.project,
            midterm: score.midterm,
            final: score.final,
            targetDifference: targetDifference
        };

        return summary;
    };
};

const FormatterService = class {
    static removeTemplateSourceIndent = function(message) {
        return message.replace(/^[ \t]+/gm, '');
    };

    static formatSummary(summary) {
        const template = this.removeTemplateSourceIndent(`\
            [ SCORE CALCULATOR ] =>-------------
            # TOTAL MARK: ${summary.total}/${SYS_CONFIGS.FULL_TOTAL_SCORE} (${summary.totalInPercent}%)
            |- Ratio'd Workshop Mark:\t${summary.scaledWorkshop}/${SYS_CONFIGS.FULL_RESCALRED_WORKSHOP_SCORE}
            :  |- Raw Workshop Mark:\t${summary.rawWorkshop}/${SYS_CONFIGS.FULL_RAW_WORKSHOP_SCORE}
            |- Attendance Mark:\t\t${summary.attendance}
            |- Project Mark:\t\t${summary.project}
            |- Midterm Mark:\t\t${summary.midterm}
            |- Final Mark:\t\t\t${summary.final}
            :
            |- N-Mark to ${SYS_CONFIGS.COMPARISON_SCORE_TARGET}:\t\t${summary.targetDifference}\
        `);

        return template;
    };
};

const ScoreView = class {
    static getFormattedSummaryByIds = function(subjectId, studentId) {
        const summary = ScoreService.getScoreSummary(subjectId, studentId);
        if (!summary.success) {
            return summary.message;
        }

        const formattedSummary = FormatterService.formatSummary(summary);

        return formattedSummary;
    };
};

// this simulates function call from another function.
(function() {
    const summary = ScoreView.getFormattedSummaryByIds("CE385", "69674200");

    console.log(summary);
})();
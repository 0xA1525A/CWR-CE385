const WORKSHOP_FULL_MARK   = 60;
const WORKSHOP_SCORE_RATIO = 20;
const PERCENT_RATIO        = 100;
const TOTAL_FULL_MARK      = 100;
const N_MARK_COMPARISON_TARGET = 80;

function calculateMarkRatio(score, denominator, multiplier) {
    const N_DECIMAL_POINT = 2;

    return Number((score / denominator * multiplier).toFixed(N_DECIMAL_POINT));
}

function calculateTotalMark(achievedMark, ratioedWorkshopMark) {
    return ratioedWorkshopMark + achievedMark.attendance + achievedMark.project + achievedMark.midterm + achievedMark.final;
}

function calculateNMarkToTarget(target, score) {
    return target - score;
}

function formatMarkSummary(achievedRawMark, totalMark, totalMarkPercent, nMarkToTarget, ratioedWorkshopMark) {
    return `\
    [ SCORE CALCULATOR ] ------
    # TOTAL MARK: ${totalMark}/${TOTAL_FULL_MARK} (${totalMarkPercent}%)
    |- Ratio'd Workshop Mark:\t${ratioedWorkshopMark}/${WORKSHOP_SCORE_RATIO}
    :  |- Raw Workshop Mark:\t${achievedRawMark.workshop}/${WORKSHOP_FULL_MARK}
    |- Attendance Mark:\t\t${achievedRawMark.attendance}
    |- Project Mark:\t\t${achievedRawMark.project}
    |- Midterm Mark:\t\t${achievedRawMark.midterm}
    |- Final Mark:\t\t${achievedRawMark.final}
    :
    |- N-Mark to ${N_MARK_COMPARISON_TARGET}:\t\t${nMarkToTarget}
    `;
}

// main function:
(function() {
    const achievedRawMark = {
        workshop:   48,
        attendance: 9,
        project:    17,
        midterm:    15,
        final:      24
    };

    const ratioedWorkshopMark = calculateMarkRatio(achievedRawMark.workshop, WORKSHOP_FULL_MARK, WORKSHOP_SCORE_RATIO);
    const totalMark        = calculateTotalMark(achievedRawMark, ratioedWorkshopMark);
    const totalMarkPercent = calculateMarkRatio(totalMark, TOTAL_FULL_MARK, PERCENT_RATIO);
    const nMarkToTarget    = calculateNMarkToTarget(N_MARK_COMPARISON_TARGET, totalMark);
    const formattedMessage = formatMarkSummary(achievedRawMark, totalMark, totalMarkPercent, nMarkToTarget, ratioedWorkshopMark);

    console.log("[PART 3: DISPLAY CALCULATED VALUES]");
    console.log(formattedMessage);
})();
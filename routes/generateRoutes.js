const express = require('express');
const router = express.Router();

var chennaiSlots = {
    "A1": ["L1", "L2", "L14"], "F1": ["L2"], "D1": ["L3", "L4", "L19", "L20"], "TB1": ["L4"], "TG1": ["L5", "L6"], "A2": ["L31", "L32", "L44"], "F2": ["L32"], "D2": ["L33", "L34", "L49", "L50"], "TB2": ["L34"], "TG2": ["L35", "L36"],
    "B1": ["L7", "L8", "L20"], "G1": ["L8"], "E1": ["L9", "L10", "L25", "L26"], "TC1": ["L10"], "TAA1": ["L11", "L12"], "B2": ["L37", "L38", "L50"], "G2": ["L38"], "E2": ["L39", "L40", "L55", "L56"], "TC2": ["L40"], "TAA2": ["L41", "L42"],
    "C1": ["L13", "L14", "L26"], "F1": ["L15", "L16"], "TD1": ["L16"], "TBB1": ["L17", "L18"], "C2": ["L43", "L44", "L56"], "F2": ["L45", "L46"], "TD2": ["L46"], "TBB2": ["L47", "L48"],
    "G1": ["L21", "L22"], "TE1": ["L22"], "TCC1": ["L23", "L24"], "G2": ["L51", "L52"], "TE2": ["L52"], "TCC2": ["L53", "L54"],
    "TA1": ["L27", "L28"], "TF1": ["L28"], "TDD1": ["L29", "L30"], "TA2": ["L57", "L58"], "TF2": ["L58"], "TDD2": ["L59", "L60"],
    "L1": ["A1", "F1"], "L2": ["A1", "F1"], "L3": ["D1", "TB1"], "L4": ["D1", "TB1"], "L5": ["TG1", "S11"], "L6": ["TG1"], "L31": ["A2", "F2"], "L32": ["A2", "F2"], "L33": ["D2", "TB2"], "L34": ["D2", "TB2"], "L35": ["TG2"], "L36": ["TG2", "S3"],
    "L7": ["B1", "G1"], "L8": ["B1", "G1"], "L9": ["E1", "TC1"], "L10": ["E1", "TC1"], "L11": ["TAA1"], "L12": ["TAA1"], "L37": ["B2", "G2"], "L38": ["B2", "G2"], "L39": ["E2", "TC2"], "L40": ["E2", "TC2"], "L41": ["TAA2"], "L42": ["TAA2", "S1"],
    "L13": ["C1", "A1"], "L14": ["C1", "A1"], "L15": ["F1", "TD1"], "L16": ["F1", "TD1"], "L17": ["TBB1"], "L18": ["TBB1"], "L43": ["C2", "A2"], "L44": ["C2", "A2"], "L45": ["F2", "TD2"], "L46": ["F2", "TD2"], "L47": ["TBB2"], "L48": ["TBB2", "S4"],
    "L19": ["D1", "B1"], "L20": ["D1", "B1"], "L21": ["G1", "TE1"], "L22": ["G1", "TE1"], "L23": ["TCC1"], "L24": ["TCC1"], "L49": ["D2", "B2"], "L50": ["D2", "B2"], "L51": ["G2", "TE2"], "L52": ["G2", "TE2"], "L53": ["TCC2"], "L54": ["TCC2", "S1"],
    "L25": ["E1", "C1"], "L26": ["E1", "C1"], "L27": ["TA1", "TF1"], "L28": ["TA1", "TF1"], "L29": ["TDD1"], "L30": ["TDD1", "S15"], "L55": ["E2", "C2"], "L56": ["E2", "C2"], "L57": ["TA2", "TF2"], "L58": ["TA2", "TF2"], "L59": ["TDD2"], "L60": ["TDD2"]
};

var velloreSlots = {
    "A1": ["L1", "L2", "L14"], "F1": ["L2"], "D1": ["L3", "L4", "L19", "L20"], "TB1": ["L4"], "TG1": ["L5", "L6"], "A2": ["L31", "L32", "L44"], "F2": ["L32"], "D2": ["L33", "L34", "L49", "L50"], "TB2": ["L34"], "TG2": ["L35", "L36"],
    "B1": ["L7", "L8", "L20"], "G1": ["L8"], "E1": ["L9", "L10", "L25", "L26"], "TC1": ["L10"], "TAA1": ["L11", "L12"], "B2": ["L37", "L38", "L50"], "G2": ["L38"], "E2": ["L39", "L40", "L55", "L56"], "TC2": ["L40"], "TAA2": ["L41", "L42"],
    "C1": ["L13", "L14", "L26"], "F1": ["L15", "L16"], "V1": ["L16"], "V2": ["L17", "L18"], "C2": ["L43", "L44", "L56"], "F2": ["L45", "L46"], "TD2": ["L46"], "TBB2": ["L47", "L48"],
    "G1": ["L21", "L22"], "TE1": ["L22"], "TCC1": ["L23", "L24"], "G2": ["L51", "L52"], "TE2": ["L52"], "TCC2": ["L53", "L54"],
    "TA1": ["L27", "L28"], "TF1": ["L28"], "TD1": ["L29", "L30"], "TA2": ["L57", "L58"], "TF2": ["L58"], "TDD2": ["L59", "L60"],
    "L1": ["A1", "F1"], "L2": ["A1", "F1"], "L3": ["D1", "TB1"], "L4": ["D1", "TB1"], "L5": ["TG1"], "L6": ["TG1"], "L31": ["A2", "F2"], "L32": ["A2", "F2"], "L33": ["D2", "TB2"], "L34": ["D2", "TB2"], "L35": ["TG2"], "L36": ["TG2"],
    "L7": ["B1", "G1"], "L8": ["B1", "G1"], "L9": ["E1", "TC1"], "L10": ["E1", "TC1"], "L11": ["TAA1"], "L12": ["TAA1"], "L37": ["B2", "G2"], "L38": ["B2", "G2"], "L39": ["E2", "TC2"], "L40": ["E2", "TC2"], "L41": ["TAA2"], "L42": ["TAA2"],
    "L13": ["C1", "A1"], "L14": ["C1", "A1"], "L15": ["F1", "V1"], "L16": ["F1", "V1"], "L17": ["V2"], "L18": ["V2"], "L43": ["C2", "A2"], "L44": ["C2", "A2"], "L45": ["F2", "TD2"], "L46": ["F2", "TD2"], "L47": ["TBB2"], "L48": ["TBB2"],
    "L19": ["D1", "B1"], "L20": ["D1", "B1"], "L21": ["G1", "TE1"], "L22": ["G1", "TE1"], "L23": ["TCC1"], "L24": ["TCC1"], "L49": ["D2", "B2"], "L50": ["D2", "B2"], "L51": ["G2", "TE2"], "L52": ["G2", "TE2"], "L53": ["TCC2"], "L54": ["TCC2"],
    "L25": ["E1", "C1"], "L26": ["E1", "C1"], "L27": ["TA1", "TF1"], "L28": ["TA1", "TF1"], "L29": ["TD1"], "L30": ["TD1"], "L55": ["E2", "C2"], "L56": ["E2", "C2"], "L57": ["TA2", "TF2"], "L58": ["TA2", "TF2"], "L59": ["TDD2"], "L60": ["TDD2"]
};

const morning = ["A1", "B1", "C1", "D1", "E1", "F1", "G1", "A1", "B1", "C1", "D1", "E1", "F1", "G1", "TA1", "TB1", "TC1", "V1", "TE1", "TF1", "TG1", "TAA1", "V2", "TCC1", "TBB1", "TDD1", "TD1", "L31", "L37", "L43", "L49", "L55", "L32", "L38", "L44", "L50", "L56", "L33", "L39", "L45", "L51", "L57", "L34", "L40", "L46", "L52", "L58", "L35", "L41", "L47", "L53", "L59", "L36", "L42", "L48", "L54", "L60"];

router.post("/", (req, res) => {
    var selectedTime = req.body.slotTime;
    // INPUT
    const inputData = req.body.generateData;
    let courseNames = ["Course A", "Course B", "Course C", "Course D", "Course E", "Course F", "Course G", "Course H", "Course I", "Course J"];
    // FINAL OUTPUT
    let result = [];
    let finalSlots = []; // This spits out both Lab Masked Slots. So use result array
    // FOR RECURSION
    let cur_slots = [];
    let cur = [];
    let toRemove = [];
    for (let i = 0; i < inputData.length; i++) {
        if (inputData[i].length == 0) {
            toRemove.push(i);
        }
    }
    toRemove.reverse();
    for (let i = 0; i < toRemove.length; i++) {
        inputData.splice(toRemove[i], 1);
        courseNames.splice(toRemove[i], 1)
    }
    function clashCheck(cur_slots, toAdd) {
        for (let i = 0; i < toAdd.length; i++) {
            if (selectedTime == "MT" && !morning.includes(toAdd[i])) {
                return 0;
            }
            else if (selectedTime == "ET" && morning.includes(toAdd[i])) {
                return 0;
            }
            for (let j = 0; j < cur_slots.length; j++) {
                if (toAdd[i] == cur_slots[j]) {
                    return 0;
                }
            }
        }
        return 1;
    }

    const selectedCampus = "Vellore Campus";
    function generate(cur_slots, cur, inputData, ind, n, result) {
        if (ind >= n) {
            result.push(Object.assign([], cur));
            finalSlots.push(Object.assign([], cur_slots));
            return;
        }
        for (let i = 0; i < inputData[ind].length; i++) {
            let slotsOfCurFaculty = inputData[ind][i].facultySlot;
            const tmpSlotLength = slotsOfCurFaculty.length;
            let toBeMaskedSlots = []; // Mask the lab slot that theory part covers
            if (selectedTime == "Both") {
                for (let j = 0; j < tmpSlotLength; j++) {
                    if (selectedCampus == "Vellore Campus") {
                        toBeMaskedSlots = toBeMaskedSlots.concat(velloreSlots[slotsOfCurFaculty[j]]);
                    } else {
                        toBeMaskedSlots = toBeMaskedSlots.concat(chennaiSlots[slotsOfCurFaculty[j]]);
                    }
                }
            }
            if (clashCheck(cur_slots, slotsOfCurFaculty) == 1) {
                slotsOfCurFaculty = slotsOfCurFaculty.concat(toBeMaskedSlots);
                cur.push(inputData[ind][i]);
                cur_slots = cur_slots.concat(slotsOfCurFaculty);
                generate(cur_slots, cur, inputData, ind + 1, n, result);
                cur.pop();
                for (let r = 0; r < slotsOfCurFaculty.length; r++) {
                    cur_slots.pop();
                }
            }
        }
    }
    generate(cur_slots, cur, inputData, 0, inputData.length, result);
    if (result.length == 0) {
        return res.json({ message: "Success", result: [], courseNames: [] });
    }
    res.json({ message: "Success", result: result, courseNames: courseNames });
})

module.exports = router;
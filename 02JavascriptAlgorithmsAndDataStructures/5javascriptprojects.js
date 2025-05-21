function palindromeChecker(str) {
    let newStr = "";
    let reverseStr = "";
    let codeInput = str.split("").filter(x => (/[a-z0-9]/i.test(x)));
    codeInput.map((x) => {newStr += x});
    codeInput.map((x) => {reverseStr = x + reverseStr});
    return newStr.toLowerCase() === reverseStr.toLowerCase();
}
//console.log(palindromeChecker("racecar"));

function convertToRoman(num) {
    let cashDue = 0;
    cashDue += num;
    let roman = "";
    while (cashDue > 0) {
        if (cashDue >= 1000) {
            cashDue -= 1000;
            roman += "M";
        } else if (cashDue >= 900) {
            cashDue -= 900;
            roman += "CM";
        } else if (cashDue >= 500) {
            cashDue -= 500;
            roman += "D";
        } else if (cashDue >= 400) {
            cashDue -= 400;
            roman += "CD";
        } else if (cashDue >= 100) {
            cashDue -= 100;
            roman += "C";
        } else if (cashDue >= 90) {
            cashDue -= 90;
            roman += "XC";
        } else if (cashDue >= 50) {
            cashDue -= 50;
            roman += "L";
        } else if (cashDue >= 40) {
            cashDue -= 40;
            roman += "XL";
        } else if (cashDue >= 10) {
            cashDue -= 10;
            roman += "X";
        } else if (cashDue >= 9) {
            cashDue -= 9;
            roman += "IX";
        } else if (cashDue >= 5) {
            cashDue -= 5;
            roman += "V";
        } else if (cashDue >= 4) {
            cashDue -= 4;
            roman += "IV";
        } else if (cashDue >= 1) {
            cashDue -= 1;
            roman += "I";
        }
    }
    return roman;
}
//console.log(convertToRoman(1990));

function rot13(str) {
    let alphabet = "abcdefghijklmnopqrstuvwxyz"
        .toUpperCase()
        .split("");
    let codeInput = str.slice().toUpperCase();
    let newStr = "";
    for (let i = 0; i <= codeInput.length - 1; i++) {
        if (/\s/.test(codeInput[i])) {
            newStr += " ";
        } else if (alphabet.indexOf(codeInput[i]) < 0) {
            newStr += codeInput[i];
        } else if (alphabet.indexOf(codeInput[i]) + 13 <= 25) {
            newStr += alphabet[(alphabet.indexOf(codeInput[i])) + 13];
        } else if (alphabet.indexOf(codeInput[i]) + 13 > 25) {
            newStr += alphabet[(alphabet.indexOf(codeInput[i])) - 13];
        }
    }
    return newStr;
}
//console.log(rot13("ZNGGURJ EBPXF!"));

function telephoneCheck(str) {
    let check = [
        /^1\s{0,1}[(]\d{3,3}[)]\s{0,1}\d{3,3}[\W\s]{0,1}\d{4,4}$/,
        /^1\s\d{3,3}[-\s]{0,1}\d{3,3}[\W\s]{0,1}\d{4,4}$/,
        /^[(]\d{3,3}[)]\d{3,3}[\s\W]{0,1}\d{4,4}$/,
        /^\d{3,3}[\W\s]{0,1}\d{3,3}[\W\s]{0,1}\d{4,4}$/
    ];
    return check.some((x) => x.test(str));
}
//console.log(telephoneCheck("(954)555-5555"));

function checkCashRegister(price, cash, cid) {
    // Change due in pennies
    const cashDue = (cash - price) * 100;
    // Draw denomination amounts in pennies
    let coinAmounts = cid.map((x) => x[1] * 100);
    // Total in draw in pennies
    let drawTotal = coinAmounts.reduce((x, y) => x + y);
    // Array for pending change
    let changeQueue = cid.map(x => ([x[0], 0])); 
    // Organized change array
    let change = [];
    //let sortedChange;
    let status = "OPEN";
    let insufficient = false;
    // Function to calculate how much change of each denomination should be given
    function calcChange(a, b) {
        while (a >= 1 && !insufficient) {
            if (a >= 10000 && b[8] >= 10000) {
                changeQueue[8][1] += 10000;
                b[8] -= 10000;
                a -= 10000;
            } else if (a >= 2000 && b[7] >= 2000) {
                changeQueue[7][1] += 2000;
                b[7] -= 2000;
                a -= 2000;
            } else if (a >= 1000 && b[6] >= 1000) {
                changeQueue[6][1] += 1000;
                b[6] -= 1000;
                a -= 1000;
            } else if (a >= 500 && b[5] >= 500) {
                changeQueue[5][1] += 500;
                b[5] -= 500;
                a -= 500;
            } else if (a >= 100 && b[4] >= 100) {
                changeQueue[4][1] += 100;
                b[4] -= 100;
                a -= 100;
            } else if (a >= 25 && b[3] >= 25) {
                changeQueue[3][1] += 25;
                b[3] -= 25;
                a -= 25;
            } else if (a >= 10 && b[2] >= 10) {
                changeQueue[2][1] += 10;
                b[2] -= 10;
                a -= 10;
            } else if (a >= 5 && b[1] >= 5) {
                changeQueue[1][1] += 5;
                b[1] -= 5;
                a -= 5;
            } else if (a >= 1 && b[0] >= 1) {
                changeQueue[0][1] += 1;
                b[0] -= 1;
                a -= 1;
            } else {
                insufficient = true;
            }
        }
    }
    if (cashDue > drawTotal) {
        status = "INSUFFICIENT_FUNDS";
    } else if (cashDue === drawTotal) {
        status = "CLOSED";
        change = cid;
    } else {
        calcChange(cashDue, coinAmounts);
        // If there is enough money but not enough of a certain coin, return insuccicient
        if (insufficient) {
            status = "INSUFFICIENT_FUNDS";
        } else {
            change = changeQueue
              .reverse()
              .map(x => ([x[0], x[1]/100]))
              .filter(x => (x[1] > 0));
        }
    }
    return {status: status, change: change};
}
console.log(checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]));
/*
function checkCashRegister(price, cash, cid) {
    const cashDue = (cash - price) * 100;
    let coinAmounts = cid.map((x) => x[1] * 100);
    let drawTotal = coinAmounts.reduce((x, y) => x + y);
    let changeQueue = cid.map(x => ([x[0], 0])); 
    let change = [];
    let status;
    let insufficient = false;
    function calcChange(a, b) {
        while (a >= 1 && !insufficient) {
            if (a >= 10000 && b[8] >= 10000) {
                changeQueue[8][1] += 10000;
                b[8] -= 10000;
                a -= 10000;
            } else if (a >= 2000 && b[7] >= 2000) {
                changeQueue[7][1] += 2000;
                b[7] -= 2000;
                a -= 2000;
            } else if (a >= 1000 && b[6] >= 1000) {
                changeQueue[6][1] += 1000;
                b[6] -= 1000;
                a -= 1000;
            } else if (a >= 500 && b[5] >= 500) {
                changeQueue[5][1] += 500;
                b[5] -= 500;
                a -= 500;
            } else if (a >= 100 && b[4] >= 100) {
                changeQueue[4][1] += 100;
                b[4] -= 100;
                a -= 100;
            } else if (a >= 25 && b[3] >= 25) {
                changeQueue[3][1] += 25;
                b[3] -= 25;
                a -= 25;
            } else if (a >= 10 && b[2] >= 10) {
                changeQueue[2][1] += 10;
                b[2] -= 10;
                a -= 10;
            } else if (a >= 5 && b[1] >= 5) {
                changeQueue[1][1] += 5;
                b[1] -= 5;
                a -= 5;
            } else if (a >= 1 && b[0] >= 1) {
                changeQueue[0][1] += 1;
                b[0] -= 1;
                a -= 1;
            } else {
                insufficient = true;
            }
        }
    }
    if (cashDue > drawTotal) {
        status = "INSUFFICIENT_FUNDS";
    } else if (cashDue === drawTotal) {
        status = "CLOSED";
        change = cid;
    } else {
        calcChange(cashDue, coinAmounts);
        if (insufficient) {
            status = "INSUFFICIENT_FUNDS";
            change = [];
        } else {
            status = "OPEN";
            changeQueue.map(x => (change.unshift(x)));
            change = change
            .map(x => ([x[0], x[1]/100]))
            .filter(x => (x[1] > 0));
        }
        
    }
    return {status: status, change: change};
}
console.log(checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]));*/
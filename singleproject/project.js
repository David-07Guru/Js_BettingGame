//deposit some money
//determine number of lines to bet on
// collect the bet amount
// spin the slot machine
// give the user their winnings
// play again

// function deposit(){
//     return 1;
// }
// let x=deposit();
const prompt = require("prompt-sync")();

const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT = {
    A: 2,
    B: 4,
    C: 6,
    D: 8
}

const SYMBOLS_VALUES = {
    A: 5,
    B: 4,
    C: 3,
    D: 2
}



const deposit = () => {
    while (true) {
        const depositAmount = prompt("Enter a amount to be deposit: ");
        const numberDepositAmount = parseFloat(depositAmount);

        if (isNaN(numberDepositAmount) || numberDepositAmount <= 0) {
            console.log("Invalid Amount,Please enter a valid amount");
        }
        else {
            return numberDepositAmount;
        }
    }

};

const getNUmberofLines = () => {
    while (true) {
        const Lines = prompt("Enter the number of lines to bet on (from 1-3):  ");
        const numberofLines = parseFloat(Lines);

        if (isNaN(numberofLines) || numberofLines <= 0 || numberofLines > 3) {
            console.log("Invalid Bet,Please enter a valid bet lines");
        }
        else {
            return numberofLines;
        }
    }
};

const getBet = (balance, lines) => {
    while (true) {
        const bet = prompt("Enter the bet per line:  ");
        const numberBet = parseFloat(bet);

        if (isNaN(numberBet) || numberBet <= 0 || numberBet > (balance / lines)) {
            console.log("Invalid Bet,try again");
        }
        else {
            return numberBet;
        }
    }
};

const spin = () => {
    const symbols = [];//an array
    for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)) {
        for (let i = 0; i < count; i++) {
            symbols.push(symbol);
        }
    }

    const reels = []; //a matrix with three rows and five columns
    for (let i = 0; i < COLS; i++) {
        reels.push([]);
        const reelSymbols = [...symbols];
        for (let j = 0; j < ROWS; j++) {
            const randomIndex = Math.floor(Math.random() * reelSymbols.length)
            const selectedSymbol = reelSymbols[randomIndex];
            reels[i].push(selectedSymbol);
            reelSymbols.splice(randomIndex, 1);
        }
    }

    return reels;
};

const tranpose = (reels) => {
    const rows = [];

    for (let i = 0; i < ROWS; i++) {
        rows.push([]);
        for (let j = 0; j < COLS; j++) {
            rows[i].push(reels[j][i]);
        }
    }
    return rows;
};

const print = (rows) => {
    for (const row of rows) {
        let rowString = "";
        for (const [i, symbol] of row.entries()) {
            rowString += symbol;
            if (i != row.length - 1) {
                rowString += " | ";
            }
        }
        console.log(rowString);
    }
};

const getWinnings = (rows, bet, lines) => {
    let winnings = 0;

    for (let row = 0; row < lines; row++) {
        const symbols = rows[row];
        let allsame = true;

        for (const symbol of symbols) {
            if (symbol !== symbols[0]) {
                allsame = false;
                break;
            }
        }


        if (allsame) {
            winnings += bet * SYMBOLS_VALUES[symbols[0]]
        }
    }

    return winnings;

};

const game = () => {
    let balance = deposit();
    while(true){
        console.log("You have a balance of $ ",balance);
        const curlines = getNUmberofLines();
        const bet = getBet(balance, curlines);
        balance-=bet *curlines;
        const reels = spin();
        const rows = tranpose(reels);
        print(rows);
        const winnings = getWinnings(rows, bet, curlines);
        balance+=winnings;
        console.log("YOu won, $ " + winnings.toString());

        if(balance<=0){
            console.log("You ran out of money");
            break;
        }
        const playAgain=prompt("Do you want to play again (y/n)? ");
        if(playAgain!=='y'){
            break;
        }
    }
};


game();
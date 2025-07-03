class Bot { //random
    makeMove(gamestate) {
        rounds = gamestate[rounds];

        pladynamite, oppdynamite = getdyna(rounds);

        // tie strat
        const tieslen = checkties(gamestate[rounds]);
        if (tieslen > 0){
            history = extractties(rounds, tieslen); //check single next move across history, and then react
            //analyse their tie strategy from previous ties and react
            nextmoves = history.map((past) => past[tieslen]);
            const patternlen = checkpatterns(nextmoves);
            if (patternlen != -1) {
                return patternreact(nextmoves, patternlen);
            } else {
                return randomdynamove();
            }

        }

        // normal gameplay strat
        opprounds = gamestate[rounds].map(round => round[p2]);
        const patternlen = checkpatterns(opprounds);
        if (patternlen != -1) {
            // pattern
            return patternreact(opprounds, patternlen);
        }
        else {
            // no pattern
            return randomdynamove();
        }
    }
}

module.exports = new Bot();

function checkpatterns(rounds){
    const numcycles = 3;
    for (i = Math.floor(rounds.length/numcycles); i >= 1; i--){
        if ((rounds.slice(rounds.length-i).toString() == rounds.slice(rounds.length - (2*i), rounds.length - i).toString())
            && (rounds.slice(rounds.length - (2*i), rounds.length - i).toString() == rounds.slice(rounds.length - (3*i), rounds.length - (2*i))).toString()) {
            return i;
            
        }
    }
    return -1;
}

function checkties(rounds) {
    let ties = 0;
    let n = rounds.length - 1;
    while(n - ties >= 0){
        if (rounds[n - ties]["p1"] == rounds[n - ties]["p2"]) {
            ties += 1;
        } else {
            break;
        }
    }
    return ties;
}

function patternreact(rounds, patternlen) {
    pattern = rounds.slice(rounds.length - patternlen);
    return react(pattern[0]);
}

function react(move){
    switch(move) {
        case "R" : return "P";
        case "P" : return "S";
        case "S" : return "R";
        case "D" : return "W";
        case "W" : return randomove();
    }
}

function randomove(){
    const rand = Math.random() * 3;
    switch (Math.floor(rand)) {
        case 0: 
            return "R";
        case 1: 
            return "P";
        case 2:
            return "S";
    }
}

function randomdynamove(){
    const rand = Math.random();
    dynap = Math.min(0.5, pladynamite/(2500-rounds.length));
    if (rand < dynap) {
        return "D";
    } else {
        return randomove();
    }
}

function getdyna(rounds){
    pladynamite = 100;
    oppdynamite = 100;

    for (let i = 0; i < rounds.length; i++) {
        if (rounds[i]["p1"] == "D") {
            pladynamite -= 1;
        }
        if (rounds[i]["p2"] == "D") {
            oppdynamite -= 1;
        }
    }

    return pladynamite, oppdynamite;
}

function extractties(rounds, tielen){
    const result = [];
    let i = rounds.length-tielen-1;
    while(i >= 0){
        let ties = checkties(rounds.slice(0, i+1));
        if (ties >= tielen) {
            let past = rounds.slice(i - ties + 1, i+2);
            result.push(past);

            i -= ties;
        } else {
            i--;
        }
    }
    return result;
}

let rounds = [{p1: 1, p2: 1}, {p1: 1, p2: 2}, {p1: 2, p2: 2}, {p1: 1, p2: 1},{p1: 2, p2: 1},{p1: 1, p2: 1},{p1: 1, p2: 1},{p1: 1, p2: 1}, {p1: 1, p2: 2}, {p1: 2, p2: 2},];
// console.log(checkties(rounds));
// console.log(extractties(rounds, 2));
console.log(checkpatterns([1, 1]));
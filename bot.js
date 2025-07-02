class Bot { //random
    makeMove(gamestate) {
        rounds = gamestate[rounds].map(round => round[p2]);
        const tieslen = checkties(gamestate[rounds]);
        if (tieslen > 0){
            //analyse their tie strategy from previous ties and react
        }


        const patternlen = checkpatterns(rounds);
        if (patternlen != -1) {
            //react to patterns
        }
        else {
            //react to random
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

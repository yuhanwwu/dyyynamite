class Bot {
    makeMove(gamestate) {
    let dynas = getdyna(gamestate["rounds"]);
    const pladynamite = dynas[0];
    const rand = Math.random() * 4;
    switch (Math.floor(rand)) {
        case 0: 
            return "R";
        case 1: 
            return "P";
        case 2:
            return "S";
        default:
            if (pladynamite > 0){
                return "D";
            }
            else {
                return randomove();
            }
    }
}}

module.exports = new Bot();

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

    return [pladynamite, oppdynamite];
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
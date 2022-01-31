const blockSize = 3;
const parentDom = document.getElementById('parent');
const personDom = document.getElementById('person');
const aLengthDom = document.getElementById('aLength');
const bLengthDom = document.getElementById('bLength');
const winnerDom = document.getElementById('winner');

let person = 'A';
let value = 'X';
let winners = {
    a: [],
    b: []
}

let personData = {};


function createBlocks() {
    for(let i = 0; i < blockSize; i++){
        const trDom = document.createElement('tr');
        for(let j = 0; j<blockSize; j++){
            const tdDom = document.createElement('td');
            tdDom.id = `${i}${j}`;
            tdDom.className = 'tdEle';
            //tdDom.innerHTML = 'X';
            trDom.appendChild(tdDom);
        }
        parentDom.appendChild(trDom);
    }
    parentDom.addEventListener('click', onClick);
    personDom.innerHTML = `${person}'s turn`;
}

function onClick(e) {
    e.preventDefault();
    const id = e.target.id;
    const node = document.getElementById(id);
    if(node && !node.innerHTML) {
        node.innerHTML =  value;
        personData[id] = value;
        isWinner(id);
        person = person === 'A' ? 'B' : 'A';
        value = value === 'X' ? 'O' : 'X';
        personDom.innerHTML = `${person}'s turn`;
        aLengthDom.innerHTML = `A length: ${winners.a.length}`;
        bLengthDom.innerHTML = `B length: ${winners.b.length}`;
        const winnerVal = winners.a.length > winners.b.length ? 'A' : winners.a.length < winners.b.length ? 'B' : 'Draw';
        winnerDom.innerHTML = `Winner is ${winnerVal}`;
    }
    
}

function isWinner(id) {
    let val = checkRow(id);
    if(!val) {
        let cVal = checkColumn(id);
        if(!cVal) {
            checkDiagonals(id);
        }
    }
}

function checkRow(id){
    let val = id.split('');
    const first = personData[`${val[0]}0`];
    const sec = personData[`${val[0]}1`];
    const third = personData[`${val[0]}2`];
    return checkIsWinner(first, sec, third);
}

function checkColumn(id) {
    let val = id.split('');
    const first = personData[`0${val[1]}`];
    const sec = personData[`1${val[1]}`];
    const third = personData[`2${val[1]}`];
    return checkIsWinner(first, sec, third);
}

function checkDiagonals(id) {
    let val = id.split('');
    if((parseInt(val[0]) + parseInt(val[1])) % 2 == 0){
        if(val[0] === val[2]) {
            const first = personData['00'];
            const sec = personData['11'];
            const third = personData['22'];
            return checkIsWinner(first, sec, third);
        } 
        if((parseInt(val[0]) + parseInt(val[1])) === 2){
            const first = personData['02'];
            const sec = personData['11'];
            const third = personData['20'];
            return checkIsWinner(first, sec, third);
        }
    }
}

function checkIsWinner(first, sec, third) {
    if(`${first}${sec}${third}` === 'XXX' || `${first}${sec}${third}` === 'OOO'){
        if(person == 'A') {
            winners.a.push(1);
        } else {
            winners.b.push(1);
        }
        return true;
    }
    return false;
}

createBlocks();
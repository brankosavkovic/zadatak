const chessTable = document.getElementById('chessTable');

const table = [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0]
];

const queenCordinates = {
    i: null,
    j: null,
}

function createTable(showPossibleMoves){
    chessTable.innerHTML = '';
    for (let i = 0; i < table.length; i++){
        const row = document.createElement("div");
        row.className = "rowClass";
       
        for (let j = 0; j < 8; j++){
            const field = document.createElement("div");
            if (table[i][j] === 0) {
                field.addEventListener('click', () => moveQueen(i, j))
            }
            
            const fieldColorClass = (i+j) % 2 == 1 ? 'black' : 'white';
            const redColorClass = table[i][j] === 'x' ? 'red-color' : '';

            let markAsPossible = '';
            if (showPossibleMoves) {
                markAsPossible = canGoQueen(queenCordinates.i, queenCordinates.j, i, j) ? 'possible-fields' : '';
            }
            const fieldClass = `fieldClass ${fieldColorClass} ${markAsPossible} ${redColorClass}`;
            field.className = fieldClass;

            if (table[i][j] === 1){
                const imgQueen = document.createElement("img");
                imgQueen.src = "queen.png";
                imgQueen.className = "queen";
                imgQueen.addEventListener('click', () => onQueenClick(i, j))
                field.appendChild(imgQueen);

            }

            row.appendChild(field);
        }

        chessTable.appendChild(row); 
    }  
}

function onQueenClick(i, j) {
    if ((queenCordinates.i || queenCordinates.i === 0) && (queenCordinates.j || queenCordinates.j === 0)) {
        queenCordinates.i = null;
        queenCordinates.j = null;
    } else {
        queenCordinates.i = i;
        queenCordinates.j = j;
    }
    
    createTable(true);
}

function moveQueen(i, j) {
    if ((queenCordinates.i || queenCordinates.i === 0) && (queenCordinates.j || queenCordinates.j === 0)) {
        if (canGoQueen(queenCordinates.i, queenCordinates.j, i, j)) {
            table[queenCordinates.i][queenCordinates.j] = 0;
            table[i][j] = 1;
            queenCordinates.i = null;
            queenCordinates.j = null;
            createTable();
        } else {
            table[i][j] = 'x';
            createTable(true);
            setTimeout(() => {
                table[i][j] = 0;
                createTable(true);
            }, 700)
        }
        
    }
}

function canGoQueen(currI, currJ, i, j) {
    if (!queenCordinates.i && queenCordinates.i !== 0 && !queenCordinates.j && queenCordinates.j !== 0) return false
    return currI === i || currJ === j || Math.abs(currI - i) === Math.abs(currJ - j)
}

function randomizeQueen() {
    const i = Math.floor(Math.random() * 8);
    const j = Math.floor(Math.random() * 8);
    table[i][j] = 1;
}

randomizeQueen()
createTable();
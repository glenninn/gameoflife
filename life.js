const fs = require("fs");

const initial = [
    `..*...*.`,
    `..*..**.`,
    `*.*.*..*`,
    `...*....`,
    `*.**.**.`
];

const lifeSymbol = "\x02";

function readBoard(fn){
   let board = [];
   
   try {
       let json = fs.readFileSync(fn);
       board = JSON.parse(json.toString());
   } catch(e){
       console.log(`Could not read ${fn}, error: ${e}`);
       process.exit();
   }
   return board;
}


function conGoto(x,y,msg){
    process.stdout.write("\x1b["+x+";"+y+"H");
    if(msg) process.stdout.write( msg );
}

function clearScreen() {
    var conClrPage = "\x1bc";
    process.stdout.write(conClrPage);
}

function eraseEOL() {
    var conEraEOL = "\x1b[K";
    process.stdout.write(conEraEOL);
}


function CalculateGeneration(theBoard) {

    const height= theBoard.length;
    const width = (height >0 ? theBoard[0].length : 0);

    function neighbors(x,y) {
        const offsets = [
            {x:-1, y:-1}, {x:0, y:-1}, {x:1, y:-1},
            {x:-1, y:0},                {x:1, y:0},
            {x:-1, y:1},  {x:0, y:1},  {x:1, y:1}
        ];
        let n = 0;

        offsets.forEach( (ofs)=>{
            let nx = x+ofs.x;
            let ny = y+ofs.y;
            if( (nx>=0) && (nx<width) &&
                (ny>=0) && (ny<height) &&
                (theBoard[ny][nx] ==="*") ) {
                    n +=1;
                }
        });
        return n;
    }

    let results = [];
    theBoard.forEach( (row,r)=>{
        let nextRow = "";
        for(var c=0; c<row.length; c++){
            let n =  neighbors(c,r,theBoard);
            let life = ".";
            if(n<2) {
                life = ".";
            } else if (n===2){
                life = theBoard[r][c]==="*" ? "*" : ".";
            } else if (n===3){
                life = "*";
            }
            nextRow += life;
        };
        // console.log("");
        results.push(nextRow);
    });
    return results;
}

function showBoard(board) {
    conGoto(3,1);
    board.forEach( (row)=>{
        eraseEOL();
        for(var i=0; i<row.length; i++){
            process.stdout.write (` ${row[i] ==="." ? "." : lifeSymbol}`);
        }
        console.log("");
    });
}

async function sleep(ms) {
    var p = new Promise( (res)=>{

        setTimeout( ()=>{
            res(true)
        }, ms);

    });

    return p;
}


async function showLife(onBoard) {
    let gen=0;
    let gameBoard = [...onBoard];

    conGoto(2,1,`In the Beginning...`);
    showBoard(gameBoard);

    do{
        await sleep(1000);

        let nextLife = CalculateGeneration(gameBoard);
        gameBoard = [...nextLife];
        
        conGoto(2,1,`Generation: ${gen}`);
        eraseEOL();
        gen++;
        showBoard(gameBoard);

    }while(true);
}


clearScreen();
console.log("Conwnys Game of Life");
let gameBoard = null;

if(process.argv.length > 2){
    let fn = process.argv[2];

    gameBoard = readBoard(fn);
} else {
    gameBoard = [...initial];
}

showLife(gameBoard);

console.log("*** done ***");

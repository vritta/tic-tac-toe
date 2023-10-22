const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".new-game");
let currentPlayer="X";
let gameGrid = ["","","","","","","","",""];
let result = false;
let totalClicked = 0;
const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];


function handleClick(index){
    //console.log(index);
    if(result==true)
    return;
    if(gameGrid[index]===""){
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";

        if(currentPlayer === "X"){
            currentPlayer = "O";
        }
        else{
            currentPlayer = "X";
        }
        gameInfo.innerText = `Current Player - ${currentPlayer}`;
        totalClicked++;
        checkWinner();
        if(result!=true && totalClicked==9){
            gameInfo.innerText = "Game Tied !";
        }
    }
}


function checkWinner(){
    winningPositions.forEach((value)=>{//console.log(boxes[value[0]]);
        if(gameGrid[value[0]] == gameGrid[value[1]] && gameGrid[value[1]] == gameGrid[value[2]] && (gameGrid[value[1]]=="X" || gameGrid[value[1]]=="O")){
            
            // if(gameGrid[value[0]]=="X"){
            //     gameInfo.innerText = `Winner Player - X`;
            // }
            // else{
            //     gameInfo.innerText = `Winner Player - O`;
            // }
            gameInfo.innerText = `Winner Player - ${gameGrid[value[0]]}`;
            
            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            })

            boxes[value[0]].classList.add("win");
            boxes[value[1]].classList.add("win");
            boxes[value[2]].classList.add("win");
            // initGame();
            result = true;
        }
    });
}


function initGame(){
    gameGrid = ["","","","","","","","",""];
    currentPlayer="X";
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
    boxes.forEach((value,ind)=>{
        value.innerText = "";
        value.style.pointerEvents = "all";
        value.classList.remove("win");
    });
    result = false;
    totalClicked = 0;
}
initGame();

boxes.forEach((currentBox,index)=>{//console.log(index);
    currentBox.addEventListener("click", ()=>{
        handleClick(index);
    });
});
newGameBtn.addEventListener("click",initGame);
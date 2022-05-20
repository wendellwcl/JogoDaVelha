//selecionando elementos
let boxes = document.querySelectorAll('.box');
let scoreboardPlayer1 = document.querySelector('#score-player1');
let scoreboardPlayer2 = document.querySelector('#score-player2');

/*Controladores*/

//round
let roundControl = 1;

//jogadas feitas por cada jogador
let movesOfPlayer1 = [];
let movesOfPlayer2 = [];

//pontos de cada jogador
let scorePlayer1 = 0;
let scorePlayer2 = 0;

//adicionar função aos elementos
function setEvents(){
    boxes.forEach(el => {
        el.addEventListener('click', play);
    });
};
setEvents();

//jogo
function play(){

    //jogada feita
    let i = parseInt(this.id.slice(-1));

    //checando round
    if((roundControl % 2) !== 0){
        this.style.backgroundColor = 'red';
        //atualizar array movesOfPlayer1
        movesOfPlayer1.push(i);
    } else {
        this.style.backgroundColor = 'blue';
        //atualizar array movesOfPlayer2
        movesOfPlayer2.push(i);
    };

    //atualizar round
    roundControl++;
    
    //remover função do elemento selecionado
    this.removeEventListener('click', play);

    //checar vitoria
    checkWin();

};

//condições de vitoria
function checkWin(){

    //horizontais
    if(movesOfPlayer1.includes(1) && movesOfPlayer1.includes(2) && movesOfPlayer1.includes(3)){
        scorePlayer1++;
        resetRound();
    } else if(movesOfPlayer2.includes(1) && movesOfPlayer2.includes(2) && movesOfPlayer2.includes(3)){
        scorePlayer2++;
        resetRound();
    };

    if(movesOfPlayer1.includes(4) && movesOfPlayer1.includes(5) && movesOfPlayer1.includes(6)){
        scorePlayer1++;
        resetRound();
    } else if(movesOfPlayer2.includes(4) && movesOfPlayer2.includes(5) && movesOfPlayer2.includes(6)){
        scorePlayer2++;
        resetRound();
    };

    if(movesOfPlayer1.includes(7) && movesOfPlayer1.includes(8) && movesOfPlayer1.includes(9)){
        scorePlayer1++;
        resetRound();
    } else if(movesOfPlayer2.includes(7) && movesOfPlayer2.includes(8) && movesOfPlayer2.includes(9)){
        scorePlayer2++;
        resetRound();
    };

    //verticais
    if(movesOfPlayer1.includes(1) && movesOfPlayer1.includes(4) && movesOfPlayer1.includes(7)){
        scorePlayer1++;
        resetRound();
    } else if(movesOfPlayer2.includes(1) && movesOfPlayer2.includes(4) && movesOfPlayer2.includes(7)){
        scorePlayer2++;
        resetRound();
    };

    if(movesOfPlayer1.includes(2) && movesOfPlayer1.includes(5) && movesOfPlayer1.includes(8)){
        scorePlayer1++;
        resetRound();
    } else if(movesOfPlayer2.includes(2) && movesOfPlayer2.includes(5) && movesOfPlayer2.includes(8)){
        scorePlayer2++;
        resetRound();
    };

    if(movesOfPlayer1.includes(3) && movesOfPlayer1.includes(6) && movesOfPlayer1.includes(9)){
        scorePlayer1++;
        resetRound();
    } else if(movesOfPlayer2.includes(3) && movesOfPlayer2.includes(6) && movesOfPlayer2.includes(9)){
        scorePlayer2++;
        resetRound();
    };

    //diagonais
    if(movesOfPlayer1.includes(1) && movesOfPlayer1.includes(5) && movesOfPlayer1.includes(9)){
        scorePlayer1++;
        resetRound();
    } else if(movesOfPlayer2.includes(1) && movesOfPlayer2.includes(5) && movesOfPlayer2.includes(9)){
        scorePlayer2++;
        resetRound();
    };

    if(movesOfPlayer1.includes(3) && movesOfPlayer1.includes(5) && movesOfPlayer1.includes(7)){
        scorePlayer1++;
        resetRound();
    } else if(movesOfPlayer2.includes(3) && movesOfPlayer2.includes(5) && movesOfPlayer2.includes(7)){
        scorePlayer2++;
        resetRound();
    };
    
    //velha
    if((movesOfPlayer1.length + movesOfPlayer2.length) === 9){
        resetRound();
    };

};

//reset rodada
function resetRound(){

    //atualizar placar
    scoreboardPlayer1.innerHTML = scorePlayer1;
    scoreboardPlayer2.innerHTML = scorePlayer2;

    //reset
    boxes.forEach(el => {
        el.style.backgroundColor = null;
    });

    //reset controladores
    movesOfPlayer1 = [];
    movesOfPlayer2 = [];
    roundControl = 1;

    //reset eventos - adicionar eventos novamente
    setEvents();
};

//reset placar
function resetScoreboard(){

    //reset pontos
    scorePlayer1 = 0;
    scorePlayer2 = 0;

    //atualizar placar
    scoreboardPlayer1.innerHTML = scorePlayer1;
    scoreboardPlayer2.innerHTML = scorePlayer2;

    //reset round
    resetRound();
};
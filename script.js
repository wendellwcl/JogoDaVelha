//selecionando elementos
let btn1 = document.querySelector('#btn1');
let btn2 = document.querySelector('#btn2');
let boxes = document.querySelectorAll('.box');
let msg = document.querySelector('#msg');
let imgMsg = document.querySelector('#msgImg');
let msgText = document.querySelector('#msgText');
let scoreboardPlayer1 = document.querySelector('#score-player1');
let scoreboardPlayer2 = document.querySelector('#score-player2');

//player artificial
let artificialPlayer = true;

//round
let roundControl = 1;
let winner = false;

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

//feedback visual gametype atual
function feedbackGametype(b){
    if(b){
        btn2.style.backgroundColor = 'transparent';
        btn2.style.color = '#3A76FB';
        btn1.style.backgroundColor = '#3A76FB';
        btn1.style.color = '#F4F4F4';
    } else {
        btn1.style.backgroundColor = 'transparent';
        btn1.style.color = '#3A76FB';
        btn2.style.backgroundColor = '#3A76FB';
        btn2.style.color = '#F4F4F4';
    }
}
feedbackGametype(artificialPlayer);

//alterar numero de jogadores
function numberOfPlayers(num){
    if(num === 1){
        artificialPlayer = true;
        resetRound();
    } else {
        artificialPlayer = false;
        resetRound();
    };
    feedbackGametype(artificialPlayer);
};

//jogo
function play(){

    //jogada feita
    let i = parseInt(this.id.slice(-1));

    //checando round
    if((roundControl % 2) !== 0 && !winner){
        //feedback visual da jogada
        this.style.backgroundImage = 'url("img/X.png")';
        //atualizar array movesOfPlayer1
        movesOfPlayer1.push(i);
    } else if((roundControl % 2) === 0 && !winner){
        //feedback visual da jogada
        this.style.backgroundImage = 'url("img/O.png")';
        //atualizar array movesOfPlayer2
        movesOfPlayer2.push(i);
    };

    //atualizar round
    roundControl++;
    
    //remover função do elemento selecionado
    this.removeEventListener('click', play);

    //checar vitoria
    checkWin();

    //jogada do player artificial
    if(artificialPlayer && !winner){
        setTimeout(() => {
            artificialPlayerMove();
        }, 200);
    };
};

//jogada do artificial player
function artificialPlayerMove(){
    //sorteando numero
    let x = Math.round((Math.random())*9);
    while(movesOfPlayer1.includes(x) || movesOfPlayer2.includes(x) || x === 0){
        x = Math.round((Math.random())*9);
    };

    //feedback visual da jogada
    let el = document.getElementById(`box-${x}`);
    el.style.backgroundImage = 'url(img/O.png)';

    //atualizar array movesOfPlayer2
    movesOfPlayer2.push(x);

    //remover função do elemento selecionado
    el.removeEventListener('click', play);

    //atualizar round
    roundControl++;

    //checar vitoria
    checkWin();
};

//condições de vitoria
function checkWin(){

    //horizontais
    if(movesOfPlayer1.includes(1) && movesOfPlayer1.includes(2) && movesOfPlayer1.includes(3)){
        scorePlayer1++;
        resetRound('X');
    } else if(movesOfPlayer2.includes(1) && movesOfPlayer2.includes(2) && movesOfPlayer2.includes(3)){
        scorePlayer2++;
        resetRound('O');
    };

    if(movesOfPlayer1.includes(4) && movesOfPlayer1.includes(5) && movesOfPlayer1.includes(6)){
        scorePlayer1++;
        resetRound('X');
    } else if(movesOfPlayer2.includes(4) && movesOfPlayer2.includes(5) && movesOfPlayer2.includes(6)){
        scorePlayer2++;
        resetRound('O');
    };

    if(movesOfPlayer1.includes(7) && movesOfPlayer1.includes(8) && movesOfPlayer1.includes(9)){
        scorePlayer1++;
        resetRound('X');
    } else if(movesOfPlayer2.includes(7) && movesOfPlayer2.includes(8) && movesOfPlayer2.includes(9)){
        scorePlayer2++;
        resetRound('O');
    };

    //verticais
    if(movesOfPlayer1.includes(1) && movesOfPlayer1.includes(4) && movesOfPlayer1.includes(7)){
        scorePlayer1++;
        resetRound('X');
    } else if(movesOfPlayer2.includes(1) && movesOfPlayer2.includes(4) && movesOfPlayer2.includes(7)){
        scorePlayer2++;
        resetRound('O');
    };

    if(movesOfPlayer1.includes(2) && movesOfPlayer1.includes(5) && movesOfPlayer1.includes(8)){
        scorePlayer1++;
        resetRound('X');
    } else if(movesOfPlayer2.includes(2) && movesOfPlayer2.includes(5) && movesOfPlayer2.includes(8)){
        scorePlayer2++;
        resetRound('O');
    };

    if(movesOfPlayer1.includes(3) && movesOfPlayer1.includes(6) && movesOfPlayer1.includes(9)){
        scorePlayer1++;
        resetRound('X');
    } else if(movesOfPlayer2.includes(3) && movesOfPlayer2.includes(6) && movesOfPlayer2.includes(9)){
        scorePlayer2++;
        resetRound('O');
    };

    //diagonais
    if(movesOfPlayer1.includes(1) && movesOfPlayer1.includes(5) && movesOfPlayer1.includes(9)){
        scorePlayer1++;
        resetRound('X');
    } else if(movesOfPlayer2.includes(1) && movesOfPlayer2.includes(5) && movesOfPlayer2.includes(9)){
        scorePlayer2++;
        resetRound('O');
    };

    if(movesOfPlayer1.includes(3) && movesOfPlayer1.includes(5) && movesOfPlayer1.includes(7)){
        scorePlayer1++;
        resetRound('X');
    } else if(movesOfPlayer2.includes(3) && movesOfPlayer2.includes(5) && movesOfPlayer2.includes(7)){
        scorePlayer2++;
        resetRound('O');
    };
    
    //velha
    if((movesOfPlayer1.length + movesOfPlayer2.length) === 9 && !winner){
        resetRound('Ninguém');
    };

};

//reset rodada
function resetRound(p){

    if(p){
        winner = true;

        if(p == 'X'){
            msgImg.setAttribute('src', 'img/X.png');
            msgText.innerHTML = `venceu a rodada`
        } else if(p == 'O'){
            msgImg.setAttribute('src', 'img/O.png');
            msgText.innerHTML = `venceu a rodada`
        } else {
            msgImg.setAttribute('src', '');
            msgText.innerHTML = `${p} venceu a rodada`
        }
        msg.style.display = 'block';

        setTimeout(() => {

            //atualizar placar
            scoreboardPlayer1.innerHTML = scorePlayer1;
            scoreboardPlayer2.innerHTML = scorePlayer2;
    
            //reset
            boxes.forEach(el => {
                el.style.backgroundImage = null;
            });
    
            //reset controladores
            movesOfPlayer1 = [];
            movesOfPlayer2 = [];
            roundControl = 1;
    
            //reset eventos - adicionar eventos novamente
            setEvents();
    
            winner = false;
    
            msg.style.display = 'none';
    
        }, 1000);

    } else {

        //atualizar placar
        scoreboardPlayer1.innerHTML = scorePlayer1;
        scoreboardPlayer2.innerHTML = scorePlayer2;

        //reset
        boxes.forEach(el => {
            el.style.backgroundImage = null;
        });

        //reset controladores
        movesOfPlayer1 = [];
        movesOfPlayer2 = [];
        roundControl = 1;

        //reset eventos - adicionar eventos novamente
        setEvents();
    };

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
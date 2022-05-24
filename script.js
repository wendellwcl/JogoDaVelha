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

//controle de rodadas
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
    };
};
feedbackGametype(artificialPlayer);



//alterar gametype
function gametype(num){
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

    //box clicada
    let i = parseInt(this.id.slice(-1));

    //checar qual jogador jogou
    if((roundControl % 2) !== 0 && !winner){

        //inserir simbolo do jogador na box
        this.style.backgroundImage = 'url("img/X.png")';

        //atualizar array movesOfPlayer1
        movesOfPlayer1.push(i);

    } else if((roundControl % 2) === 0 && !winner){

        //inserir simbolo do jogador na box
        this.style.backgroundImage = 'url("img/O.png")';

        //atualizar array movesOfPlayer2
        movesOfPlayer2.push(i);

    };

    //atualizar round
    roundControl++;
    
    //remover função da box jogada
    this.removeEventListener('click', play);

    //checar vitoria
    checkWin();

    //checar se player artificial deve jogar
    if(artificialPlayer && !winner){
        setTimeout(() => {
            artificialPlayerMove();
        }, 200);
    };
};



//jogada do player artificial
function artificialPlayerMove(){

    //sortear jogada
    let x = Math.round((Math.random())*9);
    while(movesOfPlayer1.includes(x) || movesOfPlayer2.includes(x) || x === 0){
        x = Math.round((Math.random())*9);
    };

    //inserir simbolo do jogador na box
    let el = document.getElementById(`box-${x}`);
    el.style.backgroundImage = 'url(img/O.png)';

    //atualizar array movesOfPlayer2
    movesOfPlayer2.push(x);

    //remover função da box jogada
    el.removeEventListener('click', play);

    //atualizar round
    roundControl++;

    //checar vitoria
    checkWin();
};



//reset rodada
function resetRound(win){

    //checar se a rodada terminou ou foi interrompida
    if(win){
        
        //atualizar controle
        winner = true;

        //exibir quem ganhou a rodada
        if(win == 'X'){
            msgImg.setAttribute('src', 'img/X.png');
            msgText.innerHTML = `venceu a rodada`
        } else if(win == 'O'){
            msgImg.setAttribute('src', 'img/O.png');
            msgText.innerHTML = `venceu a rodada`
        } else {
            msgImg.setAttribute('src', '');
            msgText.innerHTML = `${win} venceu a rodada`
        }
        msg.style.display = 'block';

        setTimeout(() => {

            //atualizar placar
            scoreboardPlayer1.innerHTML = scorePlayer1;
            scoreboardPlayer2.innerHTML = scorePlayer2;
    
            //retirar simbolos das boxes
            boxes.forEach(el => {
                el.style.backgroundImage = null;
            });
    
            //reset controladores
            movesOfPlayer1 = [];
            movesOfPlayer2 = [];
            roundControl = 1;
            winner = false;
    
            //adicionar eventos novamente as boxes
            setEvents();

            //reirar mensagem de vitoria
            msg.style.display = 'none';
    
        }, 1000);

    } else {

        //atualizar placar
        scoreboardPlayer1.innerHTML = scorePlayer1;
        scoreboardPlayer2.innerHTML = scorePlayer2;

        //retirar simbolos das boxes
        boxes.forEach(el => {
            el.style.backgroundImage = null;
        });

        //reset controladores
        movesOfPlayer1 = [];
        movesOfPlayer2 = [];
        roundControl = 1;

        //adicionar eventos novamente as boxes
        setEvents();
    };
};



//reset placar
function resetScoreboard(){

    //reset pontos
    scorePlayer1 = 0;
    scorePlayer2 = 0;

    //reset round
    resetRound();
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
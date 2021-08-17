
let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
let snake =[];
snake[0] = {
    x: 8*box,
    y: 8*box
}
let direction = "right";

/*criação da posição randômica da presa. 
O Math.floor retira os valores após a virgula chamados pelo Math.random*/
let prey = {
    x: Math.floor(Math.random() *15+1) * box,
    y: Math.floor(Math.random() *15+1) * box
}

/*criação do background e tamanho do box*/
function criarBG() {
    context.fillStyle = "lightgrey";
    context.fillRect(0, 0, 16*box, 16*box);
}

/*criação da cobra com o incremento de posição*/
function criarCobra() {
    for (i=0; i < snake.length; i++) {
        context.fillStyle = "black";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

function drawPrey() {
    context.fillStyle ="blue";
    context.fillRect(prey.x, prey.y, box, box);
}

/*chamada para alteração de posição. Ver que a cobra não pode se mover diretamente em 180º*/
document.addEventListener('keydown', update);

function update(event) {
    if(event.keyCode == 37 && direction != "right") direction = "left"; /*keyCode 37 é o arrowLeft*/
    if(event.keyCode == 39 && direction != "left") direction = "right"; /*keyCode 39 é o arrowRight*/
    if(event.keyCode == 38 && direction != "up") direction = "down"; /*keyCode 38 é o arrowUp*/
    if(event.keyCode == 40 && direction != "down") direction = "up"; /*keyCode 40 é o arrowDown*/
}

function inciarJogo(){

    /*if para trazer a cobra de novo para a tela*/
    if(snake[0].x > 15*box && direction == "right") snake[0].x = 0;
    if(snake[0].x < 0 && direction == "left") snake[0].x = 15*box;
    if(snake[0].y > 15*box && direction == "up") snake[0].y = 0;
    if(snake[0].y < 0 && direction == "down") snake[0].y = 15*box;

    criarBG();
    criarCobra();
    drawPrey();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    /*if de complemento da posição*/
    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if(direction == "up") snakeY += box;
    if(direction == "down") snakeY -= box;

    /*if para incremento do tamanho da cobra no caso de achar a presa e nova geração de posição aleatória para a presa*/
    if(snakeX != prey.x || snakeY != prey.y){
        snake.pop();
    }
    else{
        /*dando nova posição aleatória para a presa*/
        prey.x = Math.floor(Math.random() * 15 + 1) * box;
        prey.y = Math.floor(Math.random() * 15 + 1) * box; 
    }

    /*assim como incrementa, ela deve perder a posição anterior - no caso de não ter achado a presa*/
    /*snake.pop();*/
    /*código levado para o if do acima*/

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);

}

let jogo = setInterval(inciarJogo, 100);






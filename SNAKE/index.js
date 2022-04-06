/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAME_RATE = 10;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  var BOARD_WIDTH = $('#board').width(); 
  var BOARD_HEIGHT = $('#board').height();
  var score = 0;
  var KEY = {
    "W": 87,
    "A": 65,
    "S": 83,
    "D": 68,
  }
  
  $("#title").text("S H N A K E");

  // Game Item Objects
  
  var bodyParts = [head];

  function SnakeBody(id, x, y, speedX, speedY){
    var instences = {
      id: id,
      x: x,
      y: y,
      speedX: speedX,
      speedY: speedY,
      
    }
    return instences;
  }

  var head = SnakeBody("#head", 360, 360, 0, 0);

  var apple = {
    id: "#apple",
    x: Math.floor(Math.random() * 25) * 20,
    y: Math.floor(Math.random() * 25) * 20,
    width: $("#apple").width(),
    height: $("#apple").height()
  };


  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);
  $(document).on('keydown', handleKeyDown);

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    snakeEat();
    
    moveSnake();
    moveObject(head);
    drawObj(apple);
    wallCollision(head);
    drawScore();
    
  }
  
  /* 
  Called in response to events.
  */
  function handleKeyDown(event){
    if (event.which === KEY.W && head.speedY >= 0){
       head.speedY = -20;
       head.speedX = 0;
    } if (event.which === KEY.A && head.speedX <= 0){
       head.speedX = -20;
       head.speedY = 0;
    } if (event.which === KEY.S && head.speedY >= 0){
       head.speedY = 20;
       head.speedX = 0;
    } if (event.which === KEY.D && head.speedX <= 0){
       head.speedX = 20;
       head.speedY = 0;
    }
  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  function moveObject(obj){
    obj.y += obj.speedY;
    obj.x += obj.speedX;
    drawObj(obj);
  }

  function drawScore(){
    $("#score").text(0 + score);
  }

  function drawObj(obj){
    $(obj.id).css("top", obj.y);
    $(obj.id).css("left", obj.x);
  }

  function addBody(){
    var newId = "snake" + bodyParts.length;
    
    $("<div>").addClass("snake").attr("id", newId).appendTo("#board");

    var tail = bodyParts[bodyParts.length - 1];

    var bodyPiece = SnakeBody("#" + newId, tail.x, tail.y, 0, 0);

    drawObj(bodyPiece);
    
    bodyParts.push(bodyPiece);
  }

  function moveSnake(){
    for(var i = bodyParts.length - 1; i >= 1; i--){
      bodyParts[i].x = bodyParts[i - 1].x;
      bodyParts[i].y = bodyParts[i - 1].y;
      drawObj(bodyParts[i]);
    }
  }

  function snakeEat(){
    if (head.x == apple.x && head.y == apple.y){
      apple.x = Math.floor(Math.random() * 25) * 20;
      apple.y = Math.floor(Math.random() * 25) * 20;
      addBody();
      score++;
    }
  }

  function wallCollision(obj){
    if (obj.y > BOARD_HEIGHT - obj.height){
      endGame();
    } else if (obj.y < 0){
      endGame();
    }

    if (obj.x > BOARD_WIDTH - obj.width){
      endGame();
    } else if (obj.x< 0){
      endGame();
    }
  }
  
  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}

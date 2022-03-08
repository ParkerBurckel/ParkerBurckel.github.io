/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  const FRAME_RATE = 60;
  const FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  
  var BOARD_WIDTH = $('#board').width(); 
  var BOARD_HEIGHT = $('#board').height();

  $("#title").text("P 0 N G");
  
  //controlls
  var KEY = {
    "UP": 38,
    "DOWN": 40,
    
    "W": 87,
    "S": 83,
  }
  
  //score var
  var score1 = 0;
  var score2 = 0;

  // Game Item Objects
  function GameItem(id, x, y, speedX, speedY){
    var gameItemInstance = {
      id: id,
      x: x,
      y: y,
      speedX: speedX,
      speedY: speedY,
      width: $(id).width(),
      height: $(id).height(),
    };
    return gameItemInstance;
  }

  var leftpaddle = GameItem("#leftPaddle", 20 , BOARD_HEIGHT / 2, 0, 0);
  
  var rightpaddle = GameItem("#rightPaddle", BOARD_WIDTH - 20 -$("#rightPaddle").width() , BOARD_HEIGHT / 2, 0, 0);
 
  var ball = GameItem("#ball", BOARD_WIDTH / 2, BOARD_HEIGHT / 2, (Math.random() > 0.5 ? -3 : 3), (Math.random() > 0.5 ? -3 : 3));

  $("#resetButton").hide();

  // one-time setup
  let interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);                           // change 'eventType' to the type of event you want to handle
  $(document).on('keyup', handleKeyUp);

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  
  //calls all functions on a new frame
  function newFrame() {
    moveObject(leftpaddle);
    moveObject(rightpaddle);
    moveObject(ball);
    wallCollision(leftpaddle);
    wallCollision(rightpaddle);
    ballCollide();
    ballPaddle();
    leftRightWall();
    drawScore();
  }
  
  /* 
  Called in response to events.
  */

  //what handles the key inputs
  function handleKeyDown(event){
    if (event.which === KEY.W){
      leftpaddle.speedY = -8;
    } if (event.which === KEY.S){
      leftpaddle.speedY = 8;
    }

    if (event.which === KEY.UP){
      rightpaddle.speedY = -8;
    } if (event.which === KEY.DOWN){
      rightpaddle.speedY = 8;
    }
  }

  function handleKeyUp(event){
    if (event.which === KEY.W || event.which === KEY.S){
      leftpaddle.speedY = 0;
    } 

    if (event.which === KEY.UP || event.which === KEY.DOWN){
      rightpaddle.speedY = 0;
    }
  }

  //when a paddle or the ball comes into contact with the walls of the board
  function wallCollision(obj){
    if (obj.y > BOARD_HEIGHT - obj.height){
      obj.y = Math.max(Math.min(BOARD_HEIGHT - obj.height - 5, obj.y));
    } else if (obj.y < 0){
      obj.y = 5;
    }

    if (obj.x > BOARD_WIDTH - obj.width){
      obj.x = Math.max(Math.min(BOARD_WIDTH - obj.width, obj.x));
    } else if (obj.x < 0){
      obj.x = 0;
    }
  }

  function resetBall(){
    ball = GameItem("#ball", BOARD_WIDTH / 2, BOARD_HEIGHT / 2, (Math.random() > 0.5 ? -3 : 3), (Math.random() > 0.5 ? -3 : 3));

  }

  //when the ball hits the sides of the board it will change its y
  function ballCollide(){
    if (ball.y > BOARD_HEIGHT - ball.height){
      ball.speedY *= -1.1; 
    } else if (ball.y < 0){
      ball.speedY *= -1.1;
    }
  }

  function leftRightWall(){
    //when the ball hits the left or the right wall it will increase the score for the player on the opposite wall
    if (ball.x > BOARD_WIDTH - ball.width){
      score1++;
      resetBall();
    } else if (ball.x < 0){
      score2++;
      resetBall();
    }

    if(score1 == 11 || score2 == 11){
      endGame();
      resetButton();
    }
  }
  //displays the score
  function drawScore(){
    $("#scoreLeft").text(0 + score1);
    $("#scoreRight").text(0 + score2);
  }

  function resetButton(){
    $("#resetButton").text("Play Again");
    $("#resetButton").css("top", BOARD_HEIGHT /2 - $("#resetButton").height() / 2);
    $("#resetButton").css("left", BOARD_WIDTH / 2 - $("#resetButton").width() / 2);
    $("#resetButton").show();
  }

  //determins if anything comes into contact with a wall
  function doCollide(obj1, obj2){
    obj1.leftX = obj1.x;
    obj1.topY = obj1.y;
    obj1.rightX = obj1.x + obj1.width;
    obj1.bottomY = obj1.y + obj1.height;
    
    obj2.leftX = obj2.x;
    obj2.topY = obj2.y;
    obj2.rightX = obj2.x + obj1.width;
    obj2.bottomY = obj2.y + obj2.height;
    
    if((obj1.rightX > obj2.leftX) &&
    (obj1.leftX < obj2.rightX) &&
    (obj1.bottomY > obj2.topY) &&
    (obj1.topY < obj2.bottomY)){
      return true;
    } else {
      return false;
    }
  }

  //changes speed of the ball whenever it hits a paddle
  function ballPaddle(){
    if (doCollide(ball, leftpaddle)){
      ball.speedX *= -1.2;
    }

    if (doCollide(ball, rightpaddle)){
      ball.speedX *= -1.2;
    }
  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  function moveObject(obj){
    obj.y += obj.speedY;
    obj.x += obj.speedX;
    $(obj.id).css("top", obj.y);
    $(obj.id).css("left", obj.x);
  }

  function endGame() {
      // stop the interval timer
      clearInterval(interval);

      // turn off event handlers
      $(document).off();
  }
}
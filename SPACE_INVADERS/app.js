const grid = document.querySelector(".grid")
const resultsDisplay = document.querySelector(".results")
let currentShooterIndex = 202
let width = 15
let direction = 1
let invadersId
let goingRight = true
let aliensRemoved = []


//adds 225 div's
for (let i = 0; i < 225; i++) {
    const square = document.createElement('div')
    grid.appendChild(square)
}

//searches for all of the div's in the grid and saves them as squares
const squares = Array.from(document.querySelectorAll('.grid div'))

//these are the indexes that all of the invaders will be in
const alienInvaders = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
    15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
    30, 31, 32, 33, 34, 35, 36, 37, 38, 39
]

//assigns the everything with the invaders class to square 
function draw() {
    for (let i = 0; i < alienInvaders.length; i++) {
        if (!aliensRemoved.includes(i)) {
            squares[alienInvaders[i]].classList.add('invader')
        }
    }
}

//calls the draw function
draw()

//removes class of invaders to all squares labled invader
function remove() {
    for (let i = 0; i < alienInvaders.length; i++) {
        squares[alienInvaders[i]].classList.remove('invader')
    }
}

//adds a class to the 202th square
squares[currentShooterIndex].classList.add('shooter')

//moves the shooter
function moveShooter(e){
    squares[currentShooterIndex].classList.remove('shooter')
    switch(e.key) {
        //locates the left side of the board and makes it to were the player can not pass that point
        case 'ArrowLeft':
            if (currentShooterIndex % width !== 0) currentShooterIndex -=1
            break
        //locates the right side of the board and makes it to were the player can not pass that point
        case 'ArrowRight':    
            if (currentShooterIndex % width < width -1 ) currentShooterIndex +=1
            break
    }
    squares[currentShooterIndex].classList.add('shooter')
}
document.addEventListener('keydown', moveShooter)

function moveInvaders() {
    //defines were the left edge and the right edge are on the board
    const leftEdge = alienInvaders[0] % width === 0
    const rightEdge = alienInvaders[alienInvaders.length - 1] % width === width -1
    remove()

    //changes the direction of the invaders when hiting the right edge
    if (rightEdge  && goingRight) {
        for (let i = 0; i < alienInvaders.length; i++) {
            alienInvaders[i] += width +1
            direction = -1
            goingRight = false
        }
    }

    //changes the direction of the invaders when hiting the left edge
    if (leftEdge  && !goingRight) {
        for (let i = 0; i < alienInvaders.length; i++) {
            alienInvaders[i] += width -1
            direction = 1
            goingRight = true
        }
    }

    //moves all of the invaders as a unit
    for (let i = 0; i < alienInvaders.length; i++) {
        alienInvaders[i] += direction 
    }

    draw();

    //whenever the invaders touch the player, the game will end
    if (squares[currentShooterIndex].classList.contains('invader', 'shooter')) {
        resultsDisplay.innerHTML = 'GAME OVER'
        clearInterval(invadersId)
    }
    
    //whenever the invaders touch the player, the game will end
    for (let i = 0; i < alienInvaders.length; i++) {
        if (alienInvaders[i] > (squares.length)) {
            resultsDisplay.innerHTML = 'GAME OVER'
            clearIntervals(invadersId)
        }
    }

    //when there are no more invaders, are in the array, the game ends 
    if (aliensRemoved.length === alienInvaders.length) {
        resultsDisplay.innerHTML = 'YOU WIN'
        clearIntervals(invadersId)
    }
}

invadersId = setInterval(moveInvaders, 500)


//this function deals with the laser
/* it says when and how the laser should be shot. It defines were the laser should come from and how it should continue to move after it is spawned. 
*/
function shoot(e) {
    let laserId
    let currentLaserIndex = currentShooterIndex
    function moveLaser() {
        squares[currentLaserIndex].classList.remove('laser')
        currentLaserIndex -= width
        squares[currentLaserIndex].classList.add('laser')

        if (squares[currentLaserIndex].classList.contains('invader')) {
            squares[currentLaserIndex].classList.remove('laser')
            squares[currentLaserIndex].classList.remove('invader')
            squares[currentLaserIndex].classList.add('boom')

            setTimeout(()=> squares[currentLaserIndex].classList.remove('boom'), 300)
            clearInterval(laserId)

            const alienRemoved = alienInvaders.indexOf(currentLaserIndex)
            aliensRemoved.push(alienRemoved)
            results++
            resultsDisplay.innerHTML = results
            console.log(aliensRemoved)

        }
    }

    //defines what button shoots the laser
    switch(e.key) {
        case'ArrowUp':
            laserId = setInterval(moveLaser, 100)
    }
}

document.addEventListener('keydown', shoot)
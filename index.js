import { update as updateSnake, draw as drawSnake, snakeSpeed, getSnakeHead, snakeBodyIntersection } from "./snake.js";
import { update as updateFood, draw as drawFood } from "./food.js"
import { outsideGrid } from './grid.js'

let lastRenderTimestamp = 0
let gameOver = false
const gameBoard = document.getElementById('gameBoard')

// game loop
function gameLoop(currentTime){
    if (gameOver) { 
        if (confirm('You lost. Press OK to restart.')) {
            window.location = 'https://joepantaliono.github.io/snake/'
        }
        return
    }
    window.requestAnimationFrame(gameLoop)
    const secondsSinceLastRender = (currentTime - lastRenderTimestamp) / 1000
    if (secondsSinceLastRender < 1 / snakeSpeed) return
    lastRenderTimestamp = currentTime
    //update what's happening in the game
    update()
    //render out the updated events
    draw()
}


window.requestAnimationFrame(gameLoop)

function update() {
    updateSnake()
    updateFood()
    checkFailure()
}

function draw() {
    gameBoard.innerHTML = ''
    drawSnake(gameBoard)
    drawFood(gameBoard)
}

function checkFailure() {
    // check if snake runs into itself or edge of gameBoard
    gameOver = outsideGrid(getSnakeHead()) || snakeBodyIntersection()
}
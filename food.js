import { onSnake, expandSnake } from './snake.js'
import { randomGridPosition } from './grid.js'

let snakeFood = getRandomFoodPosition()
const expansionRate = 1 // num pieces the snake expands when eating food

export function update() {
    if (onSnake(snakeFood)) {
        expandSnake(expansionRate)
        snakeFood = getRandomFoodPosition()
    }
}

export function draw(gameBoard) {
        const foodElement = document.createElement('div')
        foodElement.style.gridRowStart = snakeFood.y
        foodElement.style.gridColumnStart = snakeFood.x
        foodElement.classList.add('snakeFood')
        gameBoard.appendChild(foodElement) 
}

function getRandomFoodPosition() {
    // generate a random position for new food
    let newFoodPosition
    // must return position that is not already a part of the snake
    while (newFoodPosition == null || onSnake(newFoodPosition)) {
        newFoodPosition = randomGridPosition()
    }
    return newFoodPosition

}
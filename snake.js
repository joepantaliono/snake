import { getInputDirection } from "./input.js";

export const snakeSpeed = 4 
const snakeBody = [{x: 11, y: 11}]
let newSegments = 0

export function update() {
    addSegments()
    const inputDirection = getInputDirection()
    for (let i = snakeBody.length - 2; i >= 0; i--) {
        snakeBody[i+1] = { ...snakeBody[i] }
    }
    snakeBody[0].x += inputDirection.x
    snakeBody[0].y += inputDirection.y
}

export function draw(gameBoard) {
    snakeBody.forEach(segment => {
        const snakeElement = document.createElement('div')
        snakeElement.style.gridRowStart = segment.y
        snakeElement.style.gridColumnStart = segment.x
        snakeElement.classList.add('snake')
        gameBoard.appendChild(snakeElement) 
    })
}

export function expandSnake(amount) {
    // expand the snake by 1 piece
    newSegments += amount
} 

export function onSnake(position, {ignoreHead = false} = {}) {
    // check all segments of snake
    return snakeBody.some((segment, index) => { 
        if (ignoreHead && index === 0) return false
        return equalPositions(segment, position)
    })
}

function equalPositions(position1, position2) {
    // // check if snake and food are at equal positions
    return (
        position1.x === position2.x &&
        position1.y === position2.y
    )
}

function addSegments() {
    // add new segments to snake, called on each update
    for (let i=0; i < newSegments; i++) {
        // create duplicate with new segment
        snakeBody.push({ ...snakeBody[snakeBody.length -1] })
    }
    newSegments = 0
}

export function getSnakeHead() {
    // first element of array will be head
    return snakeBody[0]
}

export function snakeBodyIntersection() {
    // determine if head of snake is touching any other segment of snake
    return onSnake((snakeBody[0]), { ignoreHead: true })
}
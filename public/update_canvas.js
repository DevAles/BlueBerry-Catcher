export default function updateCanvas(canvas, gamevar, requestAnimationFrame, playerId){
    const context = canvas.getContext('2d')

    context.clearRect(0, 0, 10, 10)

    for(const playerId in gamevar.state.players){
        const player = gamevar.state.players[playerId]
        
        context.fillStyle = 'gray'
        context.fillRect(player.x, player.y, 1, 1)
    }
    for(const fruitId in gamevar.state.fruits){
        const fruit = gamevar.state.fruits[fruitId]
        
        context.fillStyle = 'blue'
        context.fillRect(fruit.x, fruit.y, 1, 1)
    }

    const player = gamevar.state.players[playerId]

    if(player){
        context.fillStyle = 'red'
        context.fillRect(player.x, player.y, 1, 1)
    }

requestAnimationFrame(function(){
    updateCanvas(canvas, gamevar, requestAnimationFrame, playerId)
})
}
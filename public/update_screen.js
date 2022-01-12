export default function updateScreen(canvas, gamevar, requestAnimationFrame, currentPlayerId){
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

    const currentPlayer = gamevar.state.players[currentPlayerId]

    if(currentPlayer){
        context.fillStyle = 'red'
        context.fillRect(currentPlayer.x, currentPlayer.y, 1, 1)
    }

    function updateTable(){
        let table = ` 
        <tr>
        <td>PlayerId:</td>
        <td>Points:</td>
        </tr>
        `
        const playerArray = []

        for(const playerId in gamevar.state.players){
            const player = gamevar.state.players[playerId]

            playerArray.push({
                playerId
            })

            table += `
            <tr ${playerId === currentPlayerId ? 'style="color: red"' : ''}>
            <td>${playerId + ': '}</td>
            <td>${player.points}</td>
            </tr>
            `
        }
        document.getElementById('points').innerHTML = table
    }

requestAnimationFrame(function(){
    updateScreen(canvas, gamevar, requestAnimationFrame, currentPlayerId)
})
return{
    updateTable
}
}
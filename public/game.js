export default function game(){
    const state = {
        players:{},
        fruits:{},
        canvas:{},
        points:0
    }

    const observers = []

    function subscribe(observerFunction){
        observers.push(observerFunction)
    }

    function notifyAll(command){
        for(const observerFunction of observers){
            observerFunction(command)
        }
        console.log('> '+ observers.length + ' Observers Notified')
    }

    function setState(newState){
        Object.assign(state, newState)
    }

    let timer = null

    function autoFruit(setTimer){
        clearInterval(timer)
        timer = setInterval(addFruit, setTimer)
        
    }

    function movePlayer(command){
        notifyAll(command)
        const acceptedMoves = {
            w(player){
                if (player.y -1 >= 0){
                    player.y = player.y -1
                }
            },
            a(player){
                if (player.x -1 >= 0){
                    player.x = player.x -1
                }
            },
            s(player){
                if (player.y +1 < state.canvas.width){
                    player.y = player.y +1
                }
            },
            d(player){
                if (player.x +1 < state.canvas.height){
                    player.x = player.x +1
                }
            },

            ArrowUp(player){
                if (player.y -1 >= 0){
                    player.y = player.y -1
                }
            },
            ArrowLeft(player){
                if (player.x -1 >= 0){
                    player.x = player.x -1
                }
            },
            ArrowDown(player){
                if (player.y +1 < state.canvas.width){
                    player.y = player.y +1
                }
            },
            ArrowRight(player){
                if (player.x +1 < state.canvas.height){
                    player.x = player.x +1
                }
            }
        }
        const player = state.players[command.playerId]
        const playerId = command.playerId
        const key = command.keyId

        const moveFunction = acceptedMoves[key]
        if (moveFunction && player){
            moveFunction(player)
            checkCollision(playerId)
        }
    }

    function checkCollision(playerId){
        const player = state.players[playerId]

        for(const fruitId in state.fruits){
            const fruit = state.fruits[fruitId]

            if (player.x === fruit.x && player.y === fruit.y){
                removeFruit({fruitId})
            }
        }
    }

    function addPlayer(command){
        const playerId = command.playerId
        const playerX = 'playerX' in command ? command.playerX : Math.round(Math.random()* state.canvas.width)
        const playerY = 'playerY' in command ? command.playerY : Math.round(Math.random()* state.canvas.height)

        state.players[playerId] = {
            x: playerX,
            y: playerY
        }
        notifyAll({
            type: 'add-player',
            playerId,
            playerX,
            playerY
        })
    }

    function removePlayer(command){
        const playerId = command.playerId

        delete state.players[playerId]
        notifyAll({
            type: 'remove-player',
            playerId
        })
    }

    function addFruit(command){
        const fruitId = command ? command.fruitId: Math.floor(Math.random()* 1000000)
        const fruitX = command ? command.fruitX : Math.floor(Math.random()* state.canvas.width)
        const fruitY = command ? command.fruitY : Math.floor(Math.random()* state.canvas.height)
        
        state.fruits[fruitId] = {
            x: fruitX,
            y: fruitY
        }
        
        notifyAll({                          
            type: 'add-fruit',
            fruitId,
            fruitX,
            fruitY
        })
    }

    function removeFruit(command){
        const fruitId = command.fruitId

        delete state.fruits[fruitId]
        notifyAll({
            type: 'remove-fruit',
            fruitId
        })
    }

    return{
        state,
        movePlayer,
        addPlayer,
        removePlayer,
        addFruit,
        removeFruit,
        subscribe,
        setState,
        autoFruit
    }
}
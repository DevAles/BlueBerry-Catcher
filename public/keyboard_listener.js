export default function keyboardListener(){
    const state ={
        observers:[],
        playerId: null
    }

    function registerPlayer(playerId){
        state.playerId = playerId
    }

    function subscribe(observerFunction){
        state.observers.push(observerFunction)
    }
    function unsubscribeAll(){
        for(let observerLenght = state.observers.length; 
            observerLenght > 0; observerLenght--){
                state.observers.pop()
                console.log('> Existent Observers: '+ observerLenght)
            }
    }

    function notifyAll(command){
        for(const observerFunction of state.observers){
            observerFunction(command)
        }
        console.log('> '+ state.observers.length + ' Observers Notified')
    }
    document.addEventListener('keydown', emitKey)
    
    function emitKey(event){
        console.log(event.key)
        const command = {
            playerId: state.playerId,
            keyId: event.key
        }
        notifyAll(command)
    }
    return{
        subscribe,
        unsubscribeAll,
        registerPlayer
    }
}
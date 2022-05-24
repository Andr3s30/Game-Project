export class StateMachine {
    constructor(initialState, possibleStates, stateArgs=[]) {
        this.initialState = initialState;
        this.possibleStates = possibleStates;
        this.stateArgs = stateArgs;
        this.state = null;

        //Get access to state machine vie this.stateMachine
        for (const state of Object.values(this.possibleStates)){
            state.machine = this;
        }
    }

    step() {
        if(this.state === null){
            this.state = this.initialState
            this.possibleStates[this.state].enter(...this.stateArgs);
        }
        this.possibleStates[this.state].enter(...this.stateArgs);
    }

    transition(newState, ...enterArgs){
        this.state = newState;
        this.possibleStates[this.state].enter(...this.stateArgs, ...enterArgs);
    }

}

export class State {
    enter() {

    }
    execute() {

    }
}

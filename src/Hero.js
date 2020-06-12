import {TileMap, LoadHeroes} from './heroes'
import keyboard from './keyboard';

class UserState {
    constructor() {
        this.state = {idx:0, stateArrayName: ""};
    }
}

export class Hero extends UserState {
    constructor() {
        super();
        this.SPEED = 40;
        this.UP_SPEED = 20;
        this.leftBtn = false;
        this.rightBtn = false;
        this.isStayRight = true;
        this.isUpTimer = null;
        this.isUp = false;
        this.isDowm = false;
        this.position = {}
        const up = keyboard('ArrowUp');
        const left1 = keyboard('ArrowLeft');
        const left2 = keyboard('a');
        const right1 = keyboard('ArrowRight');
        const right2 = keyboard('d');

        left1.press = ()=>this.leftBtn=true;
        left1.release = ()=>this.leftBtn=false;
        left2.press = left1.press;
        left2.release = left1.release;

        right1.press = ()=>this.rightBtn=true;
        right1.release = ()=>this.rightBtn=false;
        right2.press = right1.press;
        right2.release = right1.release;

        up.press = ()=> {
            this.isUp = true;
            this.isDowm = false;
            if(this.isUpTimer) {
                clearTimeout(this.isUpTimer);
            }
            this.isUpTimer = setTimeout(()=> {
                this.isUp = false;
                this.isDowm = true;
                this.isUpTimer = null;
            }, 450);
        }
   }

    async download(stage, x, y) {
        this.STAY_STATES = [
            "stay-1.png",
            "stay-2.png",
        ];
        this.RUN_RIGHT_STATES = [
            "run-left-0.png",
            "run-left-1.png",
            "run-left-2.png",
            "run-left-3.png",
            "run-left-4.png",
            "run-left-5.png",
        ];
        this.RUN_LEFT_STATES = [
            "run-right-0.png",
            "run-right-1.png",
            "run-right-2.png",
            "run-right-3.png",
            "run-right-4.png",
            "run-right-5.png",
        ];
        this.position = {x,y}
        await LoadHeroes(...this.STAY_STATES, ...this.RUN_LEFT_STATES, ...this.RUN_RIGHT_STATES);
        [...this.STAY_STATES, ...this.RUN_LEFT_STATES, ...this.RUN_RIGHT_STATES]
        .forEach(el=> {
            if(!TileMap.has(el)) {
                console.error("Undefine element in tilemap ", el)
            } else {
                const v = TileMap.get(el);
                console.debug(el, " is loaded");
                v.x = x;
                v.y = y;
                v.visible = false;
                stage.addChild(v);
            }
        })
        return;
    };

    setNewStateArray(arrName, idx = 0) {
        this.state.stateArrayName = arrName;
        this.state.idx = idx;
        TileMap.get(this[this.state.stateArrayName][this.state.idx]).x = this.position.x;
        if(!this.isUp && 
          TileMap.get(this[this.state.stateArrayName][this.state.idx]).y < this.position.y) {
            TileMap.get(this[this.state.stateArrayName][this.state.idx]).y += this.UP_SPEED;
        }
        else {
            this.isDowm = false;
            TileMap.get(this[this.state.stateArrayName][this.state.idx]).y = this.position.y;
        }
        TileMap.get(this[this.state.stateArrayName][this.state.idx]).visible = true;
    }

    jump() {
        TileMap.get(this[this.state.stateArrayName][this.state.idx]).y -= this.UP_SPEED;
    }

    stay() {
        if(this.state.stateArrayName === "") {
            this.setNewStateArray("STAY_STATES");
            return;
        }
        TileMap.get(this[this.state.stateArrayName][this.state.idx]).visible = false;
        this.isStayRight ? this.setNewStateArray("STAY_STATES", 0):
                           this.setNewStateArray("STAY_STATES", 1);
    }
    
    goRight() {
        TileMap.get(this[this.state.stateArrayName][this.state.idx]).visible = false;
        if(this.state.stateArrayName === "RUN_RIGHT_STATES") {
            this.state.idx = this.state.idx > this[this.state.stateArrayName].length-2 ? 0:this.state.idx+1;
            this.position.x += this.SPEED;
            TileMap.get(this[this.state.stateArrayName][this.state.idx]).x = this.position.x;
            TileMap.get(this[this.state.stateArrayName][this.state.idx]).visible = true;
        } else {
            this.setNewStateArray("RUN_RIGHT_STATES");
        }
    }
    
    goLeft() {
        TileMap.get(this[this.state.stateArrayName][this.state.idx]).visible = false;
        if(this.state.stateArrayName === "RUN_LEFT_STATES") {
            this.state.idx = this.state.idx > this[this.state.stateArrayName].length-2 ? 0:this.state.idx+1;
            this.position.x -= this.SPEED;
            TileMap.get(this[this.state.stateArrayName][this.state.idx]).x = this.position.x;
            TileMap.get(this[this.state.stateArrayName][this.state.idx]).visible = true;
        } else {
            this.setNewStateArray("RUN_LEFT_STATES");
        }
    }

    requestAnimationFrame() {
        if(this.isUp) this.jump();
        else if(this.isDowm) this.setNewStateArray(this.state.stateArrayName, this.state.idx);
        else if(this.rightBtn) {
            this.isStayRight = true;
            this.goRight();
        } else if(this.leftBtn) {
            this.isStayRight = false;
            this.goLeft();
        } else {
            this.stay();
        }
    }
}
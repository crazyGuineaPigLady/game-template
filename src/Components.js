import {LoadHeroes, TileMap} from './heroes'


class Component {
    constructor(name) {
        this.name = name;
    }
    async download(stage, x, y) {
        await LoadHeroes(this.name);
        this.componentSprite = TileMap.get(this.name);
        this.componentSprite.position.set(x,y);
        this.componentSprite.visible = true;
        stage.addChild(this.componentSprite);
    }
}

export class Tree extends Component {
    constructor(name) {
        super(name);
    }
}

export class Fruit extends Component {
    constructor(name) {
        super(name);
    }
}

"use strict";

import * as PIXI from 'pixi.js'
import LoadTexture from './utils'

export const TileMap = new Map();

export async function LoadHeroes(...path) {
    const loadedPath = []
    path.forEach(p=>{
        console.debug(p);
        const pathArr = p.split('/');
        const name = pathArr[pathArr.length-1];
        if(!TileMap.has(name)) loadedPath.push({name,path:p});
    });
    const textures = await LoadTexture(...loadedPath);
    textures.forEach( (t,i) => {
        const sprite = new PIXI.Sprite(t);
        sprite.anchor.set(0.5,0.5);
        TileMap.set(loadedPath[i].name, sprite);
    });
}

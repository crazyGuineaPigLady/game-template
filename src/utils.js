import * as PIXI from 'pixi.js'

/**
 * 
 * @param  {...any} loadedParam is an object with properties name and path of sprite
 */
export default function LoadTexture(...loadedParam) {
    console.debug("Load function");
    const loader = new PIXI.Loader(); //maybe use PIXI.Loader.shared instead;
    return new Promise((resolve, reject) => {
        loadedParam.forEach(({name,path}) => {
            loader.add(name, path);
        });
        loader.load((loader,resources)=>{
            console.debug(resources);
            if(resources.error) {
                console.error(resources.error);
                return;
            }
            const resTextures = [];
            loadedParam.forEach(({name})=>resTextures.push(resources[name].texture));
            resolve(resTextures);
        });
        loader.onProgress.add(()=>console.info("Loading..."));
        loader.onError.add(reject);
        loader.onComplete.add(() => console.debug("Load complete"));    

    });
}
import { Group, Scene } from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';

type iModeLoader = ()=> Promise<Group>
type iModelLoaders = {[key: string]: iModeLoader}

const modelLoaders:iModelLoaders = {}

export const loadModels = (scene: Scene) => {
    console.log(modelLoaders)

    Object.keys(modelLoaders).map((key)=>{
        console.log(key)
        modelLoaders[key]().then((response)=>{
            scene.add(response)
        })
    })
}


const loader = new OBJLoader(  );


const loadWifi = ()=>{

    return new Promise<Group>((resolve)=>{

        loader.load( './recourses/obj/wifi.obj', function ( obj) {
            console.log('resolve')

            resolve(obj)
        
        }, ()=>{} );
    })
}

modelLoaders['wifi'] = loadWifi



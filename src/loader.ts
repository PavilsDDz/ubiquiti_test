import { Group, Scene } from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import wifiModel from './recourses/obj/wifi.obj'
import * as THREE from 'three'

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

        loader.load( wifiModel, function ( obj) {
            console.log('resolve')
            console.log(obj)


            obj.children.map((child, index)=>{
                console.log(child);
                (child as THREE.Mesh).material = new THREE.MeshBasicMaterial({color: 0xff0000})

            })
            resolve(obj)
        
        }, ()=>{} );
    })
}

modelLoaders['wifi'] = loadWifi



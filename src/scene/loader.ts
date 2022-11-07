import { Group, Material, Scene, Vector3 } from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

import wifiModel from '../recourses/obj/wifi.obj'
import floorModel from '../recourses/obj/floor.obj'
import floorMaterial from '../recourses/obj/floor.mtl'
import floorModelGLTF from '../recourses/gltf/floor.gltf'
import * as THREE from 'three'
import floorImage from '../recourses/floor-texture-bump.png';
// import { TextureLoader } from'three/src/loaders/TextureLoader.js'
import wallsModel from '../recourses/obj/walls.obj'
// type iModelResponse = {object:Group, addToScene: boolean}
type iModeLoader = (gui: dat.GUI, scene: THREE.Scene)=> Promise<Group>
type iModelLoaders = {[key in availableModels]?: iModeLoader}

const modelLoaders:iModelLoaders = {}

export enum availableModels {
    'wifi'='wifi',
    'walls' = 'walls',
    'floor' = 'floor'
}

export const models:{[key in availableModels]?:THREE.Object3D} = {}

export const loadModels = (scene: Scene, gui: dat.GUI) => {
    
    Object.keys(modelLoaders).map((key: availableModels)=>{
        modelLoaders[key](gui, scene).then((response)=>{

            models[key] = response
            
        })
    })
}


const loader = new OBJLoader()

const loadWifi = (gui: dat.GUI, scene: THREE.Scene)=>{

    return new Promise<Group>((resolve)=>{

        loader.load( wifiModel, function ( group) {

            const wifiParametres = {
                color: 0xffffff,

            }

            group.children.map((child, index)=>{
                if(child instanceof THREE.Mesh){
                    child.material.color = new THREE.Color().set(wifiParametres.color)
                    child.scale.set(0.2,0.2,0.2) 
                }
            })

            group.name = 'wifi'
            
            const wifiGui = gui.addFolder('Wifi')
            wifiGui.add(group, 'visible')
            wifiGui.addColor(wifiParametres, 'color').onChange(()=>{
                group.children.map((child)=>{
                    if(child instanceof THREE.Mesh){
                        child.material.color = new THREE.Color().set(wifiParametres.color)
                    }
                })
            }).name('Wifi color')
            
            resolve(group)
        
        }, ()=>{} );
    })
}

modelLoaders['wifi'] = loadWifi

const loadFloor = (gui: dat.GUI, scene: THREE.Scene )=>{
    return new Promise<Group>((resolve)=>{
        
        const texture = new THREE.TextureLoader().load( floorImage, (texture)=>{

            loader.load(floorModel, (group)=>{
                if(group.children[0] instanceof THREE.Mesh){
                    console.log(group.children[0])
                    group.children[0].material.BumpMap = texture
                    group.children[0].material.BumpScale = 0.5
                    group.children[0].material.BumpBias = 1
                    texture.repeat = new THREE.Vector2(0.5, 0.5)
                    texture.wrapS = THREE.RepeatWrapping
                    texture.wrapT = THREE.RepeatWrapping
                    
                }
                group.name = 'floor'
                scene.add(group)
                resolve(group)
            })



        } );
            
    })
}
modelLoaders['floor'] = loadFloor

const loadWalls = (gui: dat.GUI, scene: THREE.Scene )=>{
    return new Promise<Group>(( resolve )=>{
        loader.load(wallsModel, (group)=>{
            group.children.map((child)=>{
                child.name = 'wall'
            })
            group.name = 'walls'

            if(group instanceof THREE.Group){
                
                // 
            }
            scene.getObjectByName('raycasterTargets').add(group)
            // scene.add(group)
            resolve(group)
        })
    })
}


modelLoaders['walls'] = loadWalls


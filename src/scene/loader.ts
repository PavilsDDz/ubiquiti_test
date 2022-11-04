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

type iModeLoader = (gui: dat.GUI)=> Promise<Group>
type iModelLoaders = {[key: string]: iModeLoader}

const modelLoaders:iModelLoaders = {}

export const loadModels = (scene: Scene, gui: dat.GUI) => {

    Object.keys(modelLoaders).map((key)=>{
        modelLoaders[key](gui).then((response)=>{

            scene.add(response)
            
        })
    })
}


const loader = new OBJLoader()
const mtlLoader = new MTLLoader()
const gltfLaoder = new GLTFLoader()

const loadWifi = (gui: dat.GUI)=>{

    return new Promise<Group>((resolve)=>{

        loader.load( wifiModel, function ( group) {

            const wifiParametres = {
                color: 0xffffff,
                position: new THREE.Vector3(6,3, 7)

            }

            group.children.map((child, index)=>{
                if(child instanceof THREE.Mesh){
                    child.material.color = new THREE.Color().set(wifiParametres.color)
                    child.scale.set(0.2,0.2,0.2) 
                    child.position.set(wifiParametres.position.x, wifiParametres.position.y, wifiParametres.position.z)  
                }
            })
            
            const wifiGui = gui.addFolder('Wifi')

            wifiGui.add(group.position, 'x', -10, 10, 0.05)
            wifiGui.add(group.position, 'y', -10, 10, 0.05)
            wifiGui.add(group.position, 'z', -10, 10, 0.05)
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

const loadFloor =  ()=>{
    return new Promise<Group>((resolve)=>{
        
        const texture = new THREE.TextureLoader().load( floorImage, (texture)=>{
            
            // gltfLaoder.load(floorModelGLTF, (obj)=>{
            //     obj.scene.children.map((child, index)=>{
            //         if(child instanceof THREE.Mesh){
            //             texture.repeat = new THREE.Vector2(0.5, 0.5)
            //             texture.wrapS = THREE.RepeatWrapping
            //             texture.wrapT = THREE.RepeatWrapping
            //             // child.material.map = texture
            //             child.material.displacementMap = texture
            //             // child.material.displacementScale = 20
            //             // child.material.displacementBias = 10


            //             child.material.BumpMap = texture
            //             child.material.BumpScale = 0.01
            //             child.material.BumpBias = 1


            //         }
            //         resolve(new THREE.Group().add(child))
            //     })
            //     console.log(obj)
            // })


            loader.load(floorModel, (group)=>{
                resolve(group)
                if(group.children[0] instanceof THREE.Mesh){

                    group.children[0].material.BumpMap = texture
                    group.children[0].material.BumpScale = 0.5
                    group.children[0].material.BumpBias = 1
                    texture.repeat = new THREE.Vector2(0.5, 0.5)
                    texture.wrapS = THREE.RepeatWrapping
                    texture.wrapT = THREE.RepeatWrapping
                    
                }
            })


        } );
            
    })
}
modelLoaders['floor'] = loadFloor

const loadWalls = ()=>{
    return new Promise<Group>(( resolve )=>{
        loader.load(wallsModel, (group)=>{
            if(group instanceof THREE.Group){
                
                // 
            }
            resolve(group)
        })
    })
}


modelLoaders['walls'] = loadWalls


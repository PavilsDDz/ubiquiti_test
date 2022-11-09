import { Group, Material, Scene, Vector3 } from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';

import wifiModel from '../recourses/obj/wifi.obj'
import floorModel from '../recourses/obj/floor.obj'
import bushesModel from '../recourses/obj/bushes.obj'
import wallsModel from '../recourses/obj/walls.obj'
import interiorModel from '../recourses/obj/interior.obj'
import groundModel from '../recourses/obj/ground.obj'
import * as THREE from 'three'
import floorImage from '../recourses/floor-texture-bump.png';

type iModeLoader = (gui: dat.GUI, scene: THREE.Scene)=> Promise<Group>
type iModelLoaders = {[key in availableModels]?: iModeLoader}

const modelLoaders:iModelLoaders = {}

export enum availableModels {
    'wifi'='wifi',
    'walls' = 'walls',
    'floor' = 'floor',
    'interior' = 'interior',
    'bushes' = 'bushes',
    'ground' = 'ground'
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
        

        loader.load(floorModel, (group)=>{
            if(group.children[0] instanceof THREE.Mesh){
                console.log(group.children[0])
                group.children[0].material.color.set(0x444444)
            }
            group.name = 'floor'
            scene.add(group)
            resolve(group)
        })
            
    })
}
modelLoaders['floor'] = loadFloor

const loadWalls = (gui: dat.GUI, scene: THREE.Scene )=>{
    return new Promise<Group>(( resolve )=>{
        loader.load(wallsModel, (group)=>{
            group.children.map((child)=>{
                child.name = 'wall'
                if(child instanceof THREE.Mesh)
                child.material.color = new THREE.Color().set(0xaaaaaa)
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

const loadInterior = (gui: dat.GUI, scene: THREE.Scene)=>{
    return new Promise<Group>((resolve)=>{

            const interiorMaterialColors = {
                color1: 0x9bb0c3,
                color2: 0xe1b67d,
                color3: 0x3e3e3e,
                color4: 0xbe4d4d,
            }
            

            const interiorGui = gui.addFolder('Interior colors')
            
            const interiorMaterial1 = new THREE.MeshPhongMaterial({color: interiorMaterialColors.color1})
            interiorGui.addColor(interiorMaterialColors, 'color1').onChange((value)=>{
                interiorMaterial1.color.set(value)
            })
            const interiorMaterial2 = new THREE.MeshPhongMaterial({color: interiorMaterialColors.color2})
            interiorGui.addColor(interiorMaterialColors, 'color2').onChange((value)=>{
                interiorMaterial2.color.set(value)
            })
            const interiorMaterial3 = new THREE.MeshPhongMaterial({color: interiorMaterialColors.color3})
            interiorGui.addColor(interiorMaterialColors, 'color3').onChange((value)=>{
                interiorMaterial3.color.set(value)
            })
            const interiorMaterial4 = new THREE.MeshPhongMaterial({color: interiorMaterialColors.color4})
            interiorGui.addColor(interiorMaterialColors, 'color4').onChange((value)=>{
                interiorMaterial4.color.set(value)
            })

            const interiorMaterials: THREE.MeshPhongMaterial[] = [
                interiorMaterial1,
                interiorMaterial2,
                interiorMaterial3,
                interiorMaterial4,
            ]


            loader.load(interiorModel, (group)=>{
                group.children.map((child)=>{
                    if(child instanceof THREE.Mesh){
                        const matId = parseInt(child.name[child.name.indexOf('_mat') + 4])
                        console.log(matId, 'matId')
                        console.log(child.name, 'child.name')
                        console.log(interiorMaterials[matId-1], 'interiorMaterials[matId-1]')
                        if(interiorMaterials[matId-1]){
                            child.material = interiorMaterials[matId-1]//interiorMaterials[matId-1]
                        }
                    }
                })
                scene.add(group)
                resolve(group)
            })

    })
}

modelLoaders['interior'] = loadInterior

const loadBushes = (gui: dat.GUI, scene: THREE.Scene)=>{
    const bushesGui = gui.addFolder('Bushes')
     return new Promise<Group>((resolve)=>{

        const bushColors:number[] = [
            0x51b197,
            0x77c388,
            0x289b56,
            0x6dbb9e,
            0x417a56,
            0x21704b
        ]

            loader.load(bushesModel,(group)=>{
             scene.add(group)
             group.children.map((child, index)=>{
                if(child instanceof THREE.Mesh){

                    child.material = new THREE.MeshPhongMaterial({color: bushColors[index] ? bushColors[index] :  0x21704b })
                    child.material.color.se
                    bushesGui.addColor({color: bushColors[index]}, 'color').onChange((value)=>{
                        child.material.color.set(value)
                    })
                }
             })
             resolve(group)
         })
     })
}

modelLoaders['bushes'] = loadBushes

const loadGround = (gui: dat.GUI, scene: THREE.Scene) =>{
    return new Promise<Group>((resolve)=>{
        loader.load(groundModel, (group)=>{
            if(group.children[0] instanceof THREE.Mesh){
                scene.add(group)
                resolve(group)
            }
        })
        resolve
    })
}

modelLoaders['ground'] = loadGround

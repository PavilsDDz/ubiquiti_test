import { Group, Material, Scene } from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

import wifiModel from '../recourses/obj/wifi.obj'
import floorModel from '../recourses/obj/floor.obj'
import floorMaterial from '../recourses/obj/floor.mtl'
import floorModelGLTF from '../recourses/gltf/floor.gltf'
import * as THREE from 'three'
import floorImage from '../recourses/floor-texture.png';
// import { TextureLoader } from'three/src/loaders/TextureLoader.js'

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

        loader.load( wifiModel, function ( obj) {

            const parametres = {
                color: 0xff0066
            }

            obj.children.map((child, index)=>{
                if(child instanceof THREE.Mesh){
                    child.material.color = new THREE.Color().set(parametres.color)
                }

            })
            const wifiGui = gui.addFolder('Wifi')

            wifiGui.add(obj.position, 'x', -1, 1, 0.02)
            wifiGui.add(obj.position, 'y', -1, 1, 0.02)
            wifiGui.add(obj.position, 'z', -1, 1, 0.02)
            wifiGui.add(obj, 'visible')

          
        
            wifiGui.addColor(parametres, 'color').onChange(()=>{
                obj.children.map((child)=>{
                    if(child instanceof THREE.Mesh){
                        child.material.color = new THREE.Color().set(parametres.color)
                    }
                })
            }).name('Wifi color')
            
            resolve(obj)
        
        }, ()=>{} );
    })
}

modelLoaders['wifi'] = loadWifi

const loadFloor =  ()=>{
    return new Promise<Group>((resolve)=>{
        
        const texture = new THREE.TextureLoader().load( floorImage, (texture)=>{
            
            gltfLaoder.load(floorModelGLTF, (obj)=>{
                obj.scene.children.map((child, index)=>{
                    if(child instanceof THREE.Mesh){
                        // texture.repeat = new THREE.Vector2(0.5, 0.5)
                        texture.wrapS = THREE.RepeatWrapping
                        texture.wrapT = THREE.RepeatWrapping
                        // child.material.map = texture
                        child.material.displacementMap = texture
                        child.material.displacementScale = 2
                        child.material.displacementBias = 1


                        child.material.BumpMap = texture
                        child.material.BumpScale = 2
                        child.material.BumpBias = 1


                    }
                    resolve(new THREE.Group().add(child))
                })
                console.log(obj)
            })
        } );

        
        // mtlLoader.load(floorMaterial, (materials)=>{
        //         loader.setMaterials(materials).load(floorModel, (objGroup)=>{
        //             // console.log(objGroup)
        //             resolve(objGroup)
        //         // console.log(material)
        //     })
        // })


            
    })
}

modelLoaders['floor'] = loadFloor


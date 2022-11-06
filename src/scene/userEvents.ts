import { models } from "./loader"
import * as THREE from 'three'
import { Raycaster } from "three"

export enum userEventKeys {
    'addWifiMouseDown' = 'addWifiMouseDown' ,
    'mouseMove' = 'mouseMove'
}

export const userEvents:{[key in userEventKeys]: ()=>void} = {
    addWifiMouseDown: ()=>{},
    mouseMove: ()=>{}
}
export interface iUserEventsData{
    // raycasterTargets: THREE.Object3D[]
    scene: THREE.Scene,
    pointer: THREE.Vector2,
    intersects: THREE.Intersection<THREE.Object3D<Event>>[]

} 

export const addUserEvents = (args: iUserEventsData)=>{

    const userObjects = new THREE.Group()
    userObjects.name =  'userObjects'
    let activeObject:THREE.Object3D = null
    args.scene.add(userObjects)

    
    const addWifiMouseUp = (event: any) =>{
        // console.log('mouse up')
        // document.removeEventListener('mousedown', addWifiMouseDown, false)
        document.removeEventListener('mouseup', addWifiMouseUp, false)
        activeObject = null
        
    }
    
    const addWifiMouseDown = (event:any)=>{

        // scene.add(models['wifi'])
        
        
        if((event.target as HTMLElement).id === userEventKeys.addWifiMouseDown ){
            // console.log('mouseDown')
            document.addEventListener('mouseup', addWifiMouseUp)
            activeObject = models['wifi'].clone()
            // console.log(args.scene)
            userObjects.add(activeObject)
        }
        
        
    }

    console.log(args.scene, 'AAAAAAA')
    console.log(args.scene.getObjectByName('raycastPlane'), 'AAAAAAA')
    const raycastPlane = args.scene.getObjectByName('raycastPlane')
    const camera = args.scene.getObjectByProperty('type', 'PerspectiveCamera')

    const mouseMove = (event:any) => {
        // raycastPlane.lookAt(camera.position)
        
        args.pointer.set(
            ( event.clientX / window.innerWidth ) * 2 - 1,
            - ( event.clientY / window.innerHeight ) * 2 + 1
        )

        if(args.intersects[0] && activeObject){
            console.log(args.intersects[0])
            activeObject.position.copy(args.intersects[0].point)
        }
        
    }
    
    
    
    console.log('Add use events')
    document.addEventListener('mousedown', addWifiMouseDown)
    document.addEventListener('pointermove', mouseMove)
    
     
}


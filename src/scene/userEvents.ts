import { models } from "./loader"
import * as THREE from 'three'
import { Raycaster, Scene } from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

export enum userEventKeys {
    'addWifiMouseDown' = 'addWifiMouseDown',
    'canvasMouseDown' = 'canvasMouseDown',
    // 'canvasMouseUp' = 'canvasMouseUp',
    'mouseMove' = 'mouseMove',
}

export const userEvents:{[key in userEventKeys]: ()=>void} = {
    addWifiMouseDown: ()=>{},
    mouseMove: ()=>{},
    canvasMouseDown: ()=>{},
    // canvasMouseUp: ()=>{}
}

export interface iUserEventsData{
    // raycasterTargets: THREE.Object3D[]
    scene: THREE.Scene,
    pointer: THREE.Vector2,
    intersects: THREE.Intersection<THREE.Object3D<Event>>[],
    orbitControls: OrbitControls

} 

export const addUserEvents = (args: iUserEventsData)=>{

    
    let activeObject:THREE.Object3D = null
    

    const userObjects = args.scene.getObjectByName('userObjects')

    const addWifiMouseUp = (event: any) =>{
        // console.log('mouse up')
        // document.removeEventListener('mousedown', addWifiMouseDown, false)
        document.removeEventListener('mouseup', addWifiMouseUp, false)
        activeObject = null
        document.getElementsByTagName('body')[0].classList.remove('active-3d-object')

        
    }
    
    const addWifiMouseDown = (event:any)=>{
        // scene.add(models['wifi'])
        
        
        if((event.target as HTMLElement).id === userEventKeys.addWifiMouseDown ){
            // console.log('mouseDown')
            document.addEventListener('mouseup', addWifiMouseUp)
            activeObject = models['wifi'].clone()
            activeObject.name = 'user-wifi'
            // console.log(args.scene)
            userObjects.add(activeObject)
            document.getElementsByTagName('body')[0].classList.add('active-3d-object')
        }
    }

    const raycastPlane = args.scene.getObjectByName('raycastPlane')
    const camera = args.scene.getObjectByProperty('type', 'PerspectiveCamera')

    const mouseMove = (event:any) => {
        
        args.pointer.set(
            ( event.clientX / window.innerWidth ) * 2 - 1,
            - ( event.clientY / window.innerHeight ) * 2 + 1
        )

        if(!activeObject) return

        // if(activeObject )
        
        for (let i = 0; i < args.intersects.length; i++) {
            if(args.intersects[i].object.name === 'wall'){
 
                console.log(args.intersects[i])
                activeObject.position.copy(args.intersects[i].point)
                console.log(activeObject.position)
                const n = args.intersects[ i ].face.normal.clone();
                n.transformDirection( models.walls.matrixWorld );
                // n.multiplyScalar( 10 );
                n.add( args.intersects[ i ].point );
                activeObject.lookAt( n );
                break
            }
            
        }

        // if(args.intersects[0] && activeObject){
           
        // }
        
    }

    const canvasMouseUp = (event: any) => {
        document.removeEventListener('mouseup', addWifiMouseUp, false)
        args.orbitControls.enabled = true

        if(activeObject){
            activeObject = null
        }

    }

    const canvasMouseDown = (event: any) => {

        if((event.target as HTMLElement).id === 'renderCanvas'){

            if(args.intersects[0].object.parent.name === 'user-wifi'){
                activeObject = args.intersects[0].object.parent
                document.addEventListener('mouseup', canvasMouseUp)
                args.orbitControls.enabled = false
            }
        }
    }
    
    
    
    console.log('Add use events')
    document.addEventListener('mousedown', addWifiMouseDown)
    document.addEventListener('mousedown', canvasMouseDown)
    // document.addEventListener('mousedown', canvasMouseUp)
    document.addEventListener('pointermove', mouseMove)
    
     
}


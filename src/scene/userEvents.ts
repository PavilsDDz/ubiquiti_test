import { models } from "./loader"
import * as THREE from 'three'
import { Raycaster, Scene } from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

export enum userEventKeys {
    'addWifiMouseDown' = 'addWifiMouseDown',
    'canvasMouseDown' = 'canvasMouseDown',
    // 'canvasMouseUp' = 'canvasMouseUp',
    'mouseMove' = 'mouseMove',
    'deleteObject' = 'deleteObject',

}

export const userEvents:{[key in userEventKeys]: ()=>void} = {
    addWifiMouseDown: ()=>{},
    mouseMove: ()=>{},
    canvasMouseDown: ()=>{},
    deleteObject: ()=>{}
    // canvasMouseUp: ()=>{}
}

export interface iUserEventsData{
    // raycasterTargets: THREE.Object3D[]
    scene: THREE.Scene,
    pointer: THREE.Vector2,
    intersects: THREE.Intersection<THREE.Object3D<Event>>[],
    orbitControls: OrbitControls,
    activeObject: THREE.Object3D,
    setActiveObject: React.Dispatch<React.SetStateAction<THREE.Object3D>>

} 


export const addUserEvents = (args: iUserEventsData)=>{
    
    console.log(args.scene)
    
    let activeObject:THREE.Object3D = null
    let grabbed: boolean = false
    
    const userObjects = args.scene.getObjectByName('userObjects')

    // const setActiveObject = (object: THREE.Object3D)=>{
    
    //     const outlineObject = object.clone()
    //     const outlineMaterial = new THREE.MeshBasicMaterial({color: 0xffaa00})
    //     outlineObject.children.map((child)=>{
    //         if(child instanceof THREE.Mesh){
    //             child.material = outlineMaterial
    
    //         }
    //     })
    //     outlineObject.scale.set(1.1,1.1, 1.1)
    //     object.add(outlineObject)
    //     userObjects.add(object)

    //     return object
    // }
    

    // const userObjects = args.scene.getObjectByName('userObjects')

    const addWifiMouseUp = (event: any) =>{
        // console.log('mouse up')
        // document.removeEventListener('mousedown', addWifiMouseDown, false)
        
        document.removeEventListener('mouseup', addWifiMouseUp, false)
        // args.setActiveObject(null)
        grabbed = false
        
        // activeObject = null
        document.body.classList.remove('active-3d-object')

        
    }
    
    const addWifiMouseDown = (event:any)=>{
        // scene.add(models['wifi'])
        
        
        if((event.target as HTMLElement).id === userEventKeys.addWifiMouseDown ){
            // console.log('mouseDown')
            document.addEventListener('mouseup', addWifiMouseUp)
            // activeObject = setActiveObject(models['wifi'].clone())
            activeObject = models['wifi'].clone()
            activeObject.name = 'user-wifi'
            // console.log(args.scene)
            args.setActiveObject(activeObject)
            grabbed = true
            userObjects.add(activeObject)
            document.body.classList.add('active-3d-object')
        }
    }

    const raycastPlane = args.scene.getObjectByName('raycastPlane')
    const camera = args.scene.getObjectByProperty('type', 'PerspectiveCamera')

    const mouseMove = (event:any) => {
        
        args.pointer.set(
            ( event.clientX / window.innerWidth ) * 2 - 1,
            - ( event.clientY / window.innerHeight ) * 2 + 1
        )
            // console.log(grabbed, args.intersects[0].object)
        if(!args.intersects[0]) return;

        if(!grabbed && args.intersects[0].object.parent.name === 'user-wifi'){
            document.body.style.cursor = 'grab'
        }else{
            document.body.style.cursor = 'auto'
        }

        if(!activeObject || !grabbed) return
        

        if(document.body.style.cursor !== 'grabbing' ){
            document.body.style.cursor = 'grabbing'
        }
        
        for (let i = 0; i < args.intersects.length; i++) {
            if(args.intersects[i].object.name === 'wall'){
 
                activeObject.position.copy(args.intersects[i].point)
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
        document.body.style.cursor = 'auto'
        
        if(activeObject){

            // activeObject = null
            grabbed = false
            // args.setActiveObject(null)
        }

    }

    const canvasMouseDown = (event: any) => {

        if((event.target as HTMLElement).id === 'renderCanvas'){

            if(!args.intersects[0] || args.intersects[0].object.parent.name !== 'user-wifi') {
                args.setActiveObject(null)
                activeObject = null
                return;
            }
            
            if(args.intersects[0].object.parent.name === 'user-wifi'){
                document.body.style.cursor = 'grabbing'
                activeObject = args.intersects[0].object.parent
                grabbed = true
                args.setActiveObject(activeObject)
                document.addEventListener('mouseup', canvasMouseUp)
                args.orbitControls.enabled = false
            }
        }
    }

    const deleteObject = (event: any)=>{
        if((event.target as HTMLElement).id === userEventKeys.deleteObject){
            console.log(activeObject)
            userObjects.remove(activeObject)
            console.log(args.scene)
            activeObject = null
            args.setActiveObject(null)
        }
    
    }
    
    document.addEventListener('mousedown', addWifiMouseDown)
    document.addEventListener('mousedown', canvasMouseDown)
    document.addEventListener('click', deleteObject)
    // document.addEventListener('mousedown', canvasMouseUp)
    document.addEventListener('pointermove', mouseMove)
    
     
}


import * as React from "react"
import * as THREE from "three"
import {loadModels} from './loader'
import * as dat from "dat.gui"
import { turnOnTheLights } from "./lights";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { addUserEvents, iUserEventsData } from "./userEvents";
import { Plane } from "three";



export const userEvents = {
    
}


export const initScene = (activeObject: THREE.Object3D, setActiveObject: React.Dispatch<React.SetStateAction<THREE.Object3D>>) =>{
    const scene = new THREE.Scene()
    
    // Debug

    const gui = new dat.GUI()
    gui.domElement.id = 'gui'
    gui.domElement.parentElement.style.bottom = '20px'
    gui.domElement.parentElement.style.top = 'auto'
    gui.closed = true



    // Objects
    const raycasterTargets = new THREE.Object3D()
    raycasterTargets.name = 'raycasterTargets'
    scene.add(raycasterTargets)

    const userObjects = new THREE.Group()
    userObjects.name =  'userObjects'
    scene.add(userObjects)
    
    loadModels(scene, gui)

    // Lights

    turnOnTheLights(scene, gui)

    // Sizes
    const sizes = {
        width: window.innerWidth,
        height: window.innerHeight
    }

    // Camera
    const cameraProperties = {
        position: new THREE.Vector3(-12, 2.88, -1.3),
        lookAt: new THREE.Vector3(0, 0, 0),
        maxDistance: 15
    }  

    const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
    camera.position.set(
        cameraProperties.position.x,
        cameraProperties.position.y,
        cameraProperties.position.z,
        ) 
    camera.lookAt(new THREE.Vector3(0,0,0,))
    scene.add(camera)

    const cameraGui = gui.addFolder('Camera')
        cameraGui.add(cameraProperties.position, 'x', -cameraProperties.maxDistance, cameraProperties.maxDistance, 0.01).onChange((value)=>{
            camera.position.x = value
            camera.lookAt(cameraProperties.lookAt)

        })
        cameraGui.add(cameraProperties.position, 'y', -cameraProperties.maxDistance, cameraProperties.maxDistance, 0.01).onChange((value)=>{
            camera.position.y = value
            camera.lookAt(cameraProperties.lookAt)

        })
        cameraGui.add(cameraProperties.position, 'z', -cameraProperties.maxDistance, cameraProperties.maxDistance, 0.01).onChange((value)=>{
            camera.position.z = value
            camera.lookAt(cameraProperties.lookAt)

        })


    
    // Scene events

    // Renderer
    const canvas = document.createElement('canvas')
    canvas.id = 'renderCanvas'


    const  rendererParameters = {
        clearColor: 0xcabeb1
    } 

    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true,
    })
    const clearColor = new THREE.Color().set(rendererParameters.clearColor)
    renderer.setClearColor(clearColor)

    document.getElementsByTagName('body')[0].appendChild(canvas)
    renderer.setSize(sizes.width, sizes.height)
    
    const rendererGui = gui.addFolder('Renderer')
        rendererGui.addColor(rendererParameters, 'clearColor').onChange((value)=>{
            renderer.setClearColor(new THREE.Color().set(value))
        })
    
    
    // Controls
    
    console.log(OrbitControls)
    const controls = new OrbitControls( camera, renderer.domElement );
    // const orbitControlsActive = false

    //Raycaster
    
    const raycaster = new THREE.Raycaster();

    const raycastPlane = new THREE.Mesh(
        new THREE.PlaneGeometry(20, 20),
        new THREE.MeshBasicMaterial({wireframe: true})
    )
    raycastPlane.name = 'raycastPlane'
    // raycastPlane.visible = false


    // raycasterTargets.add(raycastPlane)

    // const raycastPlaneAxes = new THREE.AxesHelper(20)
    // raycastPlane.add(raycastPlaneAxes)
    // raycastPlane.
    // raycastPlane.lookAt(camera.position)

    // Events
    const userEventData:iUserEventsData = {
        intersects: [],
        pointer:  new THREE.Vector2(),
        scene: scene,
        orbitControls: controls,
        activeObject,
        setActiveObject
    }
    addUserEvents(userEventData)

    // HTML events

    window.addEventListener('resize', () =>
    {
        sizes.width = window.innerWidth
        sizes.height = window.innerHeight

        console.log()

        camera.aspect = sizes.width / sizes.height
        camera.updateProjectionMatrix()

        renderer.setSize(sizes.width, sizes.height)
    })





    // Animation

    const clock = new THREE.Clock()
    const drawFrame = ()=>{
        const time = clock.getElapsedTime()

        
        
        raycaster.setFromCamera( userEventData.pointer, camera );
        userEventData.intersects = raycaster.intersectObjects( [...raycasterTargets.children, userObjects] );
        // console.log(scene.children)
        // console.log(userEventData.intersects)
        renderer.render(scene, camera)
        window.requestAnimationFrame(drawFrame)
    }
    drawFrame()

}

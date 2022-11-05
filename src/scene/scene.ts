import * as THREE from "three"
import {loadModels} from './loader'
import * as dat from "dat.gui"
import { turnOnTheLights } from "./lights";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export const initScene = () =>{
    const scene = new THREE.Scene()
    
    // Debug

    const gui = new dat.GUI()
    gui.closed = true



    // Objects

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


    // Events

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

    // const onAddWifiClick ()=>{
    //     console.log('Wifi click')
    // }

    // const addWifiClickObject = {
    //     addWifi: onAddWifiClick
    // }

    // gui.add(addWifiClickObject, 'addWifi').name()

    // Scene events

    // Renderer
    const canvas = document.createElement('canvas')
    
    // const ambientLightParametres = {
    //     color: 0xffffff,
    //     intensity: 0.3

    // }

    // const ambientLight = new THREE. AmbientLight()
    // ambientLight.color = new THREE.Color(ambientLightParametres.color)
    // ambientLight.intensity = ambientLightParametres.intensity

    // const ambientLightGui = gui.addFolder('Ambient light')
    //     ambientLightGui.addColor(ambientLightParametres, 'color').onChange(()=>{
    //         ambientLight.color = new THREE.Color().set(ambientLightParametres.color)
    //     })
    //     ambientLightGui.add(ambientLightParametres, 'intensity', 0, 6, 0.1).onChange((value)=>{
    //         ambientLight.intensity = value;
    //     })

    const  rendererParametres = {
        clearColor: 0xcabeb1
    } 

    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true,
    })
    const clearColor = new THREE.Color().set(rendererParametres.clearColor)
    renderer.setClearColor(clearColor)
    // gui.add()
    document.getElementsByTagName('body')[0].appendChild(canvas)
    renderer.setSize(sizes.width, sizes.height)
    
    const rendererGui = gui.addFolder('Renderer')
        rendererGui.addColor(rendererParametres, 'clearColor').onChange((value)=>{
            renderer.setClearColor(new THREE.Color().set(value))
        })


    // Animation
    // let timeStart = Date.now()
    const clock = new THREE.Clock()

    const drawFrame = ()=>{
        const time = clock.getElapsedTime()
        // const  timeNow = Date.now()
        // const time = timeNow - timeStart
        // timeStart = timeNow

        // mesh.rotation.y += 0.001 * time

        // mesh.rotation.y = time


        renderer.render(scene, camera)
        window.requestAnimationFrame(drawFrame)
    }
    drawFrame()

    // Controls
    
    console.log(OrbitControls)
    const controls = new OrbitControls( camera, renderer.domElement );
}

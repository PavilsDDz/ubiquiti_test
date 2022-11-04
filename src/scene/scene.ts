import * as THREE from "three"
import {loadModels} from './loader'
import * as dat from "dat.gui"
import { turnOnTheLights } from "./lights";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export const initScene = () =>{
    const scene = new THREE.Scene()
    
    // Debug

    const gui = new dat.GUI()



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
    const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
    camera.position.z = 10
    camera.position.y = 10
    camera.lookAt(new THREE.Vector3(0,0,0,))
    scene.add(camera)

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

    // Scene events

    // Renderer
    const canvas = document.createElement('canvas')

    const renderer = new THREE.WebGLRenderer({
        canvas: canvas
    })
    const clearColor = new THREE.Color().set(0x154252)
    renderer.setClearColor(clearColor)
    // gui.add()
    document.getElementsByTagName('body')[0].appendChild(canvas)
    renderer.setSize(sizes.width, sizes.height)


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

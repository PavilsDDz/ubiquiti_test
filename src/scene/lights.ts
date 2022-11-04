import * as THREE from "three"

export const turnOnTheLights = (scene: THREE.Scene, gui: dat.GUI)=>{

    //Ambient light

    const ambientLightParametres = {
        color: 0xffffff,
        intensity: 0.3

    }

    const ambientLight = new THREE. AmbientLight()
    ambientLight.color = new THREE.Color(ambientLightParametres.color)
    ambientLight.intensity = ambientLightParametres.intensity

    const ambientLightGui = gui.addFolder('Ambient light')
        ambientLightGui.addColor(ambientLightParametres, 'color').onChange(()=>{
            ambientLight.color = new THREE.Color().set(ambientLightParametres.color)
        })
        ambientLightGui.add(ambientLightParametres, 'intensity', 0, 6, 0.1).onChange((value)=>{
            ambientLight.intensity = value;
        })

    scene.add(ambientLight)

    //Directional light
    
    const directionalLightParametres = {
        color: 0xffffff,
        intensity: 1,
        position: new THREE.Vector3(2,2,2)
    }

    const directionalLight = new THREE.DirectionalLight(directionalLightParametres.color)
        directionalLight.intensity = directionalLightParametres.intensity
        // directionalLight.position.set(directionalLightParametres.position)

    const directionalLightGui = gui.addFolder('Directional light')
    directionalLightGui.addColor(directionalLightParametres, 'color').onChange(()=>{
        directionalLight.color = new THREE.Color().set( directionalLightParametres.color)
    })

    directionalLightGui.add(directionalLightParametres, 'intensity', 0, 10, 0.1).onChange((value)=>{
        directionalLight.intensity = value
        directionalLight.lookAt(new THREE.Vector3(0,0,0))
    })

    directionalLightGui.add(directionalLightParametres.position, 'x', 0, 10, 0.1).onChange((value)=>{
        directionalLight.position.x = value
        directionalLight.lookAt(new THREE.Vector3(0,0,0))
    })

    directionalLightGui.add(directionalLightParametres.position, 'y', 0, 10, 0.1).onChange((value)=>{
        directionalLight.position.y = value
        directionalLight.lookAt(new THREE.Vector3(0,0,0))

    })

    directionalLightGui.add(directionalLightParametres.position, 'z', 0, 10, 0.1).onChange((value)=>{
        directionalLight.position.z = value
        directionalLight.lookAt(new THREE.Vector3(0,0,0))
    })

    scene.add(directionalLight)
}
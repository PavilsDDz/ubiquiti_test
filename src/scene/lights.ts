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
        ambientLightGui.add(ambientLightParametres, 'intensity', 0, 10, 0.1).onChange((value)=>{
            ambientLight.intensity = value;
        })

    scene.add(ambientLight)

    //Directional light
    
    const directionalLightParametres = {
        color: 0xffffff,
        intensity: 1,
    }

    const directionalLight = new THREE.DirectionalLight(directionalLightParametres.color)
        directionalLight.intensity = directionalLightParametres.intensity

    const directionalLightGui = gui.addFolder('Directional light')
    directionalLightGui.addColor(directionalLightParametres, 'color').onChange(()=>{
        directionalLight.color = new THREE.Color().set( directionalLightParametres.color)
    })
    directionalLightGui.add(directionalLightParametres, 'intensity', 0, 10, 0.1).onChange((value)=>{
        directionalLight.intensity = value
    })

    scene.add(directionalLight)
}
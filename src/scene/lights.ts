import * as THREE from "three"
export const turnOnTheLights = (scene: THREE.Scene, gui: dat.GUI)=>{

    //Ambient light

    const ambientLightParametres = {
        color: 0xc6ddff,
        intensity: 0.83

    }

    const ambientLight = new THREE. AmbientLight()
    ambientLight.color = new THREE.Color(ambientLightParametres.color)
    ambientLight.intensity = ambientLightParametres.intensity

    const ambientLightGui = gui.addFolder('Ambient light')
        ambientLightGui.addColor(ambientLightParametres, 'color').onChange(()=>{
            ambientLight.color = new THREE.Color().set(ambientLightParametres.color)
        })
        ambientLightGui.add(ambientLightParametres, 'intensity', 0, 1, 0.01).onChange((value)=>{
            ambientLight.intensity = value;
        })

    scene.add(ambientLight)

    //Directional light
    
    const directionalLightParametres = {
        color: 0xffffff,
        intensity: 0.1,
        position: new THREE.Vector3(2,2,2)
    }

    const directionalLight = new THREE.DirectionalLight(directionalLightParametres.color)
        directionalLight.intensity = directionalLightParametres.intensity
        // directionalLight.position.set(directionalLightParametres.position)

    const directionalLightGui = gui.addFolder('Directional light')
    directionalLightGui.addColor(directionalLightParametres, 'color').onChange(()=>{
        directionalLight.color = new THREE.Color().set( directionalLightParametres.color)
    })

    directionalLightGui.add(directionalLightParametres, 'intensity', 0, 1, 0.1).onChange((value)=>{
        directionalLight.intensity = value
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




    const pointLightsGui = gui.addFolder('Point lights')

    interface iPointLightParams{
        position: THREE.Vector3,
        intensity: number,
        helperVisible: boolean,
        color: THREE.Color

    } 
    const pointLightsParamsDefault: iPointLightParams = {
        position: new THREE.Vector3(0,3,0),
        intensity: 0.2,
        helperVisible: false,
        color: new THREE.Color(0xffdccf)
    }

    const pointLightsParams: iPointLightParams[]  = [
        {
            ...pointLightsParamsDefault,
            position: new THREE.Vector3(-9.5, 3, -1),
        
        },
        {
            ...pointLightsParamsDefault,
            position: new THREE.Vector3(-5.9, 3, -1),

        },
        {
            ...pointLightsParamsDefault,
            position: new THREE.Vector3(8.5, 3, 1.74),

        },
        {
            ...pointLightsParamsDefault,
            position: new THREE.Vector3(2.54, 3, 2.24),
        }

    ]
    const pointLights:THREE.PointLight[] = []

    for (let i = 0; i < 4; i++) {
        
        const pointLight = new THREE.PointLight()
        const pointLightHelper = new THREE.PointLightHelper(pointLight)
        
        if(pointLightsParams[i]){
            pointLightHelper.visible = pointLightsParams[i].helperVisible
            pointLight.position.copy(pointLightsParams[i].position)
            pointLight.intensity = pointLightsParams[i].intensity
            pointLight.color.set(pointLightsParams[i].color)
        }
        
            pointLights[i] = pointLight
            scene.add(pointLight)
            scene.add(pointLightHelper)

        const pointLightGui =  pointLightsGui.addFolder('Point light ' + i)


        pointLightGui.add(pointLight.position, 'x', -12, 12, 0.02)
        pointLightGui.add(pointLight.position, 'y', -12, 12, 0.02)
        pointLightGui.add(pointLight.position, 'z', -12, 12, 0.02)
        pointLightGui.add(pointLight, 'intensity', 0, 1, 0.02)

        pointLightGui.addColor({color: 0xffdccf}, 'color').onChange((value)=>{
            pointLights[i].color = new THREE.Color().set(value)
        })

        pointLightGui.add(pointLightHelper, 'visible')
        
    }


}
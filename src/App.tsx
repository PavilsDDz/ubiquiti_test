import * as React from 'react';
import { initScene } from './scene';
import texture from './recourses/obj/texture.png'

export function App() {

    React.useEffect(()=>{
        initScene()
    }, [])  

return (
<>
    <img src={texture} alt="no image to load" />
</>);
}

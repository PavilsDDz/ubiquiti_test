import * as React from 'react';
import { initScene } from './scene/scene';
import texture from './recourses/obj/texture.png'

export function App() {

    React.useEffect(()=>{
        initScene()
    }, [])  

return (
<>
</>);
}

import * as React from 'react';
import { initScene } from './scene';

export function App() {

    React.useEffect(()=>{
        initScene()
    }, [])  

return (
<></>);
}

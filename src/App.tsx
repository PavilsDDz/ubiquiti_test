import * as React from 'react';
import { initScene } from './scene/scene';
import texture from './recourses/obj/texture.png'
import DeleteOutlineSharpIcon from '@mui/icons-material/DeleteOutlineSharp';
import MenuSharpIcon from '@mui/icons-material/MenuSharp';
import { Button, Dropdown, Menu } from 'antd';

export function App() {

    React.useEffect(()=>{
        initScene()
    }, [])  

return (
<>
    <div className='header'>
        <div className='header-content'>
            
            <div className='title'>
                <h1>Ubiquti graphic programmer test assigment</h1>
                <span>by Pāvils Dailis Dzirkalis</span>
            </div>

            <div className='menu'>
                <div className='menu-trigger'>
                    <MenuSharpIcon fontSize="inherit"/>
                </div>

            </div>


            <div className='delete-container'>
                <DeleteOutlineSharpIcon fontSize="inherit"></DeleteOutlineSharpIcon>
            </div>
        </div>
    </div>
</>);
}

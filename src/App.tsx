import * as React from 'react';
import { initScene } from './scene/scene';
import texture from './recourses/obj/texture.png'
import DeleteOutlineSharpIcon from '@mui/icons-material/DeleteOutlineSharp';
import MenuSharpIcon from '@mui/icons-material/MenuSharp';
import { Button, Dropdown, Menu } from 'antd';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';


export function App() {

    const [menuOpened, setMenuOpened] = React.useState<boolean>(false)

    // const onMenuTriggerClick()

    // React.useEffect(()=>{

    //     document.getElementsByClassName('menu-trigger')[0].addEventListener('click', ()=>{
    //         console.log(menuOpened)
            
    //     })

    // }, [])

    const toggleMenuOpened = ()=>{
        setMenuOpened(!menuOpened)    
    }

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

            <div className={`menu ${menuOpened ? 'opened' : ''}`}>
                <div className='menu-trigger' onClick={toggleMenuOpened}>
                    <div className='icon open'>
                        <MenuSharpIcon fontSize="inherit" />
                    </div>
                    <div className='icon close'>
                        <CloseOutlinedIcon fontSize="inherit" />
                    </div>
                </div>
                <menu id='mainMenu'>
                    <ul>
                        <li id='addWifiMouseDown'>Add Wifi</li>
                        <li><InfoOutlinedIcon/></li>
                    </ul>
                </menu>
            </div>


            <div className='delete-container'>
                <DeleteOutlineSharpIcon fontSize="inherit"></DeleteOutlineSharpIcon>
            </div>
        </div>
    </div>
</>);
}

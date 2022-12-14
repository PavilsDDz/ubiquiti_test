import * as React from 'react';
import { initScene } from './scene/scene';
import texture from './recourses/obj/texture.png'
import DeleteOutlineSharpIcon from '@mui/icons-material/DeleteOutlineSharp';
import MenuSharpIcon from '@mui/icons-material/MenuSharp';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';


export function App() {

    const [menuOpened, setMenuOpened] = React.useState<boolean>(false)
    const [activeObject, setActiveObject] = React.useState<THREE.Object3D>(null)

    React.useEffect(()=>{
        console.log(activeObject)
    }, [activeObject])

    const toggleMenuOpened = ()=>{
        setMenuOpened(!menuOpened)    
    }

    React.useEffect(()=>{
        initScene(activeObject, setActiveObject)
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
                <menu id='mainMenu' className='menu-box'>
                    <ul>
                        <li id='addWifiMouseDown'>Add Wifi</li>
                    </ul>
                </menu>
            </div>

            <div className='info-trigger'>
                <div className='icon'>
                    <InfoOutlinedIcon fontSize='inherit'/>
                </div>
                <div className='info-content'>
                    <ul>
                        <li>
                            To look around move your mouse -
                        
                            <br/>Left click & move mouse to rotate camera.
                        
                            <br/>Right click & move mouse to move camera.
                        </li>
                        <li>To add wifi on the wall -
                            <br/>In menu click on "Add wifi button" and drag object noto wall.

                        </li>
                        <li>Select object by clicking on it.</li>
                        <li>You can delete selected object in option box in top right corner of screen.</li>
                        <li>You can edit scene use GUI controls, in top right of screen ("Open Controls") </li>
                    </ul>
                </div>
                {activeObject ? <>
                    <div className='menu-box' id='object-properties'>
                        <ul>
                            <li id='deleteObject'>
                                Delete object
                            </li>
                            {/* <li id='showRange'>
                                <label htmlFor="show-range">Show range</label>
                                <input type="checkbox" name="" id="show-range" />
                            </li> */}
                        </ul>
                    </div>
                </> : <></>}
            </div>


            <div className='delete-container'>
                <DeleteOutlineSharpIcon fontSize="inherit"></DeleteOutlineSharpIcon>
            </div>
            
        </div>
    </div>
</>);
}

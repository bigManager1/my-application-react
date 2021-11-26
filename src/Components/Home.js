import {useEffect, useState } from "react";
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import Modal, { setAppElement } from 'react-modal';
import "C:/Users/umada/my-application/src/Styling/Main.scss";

// to do list (cleans in a day)
// 


function Home () {
    return(

        <div class="main" >
            <div class="selection">
                
            </div>

            <div class="display">

            </div>
        </div>
    )
}

export default Home;

import {useEffect, useState } from "react";
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import Modal, { setAppElement } from 'react-modal';
import "C:/Users/umada/my-application/src/Styling/Main.scss";

// add 
/*
[
  {
    "availableAmount": 0,
    "id": 0,
    "productPlanID": 0,
    "qualityAmount": 0,
    "soldAmount": 0,
    "totalAmount": 0,
    "unitPrice": 0
  }
]
*/

function ManageOptions(){

  const url = "https://management-backend-app.herokuapp.com/";

  

    return(
      <div class="main" >
          <div class="selection">
          
          </div>

          <div class="display">

          </div>
      </div>
    );
}

export default ManageOptions;
import {useEffect, useState } from "react";
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import Modal, { setAppElement } from 'react-modal';


// purchase interface 


function ManageOptions () {
const url = "https://management-backend-app.herokuapp.com/";
// panels
const [showSuppliers, setShowSuppliers] = useState(false);
const [showPurpose, setShowPurpose] = useState(false);
const [showMaterial, setShowMaterial] = useState(false);
const [showWarning, setShowWarning] = useState(false); 

// mapped lists
const [purposes, setPurposes] = useState([]);
const [materials, setMaterials] = useState([]);
const [suppliers, setSuppliers] = useState([]);

// modal dependencies

const [modalPurpose, setModalPurpose] = useState(false);
const [modalMaterial, setModalMaterial] = useState(false);
const [modalSupplier, setModalSupplier] = useState(false);

// variables

const [newTitle, setNewTitle] = useState("");

// icons
const plus = <FontAwesomeIcon icon={faPlus} />
const trash = <FontAwesomeIcon icon={faTrash} />

// internal functions

useEffect(() => {
    fetchPurpose();
    fetchSupplier();
    fetchMaterial();
    
  }, []);


// fetching data functions

function fetchPurpose(){
    axios.get(url+'api/resourcePurpose')
    .then(result => { 
      setPurposes(result.data);
    })
}


function fetchMaterial(){
    axios.get(url+'api/resourceMaterial')
    .then(result => { 
      setMaterials(result.data);
    })
}

function fetchSupplier(){
    axios.get(url+'api/resourceSupplier')
    .then(result => { 
      setSuppliers(result.data);
    })
}

// adding new data functions 

function addPurpose(e){
    e.preventDefault();
    axios.post(url+'api/resourcePurpose',{
        id: 0,
        title: newTitle
    }).then(()=> fetchPurpose());
}

function addMaterial(e){
    e.preventDefault();
    axios.post(url+'api/resourceMaterial',{
        id: 0,
        title: newTitle
    }).then(()=> fetchMaterial());
}

function addSupplier(e){
    e.preventDefault();
    axios.post(url+'api/resourceSupplier',{
        id: 0,
        title: newTitle
    }).then(()=> fetchSupplier());
}

// deleting data functions

function deletePurpose(id){
    axios.delete(url+'api/resourcePurpose/' + id)
    .then(()=> fetchPurpose());
}
function deleteMaterial(id){
    axios.delete(url+'api/resourceMaterial/' + id)
    .then(()=> fetchMaterial());
}
function deleteSupplier(id){
    axios.delete(url+'api/resourceSupplier/' + id)
    .then(()=> fetchSupplier());
}

// button handling functions
function handlePurpose(){
    setShowMaterial(false);
    setShowSuppliers(false);
    setShowPurpose(true);
}

function handleMaterial(){
    setShowPurpose(false);
    setShowSuppliers(false);
    setShowMaterial(true);
}

function handleSupplier(){
    setShowMaterial(false);
    setShowPurpose(false);
    setShowSuppliers(true);
}


    return(

        <div id="main">
            <div id="selection">

                <button onClick={() => handlePurpose()}>Purpose</button>
                <button onClick={() => handleMaterial()}>Material</button>
                <button onClick={() => handleSupplier()}>Supplier</button>

            </div>
            <div id="display">

            {/*purpose pannel*/}
            {showPurpose ?
            <div id = "inner">
                <button onClick={() => setModalPurpose(true)}>{plus}</button>
                {purposes.map(purpose => <p key={purpose.id}>{purpose.title} 
                <button onClick = {() => deletePurpose(purpose.id)}>{trash}</button></p>)}
                {/*map all, add new, delete*/}
            </div>
            :
            <></>}

            <div> {/*purpose modal*/}
                <Modal
                isOpen={modalPurpose}
                appElement={document.getElementById('root')}>
                    <h2>New supplier</h2>
                    <button onClick={() => setModalPurpose(false)}> Close </button>
                    <form>
                        <input required type="text" placeholder="New purpose" onChange = {e => setNewTitle(e.target.value)}></input>
                        <button onClick = {e => addPurpose(e)}>Add a new purpose</button>
                    </form>
                </Modal>
            </div>

            {/*material pannel*/}
            {showMaterial ?
            <div id = "inner">
                <button onClick={() => setModalMaterial(true)}>{plus}</button>
                {materials.map(material => <p key={material.id}>{material.title} 
                <button onClick = {() => deleteMaterial(material.id)}>{trash}</button></p>)}
                {/*map all, add new, delete*/}
            </div>
            :
            <></>}
            
            <div> {/*Material modal*/}
                <Modal
                isOpen={modalMaterial}
                appElement={document.getElementById('root')}>
                    <h2>New material</h2>
                    <button onClick={() => setModalMaterial(false)}> Close </button>
                    <form>
                        <input required type="text" placeholder="New material" onChange = {e => setNewTitle(e.target.value)}></input>
                        <button onClick = {e => addMaterial(e)}>Add a new material</button>
                    </form>
                </Modal>
            </div>

            {/*supplier pannel*/}
            {showSuppliers ?
            <div id = "inner">
                <button onClick={() => setModalSupplier(true)}>{plus}</button>
                {suppliers.map(supplier => <p key={supplier.id}>{supplier.title}
                <button onClick = {() => deleteSupplier(supplier.id)} >{trash}</button></p>)}
                {/*map all, add new, delete*/}
            </div>
            :
            <></>}
            </div>

            <div> {/*Material modal*/}
                <Modal
                isOpen={modalSupplier}
                appElement={document.getElementById('root')}>
                    <h2>New Supplier</h2>
                    <button onClick={() => setModalSupplier(false)}> Close </button>
                    <input type="text" placeholder="New Supplier" onChange = {e => setNewTitle(e.target.value)}></input>
                    <button onClick = {e => addSupplier(e)}>Add a new supplier</button>
                    
                    {/*make warning work - otherwise form is to be used*/}
                    {showWarning ?
                    <p> Please fill in the field! </p>
                    :
                    <></>}

                </Modal>
            </div>
        </div>
    )
}
export default ManageOptions;
import {useEffect, useState } from "react";
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import Modal, { setAppElement } from 'react-modal';

// purchase interface

function Overview () {

    // icons
    const plus = <FontAwesomeIcon icon={faPlus} />
    const trash = <FontAwesomeIcon icon={faTrash} />

    // hooks to store resource descriptor api value collections
    const [purposes, setPurposes] = useState([]);
    const [materials, setMaterials] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const [resources, setResources] = useState([]);
    const [statuses, setStatuses] = useState([]);

    // modal dependencies
    const [modalResources, setModalResources] = useState(false);
    const [modalArchived,setModalArchived] = useState(false);

    // hooks for adding a new resource
    const [weight, setWeight] = useState(1.0);
    const [price, setPrice] = useState(1.0);
    const [color, setColor] = useState("#000000");
    const [estimatedArrival, setEstimatedArrival] = useState("2021-12-12");
    const [currentStatus,setCurrentStatus] = useState();
    const [currentMaterial, setCurrentMaterial] = useState();
    const [currentPurpose,setCurrentPurpose] = useState();
    const [currentSupplier, setCurrentSupplier] = useState();

    // functions to handle select events
    async function handleMaterial(target){
        await axios.get('http://localhost:8080/api/resourceMaterial/'+ target)
        .then(result => { 
            setCurrentMaterial(result.data);
        })
    }
    async function handlePurpose(target){
        await axios.get('http://localhost:8080/api/resourcePurpose/'+ target)
        .then(result => { 
            setCurrentPurpose(result.data);
        })
    }

    async function handleSupplier(target){
        await axios.get('http://localhost:8080/api/resourceSupplier/'+ target)
        .then(result => { 
            setCurrentSupplier(result.data);
        })
    }

    function handleResourceModal(){
        setModalResources(true);
        setCurrentMaterial(materials[0]);
        setCurrentPurpose(purposes[0]);
        setCurrentSupplier(suppliers[0]);
        setCurrentStatus(statuses[0]);
    }

// internal functions 
    useEffect(() => {
        fetchPurpose();
        fetchSupplier();
        fetchMaterial();
        fetchStatuses();
        fetchResources();
    }, []);


// fetching data functions
    async function fetchPurpose(){
        await axios.get('http://localhost:8080/api/resourcePurpose')
        .then(result => { 
            setPurposes(result.data);
    })}


    async function fetchMaterial(){
        await axios.get('http://localhost:8080/api/resourceMaterial')
        .then(result => { 
            setMaterials(result.data);
    })}
    
    async function fetchSupplier(){
        await axios.get('http://localhost:8080/api/resourceSupplier')
        .then(result => { 
            setSuppliers(result.data);
    })}

    async function fetchResources(){
        await axios.get('http://localhost:8080/api/resources')
        .then(result => { 
            setResources(result.data);
    })}

    async function fetchStatuses(){
        await axios.get('http://localhost:8080/api/resourceStatus')
        .then(result => { 
            setStatuses(result.data);
    })}

    // current date expression 
    const today = new Date();
    const month = ((today.getMonth() +1) <10 ? "0" + String(today.getMonth() + 1) : String(today.getMonth()+1));
    const day = (today.getDate()) < 10  ? "0" + String(today.getDate()) : String(today.getDate());
    const currentDate =   String(today.getFullYear())+ "-" + month+ "-" + day;

    // functions to add new properties
    function addResource(e){
        e.preventDefault();
        axios.post('http://localhost:8080/api/resources',{
        id: 0,
        weight: Math.round(weight).toFixed(2),
        price: Math.round(price).toFixed(2),
        color: color,
        purpose: currentPurpose,
        material: currentMaterial,
        status: statuses[1],
        supplier: currentSupplier,
        registry_date: currentDate,
        estimated_arrival: estimatedArrival
    })
        .then(()=> fetchResources()); 
    }

    // functions to otherwise alter/delete existing properties

    function makeArchived(id){
        console.log(statuses[3]);// gets {id: 8, status: 'Archived'} expects 
        axios.patch('http://localhost:8080/api/resources/'+ id,{
            status: statuses[0],// works in swagger - doesn't work here because of the syntax "" 
        })
        fetchResources();
    }

    function deleteArchived(id){
        axios.delete('http://localhost:8080/api/resources/'+ id)
        fetchResources();
    }


    // displayed panel

    return(
        
        <div id="main">
            
            <button onClick={() => handleResourceModal()}>{plus}</button>
            <button onClick={() => setModalArchived(true)}> See archived</button>

            {/* Existing resources displayed over 3 panels, based on status*/}
            <div id="panel">
                <h2>
                    To be evaluated
                </h2>
                <div id="inner">
                    {resources.map(resource => (resource.status.status == "To Evaluate" ? 
                    resource.weight + " kg of " + resource.material.title + " for " + resource.purpose.title + " due on " + resource.estimated_arrival
                    : null)
                    )}
                </div>
            </div>

            <div id="panel">
                <h2>
                    Returned
                </h2>
                <div id="inner">
                {resources.map(resource => (resource.status.status == "Returned" ? 
                    resource.weight + " kg of " + resource.material.title + " for " + resource.purpose.title
                    : null)
                    )}
                </div>
            </div>
            
            <div id="panel">
                <h2>
                    Accepted
                </h2>
                <div id="inner">
                {resources.map(resource => (resource.status.status == "Accepted" ? 
                    <p>{resource.weight} + " kg of " + {resource.material.title} + " for " + {resource.purpose.title} 
                    <button onClick={()=>makeArchived(resource.id)}>{trash}</button>
                    </p>
                    : null)
                    )}
                </div>
            </div>

            {/* Modal for archived resources and deletion*/}
            <div>
                <Modal
                isOpen={modalArchived}
                appElement={document.getElementById('root')}>
                    <h2>Archived resources</h2>
                    <button onClick={() => setModalArchived(false)}> Close </button>
                    <div id="inner">
                    {resources.map(resource => (resource.status.status == "Archived" ? 
                    <p>{resource.weight} + " kg of " + {resource.material.title}
                    <button onClick={() => deleteArchived(resource.id)}>{trash}</button>
                    </p>
                    : null)
                    )}
                </div>

                </Modal>
            </div>

            {/* Modal for adding resources*/}
            <div> {/* Resources modal*/}
                <Modal
                isOpen={modalResources}
                appElement={document.getElementById('root')}>
                    <h2>New Resource</h2>
                    <button onClick={() => setModalResources(false)}> Close </button>

                        <label>
                            Weight
                            <input type = "number" step={0.1} precision={1} onChange={(e) => setWeight(e.target.value)}></input>
                        </label>
                        
                        <label>
                            Price
                            <input type = "number" step={0.1} precision={1} onChange={(e) => setPrice(e.target.value)}></input>   
                        </label>
                        
                        <label>
                            Color
                            <input type = "color" onChange={(e) => setColor(e.target.value)}></input>
                        </label>

                        <label>
                            Estimated Arrival date
                            <input type = "date" onChange={(e) => setEstimatedArrival(e.target.value)}></input>    
                        </label>

                        <label>
                            Material
                            <select onChange={(e) => handleMaterial(e.target.value)}>
                            {materials.map( option => 
                            <option key={option.id} value={option.id}>{option.title}</option>)}
                            </select>
                        </label>
                        
                        <label>
                            Purposes
                            <select onChange={(e) => handlePurpose(e.target.value)}>
                            {purposes.map( option => 
                            <option key={option.id} value={option.id}>{option.title}</option>)}
                            </select>
                        </label>
                        
                        <label>
                            Suppliers
                            <select onChange={(e) => handleSupplier(e.target.value)}>
                            {suppliers.map( option => 
                            <option key={option.id} value={option.id}>{option.title}</option>)}
                            </select>
                        </label>

                        <button onClick = {e => addResource(e)}>Add a new Resource</button>
                </Modal>
            </div>

        </div>
    )
}

export default Overview;
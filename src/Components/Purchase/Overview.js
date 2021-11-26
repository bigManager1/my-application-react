import {useEffect, useState } from "react";
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import Modal, { setAppElement } from 'react-modal';
import "C:/Users/umada/my-application/src/Styling/Main.scss";
// purchase interface

// crucials
// add new resources (to evaluate) +
// see all resources (purchase) depending on status + 
// for returned resources, make 'Put' request to replace them when new one is negotiated (separate icon)
// see supplier feedback based on supplier
// 


// back-end related:
// make api delete archive resources when there are more than 200




// Good optionals

// see weight/price range based on material for different resources
// basically : choose material -> see all resources ever purhased on a graph where 
// y kg/price, x supplier (each suppliers' price range) (color entries by )
// 

// see weight/price for




function Overview () {
    const url = "https://management-backend-app.herokuapp.com/";
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
    const [weight, setWeight] = useState(1);
    const [price, setPrice] = useState(1);
    const [color, setColor] = useState("#000000");
    const [estimatedArrival, setEstimatedArrival] = useState("2021-12-12");
    const [currentStatus,setCurrentStatus] = useState();
    const [currentMaterial, setCurrentMaterial] = useState();
    const [currentPurpose,setCurrentPurpose] = useState();
    const [currentSupplier, setCurrentSupplier] = useState();

    // functions to handle select events
    async function handleMaterial(target){
        await axios.get(url+'api/resourceMaterial/'+ target)
        .then(result => { 
            setCurrentMaterial(result.data);
        })
    }
    async function handlePurpose(target){
        await axios.get(url+'api/resourcePurpose/'+ target)
        .then(result => { 
            setCurrentPurpose(result.data);
        })
    }

    async function handleSupplier(target){
        await axios.get(url+'api/resourceSupplier/'+ target)
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
        await axios.get(url+'api/resourcePurpose')
        .then(result => { 
            setPurposes(result.data);
    })}


    async function fetchMaterial(){
        await axios.get(url+'api/resourceMaterial')
        .then(result => { 
            setMaterials(result.data);
    })}
    
    async function fetchSupplier(){
        await axios.get(url+'api/resourceSupplier')
        .then(result => { 
            setSuppliers(result.data);
    })}

    async function fetchResources(){
        await axios.get(url+'api/resources')
        .then(result => { 
            setResources(result.data);
    })}

    async function fetchStatuses(){
        await axios.get(url+'api/resourceStatus')
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
        axios.post(url+'api/resources',{
        id: 0,
        original_weight: Math.round(weight).toFixed(2),
        remaining_weight: Math.round(weight).toFixed(2),
        price: Math.round(price).toFixed(2),
        color: color,
        purpose: currentPurpose,
        material: currentMaterial,
        status: statuses[0],
        supplier: currentSupplier,
        registry_date: currentDate,
        estimated_arrival: estimatedArrival
    })
        .then(()=> fetchResources()); 
    }

    // functions to otherwise alter/delete existing properties

    function deleteArchived(id){
        axios.delete('api/resources/'+ id)
        fetchResources();
    }

    // displayed panel

    return(
        
        <div class="main">

            <div class="selection">
            <button class="selectionButton" onClick={() => handleResourceModal()}>{plus}</button>
            <button class="selectionButton" onClick={() => setModalArchived(true)}> See archived</button>
            </div>

            <div class = "display">
            {/* Existing resources displayed over 3 panels, based on status*/}
            <div class="panel">
                <h2>
                    To be evaluated
                </h2>
                <div class="inner">
                    {resources.map(resource => (resource.status.status == "To Evaluate" ? 
                    <ul>{resource.original_weight} kg of {resource.material.title} for {resource.purpose.title} due on {resource.estimated_arrival}</ul>
                    : null)
                    )}
                </div>
            </div>

            <div class="panel">
                <h2>
                    Returned
                </h2>
                <div class="inner">
                {resources.map(resource => (resource.status.status == "Returned" ? 
                    <ul>{resource.original_weight} kg of {resource.material.title} for {resource.purpose.title}</ul>
                    : null)
                    )}
                </div>
            </div>
            
            <div class="panel" id="end">
                <h2>
                    Accepted
                </h2>
                <div class="inner">
                {resources.map(resource => (resource.status.status == "Accepted" ? 
                    <ul>{resource.remaining_weight} kg of {resource.material.title} for {resource.purpose.title} 
                    </ul>
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
                    <div class="inner">
                    {resources.map(resource => (resource.status.status == "Archived" ? 
                    <ul>{resource.remaining_weight} kg of {resource.material.title}
                    <button onClick={() => deleteArchived(resource.id)}>{trash}</button>
                    </ul>
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
                            <input type = "number" min="0" step={10} precision={0.1} onChange={(e) => setWeight(e.target.value)}></input>
                        </label>
                        
                        <label>
                            Price
                            <input type = "number" min="0" step={10} precision={0.1} onChange={(e) => setPrice(e.target.value)}></input>   
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
        </div>
    )
}

export default Overview;
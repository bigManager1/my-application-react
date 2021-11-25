

import {useEffect, useState } from "react";
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import Modal, { setAppElement } from 'react-modal';
import "C:/Users/umada/my-application/src/Styling/Main.scss";
<<<<<<< HEAD

// finish product plan modal
// fix patch requests 
// 
// 


=======
>>>>>>> ec60f5b41f2aee05ab445d4e3f0f3d98bb3528b4
function Overview(){

    const url = "https://management-backend-app.herokuapp.com/";
    // icons
    const plus = <FontAwesomeIcon icon={faPlus} />
    const trash = <FontAwesomeIcon icon={faTrash} />

    // current date expression 
    const today = new Date();
    const month = ((today.getMonth() +1) <10 ? "0" + String(today.getMonth() + 1) : String(today.getMonth()+1));
    const day = (today.getDate()) < 10  ? "0" + String(today.getDate()) : String(today.getDate());
    const currentDate =   String(today.getFullYear())+ "-" + month+ "-" + day;

    // panels

<<<<<<< HEAD
    const [showResourceEvaluation, setShowResourceEvaluation] = useState(true);
=======
    const [showResourceEvaluation, setShowResourceEvaluation] = useState(false);
>>>>>>> ec60f5b41f2aee05ab445d4e3f0f3d98bb3528b4
    const [showProductPlans, setShowProductPlans] = useState(false);

    // modal dependencies

    const [modalResourceEvaluation, setModalEvaluation] = useState(false);
    const [modalProductPlan, setModalProductPlan] = useState(false);
    const [modalSupplierFeedback, setModalSupplierFeedback] = useState(false);

    // fetched lists

    const [suppliers, setSuppliers] = useState([]);
    const [supplierFeedback, setSupplierFeedback] = useState([]);
    const [resourceEvaluations, setResourceEvaluations] = useState([]);
    const [productPlans, setProductPlans] = useState([]);
    const [productTypes, setProductTypes] = useState([]);
    const [resources, setResources] = useState([]);
    const [statuses, setStatuses] = useState([]);
    // 

    const [currentReasoning, setCurrentReasoning] = useState("");
    const [currentSupplierID, setCurrentSupplierID] = useState(1);
    const [currentSupplierFeedbackID, setCurrentSupplierFeedbackID] = useState(1);
    const [currentResourceID, setCurrentResourceID] = useState(1);
    const [currentAcceptability, setCurrentAcceptability] = useState(true);
    const [currentProductType, setCurrentProductType] = useState();
    const [currentEstimatedQuantity, setCurrentEstimatedQuantity] = useState(1);
    const [currentUsedWeight, setCurrentUsedWeight] = useState(1.0);

    useEffect(() => {
        fetchSuppliers();
        fetchStatuses();
        fetchResources();
        fetchProductTypes();
        fetchProductPlans();
        fetchResourceEvaluations();
        fetchSupplierFeedback();
    }, []);

    async function fetchSuppliers(){
        await axios.get(url+'api/resourceSupplier')
        .then(result => { 
            setSuppliers(result.data);
    })}

    async function fetchStatuses(){
        await axios.get(url+'api/resourceStatus')
        .then(result => { 
            setStatuses(result.data);
    })}

    // fetch product types
    async function fetchProductTypes(){
        await axios.get(url+'api/productType')
        .then(result => { 
            setProductTypes(result.data);
        })
    }

    async function fetchResources(){
        await axios.get(url+'api/resources')
        .then(result => { 
            setResources(result.data);
    })}

    // fetch supplier feedback
    async function fetchSupplierFeedback(){
        await axios.get(url+'api/supplierFeedback')
        .then(result => { 
            setSupplierFeedback(result.data);
        })
    }

    // add supplier feedback
    function addSupplierFeedback(){
        axios.post(url+'api/supplierFeedback',{
            id: 0,
            reasoning: currentReasoning,
            supplierID: currentSupplierID
        }).then(()=> fetchSupplierFeedback());
    }

    // delete supplier feedback

    // fetch evaluations
    async function fetchResourceEvaluations(){
        await axios.get(url+'api/evaluatedResources')
        .then(result => { 
            setResourceEvaluations(result.data);
        })
    }

    // add evaluation 
    
    function addResourceEvaluation(e){
        e.preventDefault();
        axios.post(url+'api/supplierFeedback',{
            id: 0,
            acceptable: currentAcceptability,
            received_at: currentDate,
            supplier_feedbackID: currentSupplierFeedbackID, // last one from the list 
            resourceID: currentResourceID,
            evaluation_reasoning: currentReasoning
        }).then(()=> fetchResourceEvaluations());
    }

    // change resource status based on evaluation

    function manageResourceStatus(){
        (currentAcceptability ? 
        axios.patch(url+'api/resources/'+currentResourceID +'/'+statuses[1], {
            status: statuses[1]
        }).catch((error) => console.log('Error: ', error))
        :
        axios.patch(url+'api/resources/'+currentResourceID +'/'+statuses[2], {
            status: statuses[2]
        }).catch((error) => console.log('Error: ', error))
        );
        fetchResources();
    }

    function manageProductPlanCompletion(id){
        axios.patch(url+'api/productPlan/'+id +'/'+ true, { // change last argument
            done: true
        }).catch((error) => console.log('Error: ', error))
    }

    // fetch product profiles
    async function fetchProductPlans(){
        await axios.get(url+'api/productPlan')
        .then(result => { 
            setProductPlans(result.data);
        });
    }

    // add product profile

    function addProductPlan(e){
        e.preventDefault();
        axios.post(url+'api/productPlan',{
            id: 0,
            done: false,
            product_type: currentProductType,
            estimated_quantity: currentEstimatedQuantity,
            used_weight: currentUsedWeight,
            resourceID: currentResourceID
        }).then(()=> fetchProductPlans());
        setModalProductPlan(false);
    }

    function handleEvaluations(){
        setShowProductPlans(false);
        setShowResourceEvaluation(true);
    }

    function handleProjectPlans(){
        setShowResourceEvaluation(false);
        setShowProductPlans(true);
    }

    function handleProceed(e){
        e.preventDefault();
        addSupplierFeedback();
        manageResourceStatus();
        setModalSupplierFeedback(false);
        setModalEvaluation(true);
    }

    return(
        <div class="main">
            {/**/}
            <div class = "selection">
            <button class="selectionButton" onClick={() => handleEvaluations()}>Manage Evaluations</button>
            <button class="selectionButton" onClick={() => handleProjectPlans()}>Manage Product planning</button>
            </div>

            <div class= "display">
            {/*show resourceEvaluations (show resources with 'to evaluate' status)*/}
            {showResourceEvaluation ? 
<<<<<<< HEAD
            <div class = "fullPanel">
                <div class = "halfPanel">
                <h2>The following resources are waiting for evaluation: </h2>
                {resources.map(resource => (resource.status.status == "To Evaluate" ? 
                    <ul key={resource.id} onMouseOver={()=> setCurrentResourceID(resource.id)}>
                    <button class="changesButton" onClick={() => setModalSupplierFeedback(true)}>Evaluate</button>    
                    {resource.original_weight} + " kg of " + {resource.material.title}
=======
            <div>
                <div>
                <h2>The following resources are waiting for evaluation: </h2>
                {resources.map(resource => (resource.status.status == "To Evaluate" ? 
                    <ul key={resource.id} onMouseOver={()=> setCurrentResourceID(resource.id)}>{resource.original_weight} + " kg of " + {resource.material.title}
                    <button onClick={() => setModalSupplierFeedback(true)}>Evaluate</button>
>>>>>>> ec60f5b41f2aee05ab445d4e3f0f3d98bb3528b4
                    </ul>
                    : null)
                )}
                </div>
<<<<<<< HEAD

                <div class = "halfPanel" id="end">
=======
                <div>
>>>>>>> ec60f5b41f2aee05ab445d4e3f0f3d98bb3528b4
                <h2>Current evaluations</h2>
                {resourceEvaluations.map(evaluation =>
                    <ul key={evaluation.id}> {evaluation.received_at} 
                    ({evaluation.acceptable ? 
                    <b> Resource {evaluation.resourceID} was accepted at {evaluation.received_at}</b> 
                    :
                    <b> Resource {evaluation.resourceID} was returned at {evaluation.received_at}</b>})
                    </ul>
                    )}
                </div>
<<<<<<< HEAD

=======
>>>>>>> ec60f5b41f2aee05ab445d4e3f0f3d98bb3528b4
            </div>
            
            :
            null}

            {/*show product plans*/}

            {showProductPlans ? 
<<<<<<< HEAD
                <div class = "fullPanel">
                <div class = "halfPanel">
                <h2>Assign resources to product plans</h2>
                {resources.map(resource => (resource.status.status == "Accepted" ? 
                    <ul key={resource.id} onMouseOver={()=> setCurrentResourceID(resource.id)}>
                        {resource.remaining_weight} kg of {resource.material.title}
=======
                <div>
                <div>
                <h2>The following resources can be assigned to products</h2>
                {resources.map(resource => (resource.status.status == "Accepted" ? 
                    <ul key={resource.id} onMouseOver={()=> setCurrentResourceID(resource.id)}>
                        {resource.remaining_weight} + " kg of " + {resource.material.title}
>>>>>>> ec60f5b41f2aee05ab445d4e3f0f3d98bb3528b4
                    <button onClick={(e) => setModalProductPlan(true)}>Assign</button>
                    </ul>
                    : null)
                    )}
                </div>
<<<<<<< HEAD
                <div class = "halfPanel" id="end">
                <h2>Current product plans</h2>    
=======
                <div>
>>>>>>> ec60f5b41f2aee05ab445d4e3f0f3d98bb3528b4
                {productPlans.map(plan =>
                    <ul key={plan.id} onMouseOver={()=> setCurrentResourceID(plan.id)}>
                        {plan.estimated_quantity} of {plan.product_type.type} {plan.product_type.title} ({plan.product_type.productCategoryID})
                        ({plan.done} ?
                        <button onClick={() => manageProductPlanCompletion()}> Complete </button>
                        :
                        <b>completed</b>)
                    </ul>
                    )}
                </div>
                </div>
            
            :
            null}
            

            {/*Modal to add new Supplier feedback associated with upcoming evaluation*/}
            <div>
                <Modal
                isOpen={modalSupplierFeedback}
                appElement={document.getElementById('root')}>
                    <h2>New Supplier feedback</h2>
                    <button onClick={() => setModalSupplierFeedback(false)}> Close </button>

                    <input type="text"></input>
                    {/*setCurrentReasoning*/}
                    <label>
                        <button onClick={() => setModalSupplierFeedback(false)}> Close </button>
                            Suppliers
                            <select onChange={(e) => setCurrentSupplierID(e.target.value)}>
                            {suppliers.map( option => 
                            <option key={option.id} value={option.id}>{option.title}</option>)}
                            </select>
                        </label>
                    {/*select supplier and setCurrentSupplierID*/}

                    <button onClick = {e => handleProceed(e)}>Proceed to evaluate</button>
                </Modal>
            </div>
            {/*Modal to add new resource Evaluation*/}
            <div>
                <Modal
                isOpen={modalResourceEvaluation}
                appElement={document.getElementById('root')}>
                    <h2>New Evaluation</h2>
                    <input type="text"></input>
                    <select onChange={(e) => setCurrentAcceptability(e.target.value)}>
                        <option value={true}>Accepted</option>
                        <option value={false}>Returned</option>
                    </select>
                    {/*if current acceptability is false, change resource status to returned. Else change to accepted*/}
                    <label>
                    Comment on the supplier
                    <input type="text" onChange={(e)=>setCurrentReasoning(e.target.value)}></input>
                    </label>
                    <button onClick = {e => addResourceEvaluation(e)}>Submit a new Evaluation</button>
                </Modal>
            </div>

            {/*Modal to add new product plan (show resources with 'accepted' status)*/}
            
            <div>
                <Modal
                isOpen={modalProductPlan}
                appElement={document.getElementById('root')}>
                    <h2>New Product Plan</h2>

                    {/*setCurrentProductType*/}
                    {/*setCurrentEstimatedQuantity*/}
                    {/*setCurrentUsedWeight*/}
                    {/*manipulated remaining weight. If resulting weight is 0, set status to archived*/}
                    <button onClick = {e => addResourceEvaluation(e)}>Add a new Resource</button>
                </Modal>
            </div>

            </div>
        </div>
    )
}

export default Overview;
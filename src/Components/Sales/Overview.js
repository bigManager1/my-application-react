import {useEffect, useState } from "react";
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import Modal, { setAppElement } from 'react-modal';
import "C:/Users/umada/my-application/src/Styling/Main.scss";


function Overview(){

    const url = "https://management-backend-app.herokuapp.com/";

    // loaded values
    const [finalProducts, setFinalProducts] = useState([]);
    const [productPlans, setProductPlans] = useState([]);
    // panels

    const [productOverviewPanel, setProductOverviewPanel] = useState(true);
    const [profitPanel, setProfitPanel] = useState(false);

    async function fetchProductPlans(){

    }

    async function fetchFinalProducts(){
        await axios.get(url+'api/finalProducts')
        .then(result => { 
            setFinalProducts(result.data);
        })
    }
  
    async function addFinalProducts(){
        axios.post(url+'api/finalProducts',{
            availableAmount: 0,
            id: 0,
            productPlanID: 0,
            qualityAmount: 0,
            soldAmount: 0,
            totalAmount: 0,
            unitPrice: 0
        }).then(()=> fetchFinalProducts());
    }

    function archiveResource(){// patch request

        // when resource remaining quantity becomes 0, archive it
        // 
    }

    function handleProductsPanel(){
        setProductOverviewPanel(true);
        setProfitPanel(false);
    }

    function handleProfitPanel(){
        setProfitPanel(true);
        setProductOverviewPanel(false);
    }

    return(

        <div class="main" >
            <div class="selection">
                <button class="selectionButton" onClick = {()=> handleProductsPanel()}>Product overview</button>
                <button class="selectionButton" onClick = {()=> handleProfitPanel()}>Profits overview</button>
                {/*add and look at products - overview*/}
                {/* look at the current status on sales and profit for the resource (only active resources)*/}
                {/* Once a product is sold out, archive the resource  - a function */}
                
            </div>

            <div class="display">

                {productOverviewPanel&&(
                    <div class="fullPanel">
                        <div class="halfPanel">
                            <h2>Finalize plans</h2>
                            {}

                        </div>
                        <div class="halfPanel">
                            <h2>Available products</h2>

                        </div>
                    </div>
                )}

                {profitPanel&&(
                <div class="fullPanel">
                    {/*Product - In Stock - Sold - Revenue (proportional )*/}
                    
                </div>
                )}

            </div>
        </div>
    );
}

export default Overview;
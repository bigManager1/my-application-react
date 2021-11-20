
import { useEffect, useState } from "react";
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import Modal, { setAppElement } from 'react-modal';
import "C:/Users/umada/my-application/src/Styling/Main.scss";

function ManageOptions() {

  const url = "https://management-backend-app.herokuapp.com/";

  // icons
  const plus = <FontAwesomeIcon icon={faPlus} />
  const trash = <FontAwesomeIcon icon={faTrash} />

  // loaded lists
  const [productCategories, setProductCategories] = useState([]);
  const [productTypes, setProductTypes] = useState([]);

  // panels
  const [showProductTypes, setShowProductTypes] = useState(false);
  const [showProductCategories, setShowProductCategories] = useState(false);

  // modal dependencies
  const [modalProductType, setModalProductType] = useState(false);
  const [modalProductCategory, setModalProductCategory] = useState(false);

  // variables
  const [currentProductCategoryID, setCurrentProductCategoryID] = useState(1);
  const [currentType, setCurrentType] = useState("");
  const [currentTitle, setCurrentTitle] = useState("");


  useEffect(() => {
    fetchProductTypes();
    fetchProductCategories();
  }, []);

  async function fetchProductTypes() {
    await axios.get(url+'api/productType')
      .then(result => {
        setProductTypes(result.data);
      })
  }

  async function fetchProductCategories() {
    await axios.get(url+'api/productCategory')
      .then(result => {
        setProductCategories(result.data);
      })
  }


  function addProductType(e) {
    e.preventDefault();
    axios.post(url+'api/productType', {
      id: 0,
      productCategoryID: currentProductCategoryID,
      title: currentTitle,
      type: currentType,
    }).then(() => fetchProductTypes());
    setModalProductType(false);
  }

  async function addProductCategory(e) {
    e.preventDefault();
    axios.post(url+'api/productCategory', {
      id: 0,
      title: currentTitle,
    }).then(() => fetchProductCategories());
    setModalProductCategory(false);
  }

  async function deleteProductType(id) {
    axios.delete(url+'api/productType/' + id)
      .then(() => fetchProductTypes());
  }

  async function deleteProductCategory(id) {
    axios.delete(url+'api/productCategory/' + id)
      .then(() => fetchProductCategories());
  }

  function handleTypes() {
    setShowProductCategories(false);
    setShowProductTypes(true);
  }
  function handleCategories() {
    setShowProductTypes(false);
    setShowProductCategories(true);
  }

  return (
    <div class="main">

      <div class="selection">
        <button class="selectionButton" onClick={() => handleTypes()}>Product Types</button>
        <button class="selectionButton" onClick={() => handleCategories()}>Product Categories</button>
      </div>

      <div class="display">

        {/*type pannel*/}
        
        {showProductTypes ?
          <div id="inner">
            <button onClick={() => setModalProductType(true)}>{plus}</button>
            {productTypes.map(type => <ul key={type.id}>{type.title}
              <button onClick={() => deleteProductType(type.id)}>{trash}</button></ul>)}
            {/*map all, add new, delete*/}
          </div>
          :
          <></>}
        {showProductCategories ?
          <div id="inner">
            <button onClick={() => setModalProductCategory(true)}>{plus}</button>
            {productCategories.map(category => <ul key={category.id}>{category.title}
              <button onClick={() => deleteProductCategory(category.id)}>{trash}</button></ul>)}
            {/*map all, add new, delete*/}
          </div>
          :
          <></>}
      

      {/*Modals*/}
      <div> {/*Type modal*/}
        <Modal
          isOpen={modalProductType}
          appElement={document.getElementById('root')}>
          <h2>New Product type</h2>
          <button onClick={() => setModalProductType(false)}> Close </button>

          <input type="text" placeholder="New Type" onChange={e => setCurrentType(e.target.value)}></input>
          <input type="text" placeholder="New Title" onChange={e => setCurrentTitle(e.target.value)}></input>

          <label>
            Categories
            <select onChange={(e) => setCurrentProductCategoryID(e.target.value)}>
              {productCategories.map(option =>
                <option key={option.id} value={option.id}>{option.title}</option>)}
            </select>
          </label>

          <button onClick={e => addProductType(e)}>Add a new type</button>
        </Modal>
      </div>

      <div> {/*Category modal*/}
        <Modal
          isOpen={modalProductCategory}
          appElement={document.getElementById('root')}>
          <h2>New Product Category</h2>
          <button onClick={() => setModalProductCategory(false)}> Close </button>

          <input type="text" placeholder="New Title" onChange={e => setCurrentTitle(e.target.value)}></input>

          <button onClick={e => addProductCategory(e)}>Add a new category</button>
        </Modal>
      </div>

      </div>
    </div>
  );
}

export default ManageOptions;
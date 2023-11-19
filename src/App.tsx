import { useState } from "react";
import ProductCard from "./components/ProductCard";
import Button from "./components/UI/Button";
import Modal from "./components/UI/Modal";
import { productList, formInputsList } from "./data"
import Input from "./components/UI/Input";

const renderProductList =
  productList.map((product, idx) => {
    return <ProductCard
      key={product.id}
      product={product}
      //setProductToEdit={setProductToEdit}
      //openEditModal={openEditModal}
      idx={idx}
    //setProductToEditIdx={setProductToEditIdx}
    //openConfirmModal={openConfirmModal}
    />
  })

const renderFormInputList = formInputsList.map((input) => {
  return (
    <div className="flex flex-col" key={input.id} >
      <label htmlFor={input.id} className="mb-[2px] text-sm font-medium text-gray-700">
        {input.label}
      </label>
      <Input type="text" id={input.id} name={input.name} />
    </div>
  )
})


const App = () => {
  /* ------- States -------  */
  const [isOpen, setIsOpen] = useState(false)

  /* ------- HANDLER -------  */
  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);


  return (
    <main className="container">
      <Button
        className="block bg-indigo-700 hover:bg-indigo-800 mx-auto my-10 px-10 font-medium"
        onClick={openModal}
        width="w-fit"
      >
        Build a Product
      </Button>
      <div className="m-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-4 p-2 rounded-md">
        {renderProductList}
      </div>;

      <Modal isOpen={isOpen} closeModal={closeModal} title="ADD NEW PRODUCT">
        <form className="space-y-3">
        {renderFormInputList}

        <div className="flex items-center space-x-3">
          <Button className="bg-indigo-700 hover:bg-indigo-800">Submit</Button>
          <Button type="button" className="bg-[#f5f5fa] hover:bg-gray-300 !text-black" >
            Cancel
          </Button>
        </div>
        </form>
      </Modal>

    </main>
  )
};

export default App;

import { ChangeEvent, useState } from "react";
import ProductCard from "./components/ProductCard";
import Button from "./components/UI/Button";
import Modal from "./components/UI/Modal";
import { productList, formInputsList } from "./data"
import Input from "./components/UI/Input";
import { IProduct } from "./interfaces";
import { productValidation } from "./validation";
import ErrorMessage from "./components/ErrorMesagge";

// Constnants 
const defaultProduct = {
  title: "",
  description: "",
  price: "",
  imageURL: "",
  colors: [],
  category: {
    name: "",
    imageURL: ""
  }
}


const App = () => {
  /* ------- States -------  */
  const [product, setProduct] = useState<IProduct>(defaultProduct)
  const [errors, setErrors] = useState({ title: "", description: "", imageURL: "", price: "" });
  const [isOpen, setIsOpen] = useState(false)

  /* ------- HANDLER -------  */
  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);
  const onCancel = () => {
    setProduct(defaultProduct);
    closeModal();
  }
  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setProduct({
      ...product,
      [name]: value
    });

    setErrors({
      ...errors,
      [name]: ''
    })
  }

  const submitHandler = (event: ChangeEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const { title, description, price, imageURL } = product;

    const errors = productValidation({
      title,
      description,
      price,
      imageURL,
    });

    console.log(errors);

    const hasErrorMsg = Object.values(errors).some(value => value === "") && Object.values(errors).every(value => value === "");
    if (!hasErrorMsg) {
      setErrors(errors)
      return;
    }

    console.log("The Submit was successed")
  }

  /* ------- Render -------  */
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
        <Input type="text" id={input.id} name={input.name} value={product[input.name]} onChange={onChangeHandler} />
        <ErrorMessage msg={errors[input.name]} />
      </div>
    )
  })


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
        <form className="space-y-3" onSubmit={submitHandler}>
          {renderFormInputList}

          <div className="flex items-center space-x-3">
            <Button className="bg-indigo-700 hover:bg-indigo-800">Submit</Button>
            <Button type="button" className="bg-[#f5f5fa] hover:bg-gray-300 !text-black" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </form>
      </Modal>

    </main>
  )
};

export default App;

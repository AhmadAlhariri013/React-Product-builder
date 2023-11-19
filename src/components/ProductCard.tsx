import { IProduct } from "../interfaces";
import Image from "./Image";
import Button from "./UI/Button";
import { txtSlicer } from "../utils/functions";
import CircleColor from "./CircleColor";



interface IProps {
  product: IProduct;
  //setProductToEdit: (product: IProduct) => void;
  //openEditModal: () => void;
  idx: number;
  //setProductToEditIdx: (value: number) => void;
  //openConfirmModal: () => void;
}

const ProductCard = ({
  product,
  //setProductToEdit,
  //openEditModal,
  //idx,
  //setProductToEditIdx,
  // openConfirmModal,
}: IProps) => {
  const { title, description, imageURL, //price, 
    colors, category
  } = product;

  /* ------- RENDER -------  */
  const renderProductColors = colors.map(color => <CircleColor key={color} color={color} />);

  // The main container of the card
  return <div className="max-w-sm md:max-w-lg mx-auto md:mx-0 border rounded-md p-2 flex flex-col space-y-3">

    {/* Start the Image of the card */}
    <Image imgURL={imageURL} alt={"Product Name"} className="rounded-md h-52 w-full lg:object-cover" />
    {/* End the Image of the card */}

    {/* Start the Content of the card */}
    <div>
      <h3 className="text-lg font-semibold">{txtSlicer(title, 25)}</h3>
      <p className="text-sm text-gray-500 break-words">{txtSlicer(description)}</p>
    </div>
    {/* End the Content of the card */}

    {/* Start the Footer of the card */}
    <div className="flex items-center flex-wrap space-x-1">
      {!colors.length ? <p className="min-h-[20px]">Not available colors!</p> : renderProductColors}
    </div>

    <div className="flex items-center justify-between">
      <span className="text-lg text-indigo-600 font-semibold">${ }</span>
      <div className="flex items-center space-x-2">
        <span className="text-xs font-semibold">{category.name}</span>
        <Image imgURL={imageURL} alt={"Product Name"} className="h-10 w-10 rounded-full object-center" />
      </div>
    </div>


    <div className="flex items-center justify-between space-x-2">
      <Button className="bg-indigo-700 hover:bg-indigo-800" >
        Edit
      </Button>
      <Button className="bg-[#c2344d] hover:bg-red-800" >
        Remove
      </Button>
    </div>
    {/* End the Footer of the card */}




  </div>;
};

export default ProductCard;

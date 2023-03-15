import "./App.css";
import Card from "./components/Card";
import { useEffect, useState } from "react";
function App() {
  const [product, setProduct] = useState([]);
  let [productItems, setProductItems] = useState([]);
  let [searchValue, setSearchValue] = useState("");
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);
  const tryData = async () => {
    const response = await fetch("https://dummyjson.com/products");
    const data = await response.json();
    let dt = data.products;
    setProduct(dt);
    console.log(dt.thumbnail);
  };
  let addTobasket = ({ thumbnail }) => {
    let existingProduct = productItems.find((p) => p.thumbnail === thumbnail);
    if (existingProduct) {
      let updatedProduct = {
        ...existingProduct,
        countt: existingProduct.countt + 1,
      };
      let otherProducts = productItems.filter((p) => p.thumbnail !== thumbnail);
      setProductItems([...otherProducts, updatedProduct]);
    } else {
      setProductItems([...productItems, { thumbnail, countt: 1 }]);
    }
  };

  let filterItems = product.filter(
    (item) => item.title.toLowerCase().indexOf(searchValue.toLowerCase()) >= 0
  );
  useEffect(() => {
    tryData();
  }, []);

  return (
    <>
      <div className="w-[70%]  container min-h-screen mx-auto p-3 grid gap-y-10  ">
        <form className="flex w-full">
          <label className="flex md:justify-center block space-x-5 w-full ">
            <span className=" text-xl font-medium text-slate-700 ">
              Search Product
            </span>
            <input
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Please enter the product.."
              type="text"
              name="search"
              className="inline-block lg:flex sm:hidden border border-slate-300 rounded-md rounded-lg w-1/2	h-8 py-2 pl-9 pr-3  sm:text-sm placeholder:italic border-slate-200 placeholder-slate-400 contrast-more:border-slate-400 contrast-more:placeholder-slate-500"
            />{" "}
            <button
              className="inline-block lg:flex sm:hidden text-white bg-blue-700  rounded-lg px-4 py-2 mr-2 mb-2"
              type="button"
              data-drawer-target="drawer-example"
              data-drawer-show="drawer-example"
              aria-controls="drawer-example"
            >
              Clear
            </button>
            <button
              onClick={toggle}
              className="text-white bg-blue-700  rounded-lg px-4 py-2 mr-2 mb-2 relative"
              type="button"
              data-drawer-target="drawer-example"
              data-drawer-show="drawer-example"
              aria-controls="drawer-example"
            >
              Basket
              <span class="inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full absolute top-0 -top-3  right-0 dark:border-gray-900">
                {productItems.length}
              </span>
            </button>
          </label>
        </form>
        <div className="grid gap-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
          {filterItems
            .slice(0, 15)
            .map(({ id, title, images, description, thumbnail }) => (
              <Card
                key={id}
                content={description.slice(0, 15)}
                title={title.slice(0, 8)}
                image={thumbnail}
                onAdd={() => addTobasket({ thumbnail, countt: 1 })}
              />
            ))}
        </div>
        {/*DRAWER */}

        {/* <div className="grid gap-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
          {productItems.map(({ title }, index) => (
            <p key={index}>{title}</p>
          ))}
        </div> */}

        <div
          style={{
            position: "fixed",
            top: "0px",
            left: "0px",
          }}
          className={`xl:1/5 lg:w-1/5 md:w-2/5 sm:w-full boxDrawer bg-white drop-shadow-2xl h-[100vh] ${
            isOpen ? "hidden" : ""
          }`}
          tabindex="-1"
          aria-labelledby="drawer-label"
          autoFocus={isOpen}
        >
          {isOpen ? null : (
            <>
              <div className="flex justify-around ">
                <span className="inline-block font-bold">Your Basket</span>
                <button
                  onClick={toggle}
                  type="button"
                  className="ml-auto  bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
                  data-dismiss-target="#toast-default"
                  aria-label="Close"
                >
                  <span class="sr-only">Close</span>
                  <svg
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </button>
              </div>
              <div className="">
                {productItems.map(({ title, thumbnail, countt }, index) => (
                  <p key={index} className="top-5">
                    <img
                      className="inline-block  rounded-full w-[50px] h-[50px] "
                      src={thumbnail}
                      alt=""
                    />
                    -
                    <span className="inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-blue-500 border-2 rounded-full dark:border-gray-900">
                      {countt}
                    </span>
                  </p>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default App;

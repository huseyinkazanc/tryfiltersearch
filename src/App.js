import "./App.css";
import Card from "./components/Card";
import { useEffect, useState } from "react";
function App() {
  const [product, setProduct] = useState([]);
  let [productItems, setProductItems] = useState([]);
  let [searchValue, setSearchValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const tryData = async () => {
    const response = await fetch("https://dummyjson.com/products");
    const data = await response.json();
    let dt = data.products;
    setProduct(dt);
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
              className="text-white bg-blue-700  rounded-lg px-4 py-2 mr-2 mb-2"
              type="button"
              data-drawer-target="drawer-example"
              data-drawer-show="drawer-example"
              aria-controls="drawer-example"
            >
              Basket
            </button>
          </label>
        </form>
        <div className="grid gap-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
          {filterItems
            .slice(0, 15)
            .map(({ id, title, description, thumbnail }) => (
              <Card
                key={id}
                content={description.slice(0, 15)}
                title={title.slice(0, 8)}
                image={thumbnail}
                onAdd={() => setProductItems([...productItems, { title }])}
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
          className={` lg:w-1/5 md:w-1/2 sm:w-full boxDrawer bg-zinc-300 drop-shadow-2xl h-[100vh] ${
            isOpen ? "hidden" : ""
          }`}
          tabindex="-1"
          aria-labelledby="drawer-label"
        >
          {isOpen ? null : (
            <>
              <div className="flex justify-around">
                <span className="inline-block">Your Basket</span>
                <button className="inline-block font-bold" onClick={toggle}>
                  X
                </button>
              </div>
              {productItems.map(({ title }, index) => (
                <p key={index}>{title}</p>
              ))}
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default App;

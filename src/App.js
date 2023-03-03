import "./App.css";
import Card from "./components/Card";
import { useEffect, useState } from "react";
function App() {
  const [product, setProduct] = useState([]);
  const tryData = async () => {
    const response = await fetch("https://dummyjson.com/products");
    const data = await response.json();
    let dt = data.products;
    setProduct(dt);
  };
  useEffect(() => {
    tryData();
  }, []);

  let [productItems, setProductItems] = useState([]);
  let [searchValue, setsearchValue] = useState("");
  let filterItems = product.filter(
    (item) => item.title.toLowerCase().indexOf(searchValue.toLowerCase()) >= 0
  );

  return (
    <>
      <div className="w-[70%]  container min-h-screen mx-auto p-3 grid gap-y-10  ">
        <form>
          <label className="block space-x-5">
            <span className=" text-xl font-medium text-slate-700 ">
              Search Product
            </span>
            <input
              onChange={(e) => setsearchValue(e.target.value)}
              placeholder="Please enter the product.."
              type="text"
              name="search"
              className="border border-slate-300 rounded-md rounded-lg w-1/2	h-8 py-2 pl-9 pr-3  sm:text-sm placeholder:italic border-slate-200 placeholder-slate-400 contrast-more:border-slate-400 contrast-more:placeholder-slate-500"
            />
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

        {/* <div className="grid gap-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
          {productItems.map(({ title }, index) => (
            <p key={index}>{title}</p>
          ))}
        </div> */}
      </div>
    </>
  );
}

export default App;

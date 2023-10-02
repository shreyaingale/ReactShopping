import { useEffect, useState } from "react";

export default function Shopping() {
  const [categories, setcategories] = useState([]);
  const [products, setproduct] = useState([]);
  const [cartItem, setcartItem] = useState([]);
  const [itemcount, setitemCount] = useState([0]);

  function loadCategories() {
    fetch("https://fakestoreapi.com/products/categories")
      .then((responce) => responce.json())
      .then((data) => {
        data.unshift("All"); //to add another element in array use unshift method
        setcategories(data);
      });
  }

  function loadproduct(url) {
    fetch(url)
      .then((responce) => responce.json())
      .then((data) => {
        //to add another element in array use unshift method
        setproduct(data);
      });
  }

  function handleChangeCategory(e) {
    if (e.target.value === "All") {
      loadproduct("https://fakestoreapi.com/products");
    } else {
      loadproduct(
        `https://fakestoreapi.com/products/category/${e.target.value}`
      );
    }
  }

  function handleAddTocart(e) {
    fetch(`https://fakestoreapi.com/products/${e.target.id}`)
      .then((responce) => responce.json())
      .then((data) => {
        cartItem.push(data);
        GetcartItemCount();
      });
    alert("Item added to cart");
  }

  function GetcartItemCount() {
    setitemCount(cartItem.length);
  }

  function deleteItem(e) {
    fetch(`https://fakestoreapi.com/products/${e.target.id}`)
      .then((responce) => responce.json())
      .then((data) => {
        cartItem.pop(data);
        GetcartItemCount();
      });
  }

  function TotalPrice() {
    let totalPrice = 0;

    // Iterate through the cart items and sum up their prices
    cartItem.forEach((item) => {
      totalPrice += item.price;
    });

    return totalPrice;
  }

  function deleteAllitem() {
    setcartItem([]);
    alert("delete all");
  }

  useEffect(() => {
    loadCategories();
    loadproduct("https://fakestoreapi.com/products"); //this method use to access data & store in data object
  }, [cartItem.length]);

  return (
    <div className="container-fluid">
      <header className="bg-danger text-white p-2 text-center">
        <h1>
          <span className="bi bi-cart align-center"></span>
          QuickCart
        </h1>
      </header>
      <section className="row mt-3">
        <nav className="col-2">
          <div>
            <p>select a category</p>
            <select onClick={handleChangeCategory} className="form-select">
              {categories.map(
                (
                  category //map function use to for interation of array
                ) => (
                  //method that fetch API of array
                  <option value={category} key={category}>
                    {category}
                  </option>
                )
              )}
            </select>
          </div>
        </nav>
        <main
          className="col-6 d-flex flex-wrap overflow-auto"
          style={{ height: "600px" }}
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="card m-2 p-2 w-25"
              style={{ width: "200px" }}
            >
              <img
                key={product.img}
                src={product.image}
                className="card-img-top"
                height="150"
              />
              <div className="card-header" style={{ height: "160px" }}>
                <p>{product.title}</p>
              </div>
              <div className="card-body">
                <dl>
                  <dt>price</dt>
                  <dd>{product.price}</dd>
                  <dt>Rating</dt>
                  <dd>
                    <span className="bi bi-start-fill text-success "></span>
                    {product.rating.rate}
                    <span>[{product.rating.count}]</span>
                  </dd>
                </dl>
              </div>
              <div className="card-footer">
                <button
                  id={product.id}
                  onClick={handleAddTocart}
                  className="btn btn-danger w-100"
                >
                  <span className="bi bi-cart4"> </span> Add to cart
                </button>
              </div>
            </div>
          ))}
        </main>

        <aside className="col-4 ">
          <button className="btn btn-warning w-100">
            <span className="bi bi-cart"></span> [{itemcount}] Add to cart
          </button>
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Title</th>
                <th>Price</th>
                <th>Preview</th>
                <th>
                  <button onClick={deleteAllitem} className="btn btn-danger">
                    <span className="bi bi-trash-fill"></span> All
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              {cartItem.map((item) => (
                <tr key={item.id}>
                  <td>{item.title}</td>
                  <td>{item.price}</td>
                  <td>
                    <img src={item.image} width="50" height="50" />
                  </td>
                  <td>
                    <button
                      price={item.price}
                      id={item.id}
                      onClick={deleteItem}
                      className="btn btn-danger"
                    >
                      <span className="bi bi-trash3"></span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <th>Total:</th>
                <th> ${TotalPrice()}</th>
                <th>
                  <button className="btn btn-warning w-40">Buy</button>
                </th>
              </tr>
            </tfoot>
          </table>
        </aside>
      </section>
    </div>
  );
}
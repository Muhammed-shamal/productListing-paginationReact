import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai";
import { IconContext } from "react-icons";
import "./table.css";

function Table() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [filterData, setFilterData] = useState([]);
  const [sortBy, setSortBy] = useState(""); // Sort by price or category
  const [categoryFilter, setCategoryFilter] = useState(""); // Filter by category
  const n = 3;

  useEffect(() => {
    fetch("https://fakestoreapi.com/products") // Increase the limit to fetch more products
      .then((res) => res.json())
      .then((json) => {
        setProducts(json);
        console.log(json);

        //sometime bro smile please !
        //setFilterData(json.slice(0, n)); // Initialize filterData with all products
      });
  }, []);

  //   useEffect(() => {
  //     setFilterData(
  //       products.filter((item, index) => {
  //         return (index >= page * n) & (index < (page + 1) * n);
  //       })
  //     );

  //     console.log(filterData);
  //   }, [page]);

  useEffect(() => {
    const startIndex = page * n;
    const endIndex = startIndex + n;
    const filteredProducts = products
      .filter((item) => !categoryFilter || item.category === categoryFilter)
      .sort((a, b) => {
        if (sortBy === "price") {
          return a.price - b.price;
        } else if (sortBy === "category") {
          return a.category.localeCompare(b.category);
        }
        return 0;
      });

    setFilterData(filteredProducts.slice(startIndex, endIndex));
  }, [page, products, sortBy, categoryFilter]);

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategoryFilter(e.target.value);
  };

  // we can add some uniqe here;

  const uniqueCategories = [
    ...new Set(products.map((product) => product.category)),
  ];

  uniqueCategories.map((value, index) => console.log(value));
  return (
    <section>
      <div className="container mt-5">
        <div className="filter-options">
          <select
            onChange={handleSortChange}
            className="form-select"
            style={{ cursor: "pointer" }}
            value={sortBy}
          >
            <option value="">Sort By</option>
            <option value="price">Price</option>
            <option value="category">Category</option>
          </select>
          <select
            style={{ cursor: "pointer" }}
            onChange={handleCategoryChange}
            className="mt-3 form-select"
            value={categoryFilter}
          >
            <option value="">All Categories</option>
            {uniqueCategories.map((product) => (
              <option key={product} value={product}>
                {product}
              </option>
            ))}
          </select>
        </div>
        <table className="table mt-5">
          <thead>
            <tr>
              <th scope="col">No</th>
              <th scope="col">Title</th>
              <th scope="col">Price</th>
              <th scope="col">Category</th>
              <th scope="col">Description</th>
              <th scope="col">Image</th>
            </tr>
          </thead>
          <tbody>
            {filterData &&
              filterData.map((value, index) => (
                <tr key={value.id}>
                  <th scope="row">{value.id + 1}</th>
                  <td>{value.title}</td>
                  <td>${value.price}</td>
                  <td>{value.category}</td>
                  <td>{value.description}</td>
                  <td>
                    <img
                      src={value.image}
                      style={{ width: "50px", height: "50px" }}
                      alt="product-img"
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        <ReactPaginate
          containerClassName={"pagination"}
          pageClassName={"page-item"}
          activeClassName={"active"}
          onPageChange={(event) => setPage(event.selected)}
          pageCount={Math.ceil(products.length / n)}
          breakLabel="..."
          previousLabel={
            <IconContext.Provider value={{ color: "#B8C1CC", size: "36px" }}>
              <AiFillLeftCircle />
            </IconContext.Provider>
          }
          nextLabel={
            <IconContext.Provider value={{ color: "#B8C1CC", size: "36px" }}>
              <AiFillRightCircle />
            </IconContext.Provider>
          }
        />
      </div>
    </section>
  );
}

export default Table;

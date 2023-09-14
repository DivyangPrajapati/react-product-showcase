import { useEffect, useState } from "react";
import { NavLink, Outlet, Link } from "react-router-dom";
import { formatString } from "./strUtils";

export default function Layout() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("https://dummyjson.com/products/categories")
      .then((res) => res.json())
      .then((categories) => setCategories(categories));
  }, []);

  return (
    <>
      <aside className="app-aside">
        <div className="app-brand">
          <h2 className="mb-0"><Link to="/" className="text-white">React App</Link></h2>
        </div>
        <div className="app-navigation">
          <ul>
            <li><NavLink to={`/shop/`}>All Products</NavLink></li>
            {categories.map((category) => (
              <li key={category}>
                <NavLink to={`/shop/${category}`}>{formatString(category)}</NavLink>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      <main className="app-main">
        <div className="container-fluid p-lg-4 main-container">
          <div className="main-content p-4">
            <Outlet />
          </div>
        </div>
      </main>
    </>
  );
}

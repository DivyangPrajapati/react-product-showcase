import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { formatString } from './strUtils';

export default function Shop(props) {
  const [search, setSearch] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadedItems, setLoadedItems] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const limit = 12;

  let { category } = useParams();

  useEffect(() => {    
    let productsApi = !category ? 'https://dummyjson.com/products' : `https://dummyjson.com/products/category/${category}`;
    productsApi = productsApi + '?limit=' + limit;

    fetch(productsApi)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setLoadedItems(lastLoaded => lastLoaded + limit);
      });
  }, [category]);

  // Add a scroll event listener to trigger loading more products
  useEffect(() => {
    const handleScroll = () => {
      if (
        (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) && hasMore
        //window.innerHeight + window.scrollY >= document.body.offsetHeight - 200 && products.length > 0
      ) {
        if( !loading ) {
          setLoading(true);
          let productsApi;
          if( search ) {
            productsApi = `https://dummyjson.com/products/search?limit=${limit}&q=${search}`;
          } else {
            productsApi = !category ? 'https://dummyjson.com/products' : `https://dummyjson.com/products/category/${category}`;
            productsApi = productsApi + '?limit=' + limit;
          }

          productsApi = `${productsApi}&skip=${loadedItems}`;console.log(productsApi);
        
          fetch(productsApi)
            .then((res) => res.json())
            .then((data) => {
              if( data.products.length === 0 ) {
                setHasMore(false);
              }
              setLoadedItems(lastLoaded => lastLoaded + limit);
              setProducts(prevProducts => [...prevProducts, ...data.products]);
              setLoading(false);
            });
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [products, category, search, loading, loadedItems, hasMore]);

  const handleSearch = (e) => {
    let searchVal = e.target.value;
    setSearch(searchVal);

    let productsApi = `https://dummyjson.com/products/search?limit=${limit}&q=${searchVal}`;
    fetch(productsApi)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products)
        //setLoadedItems(data.limit)
      });
  }
  
  return (
    <div>
      <h2 className='mb-4'>{category ? formatString(category) : 'Shop'}</h2>

      <form className='mb-4'>
        <input 
          type="text" 
          name="search" 
          className='form-control'
          placeholder="search products..." 
          onChange={e => handleSearch(e) } 
          value={search}
        />
      </form>

      <div className="products-list">
        <div className="row g-3">
            { products.length ? (
              products.map( (product) => (
                <div className="col-lg-3 col-md-4 col-sm-6" key={product.id}>
                  <div className="card product-card">
                    <img src={product.thumbnail} className="card-img-top" alt={product.title} loading="lazy"/>
                    <div className="card-body">
                      <h5 className="card-title mb-3">{product.title}</h5>
                      <p className="card-text product-categories">
                        <Link to={`/shop/${product.category}`}><small>{formatString(product.category)}</small></Link>
                      </p>
                      <Link to={`/product/${product.id}`} className="btn btn-secondary">View Product</Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <h4 className='text-center'>No Products</h4>
            )}
        </div>
      </div>

      { loading && <p className='text-center'>Loading ...</p>}
    </div>
  )
}


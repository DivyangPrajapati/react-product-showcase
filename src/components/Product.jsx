import React, { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom';
import { formatString } from './strUtils';

export default function Product() {
    const { productId } = useParams();
    const [product, setProduct] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`https://dummyjson.com/products/${productId}`)
                    .then(res => res.json());

                if (response.hasOwnProperty('message') && response.message !== null) {
                    console.error('Error fetching product:', response.message);
                    return;
                }
                setProduct(response);
            } catch (error) {
                console.log(error);
            }
        };

        fetchProduct();
    }, [productId]);

    const productIsEmpty = Object.keys(product).length === 0;

    return (
        <div>
            {!productIsEmpty ? (
                <div className='row'>
                    <div className="col-md-6">
                        <div className='product-slider'>
                            <div id="carouselExample" className="carousel slide">
                                <div className="carousel-inner">
                                    {product.images.map((img, index) => (
                                        <div className={'carousel-item ' + (index === 0 ? 'active' : '')} key={index}>
                                            <img src={img} className="d-block w-100" alt="..." />
                                        </div>
                                    ))}
                                </div>
                                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Previous</span>
                                </button>
                                <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Next</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <h2 className='mb-4'>{product.title}</h2>
                        <p className='mb-4'><small><Link to={`/shop/${product.category}`}>{formatString(product.category)}</Link></small></p>
                        <p>{product.description}</p>

                        <button className='mt-5 btn btn-secondary' onClick={() => navigate(-1)}>Go back</button>
                    </div>
                </div>
            ) : (<p>Not Found</p>)}
        </div>
    )
}

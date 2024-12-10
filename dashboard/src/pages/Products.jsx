import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import './Products.css';
import ShopNavbar from './ShopNavbar'; // Assuming Navbar is correctly implemented
import Billing from '../pages/Billing';

const Products = () => {
    const [view, setView] = useState('shop');
    const [products, setProducts] = useState([]);
    const [transactionMode, setTransactionMode] = useState('creditCard');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [values, setValues] = useState({
        debitAccount: '',
        creditAccount: '',
        amount: ''
    });

    useEffect(() => {
        // Get products from localStorage on initial load
        fetchProducts();
    }, []);

    // Fetch products from localStorage (instead of axios)
    const fetchProducts = () => {
        const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
        setProducts(storedProducts);
    };

    const handleTransactionModeChange = (event) => {
        setTransactionMode(event.target.value);
    };

    const handleBillingChange = (e) => {
        const { name, value } = e.target;
        setValues((prev) => ({
            ...prev,
            [name]: value
        }));
        setValues((prev) => ({
            ...prev,
            amount: 0 // No cart total now, so amount is set to 0
        }));
    };

    const handleBillingSubmit = () => {
        try {
            const debit = values.debitAccount;
            const credit = values.creditAccount;
            const amount = 0; // No cart total now

            alert('Payment successful!');
            setView('shop');
        } catch (error) {
            console.error('Error submitting payment:', error);
        }
    };

    const categories = ['All', 'Anime', 'Action', 'Horror'];

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
    };

    const filteredValues = selectedCategory === 'All' ? products : products.filter(product => product.category === selectedCategory);

    return (
        <div className="app-container">
            <ShopNavbar />
            <nav className="navbar">
                {/* No buttons for cart or checkout since we're not managing a cart anymore */}
            </nav>

            <div className="category-list">
                {categories.map(category => (
                    <Button
                        key={category}
                        variant={selectedCategory === category ? 'contained' : 'outlined'}
                        onClick={() => handleCategoryChange(category)}
                        sx={{ marginRight: '10px', marginBottom: '10px' }}
                    >
                        {category}
                    </Button>
                ))}
            </div>

            {view === 'shop' && (
                <div className="shop-container">
                    <h2>Products</h2>
                    <div className="products-list">
                        {filteredValues.map((product) => (
                            <div key={product._id} className="product-card">
                                <img src={product.image} alt={product.name} />
                                <h3>{product.name}</h3>
                                <p>{product.description}</p>
                               
                                {/* No Add to Cart button */}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {view === 'billing' && (
                <Billing
                    transactionMode={transactionMode}
                    billingDetails={values}
                    handleTransactionModeChange={handleTransactionModeChange}
                    handleBillingChange={handleBillingChange}
                    handleBillingSubmit={handleBillingSubmit}
                    getTotalPrice={() => 0} // No total price calculation needed
                />
            )}
        </div>
    );
};

export default Products;

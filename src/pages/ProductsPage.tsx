import React from 'react';
import { ProductList, ProductSearch } from '../components';

const ProductsPage: React.FC = () => {
  return (
    <div className="products-page">
      <h1>База продуктов</h1>
      <ProductSearch />
      <ProductList />
    </div>
  );
};

export default ProductsPage;
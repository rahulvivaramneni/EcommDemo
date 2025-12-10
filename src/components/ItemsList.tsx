import React, { useState, useMemo } from "react";
import { useCart } from "../contexts/CartContext";
import { mockData, Product } from "../mocks/mockData";

const ITEMS_PER_PAGE = 10;

const ItemsList: React.FC = () => {
  const { addToCart } = useCart();
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(mockData.length / ITEMS_PER_PAGE);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return mockData.slice(startIndex, endIndex);
  }, [currentPage]);

  const handleQuantityChange = (name: string, change: number) => {
    setQuantities((prev) => {
      const currentQuantity = prev[name] || 1;
      const newQuantity = currentQuantity + change;
      const product = mockData.find((item) => item.name === name);

      if (newQuantity < 1) return prev;
      if (product && newQuantity > product.availableQuantity) return prev;

      return { ...prev, [name]: newQuantity };
    });
  };

  const handleAddToCart = (item: Product) => {
    const quantity = quantities[item.name] || 1;
    addToCart({
      name: item.name,
      quantity: quantity,
      desc: item.desc,
    });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <h1>Products</h1>
      <table className="products-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Available Quantity</th>
            <th>Quantity</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((item) => {
            const quantity = quantities[item.name] || 1;
            return (
              <tr key={item.name}>
                <td>{item.name}</td>
                <td>{item.desc}</td>
                <td>{item.availableQuantity}</td>
                <td>
                  <div className="quantity-controls">
                    <button onClick={() => handleQuantityChange(item.name, -1)}>
                      -
                    </button>
                    <span>{quantity}</span>
                    <button onClick={() => handleQuantityChange(item.name, 1)}>
                      +
                    </button>
                  </div>
                </td>
                <td>
                  <button onClick={() => handleAddToCart(item)}>
                    Add to Cart
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ItemsList;

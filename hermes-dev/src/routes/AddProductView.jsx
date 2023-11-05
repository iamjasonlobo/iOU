import React, { useState } from 'react';

// Modify these categories to be more suitable for products
const productCategories = [
  { id: 'electronics', name: 'Electronics', subcategories: ['Laptops', 'Mobile Phones', 'Accessories'] },
  { id: 'books', name: 'Books', subcategories: ['Textbooks', 'Novels', 'Magazines'] },
  { id: 'clothing', name: 'Clothing', subcategories: ['Men', 'Women', 'Children'] },
  { id: 'other', name: 'Other', subcategories: ['Other'] },
];

const AddProductView = () => {
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [productSubcategory, setProductSubcategory] = useState('');
  const [points, setPoints] = useState('');
  const [pointsError, setPointsError] = useState('');
  const [productPhoto, setProductPhoto] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Final check if points are not in denomination of 5
    if (points % 5 !== 0) {
      setPointsError('Points must be in denominations of 5.');
      return;
    }
    setPointsError('');
    // Handle the form submission for the product
    console.log({
      productName,
      productDescription,
      productCategory,
      productSubcategory,
      points,
      productPhoto,
    });
    // Here you would typically handle the product submission to the backend
  };

  const handleCategoryChange = (e) => {
    const newCategory = e.target.value;
    setProductCategory(newCategory);
    setProductSubcategory(newCategory === 'other' ? 'Other' : '');
  };

  const handlePointsChange = (e) => {
    const value = Number(e.target.value);
    setPoints(value); // Always update the input with the user's value
  };

  const handlePointsBlur = () => {
    // Validate the points when the user leaves the textbox
    if (points % 5 !== 0 && points !== '') {
      setPointsError('Points must be in denominations of 5.');
    } else {
      setPointsError('');
    }
  };

  const renderSubcategories = () => {
    const selectedCategory = productCategories.find(c => c.id === productCategory);
    return selectedCategory ? selectedCategory.subcategories.map((sub) => (
      <option key={sub} value={sub}>{sub}</option>
    )) : null;
  };

  return (
    <div>
      <h1>Add Your Product</h1>
      <img src="https://shimmering-stardust-c75334.netlify.app/assets/crewmates.43d07b24.png" className="small-img" alt="Crewmate" />
      <div className='form-container'>
      <form onSubmit={handleSubmit}>
          <div>
            <label>Product Name:</label>
            <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} required />
          </div>
          <div>
            <label>Description:</label>
            <textarea
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
              maxLength={200}
              required
            />
          </div>
          <div>
            <label>Photo Upload:</label>
            <input type="file" onChange={(e) => setProductPhoto(e.target.files[0])} required />
          </div>
          <div>
            <label>Category:</label>
            <select value={productCategory} onChange={handleCategoryChange} required>
              <option value="">Select a category</option>
              {productCategories.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label>Subcategory:</label>
            <select value={productSubcategory} onChange={(e) => setProductSubcategory(e.target.value)} required disabled={!productCategory}>
              <option value="">Select a subcategory</option>
              {renderSubcategories()}
            </select>
          </div>
          <div>
            <label>Points:</label>
            <input
              type="number"
              value={points}
              onChange={handlePointsChange}
              onBlur={handlePointsBlur} // Added to validate points on blur
              step="5"
              min="5"
              required
            />
            {pointsError && <p style={{ color: 'red' }}>{pointsError}</p>}
          </div>
          <button type="submit">Submit</button>
      </form>
      </div>
    </div>
  );
};

export default AddProductView;

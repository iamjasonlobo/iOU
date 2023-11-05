import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import { Auth } from 'aws-amplify';


const categories = [
  { id: 'tutoring', name: 'Tutoring', subcategories: ['Math', 'Science', 'English', 'History'] },
  { id: 'techSupport', name: 'Tech Support', subcategories: ['Computer Repair', 'Software Installation', 'IT Consulting'] },
  { id: 'artDesign', name: 'Art & Design', subcategories: ['Graphic Design', 'Photography', 'Illustration'] },
  { id: 'writingEditing', name: 'Writing & Editing', subcategories: ['Editing Services', 'Creative Writing', 'Technical Writing'] },
  { id: 'careerServices', name: 'Career Services', subcategories: ['Resume Writing', 'Interview Prep', 'Internship Search'] },
  { id: 'personalFitness', name: 'Personal Fitness', subcategories: ['Personal Training', 'Yoga Instruction', 'Nutrition Planning'] },
  { id: 'entertainment', name: 'Entertainment', subcategories: ['DJ Services', 'Live Music', 'Event Planning'] },
  { id: 'householdChores', name: 'Household Chores', subcategories: ['Cleaning', 'Laundry', 'Grocery Shopping'] },
  { id: 'transportation', name: 'Transportation', subcategories: ['Rideshare', 'Moving Assistance', 'Delivery Services'] },
  { id: 'tutoringLanguages', name: 'Language Tutoring', subcategories: ['Spanish', 'French', 'Mandarin'] },
  { id: 'beautyWellness', name: 'Beauty & Wellness', subcategories: ['Hair Styling', 'Makeup Artists', 'Massage Therapy'] },
  { id: 'academicResearch', name: 'Academic Research', subcategories: ['Data Analysis', 'Literature Review', 'Statistical Consultation'] },
  { id: 'techDevelopment', name: 'Tech Development', subcategories: ['App Development', 'Website Building', 'Coding Lessons'] },
  { id: 'eventOrganizing', name: 'Event Organizing', subcategories: ['Wedding Planning', 'Corporate Events', 'Birthday Parties'] },
  { id: 'homeMaintenance', name: 'Home Maintenance', subcategories: ['Plumbing', 'Electrical', 'Landscaping'] },
  { id: 'legalAssistance', name: 'Legal Assistance', subcategories: ['Contract Review', 'Legal Research', 'Notary Services'] },
  { id: 'financialServices', name: 'Financial Services', subcategories: ['Tax Preparation', 'Budget Planning', 'Investment Advice'] },
  { id: 'artsCrafts', name: 'Arts & Crafts', subcategories: ['Custom Artwork', 'Jewelry Making', 'Pottery'] },
  { id: 'tutoringTestPrep', name: 'Test Prep Tutoring', subcategories: ['SAT/ACT', 'GRE', 'MCAT'] },
  { id: 'miscellaneous', name: 'Miscellaneous', subcategories: ['Pet Sitting', 'Plant Care', 'Other'] }
];

const AddServiceView = () => {
  const [serviceName, setServiceName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [pricingModel, setPricingModel] = useState('perHr');
  const [points, setPoints] = useState('');
  const [pointsError, setPointsError] = useState('');
  const [providerUsername, setProviderUsername] = useState('');

  useEffect(() => {
    // Get the current authenticated user's username
    Auth.currentAuthenticatedUser()
      .then(user => setProviderUsername(user.username))
      .catch(err => console.log(err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (points % 5 !== 0) {
      setPointsError('Points must be in denominations of 5.');
      return;
    }
    setPointsError('');
  
    // Make sure these keys match your Supabase table column names

      const serviceData = {
        name: serviceName, // Match the database column name
        provider: providerUsername, // Match the database column name
        description: description, // Match the database column name
        category: category, // Match the database column name
        subcategory: subcategory, // Match the database column name
        pricingModel: pricingModel, // Match the database column name, it should be camelCase
        points: Number(points), // Match the database column name
      };
  
    // Replace with your Supabase API endpoint and table name
    const supabaseUrl = 'https://afeqcqvlzcbzfdqvsusz.supabase.co/rest/v1/services'; // Make sure this is the correct URL
    const serviceRoleKey = import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY;
  
    try {
      const response = await axios.post(supabaseUrl, serviceData, {
        headers: {
          'Content-Type': 'application/json',
          'apikey': serviceRoleKey,
          'Authorization': `Bearer ${serviceRoleKey}`,
          'Prefer': 'return=representation',
        },
      });
  
      console.log('Service added:', response.data);
      // Reset form or show success message
    } catch (error) {
      console.error('There was a problem with adding the service:', error);
      // Log the full error response
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error(error.response.data);
        console.error(error.response.status);
        console.error(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.error(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error', error.message);
      }
    }
    
  };
  const handleCategoryChange = (e) => {
    const newCategory = e.target.value;
    setCategory(newCategory);
    // Reset subcategory when category changes
    setSubcategory('');
  };

  const renderSubcategories = () => {
    const selectedCategory = categories.find(c => c.id === category);
    return selectedCategory ? selectedCategory.subcategories.map((sub) => (
      <option key={sub} value={sub}>{sub}</option>
    )) : null;
  };

  const handlePointsChange = (e) => {
    const value = e.target.value === '' ? '' : Number(e.target.value);
    setPoints(value);
  };

  const handlePointsBlur = () => {
    if (points !== '' && points % 5 !== 0) {
      setPointsError('Points must be in denominations of 5.');
    } else {
      setPointsError('');
    }
  };

  return (
    <div>
      <h1>Add Service</h1>
      <img src="https://shimmering-stardust-c75334.netlify.app/assets/crewmates.43d07b24.png" className="small-img" alt="Crewmate" />
      <div className='form-container'>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Service Name:</label>
          <input type="text" value={serviceName} onChange={(e) => setServiceName(e.target.value)} required />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={200}
            required
          />
        </div>
        <div>
          <label>Category:</label>
          <select value={category} onChange={handleCategoryChange} required>
            <option value="">Select a category</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Subcategory:</label>
          <select value={subcategory} onChange={(e) => setSubcategory(e.target.value)} required disabled={!category}>
            <option value="">Select a subcategory</option>
            {renderSubcategories()}
          </select>
        </div>
        <div>
          <label>Pricing Model:</label>
          <div>
            <input type="radio" name="pricingModel" value="perHr" checked={pricingModel === 'perHr'} onChange={() => setPricingModel('perHr')} required /> Per Hour
            <input type="radio" name="pricingModel" value="fixed" checked={pricingModel === 'fixed'} onChange={() => setPricingModel('fixed')} required /> Fixed Price
            <input type="radio" name="pricingModel" value="other" checked={pricingModel === 'other'} onChange={() => setPricingModel('other')} required /> Other
          </div>
        </div>
        <div>
          <label>Points:</label>
          <input
            type="number"
            value={points}
            onChange={handlePointsChange}
            onBlur={handlePointsBlur}
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

export default AddServiceView;

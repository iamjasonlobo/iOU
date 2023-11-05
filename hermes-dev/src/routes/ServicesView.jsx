import React, { useState, useEffect } from 'react';
import ServiceCard from '../components/ServiceCard';
import axios from 'axios';

const ServicesView = () => {
  const [servicesData, setServicesData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      const supabaseUrl = 'https://afeqcqvlzcbzfdqvsusz.supabase.co/rest/v1/services';
      const serviceRoleKey = import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY;
    
      try {
        const response = await axios.get(supabaseUrl, {
          headers: {
            'Content-Type': 'application/json',
            'apikey': serviceRoleKey,
            'Authorization': `Bearer ${serviceRoleKey}`,
          },
        });
        // Here we'll add a dummy image to each service
        const servicesWithDummyImage = response.data.map(service => ({
          ...service,
          photo: `https://placeimg.com/150/150/tech`
        }));
        setServicesData(servicesWithDummyImage);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const renderServices = () => {
    return servicesData.map(service => <ServiceCard key={service.id} service={service} />);
  };

  if (loading) return <div>Loading services...</div>;
  if (error) return <div>Error fetching services: {error.message}</div>;

  return (
    <div>
      <div className="title-bar">
        <h1>Services</h1>
      </div>
      <div className="services-container">
        {renderServices()}
      </div>
    </div>
  );
};

export default ServicesView;

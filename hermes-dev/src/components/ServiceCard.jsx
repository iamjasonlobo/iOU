const ServiceCard = ({ service }) => {
  return (
    <div key={service.id} className="info-card">
      <img src={`https://picsum.photos/200`} alt={service.name} />
      <h2>{service.name}</h2>
      <p>by {service.provider}</p>
      <div>Points: <span>{service.points}</span> </div>
    </div>
  );
};

export default ServiceCard;

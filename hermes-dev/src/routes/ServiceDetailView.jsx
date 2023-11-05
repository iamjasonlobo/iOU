const ServiceDetailView = () => {
  return (
    <div>
            <h1>Service Detail View</h1>
            <img src="https://shimmering-stardust-c75334.netlify.app/assets/crewmates.43d07b24.png" className="small-img" alt="Crewmate" />

            <h3>Current Crewmate Info</h3>
            <p>Name: {formData.name} ~ Speed: {formData.speed} ~ Color: {formData.color}</p>

            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <div className="miniform-container">
                        <label htmlFor="name">Name: </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Enter crewmate's name"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="miniform-container">
                        <label htmlFor="speed">Speed: </label>
                        <input
                            type="number"
                            id="speed"
                            name="speed"
                            placeholder="Enter speed in miles/hr"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="miniform-container">
                        <p>Color: </p>
                        <label htmlFor="red">Red</label>
                        <input
                            type="radio"
                            id="red"
                            name="color"
                            value="red"
                            onChange={handleChange}
                        />

                        <label htmlFor="blue">Blue</label>
                        <input
                            type="radio"
                            id="blue"
                            name="color"
                            value="blue"
                            onChange={handleChange}
                        />

                        <label htmlFor="green">Green</label>
                        <input
                            type="radio"
                            id="green"
                            name="color"
                            value="green"
                            onChange={handleChange}
                        />

                        <label htmlFor="purple">Purple</label>
                        <input
                            type="radio"
                            id="purple"
                            name="color"
                            value="purple"
                            onChange={handleChange}
                        />

                        <label htmlFor="rainbow">Rainbow</label>
                        <input
                            type="radio"
                            id="rainbow"
                            name="color"
                            value="rainbow"
                            onChange={handleChange}
                        />
                    </div>
                    <button className='form-button' type="submit">Update Crewmate</button>
                    <button className='form-button' type="button" onClick={() => deleteCrewmate(formData.id)}>Delete Crewmate</button>
                </form>

            </div>
        </div>

  );
};

export default ServiceDetailView;
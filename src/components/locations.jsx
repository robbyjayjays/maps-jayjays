import { useState } from 'react';
import { FaMapMarker } from 'react-icons/fa';
import '../assets/css/locations.css';

const Locations = () => {
    return (
      <div className="card"> {/* Apply the card class */}
          <div className="card-header">
              <h3 className="text-xl font-bold"> Gym Leuven </h3>
          </div>

          <div className="card-body">
              <div className="mb-5">
                  This is a gym in Leuven
              </div>
              <div className="border border-gray-100 mb-5"></div>
          </div>

          <div className="card-footer"> {/* Add a footer for better structure */}
              <div className="location-icon flex items-center">
                  <FaMapMarker className='inline mb-1 mr-1' />
                  <span className="location-text">50.8798 - 4.7009</span>
              </div>
          </div>
      </div>
  );
}

export default Locations
import React, { useState } from 'react';

export default function Red() {
  const [platform, setPlatform] = useState(''); // State to manage selected radio button

  const handleChange = (e) => {
    setPlatform(e.target.value); // Update state with selected radio button value
  };

  return (
    <div>
        <br></br><br></br><br></br><br></br><br></br><br></br>
      <div className="radio-buttons">
       Female
        <input
          id="Female"
          value="Female"
          name="platform"
          type="radio"
          checked={platform === 'Female'} // Check if platform state matches this radio button
          onChange={handleChange}
        />
       Male
        <input
          id="Male"
          value="Male"
          name="platform"
          type="radio"
          checked={platform === 'Male'} // Check if platform state matches this radio button
          onChange={handleChange}
        />
     Other
        <input
          id="Other"
          value="Other"
          name="platform"
          type="radio"
          checked={platform === 'Other'} // Check if platform state matches this radio button
          onChange={handleChange}
        />
      </div>
      <p>Selected Gender: {platform}</p> {/* Display the selected platform */}
    </div>
  );
}

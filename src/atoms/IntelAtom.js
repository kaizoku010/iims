import React, { useState } from 'react'
import "../screens/AddIntel.css"

function IntelAtom() {

    const [step, setStep] = useState(1);

    const nextStep = () => {
        // setStep(step + 1);
        return <div>asdas</div>
    };

    const prevStep = () => {
        setStep(step - 1);
    };

  return (
    <div className='add-intel-page'>
    <div className="container">
      <header className='suspect-header'>Add Intel Or Suspect Information</header>
      <form className='add-intel-form'>
          {step === 1 && (
              <div className="form first">
                  <div className="details personal">
                      <span className="title">Details</span>
                      <div className="fields">
                          {/* Personal details fields */}
                          <div className="input-field">
                              <label>Full Name</label>
                              <input type="text" placeholder="Enter your name" required />
                          </div>
                          <div className="input-field">
                              <label>Age</label>
                              <input type="number" placeholder="Age If Applicable" required />
                          </div>
                          <div className="input-field">
                              <label>Date of Birth</label>
                              <input type="date" placeholder="Enter birth date" required />
                          </div>
                          <div className="input-field">
                              <label>Location</label>
                              <input type="email" placeholder="Add Location" required />
                          </div>
                          <div className="input-field">
                              <label>Mobile Number</label>
                              <input type="tel" placeholder="Enter mobile number" required />
                          </div>
                          <div className="input-field">
                              <label>Gender</label>
                              <select required>
                                  <option disabled selected>Select gender</option>
                                  <option>Male</option>
                                  <option>Female</option>
                                  <option>Others</option>
                              </select>
                          </div>
                          <div className="input-field">
                              <label>Occupation</label>
                              <input type="text" placeholder="Enter occupation" required />
                          </div>
                          <div className="input-field">
                              <label>National ID Number</label>
                              <input type="text" placeholder="Enter your occupation" required />
                          </div>
                          <div className="input-field">
                              <label>Case Type</label>
                              <input type="text" placeholder="Enter Case Type" required />
                          </div>
                      </div>
                  </div>
                  <button className="nextBtn cls" type="button" onClick={nextStep}>
                      <span className="btnText btn-cls cls">Save </span>
                      <i style={{marginRight:"4%"}} className="uil uil-navigator"></i>
                  </button>
              </div>
          )}
     
      </form>
  </div>

  </div>
  )
}

export default IntelAtom
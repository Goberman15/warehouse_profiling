import React, { useState } from 'react';

const Fullscreen = () => {
    const [step, setStep] = useState(1);

    return (
        <div className="container px-5">
            <div className="form-group">
                {step === 1 &&
                <>
                    <label>Form 1</label>
                    <input type="text" placeholder="1st Input" className="form-control"/>
                </>
                }
                {step === 2 &&
                <>
                    <label>Form 2</label>
                    <input type="text" placeholder="2nd Input" className="form-control"/>
                </>
                }
                {step === 3 &&
                <>
                    <label>Form 3</label>
                    <input type="text" placeholder="3rd Input" className="form-control"/>
                </>
                }
            </div>
            <div className="d-flex">
                {step !== 1 &&
                <button
                    className="btn btn-success mr-auto px-5"
                    onClick={() => setStep(step-1)}
                >Back</button>
                }
                {step !== 3 &&
                <button
                    className="btn btn-success ml-auto px-5"
                    onClick={() => setStep(step+1)}
                >Next</button>
                }
                {step === 3 &&
                <button
                    className="btn btn-success ml-auto px-5"
                >Submit</button>
                }
            </div>

        </div>
    );
}

export default Fullscreen;

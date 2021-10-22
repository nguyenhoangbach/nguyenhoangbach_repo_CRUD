import React, { useState } from 'react';

export default function Test() {


    const [state, setstate] = useState(true)
    const [fe, setFe] = useState(true)

    // male = 1 == true
    //female = 0 == false

    return (

        <form form action="" method="POST" role="form" >
            <legend>Form title</legend>

            <div className="form-group">
                <label >male</label>
                <input type="radio"
                    className="form-control" id=""
                    checked={state}
                    placeholder="Input field" />
                <label >female</label>
                <input type="radio"
                    className="form-control" id=""
                    checked={fe}
                    placeholder="Input field" />
            </div>



            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    )

}
// File: /src/components/InterestsForm.js
import React from 'react'

function InterestsForm() {

  return (
    <>
    <form>
        <div class="customCheckBoxHolder">

            <input class="customCheckBoxInput" id="cCB1" type="checkbox" />
            <label class="customCheckBoxWrapper" for="cCB1">
                <div class="customCheckBox">
                    <div class="inner">Option</div>
                </div>
            </label>

            
        </div>
    </form>
    </>
  )
} // <--- InterestsForm() function ends here

export default InterestsForm;
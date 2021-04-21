import React, { useState } from 'react';
import { FormInput, FormButton } from '../../../common';
import axios from 'axios';

/*  What do I need in this component:
    + handle change of screen on keystroke
    + On submit sent axios request 



*/

function ManualMemberIdForm() {
  const [memberId, setMemberId] = useState('');

  const handleChange = e => {
    const { name, value } = e.target;
    setMemberId(value);
    console.log(value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log(typeof memberId);

    // let formData = new FormData();
    // formData.append('newmember', memberId);

    const tokens = JSON.parse(localStorage.getItem('okta-token-storage'));
    const access_token = tokens.accessToken.accessToken;

    axios
      .post(
        'https://bg-emotion-tracker-be-a.herokuapp.com/members/member',
        memberId,
        {
          headers: {
            Authorization: 'Bearer ' + access_token,
            'Content-Type': 'application/json',
          },
        }
      )
      .then(res => {
        alert('Success! Member added to the Database');
        console.log(res);
      })
      .catch(err => {
        alert('An error occurred');
        console.log(err);
      });
  };

  return (
    <div className="mainInputWindow">
      <form className="formDiv" onSubmit={e => handleSubmit(e)}>
        <div>
          <input
            required
            name="newmember"
            type="text"
            placeholder="Member ID"
            onChange={handleChange}
          />
        </div>

        <FormButton
          className="formButton"
          buttonText="Submit"
          classType="default"
          disabled="false"
        />
      </form>
    </div>
  );
}

export default ManualMemberIdForm;

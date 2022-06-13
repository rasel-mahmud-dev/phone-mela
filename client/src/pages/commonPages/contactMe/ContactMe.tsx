import React from 'react';
import Input2 from "UI/Form/Input/Input2";
import Layout from "../../../Common/Layout/Layout";

const ContactMe=  () => {
  return (
    <div className="container-1200">
      <span></span>
      <div className="w-full">
        <div className="px-2 mb-8">
          <form onSubmit={(e)=>e.preventDefault()} className="max-w-[500px] flex justify-center mx-auto px-2 pt-4" action="">
            <div className="flex-1">
              <h1 className="text-3xl font-medium">Quick Contact</h1>
              <Input2 label="Enter Your Email" />
              <Input2 label="Enter Your Name" />
              <Input2 type="textarea" label="Message" />
              <button type="submit" className="mt-4 btn bg-primary-950 text-white px-4">Send Message</button>
            </div>
          </form>
        </div>
      </div>
    
    </div>
  );
};

export default ContactMe;
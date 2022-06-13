import React from 'react';
import Layout from "../../../Common/Layout/Layout";

const AboutMe = () => {
  return (
    <div className="container-1200">
      <span></span>
      <div className="">
      <div className="px-2">
        
  
        <h2 className="pt-6 mb-4 text-3xl font-medium text-center">ABOUT</h2>
        
        <p className="text-gray-700">
          Phone-Mela is the dummy online mobile shopping application. it Build with React JS and Backend for API I use Go(Golang)
          Golang is a Modern Powerful Language. it Support Concurrency with goroutines and channels.
          
          
          <br/>
            I use MySQL to store all data like customer, products, carts, wishlist, shippers, orders, suppliers etc.
          <br/>
          
        </p>
  
        <h3 className="mt-4 text-lg text-gray-900 font-normal">Features</h3>
  
        <p>Phone Mela lets you discover and experience the best of every product easily.</p>
        <ul className="ml-8 mt-4">
          <li className="list-disc">Admin Dashboard. Admin Can Control Everything, Like product adding, update, delete, Check sever error logs </li>
          <li className="list-disc">Customer and Seller Dashboard</li>
          <li className="list-disc">Filter By Products Attributes</li>
          <li className="list-disc">Mobile Responsive</li>
          <li className="list-disc">Save cart and wishlist on database for each customer</li>
          <li className="list-disc">Customer can create fake order</li>
          <li className="list-disc">Mobile Responsive</li>
          
        </ul>
        
      </div>
      
    </div>
    </div>
  );
};

export default AboutMe;
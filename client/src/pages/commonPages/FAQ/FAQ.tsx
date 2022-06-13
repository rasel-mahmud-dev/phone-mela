import React from 'react';
import Collapase from "UI/Collapse/Collapase";
import Layout from "../../../Common/Layout/Layout";

const Faq = () => {
  
  const [activeIds, setActiveIds] = React.useState<string[]>(["1"])
  
  
  function setCollapse(id: string){
    let update = [...activeIds]
    let inx = update.indexOf(id)
    if(inx !== -1){
      update.splice(inx)
    } else {
      update.push(id)
    }
    setActiveIds(      update)
  }
  
  return (
    <div className="container-1200">
      <span></span>
    <div className="">
      
      <div className="max-w-[700px] mx-auto px-2" >
        <h1 className="text-3xl pt-4 font-medium">Frequently Asked Questions?</h1>
      <ul className="mt-8">
        <div className="mt-4">
          <label  className="hover:text-primary-400 cursor-pointer font-medium text-[16px] text-gray-900" onClick={()=>setCollapse("1")} htmlFor="">How can I change the password of my account?</label>
          <Collapase state={activeIds} id="1">
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A accusantium, ad adipisci aliquid animi aperiam aspernatur at cum delectus dignissimos, dolor ducimus eligendi error esse facilis maiores maxime natus necessitatibus nobis nostrum obcaecati odio quae quos sequi suscipit tempore temporibus, velit voluptates voluptatibus voluptatum! Dignissimos enim esse perspiciatis repellendus sint? Dignissimos doloremque, id in iste magnam maxime pariatur quae sapiente sunt. Accusantium ad asperiores commodi consequatur consequuntur distinctio, dolor doloribus ducimus ex exercitationem expedita explicabo hic, impedit iste magnam magni nemo nobis nostrum odit optio perferendis quaerat quam quas quasi qui suscipit unde? Consequatur cupiditate dolorem libero perferendis praesentium tenetur.</p>
          </Collapase>
        </div>
    
        <div className="mt-4">
          <label className="hover:text-primary-400 cursor-pointer font-medium text-[16px] text-gray-900" onClick={()=>setCollapse("2")} htmlFor="">How can I create an account on Phone Mela?</label>
          <Collapase state={activeIds} id="2">
            <p>For Website: • Go to Phone Mela Website• Click ‘Register’ in the top right corner on of the website• Enter you Name, Email address, password & click ‘CREATE AN ACCOUNT’ For app: • Open the Phone Mela app• Go to the "Account" section at the top left corner of your app• ...</p>

            <p className="mt-2">Lorem ips dolorum, eligendi excepturi molestias obcaecati quas quis quos ratione voluptate?</p>
            <p className="leading-8">Lorem ipsum dolor sit amet, consectetur adipis?</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur doloremq dolorum, eligendi excepturi molestias obcaecati quas quis quos ratione voluptate?</p>
          </Collapase>
        </div>
        <div className="mt-4">
          <label className="hover:text-primary-400 cursor-pointer font-medium text-[16px] text-gray-900" onClick={()=>setCollapse("22")} htmlFor="">How can I change my email address??</label>
          <Collapase state={activeIds} id="22">
            <p>For Website: • Go to Phone Mela Website• Click ‘Register’ in the top right corner on of the website• Enter you Name, Email address, password & click ‘CREATE AN ACCOUNT’ For app: • Open the Phone Mela app• Go to the "Account" section at the top left corner of your app• ...</p>

            <p className="mt-2">Lorem ips dolorum, eligendi excepturi molestias obcaecati quas quis quos ratione voluptate?</p>
            <p className="leading-8">Lorem ipsum dolor sit amet, consectetur adipis?</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur doloremq dolorum, eligendi excepturi molestias obcaecati quas quis quos ratione voluptate?</p>
          </Collapase>
        </div>
        
        <div className="mt-4">
          <label className="hover:text-primary-400 cursor-pointer font-medium text-[16px] text-gray-900" onClick={()=>setCollapse("24")} htmlFor="">How can I create a seller account?</label>
          <Collapase state={activeIds} id="24">
            <p>For Website: • Go to Phone Mela Website• Click ‘Register’ in the top right corner on of the website• Enter you Name, Email address, password & click ‘CREATE AN ACCOUNT’ For app: • Open the Phone Mela app• Go to the "Account" section at the top left corner of your app• ...</p>

            <p className="mt-2">Lorem ips dolorum, eligendi excepturi molestias obcaecati quas quis quos ratione voluptate?</p>
            <p className="leading-8">Lorem ipsum dolor sit amet, consectetur adipis?</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur doloremq dolorum, eligendi excepturi molestias obcaecati quas quis quos ratione voluptate?</p>
          </Collapase>
        </div>
  
      </ul></div>
      
    </div>
    </div>
  );
};

export default Faq;
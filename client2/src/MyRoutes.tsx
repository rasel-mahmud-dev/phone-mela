
import { lazy, Suspense } from "react"
import {Outlet, Route, Routes, useRoutes} from "react-router-dom";
import ProgressBar from "UI/ProgressBar/ProgressBar";



// this function function for lazy route load...........
const ReactLazyPreload  = (importStatement: any)=>{
  const Component = lazy(importStatement)
  
  // Component.preload call when preload link clicked
  // @ts-ignore
  Component.preload = importStatement
  return Component
}


const HomePage = ReactLazyPreload( ()=>import("./pages/HomePage") )
const ProductPage = ReactLazyPreload( ()=>import("./pages/ProductPage/ProductPage") )
const ProductDetails = ReactLazyPreload( ()=>import("./pages/ProductPage/ProductDetails/ProductDetails") )

// const SignupPage = ReactLazyPreload( ()=>import("./pages/SignupPage/SignupPage") )
const LoginPage = ReactLazyPreload( ()=>import("./pages/auth/loginPage/LoginPage") )
// const ProfilePage = ReactLazyPreload( ()=>import("./pages/ProfilePage/ProfilePage") )


// const Category = ReactLazyPreload(()=> import("pages/Admin/Components/Category/Category") )

// import NotFound from './pages/Exceptions/NotFoundPage/NotFoundPage'
const CartPage =  ReactLazyPreload(()=>import("src/pages/CartPages/Index"));
const Wishlist =  ReactLazyPreload(()=>import("src/pages/CartPages/wishlist/Wishlist"));
const CheckoutPage =  ReactLazyPreload(()=>import("pages/CartPages/checkout/CheckoutPage"));
const CustomerDashboardHome =  ReactLazyPreload(()=>import("pages/Customer/Dashboard/DashboardHome"));

const AdminDashboard = ReactLazyPreload(
  ()=> import("./pages/Admin/AdminDashboard/AdminDashboard") )
const ProductList = ReactLazyPreload( ()=>import("pages/Admin/AdminDashboard/productList/ProductList"));
const Category  = ReactLazyPreload( ()=>import("pages/Admin/Components/Category/Category"));
const Logs  = ReactLazyPreload( ()=>import("pages/Admin/AdminDashboard/Server/logs/Logs"));
const AddProduct = ReactLazyPreload( ()=>import("./pages/ProductPage/AddProduct/AddProduct") )
const MoreProducts = ReactLazyPreload(()=>import("pages/ProductPage/moreProducts/MoreProducts")) ;

const  OrderHomePage  = ReactLazyPreload(()=>import("pages/CartPages/OrderHomePage"));
const  PaymentPage  = ReactLazyPreload(()=>import("pages/CartPages/paymentPage/PaymentPage"));


const Faq = ReactLazyPreload(()=>import("pages/commonPages/FAQ/FAQ"));
const AboutMe = ReactLazyPreload(()=>import("pages/commonPages/aboutMe/AboutMe"));
const ContactMe = ReactLazyPreload(()=>import("pages/commonPages/contactMe/ContactMe"));

const myRoutes = [
  { path: "/", index: true, element: <HomePage/> },
  { path: "/products", index: true ,  element: <ProductPage/> },
  { path: "/products/:slug", index: true, element: <MoreProducts/> },
  { path: "/q",  element: <ProductPage/> },
  { path: "/product/:title/:productId",  element: <ProductDetails/> },
  { path: "/auth/customer",  element: <CustomerDashboardHome/> },
  
  { path: "/faqs",  element: <Faq/> },
  { path: "/about-me",  element: <AboutMe/> },
  { path: "/contact-me",  element: <ContactMe/> },

  // { path: "/not-found",  component: NotFound },
]


let isAuth: boolean | null = null;

function MyRoutes(props: any){
 
  let {auth, where} = props
  
  let routes: any = []
  
  if(where === "app"){
    isAuth = auth.isAuthenticated
  }
  
  // if(isAuth){
    routes = [
      ...myRoutes,
      // { path: "/add-product", index: true,  element: <AddProduct/> },
      // { path: "/update-product/:productId", index: true, element: <AddProduct/> },
      // { path: "/auth/profile",  element: <ProfilePage/ },
      { path: "/products/:authorId", index: true, element: <ProductPage/> },
      // { path: "/admin/dashboard",  element: <AdminDashboard/> },
      { path: "/auth/login", index: true, element: <LoginPage/> },
      {
        path: "/admin/dashboard",  element: <AdminDashboard/>,
        children: [
          {path: "products/product-list", index: true, element: <ProductList/>},
          {path: "products/category", index: true, element: <Category/>},
          {path: "products/add-product/:productId", index: true, element: <AddProduct/>},
          {path: "products/server/logs", index: true, element: <Logs/>}
        ]
      },
      { path: "/cart",  element: <CartPage/> },
      { path: "/wishlist",  element: <Wishlist/> },
      { path: "/order", element: <OrderHomePage/>,
        children: [
          { path: "checkout",  index: true, element: <CheckoutPage/> },
          { path: "payment",  index: true, element: <PaymentPage/> },
        ]
      },
      // { path: "/admin/dashboard/products/physical/category",  component: Category },
      { path:"*", element: <main style={{ padding: "1rem" }}>
            <p>There's nothing here!</p>
          </main>
      }
    ]
  
  // } else {
  //   routes = [
  //     ...myRoutes,
  //     { path: "/auth/login", element: <LoginPage/> },
  //     // { path: "/auth/signup", component: SignupPage }
  //   ]
  // }
  
  return (
    <Suspense fallback={<ProgressBar />}>
      {/*<Routes>*/}
      {/*  { routes.map(route=>(*/}
      {/*    <Route {...route} />*/}
      {/*  )) }*/}
      {/*</Routes>*/}
      
      {useRoutes(routes)}
      
    </Suspense>
  )
  
}

export default MyRoutes



















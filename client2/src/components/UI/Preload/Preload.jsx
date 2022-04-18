import React from 'react'
import {Link} from "react-router-dom";

export default (props)=>{
  return <Link {...props} />
}

// import { matchPath, Link, withRouter } from 'react-router-dom'
//
// import routes from '@app/routes'
// import ProgressBar from 'components/ProgressBar/ProgressBar'
// import "./Preload.scss"
//
//
// const findComponentForRoute = (path, routes) => {
//   const matchingRoute = routes.find(route =>
//      matchPath(path, {
//         path: route.path,
//         exact: route.exact
//       })
//   );
//   return matchingRoute ? matchingRoute.component : null;
// };
//
//
// let preloadLinks = []
//
//
// const Preload = ({to, delay, history, isActive, match, ...rest})=>{
//
//   let id;
//   let componentLoadTimeOutId;
//   const [ loaded, isLoaded ] = React.useState(false)
//   const [ isLoading, setLoading ] = React.useState(false)
//
//
//   /** log warning message if not pass component preload promises */
//   function preloadLog(message){
//     console.info(`*********** ${message} *************`)
//   }
//
//
//   /** render normal route without preload component chunks */
//   function normalRouteLoad(){
//     preloadLog("component.preload function not return any promise, " +
//       "So we think you are not using react lazy loading, " +
//       "so you use simple NavLink or Link"
//     )
//     preloadLinks = []
//     isLoaded(true)
//
//     // * just nice delay loading bar
//     id = setTimeout(()=>{
//       setLoading(false)
//     }, delay ? delay : 100 )
//
//     // * delay route change loading bar
//     if(delay){
//       componentLoadTimeOutId = setTimeout(()=>{
//         history.push(to)
//       }, delay)
//     } else{
//       history.push(to)
//     }
//   }
//
//
//   function preloadRouteComponent(path){
//     /**
//      * Clear loading bar Timeout if
//      * double click before load component
//      * if supply delay timeout props
//      *
//      * */
//     clearTimeout(id)
//
//       /**
//      * Clear component load Timeout if
//        * double click before load component
//        * if supply delay timeout props
//        *
//      * */
//     clearTimeout(componentLoadTimeOutId)
//
//
//     setLoading(true)
//     isLoaded(false)
//
//     preloadLinks.push(path)
//
//     const component = findComponentForRoute(path, routes(true, "no"));
//     if (component && component.preload) {
//
//       const moduleLoadedPromise = component.preload()
//       /**
//         * check it preload function exist or not when import module with loadable component or react lazy
//         *  const ReactLazyPreload  = (importStatement)=>{
//         *    const Component:ComponentType = lazy(importStatement)
//         *     Component.preload = importStatement   // preload function return as promises
//         *     return Component
//         * }
//         *  Here lazy should be = loadable component or React lazy
//        */
//
//       if(moduleLoadedPromise){
//         moduleLoadedPromise.then(()=>{
//           if(delay){
//             setTimeout(()=>{
//               isLoaded(true)
//               setLoading(false)
//               preloadLinks = []
//             }, delay)
//           } else{
//             isLoaded(true)
//             setLoading(false)
//             preloadLinks = []
//           }
//
//         }).catch(err=>console.log("Something were wrong when preload component load", err))
//
//
//       } else{
//         /**
//          * Component.preload function not return promises So return normal Route without preload component
//          */
//         normalRouteLoad()
//       }
//
//     } else {
//       normalRouteLoad()
//     }
//
//   };
//
//   if(loaded){
//     //? go to last clicked path
//     history.push(preloadLinks[preloadLinks.length - 1])
//     preloadLinks = []
//     isLoaded(false)
//   }
//
//   function routeChange(){
//     if(loaded){
//       return to
//     }
//   }
//
//   return (
//     <div className="preload_route_link" >
//        { isLoading && <ProgressBar  /> }
//         <Link
//           className={isActive ? "active" : ""}
//           to={routeChange}
//           onMouseDown={()=> preloadRouteComponent(to) }
//           {...rest}
//         />
//
//     </div>
//   )
// }
//
//
// // export default Preload
// export default withRouter(({location, ...props})=>{
//
//   const isActive = location.pathname === props.to
//
//   return <Preload isActive={isActive}  {...props} />
// })
//

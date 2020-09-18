import {connect} from 'react-redux';
import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import Header from '../components/Header'
export const PrivateRoute = ({
    isAuthenticated,
   component: Component,
   ...rest}) => {
       return (
           <Route {...rest} component={(props) => (
               isAuthenticated ? (
                   <div>
                   <Header/>
                   <Component {...props}/>
                   </div>
               ) : (
                   <Redirect to='/' />
               )
           )} >
           </Route>
       )
   };

const mapStateToProps = ({auth}) => {
   const {user}  = auth
   return {
       isAuthenticated: !!user.id
   }
}


export default connect(mapStateToProps)(PrivateRoute);
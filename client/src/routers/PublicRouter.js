import {connect} from 'react-redux';
import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import Header from '../components/Header'
export const PublicRoute = ({
    isNotAuthenticated,
   component: Component,
   ...rest}) => {
       return (
           <Route {...rest} component={(props) => (
               isNotAuthenticated ? (
                   <div>
                   <Header/>
                   <Component {...props}/>
                   </div>
               ) : (
                   <Redirect to='/dashboard' />
               )
           )} >
           </Route>
       )
   };

const mapStateToProps = ({auth}) => {
   return {
       isNotAuthenticated: !auth.user.id
   }
}


export default connect(mapStateToProps)(PublicRoute);
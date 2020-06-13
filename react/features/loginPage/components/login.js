import React, { Component } from 'react';
import './login.css';
import { GoogleLogin } from 'react-google-login';
import toastr from 'toastr';
import 'toastr/build/toastr.css';
import {loginJson} from './src/LoginDetailsJson';
import EyeIcon from './eyeIcon'

export default class Login extends Component{
   constructor(props){
      super(props);
      this.state={
         username:'',
         password:'',
         usernameError:'',
         passwordError:'',
         clientId:interfaceConfig.GOOGLE_CLIENT_ID,
         showPassword:false
      }
   }
   handleChange = e => {
      const { name, value } = e.target;
      this.setState({ [ name ]: value });
    };
    togglPasswordIcon = event => {
      event.preventDefault();
      const { showPassword } = this.state;
      this.setState({ showPassword: !showPassword });
   };
   handleLoginSubmit = (event) => {
      event.preventDefault();
      const { username,password } = this.state;
      if(username === '' || password === ''){
         if(username === '' && password === ''){
            this.setState({usernameError:'Enter an email or username',passwordError:'Enter a Password'})
         }else if(username === ''){
            this.setState({usernameError:'Enter an email or username',passwordError:''})
         }else if(password === ''){
            this.setState({passwordError:'Enter a Password',usernameError:''})
         }else{
         this.setState({usernameError:'Enter an email or username',passwordError:'Enter a Password'})
         }
      }else if(username !== '' && password !== ''){
         if(username === loginJson.loginDetails.username && password === loginJson.loginDetails.password){
            this.setState({passwordError:'',usernameError:''})
            localStorage.setItem( 'profileobj',JSON.stringify(loginJson.UserDetails))
            this.props.googleLoginCallBack(true)
         }else{
         this.setState({passwordError:'Invalid credentials. Enter a valid email or username and password',usernameError:''})
         }
      }
   }
   responseGoogleSuccess = (response) => {
      let userEmail = response.profileObj.email;
      if (/@contus.in\s*$/.test(userEmail)) {
         localStorage.setItem( 'profileobj',JSON.stringify(response.profileObj))
         this.props.googleLoginCallBack(true)
      }else{
         toastr.options.progressBar = true;
         toastr.options.closeButton = true;
         toastr.error('Account login is restricted to particular domain. Please try login using contus.in. You can still join any meeting without login in.');
      }
      
   }
    responseGoogleFailure = (response) => {
       if(response.error !== 'popup_closed_by_user' && response.error !== 'idpiframe_initialization_failed'){
         toastr.options.progressBar = true;
         toastr.options.closeButton = true;
         toastr.error('Something went wrong.Please try again.')
       }     
   }
    render(){
       const { username,password,passwordError,usernameError,clientId,showPassword } = this.state
        return(
            <div id="root">
            <div className="App">
               <div className="main-logindiv" id="login-page">
                  <div data-testid="wrapper" className="_loading_overlay_wrapper css-pm1fkv">
                  <div className="icons">
                        <div className="left-side">
                           <svg width="234.058" height="219.625" viewBox="0 0 234.058 219.625" className="triangle">
                              <path id="Path_11397" data-name="Path 11397" d="M15806.479,13498.023c-30.164,21.312-150.421,147.658-25.6,181.147,98.859,26.522,138.523,9.133,138.523,9.133a72.188,72.188,0,0,0,19.508-7.638c17.583-10.1,36.128-37.089-1.24-118.708C15879.829,13435.612,15836.643,13476.712,15806.479,13498.023Z" transform="translate(-15725.329 -13474.276)" fill="#caddeb" opacity="0.48"></path>
                           </svg>
                           <svg width="79.386" height="72.298" viewBox="0 0 79.386 72.298" className="square">
                              <g id="Group_9_Copy" data-name="Group 9 Copy" opacity="0.05">
                                 <g id="Group_8_Copy_2" data-name="Group 8 Copy 2">
                                    <ellipse id="Oval_Copy_10" data-name="Oval Copy 10" cx="3.194" cy="3.19" rx="3.194" ry="3.19" transform="translate(0 0)"></ellipse>
                                    <ellipse id="Oval_Copy_11" data-name="Oval Copy 11" cx="3.194" cy="3.19" rx="3.194" ry="3.19" transform="translate(14.6 0)"></ellipse>
                                    <ellipse id="Oval_Copy_12" data-name="Oval Copy 12" cx="3.194" cy="3.19" rx="3.194" ry="3.19" transform="translate(29.199 0)"></ellipse>
                                    <ellipse id="Oval_Copy_13" data-name="Oval Copy 13" cx="3.194" cy="3.19" rx="3.194" ry="3.19" transform="translate(43.799 0)"></ellipse>
                                    <ellipse id="Oval_Copy_14" data-name="Oval Copy 14" cx="3.194" cy="3.19" rx="3.194" ry="3.19" transform="translate(58.398 0)"></ellipse>
                                    <ellipse id="Oval_Copy_15" data-name="Oval Copy 15" cx="3.194" cy="3.19" rx="3.194" ry="3.19" transform="translate(72.998 0)"></ellipse>
                                 </g>
                                 <g id="Group_8_Copy_3" data-name="Group 8 Copy 3" transform="translate(0 11.341)">
                                    <ellipse id="Oval_Copy_10-2" data-name="Oval Copy 10" cx="3.194" cy="3.19" rx="3.194" ry="3.19" transform="translate(0 0)"></ellipse>
                                    <ellipse id="Oval_Copy_11-2" data-name="Oval Copy 11" cx="3.194" cy="3.19" rx="3.194" ry="3.19" transform="translate(14.6 0)"></ellipse>
                                    <ellipse id="Oval_Copy_12-2" data-name="Oval Copy 12" cx="3.194" cy="3.19" rx="3.194" ry="3.19" transform="translate(29.199 0)"></ellipse>
                                    <ellipse id="Oval_Copy_13-2" data-name="Oval Copy 13" cx="3.194" cy="3.19" rx="3.194" ry="3.19" transform="translate(43.799 0)"></ellipse>
                                    <ellipse id="Oval_Copy_14-2" data-name="Oval Copy 14" cx="3.194" cy="3.19" rx="3.194" ry="3.19" transform="translate(58.398 0)"></ellipse>
                                    <ellipse id="Oval_Copy_15-2" data-name="Oval Copy 15" cx="3.194" cy="3.19" rx="3.194" ry="3.19" transform="translate(72.998 0)"></ellipse>
                                 </g>
                                 <g id="Group_8_Copy_4" data-name="Group 8 Copy 4" transform="translate(0 21.973)">
                                    <ellipse id="Oval_Copy_10-3" data-name="Oval Copy 10" cx="3.194" cy="3.19" rx="3.194" ry="3.19" transform="translate(0 0)"></ellipse>
                                    <ellipse id="Oval_Copy_11-3" data-name="Oval Copy 11" cx="3.194" cy="3.19" rx="3.194" ry="3.19" transform="translate(14.6 0)"></ellipse>
                                    <ellipse id="Oval_Copy_12-3" data-name="Oval Copy 12" cx="3.194" cy="3.19" rx="3.194" ry="3.19" transform="translate(29.199 0)"></ellipse>
                                    <ellipse id="Oval_Copy_13-3" data-name="Oval Copy 13" cx="3.194" cy="3.19" rx="3.194" ry="3.19" transform="translate(43.799 0)"></ellipse>
                                    <ellipse id="Oval_Copy_14-3" data-name="Oval Copy 14" cx="3.194" cy="3.19" rx="3.194" ry="3.19" transform="translate(58.398 0)"></ellipse>
                                    <ellipse id="Oval_Copy_15-3" data-name="Oval Copy 15" cx="3.194" cy="3.19" rx="3.194" ry="3.19" transform="translate(72.998 0)"></ellipse>
                                 </g>
                                 <g id="Group_8_Copy_5" data-name="Group 8 Copy 5" transform="translate(0 32.605)">
                                    <ellipse id="Oval_Copy_10-4" data-name="Oval Copy 10" cx="3.194" cy="3.19" rx="3.194" ry="3.19" transform="translate(0 0)"></ellipse>
                                    <ellipse id="Oval_Copy_11-4" data-name="Oval Copy 11" cx="3.194" cy="3.19" rx="3.194" ry="3.19" transform="translate(14.6 0)"></ellipse>
                                    <ellipse id="Oval_Copy_12-4" data-name="Oval Copy 12" cx="3.194" cy="3.19" rx="3.194" ry="3.19" transform="translate(29.199 0)"></ellipse>
                                    <ellipse id="Oval_Copy_13-4" data-name="Oval Copy 13" cx="3.194" cy="3.19" rx="3.194" ry="3.19" transform="translate(43.799 0)"></ellipse>
                                    <ellipse id="Oval_Copy_14-4" data-name="Oval Copy 14" cx="3.194" cy="3.19" rx="3.194" ry="3.19" transform="translate(58.398 0)"></ellipse>
                                    <ellipse id="Oval_Copy_15-4" data-name="Oval Copy 15" cx="3.194" cy="3.19" rx="3.194" ry="3.19" transform="translate(72.998 0)"></ellipse>
                                 </g>
                                 <g id="Group_8_Copy_6" data-name="Group 8 Copy 6" transform="translate(0 43.945)">
                                    <ellipse id="Oval_Copy_10-5" data-name="Oval Copy 10" cx="3.194" cy="3.19" rx="3.194" ry="3.19" transform="translate(0 0)"></ellipse>
                                    <ellipse id="Oval_Copy_11-5" data-name="Oval Copy 11" cx="3.194" cy="3.19" rx="3.194" ry="3.19" transform="translate(14.6 0)"></ellipse>
                                    <ellipse id="Oval_Copy_12-5" data-name="Oval Copy 12" cx="3.194" cy="3.19" rx="3.194" ry="3.19" transform="translate(29.199 0)"></ellipse>
                                    <ellipse id="Oval_Copy_13-5" data-name="Oval Copy 13" cx="3.194" cy="3.19" rx="3.194" ry="3.19" transform="translate(43.799 0)"></ellipse>
                                    <ellipse id="Oval_Copy_14-5" data-name="Oval Copy 14" cx="3.194" cy="3.19" rx="3.194" ry="3.19" transform="translate(58.398 0)"></ellipse>
                                    <ellipse id="Oval_Copy_15-5" data-name="Oval Copy 15" cx="3.194" cy="3.19" rx="3.194" ry="3.19" transform="translate(72.998 0)"></ellipse>
                                 </g>
                                 <g id="Group_8_Copy_7" data-name="Group 8 Copy 7" transform="translate(0 54.577)">
                                    <ellipse id="Oval_Copy_10-6" data-name="Oval Copy 10" cx="3.194" cy="3.19" rx="3.194" ry="3.19" transform="translate(0 0)"></ellipse>
                                    <ellipse id="Oval_Copy_11-6" data-name="Oval Copy 11" cx="3.194" cy="3.19" rx="3.194" ry="3.19" transform="translate(14.6 0)"></ellipse>
                                    <ellipse id="Oval_Copy_12-6" data-name="Oval Copy 12" cx="3.194" cy="3.19" rx="3.194" ry="3.19" transform="translate(29.199 0)"></ellipse>
                                    <ellipse id="Oval_Copy_13-6" data-name="Oval Copy 13" cx="3.194" cy="3.19" rx="3.194" ry="3.19" transform="translate(43.799 0)"></ellipse>
                                    <ellipse id="Oval_Copy_14-6" data-name="Oval Copy 14" cx="3.194" cy="3.19" rx="3.194" ry="3.19" transform="translate(58.398 0)"></ellipse>
                                    <ellipse id="Oval_Copy_15-6" data-name="Oval Copy 15" cx="3.194" cy="3.19" rx="3.194" ry="3.19" transform="translate(72.998 0)"></ellipse>
                                 </g>
                                 <g id="Group_8_Copy_8" data-name="Group 8 Copy 8" transform="translate(0 65.918)">
                                    <ellipse id="Oval_Copy_10-7" data-name="Oval Copy 10" cx="3.194" cy="3.19" rx="3.194" ry="3.19" transform="translate(0 0)"></ellipse>
                                    <ellipse id="Oval_Copy_11-7" data-name="Oval Copy 11" cx="3.194" cy="3.19" rx="3.194" ry="3.19" transform="translate(14.6 0)"></ellipse>
                                    <ellipse id="Oval_Copy_12-7" data-name="Oval Copy 12" cx="3.194" cy="3.19" rx="3.194" ry="3.19" transform="translate(29.199 0)"></ellipse>
                                    <ellipse id="Oval_Copy_13-7" data-name="Oval Copy 13" cx="3.194" cy="3.19" rx="3.194" ry="3.19" transform="translate(43.799 0)"></ellipse>
                                    <ellipse id="Oval_Copy_14-7" data-name="Oval Copy 14" cx="3.194" cy="3.19" rx="3.194" ry="3.19" transform="translate(58.398 0)"></ellipse>
                                    <ellipse id="Oval_Copy_15-7" data-name="Oval Copy 15" cx="3.194" cy="3.19" rx="3.194" ry="3.19" transform="translate(72.998 0)"></ellipse>
                                 </g>
                              </g>
                           </svg>
                        </div>
                        <div className="right-side">
                           <svg width="234.058" height="219.625" viewBox="0 0 234.058 219.625" className="triangle">
                              <path id="Path_11397" data-name="Path 11397" d="M15806.479,13498.023c-30.164,21.312-150.421,147.658-25.6,181.147,98.859,26.522,138.523,9.133,138.523,9.133a72.188,72.188,0,0,0,19.508-7.638c17.583-10.1,36.128-37.089-1.24-118.708C15879.829,13435.612,15836.643,13476.712,15806.479,13498.023Z" transform="translate(-15725.329 -13474.276)" fill="#caddeb" opacity="0.48"></path>
                           </svg>
                           <svg width="79.386" height="72.298" viewBox="0 0 79.386 72.298" className="square">
                              <g id="Group_9_Copy" data-name="Group 9 Copy" opacity="0.05">
                                 <g id="Group_8_Copy_2" data-name="Group 8 Copy 2">
                                    <ellipse id="Oval_Copy_10" data-name="Oval Copy 10" cx="3.194" cy="3.19" rx="3.194" ry="3.19" transform="translate(0 0)"></ellipse>
                                    <ellipse id="Oval_Copy_11" data-name="Oval Copy 11" cx="3.194" cy="3.19" rx="3.194" ry="3.19" transform="translate(14.6 0)"></ellipse>
                                    <ellipse id="Oval_Copy_12" data-name="Oval Copy 12" cx="3.194" cy="3.19" rx="3.194" ry="3.19" transform="translate(29.199 0)"></ellipse>
                                    <ellipse id="Oval_Copy_13" data-name="Oval Copy 13" cx="3.194" cy="3.19" rx="3.194" ry="3.19" transform="translate(43.799 0)"></ellipse>
                                    <ellipse id="Oval_Copy_14" data-name="Oval Copy 14" cx="3.194" cy="3.19" rx="3.194" ry="3.19" transform="translate(58.398 0)"></ellipse>
                                    <ellipse id="Oval_Copy_15" data-name="Oval Copy 15" cx="3.194" cy="3.19" rx="3.194" ry="3.19" transform="translate(72.998 0)"></ellipse>
                                 </g>
                                 <g id="Group_8_Copy_3" data-name="Group 8 Copy 3" transform="translate(0 11.341)">
                                    <ellipse id="Oval_Copy_10-2" data-name="Oval Copy 10" cx="3.194" cy="3.19" rx="3.194" ry="3.19" transform="translate(0 0)"></ellipse>
                                    <ellipse id="Oval_Copy_11-2" data-name="Oval Copy 11" cx="3.194" cy="3.19" rx="3.194" ry="3.19" transform="translate(14.6 0)"></ellipse>
                                    <ellipse id="Oval_Copy_12-2" data-name="Oval Copy 12" cx="3.194" cy="3.19" rx="3.194" ry="3.19" transform="translate(29.199 0)"></ellipse>
                                    <ellipse id="Oval_Copy_13-2" data-name="Oval Copy 13" cx="3.194" cy="3.19" rx="3.194" ry="3.19" transform="translate(43.799 0)"></ellipse>
                                    <ellipse id="Oval_Copy_14-2" data-name="Oval Copy 14" cx="3.194" cy="3.19" rx="3.194" ry="3.19" transform="translate(58.398 0)"></ellipse>
                                    <ellipse id="Oval_Copy_15-2" data-name="Oval Copy 15" cx="3.194" cy="3.19" rx="3.194" ry="3.19" transform="translate(72.998 0)"></ellipse>
                                 </g>
                                 <g id="Group_8_Copy_4" data-name="Group 8 Copy 4" transform="translate(0 21.973)">
                                    <ellipse id="Oval_Copy_10-3" data-name="Oval Copy 10" cx="3.194" cy="3.19" rx="3.194" ry="3.19" transform="translate(0 0)"></ellipse>
                                    <ellipse id="Oval_Copy_11-3" data-name="Oval Copy 11" cx="3.194" cy="3.19" rx="3.194" ry="3.19" transform="translate(14.6 0)"></ellipse>
                                    <ellipse id="Oval_Copy_12-3" data-name="Oval Copy 12" cx="3.194" cy="3.19" rx="3.194" ry="3.19" transform="translate(29.199 0)"></ellipse>
                                    <ellipse id="Oval_Copy_13-3" data-name="Oval Copy 13" cx="3.194" cy="3.19" rx="3.194" ry="3.19" transform="translate(43.799 0)"></ellipse>
                                    <ellipse id="Oval_Copy_14-3" data-name="Oval Copy 14" cx="3.194" cy="3.19" rx="3.194" ry="3.19" transform="translate(58.398 0)"></ellipse>
                                    <ellipse id="Oval_Copy_15-3" data-name="Oval Copy 15" cx="3.194" cy="3.19" rx="3.194" ry="3.19" transform="translate(72.998 0)"></ellipse>
                                 </g>
                                 <g id="Group_8_Copy_5" data-name="Group 8 Copy 5" transform="translate(0 32.605)">
                                    <ellipse id="Oval_Copy_10-4" data-name="Oval Copy 10" cx="3.194" cy="3.19" rx="3.194" ry="3.19" transform="translate(0 0)"></ellipse>
                                    <ellipse id="Oval_Copy_11-4" data-name="Oval Copy 11" cx="3.194" cy="3.19" rx="3.194" ry="3.19" transform="translate(14.6 0)"></ellipse>
                                    <ellipse id="Oval_Copy_12-4" data-name="Oval Copy 12" cx="3.194" cy="3.19" rx="3.194" ry="3.19" transform="translate(29.199 0)"></ellipse>
                                    <ellipse id="Oval_Copy_13-4" data-name="Oval Copy 13" cx="3.194" cy="3.19" rx="3.194" ry="3.19" transform="translate(43.799 0)"></ellipse>
                                    <ellipse id="Oval_Copy_14-4" data-name="Oval Copy 14" cx="3.194" cy="3.19" rx="3.194" ry="3.19" transform="translate(58.398 0)"></ellipse>
                                    <ellipse id="Oval_Copy_15-4" data-name="Oval Copy 15" cx="3.194" cy="3.19" rx="3.194" ry="3.19" transform="translate(72.998 0)"></ellipse>
                                 </g>
                                 <g id="Group_8_Copy_6" data-name="Group 8 Copy 6" transform="translate(0 43.945)">
                                    <ellipse id="Oval_Copy_10-5" data-name="Oval Copy 10" cx="3.194" cy="3.19" rx="3.194" ry="3.19" transform="translate(0 0)"></ellipse>
                                    <ellipse id="Oval_Copy_11-5" data-name="Oval Copy 11" cx="3.194" cy="3.19" rx="3.194" ry="3.19" transform="translate(14.6 0)"></ellipse>
                                    <ellipse id="Oval_Copy_12-5" data-name="Oval Copy 12" cx="3.194" cy="3.19" rx="3.194" ry="3.19" transform="translate(29.199 0)"></ellipse>
                                    <ellipse id="Oval_Copy_13-5" data-name="Oval Copy 13" cx="3.194" cy="3.19" rx="3.194" ry="3.19" transform="translate(43.799 0)"></ellipse>
                                    <ellipse id="Oval_Copy_14-5" data-name="Oval Copy 14" cx="3.194" cy="3.19" rx="3.194" ry="3.19" transform="translate(58.398 0)"></ellipse>
                                    <ellipse id="Oval_Copy_15-5" data-name="Oval Copy 15" cx="3.194" cy="3.19" rx="3.194" ry="3.19" transform="translate(72.998 0)"></ellipse>
                                 </g>
                                 <g id="Group_8_Copy_7" data-name="Group 8 Copy 7" transform="translate(0 54.577)">
                                    <ellipse id="Oval_Copy_10-6" data-name="Oval Copy 10" cx="3.194" cy="3.19" rx="3.194" ry="3.19" transform="translate(0 0)"></ellipse>
                                    <ellipse id="Oval_Copy_11-6" data-name="Oval Copy 11" cx="3.194" cy="3.19" rx="3.194" ry="3.19" transform="translate(14.6 0)"></ellipse>
                                    <ellipse id="Oval_Copy_12-6" data-name="Oval Copy 12" cx="3.194" cy="3.19" rx="3.194" ry="3.19" transform="translate(29.199 0)"></ellipse>
                                    <ellipse id="Oval_Copy_13-6" data-name="Oval Copy 13" cx="3.194" cy="3.19" rx="3.194" ry="3.19" transform="translate(43.799 0)"></ellipse>
                                    <ellipse id="Oval_Copy_14-6" data-name="Oval Copy 14" cx="3.194" cy="3.19" rx="3.194" ry="3.19" transform="translate(58.398 0)"></ellipse>
                                    <ellipse id="Oval_Copy_15-6" data-name="Oval Copy 15" cx="3.194" cy="3.19" rx="3.194" ry="3.19" transform="translate(72.998 0)"></ellipse>
                                 </g>
                                 <g id="Group_8_Copy_8" data-name="Group 8 Copy 8" transform="translate(0 65.918)">
                                    <ellipse id="Oval_Copy_10-7" data-name="Oval Copy 10" cx="3.194" cy="3.19" rx="3.194" ry="3.19" transform="translate(0 0)"></ellipse>
                                    <ellipse id="Oval_Copy_11-7" data-name="Oval Copy 11" cx="3.194" cy="3.19" rx="3.194" ry="3.19" transform="translate(14.6 0)"></ellipse>
                                    <ellipse id="Oval_Copy_12-7" data-name="Oval Copy 12" cx="3.194" cy="3.19" rx="3.194" ry="3.19" transform="translate(29.199 0)"></ellipse>
                                    <ellipse id="Oval_Copy_13-7" data-name="Oval Copy 13" cx="3.194" cy="3.19" rx="3.194" ry="3.19" transform="translate(43.799 0)"></ellipse>
                                    <ellipse id="Oval_Copy_14-7" data-name="Oval Copy 14" cx="3.194" cy="3.19" rx="3.194" ry="3.19" transform="translate(58.398 0)"></ellipse>
                                    <ellipse id="Oval_Copy_15-7" data-name="Oval Copy 15" cx="3.194" cy="3.19" rx="3.194" ry="3.19" transform="translate(72.998 0)"></ellipse>
                                 </g>
                              </g>
                           </svg>
                        </div>
                     </div>
                     <div className="login">
                        <div className="left-section" style={{ backgroundImage: 'url(../../../../images/login-bg.svg)' }}>
                        <img name="bg-image" src="../../../../images/login-wallpaper.svg"/>
                        </div>
                        <div className="right-section">
                        <svg width="122.654" height="183.879" viewBox="0 0 122.654 183.879" className="bubble">
                              <defs className="bubble">
                              </defs>
                              <g transform="translate(-858.423 -246.694) rotate(-8)">
                                 <circle className="a" cx="36" cy="36" r="36" transform="translate(841 481)"></circle>
                                 <circle className="a" cx="19" cy="19" r="19" transform="translate(815 369)"></circle>
                              </g>
                           </svg>                           <section>
                              <div className="login-logo">
                              <img src="../../../../images/logo.png" name='logo' />
                                 </div>
                              <div className="main-login">
                                 <form  className="login-form" autoComplete="off" onSubmit={ this.handleLoginSubmit }>
                                    <div className="form-group top"><label>Email / username</label><input id="test" className="login-forminput"  type="text" name="username" value={ username } onChange={ this.handleChange }/>
                                    <p className="error">{ usernameError }</p>
                                    </div>
                                    <div className="form-group top">
                                       <label>Password</label>
                                       <input className="login-forminput"  
                                       type={ showPassword ? 'text' : 'password' }
                                       name="password" value={ password }
                                       onChange={ this.handleChange }/>
                                       <p className="error">{ passwordError }</p>
                                       <EyeIcon
                                          dispatchFunction={ this.togglPasswordIcon }
                                          showPassword={ showPassword }
                                       />
                                    </div>
                                    <button className="default-bbt"><span>Login</span></button>
                                 </form>
                                 
                                 <form className="google-login" >
                                   <GoogleLogin
                                   clientId={ clientId }
                                   buttonText="Join with Google"
                                   onSuccess={this.responseGoogleSuccess}
                                   onFailure={this.responseGoogleFailure}
                                   cookiePolicy={'single_host_origin'}
                                   className='google-bbt'
                                   prompt="select_account"
                                   />
                                 </form>
                              </div>
                           </section>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
        )
    }
} 
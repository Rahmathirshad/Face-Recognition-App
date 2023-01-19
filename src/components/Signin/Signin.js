import React, { useState } from 'react'

const Signin = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // getting email & password from local storage
    const userEmail = localStorage.getItem('email')
        ? localStorage.getItem('email') : 'admin@admin.com';
    const userPaswrd = localStorage.getItem('password')
        ? localStorage.getItem('password') : 'admin';

    // handle submit function
    const handleSubmit = (e) => {
        e.preventDefault();
        if((email === userEmail && password === userPaswrd ) || (email === 'admin@admin.com' && password === 'admin')){
            props.onRouteChange('homePage');
        }
        else{
            alert("Invalid Email OR Password")
        }
        
    }

    return (

        <main className="main br2 ph4 pv4 shadow-2 w-30-l center w-60-m">
            <form className="center">
                <fieldset id="sign_up" className="ba b--transparent ph0 mh0 pb4">
                    <legend className="f2 fw6 ph0 mh0 pb4">Sign In</legend>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                        <input
                            className="pa2 br2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                            type="email" name="email-address"
                            id="email-address"
                            
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mv3">
                        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                        <input
                            className="b br2 pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                            type="password"
                            name="password"
                            id="password"
                            
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                    {/* Master email & Password */}
                    <div className='tl '>
                        <p>Login by entering below Email & Password or create own by clicking on Registor </p>
                        <p>email: admin@admin.com</p>
                        <p>password:  admin</p>
                    </div>
                </fieldset>
                <div className="pb2">
                    <input
                        className="b br3 ph3 pv2 input-reset ba b--black bg-transparent grow pointer f5 dib"
                        type="submit"
                        value="Sign in"
                        //onClick={() => props.onRouteChange('homePage')}
                        onClick={handleSubmit}
                    />
                </div>
                <div className="lh-copy mt3 b">
                    <a
                        href="#0"
                        className="f6 link dim black db"
                        onClick={() => props.onRouteChange('register')}
                    >
                        Registor
                    </a>
                    
                </div>
            </form>
        </main>

    )
}

export default Signin
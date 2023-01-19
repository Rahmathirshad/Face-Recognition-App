import React, { useState } from 'react'

const Register = (props) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    // form submit handler
    const handleSubmit = (e) => {
        e.preventDefault();
        if ((email === "") && ( password === '')){
            alert("Enter Email & Password Correctly")
        }
        else{
            localStorage.setItem('email',email)
            localStorage.setItem('password',password)
            props.onRouteChange('signin')
        }
    };

    return (
        <article className="br2 ph4 pv4 w-30-l w-60-m center shadow-2">
            <form action="sign-up_submit" method="get" acceptCharset="utf-8" >
                <fieldset id="sign_up" className="ba b--transparent ph0 mh0" >
                    <legend className="f2 fw6 ph0 mh0 pb4">Registor</legend>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email address</label>
                        <input 
                        className="pa2 br2 input-reset ba bg-transparent w-100 measure" 
                        type="email" 
                        name="email-address" 
                        id="email-address"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                         />
                    </div>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                        <input 
                        className="b br2 pa2 input-reset ba bg-transparent" 
                        type="password" 
                        name="password" 
                        id="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                         />
                    </div>
                </fieldset>
                <div className="mt3">
                    <input
                        className="b br3 ph3 pv2 input-reset ba b--black bg-transparent grow pointer f5 dib"
                        type="submit"
                        value="Registor"
                        //onClick={() => { props.onRouteChange('signin') }}
                        onClick={handleSubmit}
                    />
                </div>
                
            </form>
        </article >
    )
}

export default Register
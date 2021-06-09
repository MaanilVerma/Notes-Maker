import React, { useState } from "react";
import { useAuth } from "../Hooks/useAuth";
import Form from "./Form";
import { Redirect as RedirectComp } from "react-router-dom";

const Login = () => {
    const { user } = useAuth();
    const [option, setOption] = useState(1);

    return (
        <>
            {user && <RedirectComp to="/dashboard" />}
            <div className="login-container">
                <div className="login-title">Notes Maker</div>
                <header>
                    <div
                        className={
                            "header-headings " +
                            (option === 1 ? "sign-in" : option === 2 ? "sign-up" : "forgot")
                        }>
                        <span>Sign in to your account</span>
                        <span>Create an account</span>
                        <span>Reset your password</span>
                    </div>
                </header>
                <ul className="options">
                    <li className={option === 1 ? "active" : ""} onClick={() => setOption(1)}>
                        Sign in
                    </li>
                    <li className={option === 2 ? "active" : ""} onClick={() => setOption(2)}>
                        Sign up
                    </li>
                    <li className={option === 3 ? "active" : ""} onClick={() => setOption(3)}>
                        Forgot
                    </li>
                </ul>
                <Form option={option} />
            </div>
        </>
    );
};

export default Login;

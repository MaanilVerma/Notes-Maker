
import React, { useRef, useState } from 'react'
import { useAuth } from '../Hooks/useAuth'
import Alert from "@material-ui/lab/Alert";

const Form = ({ option }) => {
    const {signup,signin,sendPasswordResetEmail}=useAuth();
    const emailRef=useRef()
    const passwordRef=useRef()
    const passwordConfirmRef = useRef();

    const [error, setError] = useState("");
    const [submitLoading, setSubmitLoading] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        if (option === 1) {
            try {
                setSubmitLoading(true);
                setError("");
                const result = await signin(emailRef.current.value, passwordRef.current.value);
                if (result) {
                    emailRef.current.value = "";
                    passwordRef.current.value = "";
                    setSubmitLoading(false);
                }
            } catch (error) {
                setSubmitLoading(false);
                setError(error.message);
            }
        } else if (option === 2) {
            if (passwordRef.current.value !== passwordConfirmRef.current.value) {
                return setError("Passwords do not match.");
            } else if (passwordRef.current.value.length < 6) {
                return setError("Password should be greater or equal to 6 characters.");
            } else {
                setError(null);
            }
            try {
                setError("");
                setSubmitLoading(true);
                const result = await signup(emailRef.current.value, passwordRef.current.value);
                console.log("signup result", result);
                if (result.user) {
                    emailRef.current.value = "";
                    passwordConfirmRef.current.value = "";
                    passwordRef.current.value = "";
                    setSubmitLoading(false);
                }
            } catch (error) {
                setSubmitLoading(false);
                setError(error.message);
            }
        } else if (option === 3) {
            console.log("voila");
            sendPasswordResetEmail(emailRef.current.value);
            emailRef.current.value = "";
        }
    };

    const fillGuestCreds = (e) => {
        e.preventDefault();
        emailRef.current.value = "maanil@notesmaker.com";
        passwordRef.current.value = "maanil";
    };

    return (
        <form className="account-form" onSubmit={handleSubmit}>
            <div
                className={
                    "account-form-fields " +
                    (option === 1 ? "sign-in" : option === 2 ? "sign-up" : "forgot")
                }>
                <input
                    ref={emailRef}
                    id="email"
                    name="email"
                    type="email"
                    placeholder="E-mail"
                    required
                />
                <input
                    ref={passwordRef}
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Password"
                    required={option === 1 || option === 2 ? true : false}
                    disabled={option === 3 ? true : false}
                />
                <input
                    ref={passwordConfirmRef}
                    id="repeat-password"
                    name="repeat-password"
                    type="password"
                    placeholder="Repeat password"
                    required={option === 2 ? true : false}
                    disabled={option === 1 || option === 3 ? true : false}
                />
            </div>
            {error && <Alert severity="error">{error}</Alert>}
            <button disabled={submitLoading} className="btn-submit-form" type="submit">
                {submitLoading
                    ? "Loading..."
                    : option === 1
                    ? "Sign in"
                    : option === 2
                    ? "Sign up"
                    : "Reset password"}
            </button>
            <button
                disabled={submitLoading || option !== 1}
                className="btn-submit-form"
                onClick={fillGuestCreds}>
                Guest Account
            </button>
        </form>
    )
};
export default Form;

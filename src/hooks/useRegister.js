import { register } from "../utils/api";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

function useRegister(defaultValue = '') {
    const navigate = useNavigate();

    const [name, setName] = useState(defaultValue);
    const [email, setEmail] = useState(defaultValue);
    const [password, setPassword] = useState(defaultValue);
    const [passwordConfirmation, setPasswordConfirmation] = useState(defaultValue);

    const onChangeName = (event) => {
        setName(event.target.value);
    };

    const onChangeEmail = (event) => {
        setEmail(event.target.value);
    };

    const onChangePassword = (event) => {
        setPassword(event.target.value);
    };

    const onChangePasswordConfirmation = (event) => {
        setPasswordConfirmation(event.target.value);
    };

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        if (password !== passwordConfirmation) {
            alert("Passwords don't match");
            return;
        }
        const response = await register({ name, email, password })
        const { error } = response;
        if (error) {
            return;
        }
        navigate('/');
    };

    return [
        name, onChangeName, email, onChangeEmail, password, onChangePassword, passwordConfirmation, onChangePasswordConfirmation, onSubmitHandler
    ];
}

export default useRegister;
import { useState } from 'react';

function useLogin(defaultValue = '') {
    const [email, setEmail] = useState(defaultValue);
    const [password, setPassword] = useState(defaultValue);

    const onChangeEmail = (event) => {
        setEmail(event.target.value);
    };

    const onChangePassword = (event) => {
        setPassword(event.target.value);
    };


    return [email, onChangeEmail, password, onChangePassword];
}

export default useLogin;
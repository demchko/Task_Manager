import React, {Dispatch, FC, useState} from 'react';
import {Button, Flex, FormControl, FormErrorMessage, FormHelperText, FormLabel, Heading, Input} from "@chakra-ui/react";
import axios from "axios";
import {IUser} from "../store/IUser";
import {useDispatch} from "react-redux";

const LoginForm: FC = () => {

    const [login, setLogin] = useState('');
    const [passwd, setPasswd] = useState('');
    const dispatch:Dispatch<any> = useDispatch();

    const isErrorLogin = login === '';
    const isErrorPasswd = passwd === '';

    const loginLogic = async() => {
        const response = await axios.get('./users.json');
        const user = response.data.find((item: IUser) => item.username === login && item.password === passwd);
        if(user){
            localStorage.setItem('auth', 'true');
            localStorage.setItem('username', user.username);
            dispatch({type: "Set_Auth", payload: true});
            dispatch({type: "Set_User", payload: user as IUser});
        }
    }

    return (
        <Flex justifyContent='center' className='h100' alignItems='center' >
            <FormControl width='50%' isInvalid={isErrorLogin || isErrorPasswd}>
                <Heading>Login</Heading>
                <FormLabel>Username</FormLabel>
                <Input type='text' value={login} onChange={e => setLogin(e.target.value)} />
                {isErrorLogin && <FormErrorMessage>Email is required.</FormErrorMessage>}
                <FormLabel>Password</FormLabel>
                <Input type='password' value={passwd} onChange={e => setPasswd(e.target.value)} />
                {isErrorPasswd && <FormErrorMessage>Password is required.</FormErrorMessage>}
                <Button onClick={loginLogic} mt='3%' marginLeft='80%' width='20%' backgroundColor='#61dafb' >Submit</Button>
            </FormControl>
        </Flex>
    );
};

export default LoginForm;
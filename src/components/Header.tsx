import React, {Dispatch, FC} from 'react';
import {Flex, Button, Box, Text} from "@chakra-ui/react";
import {useDispatch, useSelector} from "react-redux";
import {useTypedSelector} from "../hooks/UseTypedSelector";
import {IUser} from "../store/IUser";

const Header: FC = () => {

    const {auth, user} = useTypedSelector(state => state.AuthReducer);
    const dispatch: Dispatch<any> = useDispatch();

    const logout = () => {
        dispatch({type: "Set_User", payload: {} as IUser});
        dispatch({type: "Set_Auth", payload: false});
        localStorage.removeItem('auth');
        localStorage.removeItem('username');
    }

    return (
        <Flex className='header' justifyContent='flex-end' alignItems='center' pr='5%'  >
            {
                auth
                    ?
                        <Flex alignItems='center' >
                            <Text mr='5%' >{user.username}</Text>
                            <Button onClick={() => logout()} >Вийти</Button>
                        </Flex>
                    : <Button>Логін</Button>
            }
        </Flex>
    );
};

export default Header;
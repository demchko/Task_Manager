import React, {Dispatch, FC, useEffect, useState} from 'react';
import {
    Button,
    Flex,
    Heading,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    FormControl,
    FormLabel,
    Input,
    ModalFooter,
    useDisclosure, Select, Text
} from "@chakra-ui/react";
import {useTypedSelector} from "../hooks/UseTypedSelector";
import axios from "axios";
import {IUser} from "../store/IUser";
import {ITasks} from "../store/ITasks";
import {useDispatch} from "react-redux";

const CreateTask: FC = () => {
    const {isOpen, onClose, onOpen} = useDisclosure();
    const [users, setUsers] = useState<IUser[]>([]);

    const [title, setTitle] = useState<string>('');
    const titleEr = title === '';
    const [descr, setDescr] = useState<string>('');
    const descrEr = descr === '';
    const [performer, setPerformer] = useState<string>('');
    const err = performer === '';
    
    const dispatch:Dispatch<any> = useDispatch();
    const fetchUsers = async() => {
        const response = await axios.get('./users.json');
        setUsers(response.data);
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    const saveTask = () => {
        if(!titleEr && !descrEr && !err){
            const task = {
                id: Date.now(),
                title,
                description: descr,
                performer
            }

            dispatch({type: "Set_Task", payload: task});
            onClose();
        }
    }

    return (
        <div>
            <Flex justifyContent='space-between'  alignItems='flex-end' >
                <Heading color='#61dafb' >Tasker</Heading>
                <Button bg='#61dafb' onClick={onOpen} >New</Button>
                <Modal
                    isOpen={isOpen}
                    onClose={onClose}
                >
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Create your account</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody pb={6}>
                            <FormControl >
                                <FormLabel>Title</FormLabel>
                                <Input value={title} onChange={e =>  setTitle(e.target.value)} placeholder='Title' />
                                {titleEr && <Text color='red' >Title cannot be empty</Text>}
                            </FormControl>

                            <FormControl mt={4}>
                                <FormLabel>Description</FormLabel>
                                <Input value={descr} onChange={e => setDescr(e.target.value)} placeholder='Description' />
                                {descrEr && <Text color='red' >Description cannot be empty</Text>}
                            </FormControl>
                            <FormControl mt={4}>
                                <FormLabel>Performer</FormLabel>
                                <Select value={performer} onChange={e => setPerformer(e.target.value)} >
                                    <option value="" disabled>Select a performer</option>
                                    {
                                        users.map(item => (
                                            <option key={item.username} value={item.username}>{item.username}</option>
                                        ))
                                    }
                                </Select>
                                {
                                    err && <Text color='red' >Select performer</Text>
                                }
                            </FormControl>
                        </ModalBody>

                        <ModalFooter>
                            <Button onClick={saveTask} colorScheme='blue' mr={3}>
                                Save
                            </Button>
                            <Button onClick={onClose}>Cancel</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </Flex>
        </div>
    );
};

export default CreateTask;
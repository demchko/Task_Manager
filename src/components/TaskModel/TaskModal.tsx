import React, {Dispatch, FC, SetStateAction, useEffect, useState} from 'react';
import {useTypedSelector} from "../../hooks/UseTypedSelector";
import {ITasks} from "../../store/ITasks";
import {Heading, Text, Flex, Box, Button, FormControl, FormLabel, Input} from "@chakra-ui/react";
import './TaskModal.css';
import {useDispatch} from "react-redux";

export interface TaskModalProps{
    task: ITasks;
    modal: boolean;
    setModal: Dispatch<SetStateAction<boolean>>
}

const TaskModal: FC<TaskModalProps> = ({task, modal, setModal}) => {

    const [edit, setEdit] = useState(false);
    const [t, setT] = useState(task as ITasks);

    useEffect(() => {
        setT(task);
    }, [task])

    const [title, setTitle] = useState('');
    const [descr, setDescr] = useState('');


    const dispatch = useDispatch();
    const remove = () => {
        dispatch({type: "Remove_Task", payload: task});
        setModal(false);
    }

    const editTask = () => {
        dispatch({type: "Edit_Task", payload: {id: task.id, title: title, description: descr}});
        setT({id: t.id, title, description: descr, performer: t.performer});
        setEdit(false);
        setTitle('');
        setDescr('');
    }

    return (
        <div className={modal ? 'modal active' : 'modal'} onClick={() => setModal(false)} >
            <div className='modalContent' onClick={e => e.stopPropagation()} >
                {
                    edit
                    ? <FormControl>
                            <FormLabel>Edit title</FormLabel>
                            <Input value={title} onChange={e => setTitle(e.target.value)} placeholder='edit title' />
                            <FormLabel>Edit description</FormLabel>
                            <Input value={descr} onChange={e => setDescr(e.target.value)} placeholder='edit description' />
                            <Flex justifyContent='space-between' >
                                <Button mt='10' bg='red' color='white' onClick={() => setEdit(false)} >Скасувати</Button>
                                <Button bg='#61dafb' mt='10' onClick={editTask} >Підтвердити</Button>
                            </Flex>
                        </FormControl>
                    : <Box>
                            <Flex justifyContent='space-between' alignItems='center' >
                                <Box>
                                    <Heading fontSize='40px' >{t.title}</Heading>
                                    <Text color='grey' mt='-2' fontSize='22px' >{t.performer}</Text>
                                </Box>
                                <Button onClick={() => remove()}  bg='red' color='white' borderRadius='100%' >X</Button>
                            </Flex>
                            <Flex >
                                <Text fontSize='22px' mr='2' fontWeight='bold' >Description:</Text>
                                <Text fontSize='22px' >{t.description}</Text>
                            </Flex>
                            <Button mt='10' bg='#61dafb' onClick={() => setEdit(!edit)} >Редагувати</Button>
                        </Box>
                }
            </div>
        </div>
    );
};

export default TaskModal;
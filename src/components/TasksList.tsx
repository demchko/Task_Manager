import React, {FC, useState} from 'react';
import {Box, Button, Flex, Text, Heading} from "@chakra-ui/react";
import {useTypedSelector} from "../hooks/UseTypedSelector";
import { useNavigate} from "react-router-dom";
import {ITasks} from "../store/ITasks";
import {useDispatch} from "react-redux";
import TaskModal from "./TaskModel/TaskModal";

const TasksList:FC = () => {

    const {tasks} = useTypedSelector(state => state.TasksReducer);
    const {user} = useTypedSelector(state => state.AuthReducer);

    const [modal, setModal] = useState(false);
    const [task, setTask] = useState({} as ITasks);

    const dispatch = useDispatch();
    const nav = useNavigate();
    const yourTask = (tasks as ITasks[]).filter(item => item.performer === user.username);
    const remainTasks = (tasks as ITasks[]).filter(item => item.performer !== user.username);

    const open = (item: ITasks) => {
        setModal(!modal);
        setTask(item);
    }

    const remove = (e: React.MouseEvent, item: ITasks) => {
        e.stopPropagation();
        dispatch({type: "Remove_Task", payload: item})
    }

    return (
        <Box>
            <Heading>Ваші завдання</Heading>
            <TaskModal task={task} modal={modal} setModal={setModal} />
            {
                yourTask.length
                    ? yourTask.map(item => (
                        <Flex onClick={() => open(item)} cursor='pointer' mt='2%' p='1%' border='1px solid lightgrey' boxShadow='2px 2px 2px lightgrey' justifyContent='space-between' alignItems='center' >
                            <Box>
                                <Text>{item.title}</Text>
                                <Text>{item.performer}</Text>
                            </Box>
                            <Button onClick={e => remove(e, item)} bg='red' color='white' borderRadius='100%' >X</Button>
                        </Flex>
                    ))
                    : <Text mb='5%' >Створіть ваше перше завдання</Text>
            }
            <Heading>Завдання інших</Heading>
            {
                remainTasks.length
                    ? remainTasks.map(item => (
                        <Flex onClick={() => open(item)} cursor='pointer' mt='2%' p='1%' border='1px solid lightgrey' boxShadow='2px 2px 2px lightgrey' justifyContent='space-between' alignItems='center' >
                            <Box>
                                <Text>{item.title}</Text>
                                <Text>{item.performer}</Text>
                            </Box>
                            <Button onClick={e => remove(e, item)}  bg='red' color='white' borderRadius='100%' >X</Button>
                        </Flex>
                    ))
                    : <Text>Створіть перше завдання для колеги</Text>
            }
        </Box>
    );
};

export default TasksList;
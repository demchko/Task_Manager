import React from 'react';
import {Box, Button, Flex, Heading} from "@chakra-ui/react";
import CreateTask from "../components/CreateTask";
import TasksList from "../components/TasksList";

const Main = () => {
    return (
        <Box pl='5%' pr='5%' pt='1%' >
            <CreateTask />
            <TasksList />
        </Box>
    );
};

export default Main;
import {
    useToast,
    Box,
    HStack,
    VStack,
    Text,
    Spacer,
    StackDivider,
    IconButton,
    Stack
} from '@chakra-ui/react';
import React,{useState, useEffect} from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import { FaTrash, FaEdit,FaPlus } from "react-icons/fa";

const UserList = () => {

    const [users, setUsers] = useState([]);
    const toast = useToast();

    useEffect(() => {
        getUsers();
    },[]);

    const getUsers = async() => {
        const response = await axios.get('http://localhost:2000/users');
        console.log(response.data);
        setUsers(response.data);
    }

    const deleteUser = async(id) => {
        try {
            await axios.delete(`http://localhost:2000/users/${id}`);
            toast({
                title:"User has been deleted",
                status:"success",
                duration:3000,
                isClosable:false
            });
            getUsers();
        } catch (error) {
            toast({
                title:"There is something error while executing this command",
                status:"error",
                duration:3000,
                isClosable:false
            });
        }
    }
    
    return (
            <>
                <VStack
                    divider={<StackDivider />}
                    borderColor={"gray.100"}
                    borderWidth={"2px"}
                    padding={"4"}
                    borderRadius={"lg"}
                    width={"100%"}
                    alignItems={"stretch"}
                    maxW={{ base: "90vw", sm: "80vw", lg: "50vw", xl: "40vw" }}
                >
                    <HStack>
                        <Link to={'add'}>
                            <IconButton
                                icon={<FaPlus />}
                                isRound={"true"}
                                size={'sm'}
                                cursor={'pointer'}
                                ></IconButton>
                        </Link>
                    </HStack>
                    {users.map((user, index) => (
                        <HStack key={user.id}>
                                <Link to={`view/${user.id}`}>
                                    <Text fontSize={'small'} p={2}>{index + 1}</Text>
                                </Link>
                                <Box p={2} display={'flex'} alignItems={'center'} justifyContent={'center'}>
                                    <Link to={`view/${user.id}`}>
                                        <Text fontSize={'small'}>{user.name}</Text>
                                    </Link>
                                </Box>
                                <Box p={2} display={'flex'} alignItems={'center'} justifyContent={'center'}>
                                    <Text fontSize={'small'}>{user.email.length > 12 ? user.email.substring(0, 12) + "..." : user.email}</Text>
                                </Box>
                                <Spacer />
                                <Text fontSize={'small'}>{user.gender}</Text>
                            <Stack>
                                <HStack>
                                <Link to={`edit/${user.id}`}>
                                    <IconButton
                                        icon={<FaEdit />}
                                        isRound={"true"}
                                        size={'sm'}
                                        cursor={'pointer'}
                                    ></IconButton>
                                </Link>
                                    <IconButton
                                        icon={<FaTrash />}
                                        isRound={"true"}
                                        size={'sm'}
                                        cursor={'pointer'}
                                        onClick={() => deleteUser(user.id)}
                                    ></IconButton>
                                </HStack>
                            </Stack>
                        </HStack>
                    ))}
                </VStack>
            </>
    );
}

export default UserList;

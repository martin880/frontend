import React,{useState} from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Box, FormControl, FormLabel, Input, FormHelperText, Container, Select, Button, useToast, HStack } from '@chakra-ui/react';

const AddUser = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState('Male');
    
    const navigate = useNavigate();
    const toast = useToast();

    const saveUser = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:2000/users/v1", {
                name, email, gender
            });
            toast({
                title:"User has been created",
                status:"success",
                duration:3000,
                isClosable:false
            });
            navigate("/");
        } catch (error) {
            toast({
                title:"There is error when input user",
                status:'error',
                duration:3000,
                isClosable:false
            });
            console.log(error);
        }
    }

    return (
        <Container>
            <form onSubmit={saveUser}>
                <FormControl isRequired>
                    <FormLabel>Name</FormLabel>
                    <Input type='text' value={name} onChange={(e) => setName(e.target.value)} />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Email address</FormLabel>
                    <Input type='email' value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <FormHelperText>We'll never share your email.</FormHelperText>
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Gender</FormLabel>
                    <Select placeholder='Select Gender' value={gender} onChange={(e) => setGender(e.target.value)}>
                        <option value={'Male'}>Male</option>
                        <option value={'Female'}>Female</option>
                    </Select>
                </FormControl>
                <Box mt={2}>
                    <HStack>
                        <Button size={'sm'} w={'20%'} type='submit' colorScheme='twitter'>Save</Button>
                        <Button size={'sm'} w={'20%'} colorScheme='orange'>
                            <Link to={'/'}>Cancel</Link>
                        </Button>
                    </HStack>
                </Box>
            </form>
        </Container>
    );
}

export default AddUser;

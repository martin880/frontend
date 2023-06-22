import React,{useState, useEffect} from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Box,FormControl, FormLabel, Input, FormHelperText, Container, Select, Button, useToast, HStack } from '@chakra-ui/react';

const EditUser = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState('Male');
    
    const navigate = useNavigate();
    const toast = useToast();
    const {id} = useParams();

    useEffect(() => {
        getUserById();
    },[]);

    const updateUser = async (e) => {
        e.preventDefault();
        try {
            await axios.patch(`http://localhost:2000/users/${id}`, {
                name, email, gender
            });
            toast({
                title:"User has been updated",
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
    };

    const getUserById = async () => {
        const response = await axios.get(`http://localhost:2000/users/${id}`);
        setName(response.data.name);
        setEmail(response.data.email);
        setGender(response.data.gender);
    }

    return (
        <Container>
            <form onSubmit={updateUser}>
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
                        <Button size={'sm'} w={'20%'} type='submit' colorScheme='twitter'>Update</Button>
                        <Button size={'sm'} w={'20%'} colorScheme={'orange'}><Link to={'/'}>Cancel</Link></Button>
                    </HStack>
                </Box>
            </form>
        </Container>
    );
}

export default EditUser;

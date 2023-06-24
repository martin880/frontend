import {
    Heading,
    Avatar,
    Box,
    Center,
    Image,
    Flex,
    Text,
    Stack,
    Button,
    useColorModeValue
  } from '@chakra-ui/react';
import React,{useState, useEffect} from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
  
  export default function ProfileUser() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState('');
    const [image, setImages] = useState('https://fakeimg.pl/350x200/');
    const [saveImage, setSaveImage] = useState(null);
    
    const {id} = useParams();

    const handleUploadChange = (e) => {
        console.log(e.target.files[0]);
    }

    useEffect(() => {
        getUserById();
    },[]);

    const getUserById = async () => {
        const response = await axios.get(`http://localhost:2000/users/${id}`);
        setName(response.data.name);
        setEmail(response.data.email);
        setGender(response.data.gender);
    }

    return (
      <Center py={4}>
            <Box
            maxW={'300px'}
            w={'full'}
            bg={useColorModeValue('white', 'gray.800')}
            boxShadow={'2xl'}
            rounded={'md'}
            overflow={'hidden'}>
            <Image
                h={'120px'}
                w={'full'}
                src={
                'https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
                }
                objectFit={'cover'}
            />
            <Flex justify={'center'} mt={-12}>
                <Avatar
                size={'xl'}
                src={image}
                alt={'Author'}
                css={{
                    border: '2px solid white',
                }}
                mb={4}
                pos={'relative'}
                _after={{
                    content: '""',
                    w: 4,
                    h: 4,
                    bg:'green',
                    border: '2px solid white',
                    rounded: 'full',
                    pos: 'absolute',
                    bottom: 0,
                    right: 2,
                    cursor:"pointer",
                }}
                onChange={handleUploadChange}
                />
            </Flex>
            <Box p={6}>
                <Stack spacing={0} align={'center'} mb={5}>
                <Heading display={'flex'} fontSize={'lg'} fontWeight={500} fontFamily={'body'} alignItems={'center'}>
                    {name}
                </Heading>
                    <Text fontSize={'sm'} color={'gray.500'}>{email}</Text>
                    <Text color={'gray.500'}>{gender}</Text>
                </Stack>
    
                <Stack direction={'row'} justify={'center'} spacing={6}>
                <Stack spacing={0} align={'center'}>
                    <Text fontWeight={600}>23k</Text>
                    <Text fontSize={'sm'} color={'gray.500'}>
                    Followers
                    </Text>
                </Stack>
                <Stack spacing={0} align={'center'}>
                    <Text fontWeight={600}>23k</Text>
                    <Text fontSize={'sm'} color={'gray.500'}>
                    Followed
                    </Text>
                </Stack>
                </Stack>
                    <Link to={'/'}>
                        <Button
                            w={'full'}
                            mt={8}
                            bg={('#151f21', 'gray.900')}
                            color={'white'}
                            rounded={'md'}
                            _hover={{
                                transform: 'translateY(-2px)',
                                boxShadow: 'lg',
                            }}>
                            Back to Home
                        </Button>
                    </Link>
                </Box>
            </Box>
      </Center>
    );
  }
// import { FaSun, FaMoon } from "react-icons/fa";
import {Heading, VStack} from "@chakra-ui/react";

import React from 'react';

const Title = () => {
    
    return (
        <VStack p={2}>
			<Heading
				mb={"4"}
				fontWeight={"extrabold"}
				size={"2xl"}
				bgGradient={"linear(to-l, blue.600, blue.300, purple.500)"}
				bgClip={"text"}
			>
				CRUD Application
			</Heading>
	</VStack>
    );
}

export default Title;

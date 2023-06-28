import {BrowserRouter, Routes, Route} from "react-router-dom";
import UserList from "./components/UserList";
import AddUser from "./components/AddUser";
import EditUser from "./components/EditUser";
import ProfileUser from "./components/ProfileUser";
import Title from "./components/Title";
import Navbar from "./components/Navbar";
import {VStack} from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from 'react-query'


function App() {

const queryClient = new QueryClient();

  return (
		<>
		<QueryClientProvider client={queryClient}>
			<Navbar/>
			<Title/>
			<VStack p={4}>
				<BrowserRouter>
						<Routes>
							<Route path="/" element={<UserList/>}/>
							<Route path="add" element={<AddUser/>}/>
							<Route path="edit/:id" element={<EditUser/>}/>
							<Route path="view/:id" element={<ProfileUser/>}/>
						</Routes>
				</BrowserRouter>
			</VStack>
		</QueryClientProvider>
		</>
  );
}

export default App;

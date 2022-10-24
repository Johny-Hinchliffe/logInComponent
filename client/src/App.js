import { useContext, useEffect, useState, createContext } from 'react'
import { Link, BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import { Box } from '@mui/material'

import { MainStore } from './contexts/MainContext'
//import { UserStore } from './contexts/UserContext'
import { basicTheme } from './Theme'

//import UserContext from './contexts/UserContext'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import ForgotPassword from './components/ForgotPassword'
import ResponsiveAppBar from './components/ResponsiveAppBar'

import Homepage from './components/Homepage'
import Protected from './components/Protected'
import Loading from './components/Loading'

import vars from './vars'

//User Context
export const UserContext = createContext([]);



function App() {
	const [user, setUser] = useState({});
	//const { user, setUser } = useContext(UserContext)
	const [loading, setLoading] = useState(true);
	const [nav, setNav] = useState(true);


	

	 // First thing, check if a refreshtoken exist
	 useEffect(() => {
		async function checkRefreshToken() {
		  const result = await (await fetch('http://localhost:4000/refresh_token', {
			method: 'POST',
			credentials: 'include', // Needed to include the cookie
			headers: {
			  'Content-Type': 'application/json',
			}
		  })).json();
		  if(!result.accesstoken){
			return setLoading(false)
		  } else{

			  console.log(result)
			  setUser({
				  accesstoken: result.accesstoken,
				});
				setLoading(false)
			}
		}
		checkRefreshToken();
		
	  }, []);

	  useEffect(() => {
		console.log('setting nav', HideNav())
		setNav(HideNav())
	  },[])
	  
	  const HideNav = () => {
		const location = window.location.pathname
		if(location === '/login' || location === '/register' || location === '/forgot-password'){
			return true
		}else return false
	  }

	  



	

	//const navigate = useNavigate()

	// const logOutCallback = async () => {
	// 	await fetch('http://localhost:4000/logout', {
	// 	  method: 'POST',
	// 	  credentials: 'include', // Needed to include the cookie
	// 	});
	// 	// Clear user from context
	// 	setUser({});
	// 	// Navigate back to startpage
	// 	navigate('/');
	//   }
	// const location = useLocation().pathname

	return (
		<div className="App">
			<BrowserRouter>
			<UserContext.Provider value={[user, setUser]}>

				{/* <UserStore> */}
					<MainStore>
						<ThemeProvider theme={basicTheme}>
							{loading ? <Loading/> : 
							<>
							{nav ? null : <ResponsiveAppBar/>}
							<Routes>
								<Route path="/" element={<Homepage/>} />
								<Route path="/login" element={<SignIn />} />
								<Route path="/register" element={<SignUp />} />
								<Route path="/forgot-password" element={<ForgotPassword />} />
							</Routes>
							</>
							}
						</ThemeProvider>
					</MainStore>
			</UserContext.Provider>
				{/* </UserStore> */}
			</BrowserRouter>
		</div>
	)
}

export default App

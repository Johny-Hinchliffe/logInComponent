import { useContext, useEffect, useState } from 'react'
import { Link, BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'

import { MainStore } from './contexts/MainContext'
import { UserStore } from './contexts/UserContext'
import { basicTheme } from './Theme'

import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import ForgotPassword from './components/ForgotPassword'

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<UserStore>
					<MainStore>
						<ThemeProvider theme={basicTheme}>
							<Routes>
								<Route path="/" element={<div>Homepage</div>} />
								<Route path="/sign-in" element={<SignIn />} />
								<Route path="/sign-up" element={<SignUp />} />
								<Route path="/forgot-password" element={<ForgotPassword />} />
							</Routes>
						</ThemeProvider>
					</MainStore>
				</UserStore>
			</BrowserRouter>
		</div>
	)
}

export default App

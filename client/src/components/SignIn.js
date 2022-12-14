import { useEffect, useState } from 'react'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'

import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'

import { validate } from 'email-validator'

import { Link, useNavigate } from 'react-router-dom'
import { useContext } from 'react'

import { UserContext } from '../App'

import { Copyright } from './Copyright'
import vars from '../vars'

export default function SignIn() {
	const [user, setUser] = useContext(UserContext)

	const [emailError, setEmailError] = useState(false)
	const [passwordError, setPasswordError] = useState(false)
	const [wrongDetails, setWrongDetails] = useState(false)
	const [loggedIn, setLoggedIn] = useState(true)

	let navigate = useNavigate()

	useEffect(() => {
		async function fetchProtected() {
			const result = await (
				await fetch('http://localhost:4000/', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						authorization: `Bearer ${user.accesstoken}`,
					},
				})
			).json()
			if (result.data) {
				navigate('/')
				setLoggedIn(true)
			} else setLoggedIn(false)
		}
		fetchProtected()
	}, [])

	if(user.accesstoken) navigate('/')

	const handleSubmit = (event) => {
		event.preventDefault()
		const data = new FormData(event.currentTarget)

		setEmailError(!validate(data.get('email')))
		setPasswordError(data.get('password').length < 8)

		if (emailError || passwordError) {
			return
		} else {
			const email = data.get('email')
			const password = data.get('password')

			const sendData = async () => {
				const result = await (
					await fetch('http://localhost:4000/login', {
						method: 'POST',
						credentials: 'include', // Needed to include the cookie
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({
							email,
							password,
						}),
					})
				).json()

				if (result.accesstoken) {
					setUser({
						accesstoken: result.accesstoken,
					})
					// return navigate('/')
				} else if (
					result.error === 'User does not exist' ||
					result.error === 'Password not correct'
				) {
					setWrongDetails(true)
				} else console.log('uncontrolled error', result.error)
			}

			sendData()

			// setUser( {
			// 	email: data.get('email'),
			// 	password: data.get('password'),
			// 	remember: data.get('remember'),
			// })
		}
	}

	if (loggedIn) return <div></div>

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<Box
				sx={{
					marginTop: 8,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				{vars.signLogo}
				<Typography component="h1" variant="h5">
					Sign in
				</Typography>
				<Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
					<TextField
						margin="normal"
						required
						fullWidth
						id="email"
						label="Email Address"
						name="email"
						autoComplete="email"
						autoFocus
						error={emailError || wrongDetails}
						helperText={
							emailError
								? 'Please enter a valid email'
								: wrongDetails
								? 'Email or Password is incorrect'
								: null
						}
						onChange={() => {
							setWrongDetails(false)	
							setEmailError(false)
						}}
					/>
					<TextField
						margin="normal"
						required
						fullWidth
						name="password"
						label="Password"
						type="password"
						id="password"
						autoComplete="current-password"
						error={passwordError || wrongDetails}
						helperText={
							passwordError
								? 'Password must be atleast 8 characters'
								: wrongDetails
								? 'Email or Password is incorrect'
								: null
						}
						onChange={() => {
							setWrongDetails(false)
							setPasswordError(false)
						}}
					/>
					<FormControlLabel
						control={
							<Checkbox value="remember" color="primary" name="remember" />
						}
						label="Remember me"
					/>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						sx={{ mt: 3, mb: 2 }}
					>
						Sign In
					</Button>
					<Grid container>
						<Grid item xs>
							<Link to="/forgot-password" variant="body2">
								Forgot password?
							</Link>
						</Grid>
						<Grid item>
							<Link to="/register" variant="body2">
								{"Don't have an account? Sign Up"}
							</Link>
						</Grid>
					</Grid>
				</Box>
			</Box>
			<Copyright sx={{ mt: 8, mb: 4 }} />
		</Container>
	)
}

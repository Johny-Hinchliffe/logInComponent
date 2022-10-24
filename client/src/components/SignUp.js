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

import {UserContext} from '../App'
import vars from '../vars'
import { Copyright } from './Copyright'


// Added notes
//// Thank you for signing up page 
//// Show password

export default function SignUp() {
	const [ user, setUser ] = useContext(UserContext)
	const [emailError, setEmailError] = useState(false)
	const [passwordError, setPasswordError] = useState(false)
	const [firstNameError, setFirstNameError] = useState(false)
	const [lastNameError, setLastNameError] = useState(false)
	const [emailExists, setEmailExists] = useState(false)

	const navigate = useNavigate()

	const handleSubmit = (event) => {
		event.preventDefault()
		const data = new FormData(event.currentTarget)

		setEmailError(!validate(data.get('email')))
		setPasswordError(data.get('password').length < 8)
		setFirstNameError(
			!/^[a-zA-Z]+$/.test(data.get('firstName')) ||
				data.get('firstName').length < 1
		)
		setLastNameError(
			!/^[a-zA-Z]+$/.test(data.get('lastName')) ||
				data.get('lastName').length < 1
		)

		if (emailError || passwordError || firstNameError || lastNameError) {
			return
		} else {
			const sendData = async (e) => {
				const result = await (
					await fetch('http://localhost:4000/register', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({
							firstName: data.get('firstName'),
							lastName: data.get('lastName'),
							email: data.get('email'),
							password: data.get('password'),
							marketing: data.get('marketing'),
							signedUp: Date.now(),
						}),
					})
				).json()

				if (!result.error) {
					console.log('result', result)
					//setSubmitted(true)
				} else if (result.error === 'User already exist') {
					setEmailExists(true)
				} else console.log(result.error)
			}

			sendData()
			// Thank you for making an account etc
			navigate('/login')
		}
	}

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
					Sign up
				</Typography>
				<Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={6}>
							<TextField
								autoComplete="given-name"
								name="firstName"
								required
								fullWidth
								id="firstName"
								label="First Name"
								autoFocus
								error={firstNameError}
								helperText={firstNameError ? 'Enter last name' : null}
								onChange={() => setFirstNameError(false)}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								required
								fullWidth
								id="lastName"
								label="Last Name"
								name="lastName"
								autoComplete="family-name"
								error={lastNameError}
								helperText={lastNameError ? 'Enter first name' : null}
								onChange={() => setLastNameError(false)}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								required
								fullWidth
								id="email"
								label="Email Address"
								name="email"
								autoComplete="email"
								error={emailError || emailExists}
								helperText={
									emailError
										? 'Please enter a valid email'
										: emailExists
										? 'This email is already in use'
										: null
								}
								onChange={() => {
									setEmailError(false)
									setEmailExists(false)
								}}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								required
								fullWidth
								name="password"
								label="Password"
								type="password"
								id="password"
								autoComplete="new-password"
								error={passwordError}
								helperText={
									passwordError ? 'Password must be atleast 8 characters' : null
								}
								onChange={() => setPasswordError(false)}
							/>
						</Grid>
						<Grid item xs={12}>
							<FormControlLabel
								control={
									<Checkbox
										value="allowExtraEmails"
										color="primary"
										name="marketing"
									/>
								}
								label="I want to receive inspiration, marketing promotions and updates via email."
							/>
						</Grid>
					</Grid>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						sx={{ mt: 3, mb: 2 }}
					>
						Sign Up
					</Button>
					<Grid container justifyContent="flex-end">
						<Grid item>
							<Link to="/login" variant="body2">
								Already have an account? Sign in
							</Link>
						</Grid>
					</Grid>
				</Box>
			</Box>
			<Copyright sx={{ mt: 5 }} />
		</Container>
	)
}

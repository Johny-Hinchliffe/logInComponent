import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import { Link as MuiLink } from '@mui/material'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'

import { Link } from 'react-router-dom'
import { useContext } from 'react'

import UserContext from '../contexts/UserContext'
import vars from '../vars'
import { Copyright } from './Copyright'

export default function ForgotPassword() {
	const { user, setUser } = useContext(UserContext)

	const handleSubmit = (event) => {
		event.preventDefault()
		const data = new FormData(event.currentTarget)
		setUser({
			forgotPassUser: {
				email: data.get('email'),
			},
		})
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
					Reset Password
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
						Reset Password
					</Button>
					<Grid container>
						<Grid item xs>
							<MuiLink href="/sign-up" variant="body2">
								Don't have an account?
							</MuiLink>
						</Grid>
						<Grid item>
							<Link to="/sign-in" variant="body2">
								Remembered your password?
							</Link>
						</Grid>
					</Grid>
				</Box>
			</Box>
			<Copyright sx={{ mt: 8, mb: 4 }} />
		</Container>
	)
}

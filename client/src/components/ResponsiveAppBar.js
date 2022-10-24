import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import AdbIcon from '@mui/icons-material/Adb'

import { useNavigate } from 'react-router-dom'
import { useContext, useState, useEffect } from 'react'
import { UserContext } from '../App'

import vars from '../vars'

const pagesLoggedIn = ['Products', 'Pricing', 'Blog']

const settingsLoggedIn = ['Profile', 'Account', 'Dashboard', 'Logout']
const settingsLoggedOut = ['Login']

function ResponsiveAppBar() {
	const [user, setUser] = useContext(UserContext)
	const [anchorElNav, setAnchorElNav] = useState(null)
	const [anchorElUser, setAnchorElUser] = useState(null)
	const [settings, setSettings] = useState(settingsLoggedOut)

	const navigate = useNavigate()

	const LogOutCallback = async () => {
		await fetch('http://localhost:4000/logout', {
			method: 'POST',
			credentials: 'include', // Needed to include the cookie
		})
		// Clear user from context
		setUser({})
		// Navigate back to startpage
		navigate('/')
		window.location.reload()
	}

	useEffect(() => {
		user.accesstoken
			? setSettings(settingsLoggedIn)
			: setSettings(settingsLoggedOut)
		console.log(user.accesstoken)
	}, [user])

	const handleOpenNavMenu = (event) => {
		setAnchorElNav(event.currentTarget)
	}
	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget)
	}

	const handleCloseNavMenu = () => {
		setAnchorElNav(null)
	}

	const handleCloseUserMenu = () => {
		setAnchorElUser(null)
	}

	const avatarClick = (el) => {
		if (el === 'Logout') {
			LogOutCallback()
		}
		if (el === 'Login') {
			navigate('/login')
      window.location.reload()

		}
	}

	return (
		<AppBar position="static">
			<Container maxWidth="xl">
				<Toolbar disableGutters>
					<AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
					<Typography
						variant="h6"
						noWrap
						component="a"
						href="/"
						sx={{
							mr: 2,
							display: { xs: 'none', md: 'flex' },
							fontFamily: 'monospace',
							fontWeight: 700,
							letterSpacing: '.3rem',
							color: 'inherit',
							textDecoration: 'none',
						}}
					>
						LOGO
					</Typography>

					{user.accesstoken ? (
						<Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
							<IconButton
								size="large"
								aria-label="account of current user"
								aria-controls="menu-appbar"
								aria-haspopup="true"
								onClick={handleOpenNavMenu}
								color="inherit"
							>
								<MenuIcon />
							</IconButton>
							<Menu
								id="menu-appbar"
								anchorEl={anchorElNav}
								anchorOrigin={{
									vertical: 'bottom',
									horizontal: 'left',
								}}
								keepMounted
								transformOrigin={{
									vertical: 'top',
									horizontal: 'left',
								}}
								open={Boolean(anchorElNav)}
								onClose={handleCloseNavMenu}
								sx={{
									display: { xs: 'block', md: 'none' },
								}}
							>
								{pagesLoggedIn.map((page) => (
									<MenuItem key={page} onClick={handleCloseNavMenu}>
										<Typography textAlign="center">{page}</Typography>
									</MenuItem>
								))}
							</Menu>
						</Box>
					) : null}
					{vars.logo ? (
						<Box
							component="img"
							sx={{
								height: 150,

								maxHeight: { xs: 75, md: 100 },

								mb: 5,
							}}
							alt="Vanguard Sevices Limited Logo"
							src={vars.logo}
						/>
					) : (
						<>
							<AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
							<Typography
								variant="h5"
								noWrap
								component="a"
								href=""
								sx={{
									mr: 2,
									display: { xs: 'flex', md: 'none' },
									flexGrow: 1,
									fontFamily: 'monospace',
									fontWeight: 700,
									letterSpacing: '.3rem',
									color: 'inherit',
									textDecoration: 'none',
								}}
							>
								LOGO
							</Typography>
						</>
					)}
					<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
						{user.accesstoken
							? pagesLoggedIn.map((page) => (
									<Button
										key={page}
										onClick={handleCloseNavMenu}
										sx={{ my: 2, color: 'white', display: 'block' }}
									>
										{page}
									</Button>
							  ))
							: null}
					</Box>

					<Box sx={{ flexGrow: 0 }}>
						<Tooltip title="Open settings">
							<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
								<Avatar alt="" src="/static/images/avatar/2.jpg" />
							</IconButton>
						</Tooltip>
						<Menu
							sx={{ mt: '45px' }}
							id="menu-appbar"
							anchorEl={anchorElUser}
							anchorOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							open={Boolean(anchorElUser)}
							onClose={handleCloseUserMenu}
						>
							{settings.map((setting) => (
								<MenuItem key={setting} onClick={handleCloseUserMenu}>
									<Typography
										onClick={() => avatarClick(setting)}
										textAlign="center"
									>
										{setting}
									</Typography>
								</MenuItem>
							))}
						</Menu>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	)
}
export default ResponsiveAppBar

import React, { useEffect, useState, useContext } from 'react'
import { Container, CssBaseline } from '@mui/material'
import { UserContext } from '../App'

const Homepage = () => {
	// Could have something here to check for the time when the accesstoken expires
	// and then call the refresh_token endpoint to get a new accesstoken automatically
	const [user] = useContext(UserContext)
	const [content, setContent] = useState('You need to login')

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

			if (result.data) setContent(result.data)
		}
		fetchProtected()
	}, [user])



	return (
		<Container>
			<CssBaseline />
			{content}
		</Container>
	)
}

export default Homepage

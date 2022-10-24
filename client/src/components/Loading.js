import * as React from 'react'
import { Box, CircularProgress } from '@mui/material'

import vars from '../vars'
import {basicTheme} from '../Theme'

console.log(basicTheme.palette.primary.main)

export default function Loading() {
	return (
		<>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					height: '100vh',
                    flexDirection: 'column'
				}}
			>
				{vars.loadLogo}

				<CircularProgress size='150px' color="primary" />
			</Box>
		</>
	)
}

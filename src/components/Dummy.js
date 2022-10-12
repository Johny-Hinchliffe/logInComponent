import {useEffect} from 'react'
import { useContext } from 'react'
import MainContext from '../contexts/MainContext'

import { Button, Box, Typography } from '@mui/material/'

const Dummy = () => {
	const { allData,  setAllData } = useContext(MainContext)

    useEffect(() => {
        console.log(allData)
    },[allData])

	return (
		<>
        
			<Box
				sx={{
					marginTop: 8,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
                    justifyContent: 'space-between'
				}}
			>
                <Typography variant="h1">{allData[0].text}</Typography>
			
			</Box>
		</>
	)
}

export default Dummy

import Avatar from '@mui/material/Avatar'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Box from '@mui/material/Box'
import vslLogo from './images/vsl-logo.png'


const vars = {
	websiteLink: 'https://google.com/',
	websiteName: 'Your Website',
	signLogo: (
		<Box
        component="img"
        sx={{
          height: 150,
         
          maxHeight: { xs: 75, md: 100 },
      
		  mb: 5
        }}
        alt="Vanguard Sevices Limited Logo"
        src={vslLogo}
      />
	),
  //logo: vslLogo,
  loadLogo: (
		<Box
        component="img"
        sx={{
          height: 150,
         justifySelf: 'center',
         alignSelf: 'center',
          maxHeight: { xs: 150, md: 200 },
      
		  mb: 5
        }}
        alt="Vanguard Sevices Limited Logo"
        src={vslLogo}
      />
	),
}

export default vars

import Typography from '@mui/material/Typography';
import {Link as MuiLink} from '@mui/material';
import vars from '../vars'


export function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <MuiLink color="inherit" href={vars.websiteLink}>
        {vars.websiteName}
      </MuiLink>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


// import React from 'react';
// import { makeStyles } from '@mui/styles';
// import { Theme } from '@mui/material/styles';
// import Container from '@mui/material/Container';
// import Typography from '@mui/material/Typography';
// import Link from '@mui/material/Link';

// // A simple Copyright component.
// function Copyright(): JSX.Element {
//   return (
//     <Typography variant="body2" color="textSecondary" align="center">
//       {'Copyright © '}
//       <Link color="inherit" href="https://material-ui.com/">
//         Your Website
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }

// // Define styles using makeStyles with a typed Theme.
// const useStyles = makeStyles((theme: Theme) => ({
//   root: {
//     display: 'flex',
//     flexDirection: 'column',
//     minHeight: '100vh',
//   },
//   main: {
//     marginTop: theme.spacing(8),
//     marginBottom: theme.spacing(2),
//   },
//   footer: {
//     padding: theme.spacing(3, 2),
//     marginTop: 'auto',
//     // For MUI v4, theme.palette.type is used; for MUI v5, replace with theme.palette.mode
//     backgroundColor:
//       theme.palette.mode === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
//   },
// }));

// // StickyFooter component that uses our styles.
// export default function StickyFooter(): JSX.Element {
//   const classes = useStyles();

//   return (
//     <div className={classes.root}>
//       {/* You might include your main content here */}
//       <footer className={classes.footer}>
//         <Container maxWidth="sm">
//           <Typography variant="body1" align="center">
//             My sticky footer can be found here.
//           </Typography>
//           <Copyright />
//         </Container>
//       </footer>
//     </div>
//   );
// }

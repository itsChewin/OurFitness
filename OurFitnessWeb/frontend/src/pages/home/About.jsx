import React from 'react'
import { Typography } from '@mui/material'
function About() {
  return (
    <>
    <Typography variant="h4" component="h1" sx={{textAlign: 'center' , marginTop: '20px'}}>
        About us
    </Typography>
    <Typography variant='p' component="p" sx={{textAlign: 'center' , marginTop: '10px'}}>
        This is a project for the course "Software Engineering" at the University of Information Technology, VNU-HCM.
    </Typography>
    </>
  )
}

export default About
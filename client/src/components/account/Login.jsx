import { useState } from 'react';

import { Box, TextField, Button, styled, Typography } from '@mui/material';
import { API } from '../../service/api.js';
const Component = styled(Box)`
    width: 400px;
    margin: auto;
    box-shadow: 5px 2px 5px 2px rgb(0 0 0/ 0.6);
`
const Image = styled('img')(
    {
        width: 100,
        margin: 'auto',
        display: 'flex',
        padding: '50px 0 0 0'
    }
)


const Wrapper = styled(Box)`
    padding: 25px 35px;
    display: flex;
    flex:1;
    flex-direction: column;
    &>div,&>button,&>p{
    margin-top:20px
    }
`

const LoginButton = styled(Button)`
    text-transform:none;
    background:#fb641b;
    color:#fff;
    height:40px;
    border-radius:10px  
`
const SignUpButton = styled(Button)`
    text-transform:none;
    background:#fff;
    color:#2874f0;
    height:40px;
    border-radius:10px;
    box-shadow:0 2px 4px 0 rgb(0 0 0/ 20%);
`

const Text = styled(Typography)`
    color:#878787;
    font-size:16px;
    margin:auto;
    display:flex;
`
const SignupInitValues = {
    name: "",
    username: "",
    password: ""
}

const Login = () => {
    const loginLogo = 'https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png';


    const [account, toggleAccount] = useState('login');

    const [signup, setsignup] = useState(SignupInitValues);

    const toggleSignup = () => {
        account === 'signup' ? toggleAccount('login') : toggleAccount('signup');
    }

    const onTextChange = (e) => {
        setsignup({
            ...signup, [e.target.name]: e.target.value
        })
    }
    const signupUser =async () => {
        let response = await API.userSignup(signup);
    }

    return (
        <Component>
            <Box>
                <Image src={loginLogo} alt='login' />
                {
                    account === 'login' ?
                        <Wrapper>
                            <TextField variant="standard" label='Enter Username' />
                            <TextField variant="standard" label='Enter Password' />
                            <LoginButton variant="contained">Login</LoginButton>
                            <Text style={({ textAlign: 'centre' })}>
                                OR
                            </Text>
                            <SignUpButton onClick={() => toggleSignup()} variant="text">Create an Account</SignUpButton>
                        </Wrapper>

                        :
                        <Wrapper>
                            <TextField variant="standard" onChange={(e) => onTextChange(e)} name="name" label='Enter Name' />
                            <TextField variant="standard" onChange={(e) => onTextChange(e)} name="username" label='Enter Username' />
                            <TextField variant="standard" onChange={(e) => onTextChange(e)} name-="password" label='Enter Password' />
                            <SignUpButton variant="text" onClick={() => signupUser()}>SignUp</SignUpButton>
                            <Text style={({ textAlign: 'centre' })}>
                                OR
                            </Text>
                            <LoginButton onClick={() => toggleSignup()} variant="contained">Already Have an Account</LoginButton>
                        </Wrapper>
                }

            </Box>
        </Component>
    )
}

export default Login
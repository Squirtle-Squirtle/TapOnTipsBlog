import { useContext, useState } from 'react';

import { Box, TextField, Button, styled, Typography } from '@mui/material';
import { API } from '../../service/api.js';
import { DataContext } from '../../context/DataProvider.jsx';


import { useNavigate } from 'react-router-dom';
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
};

const LoginInitValues = {
    username: "",
    password: ""
};

const Error = styled(Typography)`
font-size: 10px;
color:#ff6161;
line-height:0;
margin-top: 10px;
font-weight:600;
`



const Login = ({isUserAuthenticated}) => {
    const loginLogo = 'https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png';


    const [account, toggleAccount] = useState('login');

    const [signup, setsignup] = useState(SignupInitValues);

    const [error, setError] = useState('');

    const toggleSignup = () => {
        account === 'signup' ? toggleAccount('login') : toggleAccount('signup');
    }

    const [login, setLogin] = useState(LoginInitValues);

    const {setAccount}=useContext(DataContext);
    const navigate=useNavigate();
    const onTextChange = (e) => {
        // console.log(e.target.name,e.target.value);
        setsignup({
            ...signup, [e.target.name]: e.target.value
        })
    }
    const signupUser = async () => {
        let response = await API.userSignup(signup);
        // console.log(`{Hello Res ${response}}`);
        if (response.isSucess) {
            setError('');
            setsignup(SignupInitValues);
            toggleAccount('login');

        }
        else {
            setError('Something Went Wrong!!!');
        }
    }

    const onValueChange = (e) => {
        // console.log(e.target.name,e.target.value);
        setLogin({ ...login, [e.target.name]: e.target.value })
    }

    const loginUser = async () => {
        let response = await API.userLogin(login);
        if(response.isSucess)
        {
            console.log(`Inside 1`);
            setError('');
            sessionStorage.setItem('accessToken',`Bearer ${response.data.accesstoken}`);
            sessionStorage.setItem('refreshToken',`Bearer ${response.data.refreshtoken}`);
            setAccount({username: response.data.username,name: response.data.name });
            navigate('/');
            isUserAuthenticated(true);
        }
        else
        {
            console.log(`Inside2`);
            setError('Something went Wrong!!');
        }
    }

    return (
        <Component>
            <Box>
                <Image src={loginLogo} alt='login' />
                {
                    account === 'login' ?
                        <Wrapper>
                            <TextField variant="standard" label='Enter Username' onChange={(e) => onValueChange(e)} name='username' />
                            <TextField variant="standard" label='Enter Password' onChange={(e) => onValueChange(e)} name='password' />
                            {
                                error && <Error>{error}</Error>
                            }
                            <LoginButton variant="contained" onClick={() => loginUser()}>Login</LoginButton>
                            <Text style={({ textAlign: 'centre' })}>
                                OR
                            </Text>
                            <SignUpButton onClick={() => toggleSignup()} variant="text">Create an Account</SignUpButton>
                        </Wrapper>

                        :
                        <Wrapper>
                            <TextField variant="standard" onChange={(e) => onTextChange(e)} name="name" label='Enter Name' required />
                            <TextField variant="standard" onChange={(e) => onTextChange(e)} name="username" label='Enter Username' required />
                            <TextField variant="standard" onChange={(e) => onTextChange(e)} name="password" label='Enter Password' required />
                            {
                                error && <Error>{error}</Error>
                            }
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
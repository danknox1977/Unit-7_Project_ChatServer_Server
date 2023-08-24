import React, { useRef } from 'react';
import { FormGroup, Input, Form, Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import FullButton from '../../buttons/FullButton';
import { baseURL } from '../../../environments'

// Login component to provide token from matching email and password
function Login({ updateToken }, {}) {

    const emailRef = useRef();
    const passwordRef = useRef();
    

    const navigate = useNavigate();

    const getUser = async () => {
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        const url = `${baseURL}/user/info`

            try {
      const res = await fetch(url, {
        method: 'GET',
        headers: {
            "Content-Type": 'application/json'
        },
      
    });

      const data = await res.json();

      console.log(data);

    } catch (err) {
      console.error(err.message)
    }

  
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

  
        let bodyObj = JSON.stringify({
            email, password
        })

        const url = `${baseURL}/user/login`;

        try {
            
            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json'
                },
                body: bodyObj
            })

            const data = await res.json();

          
            if (data.message === 'Success!') {
                updateToken(data.token)
                getUser()
                navigate('/room')
            } else {
                alert(data.message);
            }

        } catch (err) {
            console.error(err.message)
        }

       
    }

    return (
        <>
            <h2>Login</h2>
            <Form onSubmit={handleSubmit}>
                <FormGroup >
                    <Input
                        innerRef={emailRef}
                        type='email'
                        placeholder='you@email.com'
                    />
                </FormGroup>
                <FormGroup >
                    <Input
                        innerRef={passwordRef}
                        type='password'
                    />
                </FormGroup>
                <FullButton>
                    <Button type='submit'>Login</Button>
                </FullButton>
            </Form>
        </>
    )
}

export default Login
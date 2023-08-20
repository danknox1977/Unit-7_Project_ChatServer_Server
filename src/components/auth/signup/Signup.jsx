import React, { useRef } from 'react'
import { Button, Form, FormGroup, Input, Label } from 'reactstrap'
import FullButton from '../../buttons/FullButton';
import { useNavigate } from 'react-router-dom';

function Signup(props) {


    const userNameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();

    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
       
        const username = userNameRef.current.value;
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
      

        let body = JSON.stringify({
            username: username,
            email: email,
            password: password
        })


        const url = `http://127.0.0.1:4005/user/signup`;

        try {

            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json'
                },
                body: body

            });
            
            
            
            const data = await res.json();
         
            if(data.message === "Success!") {
                props.updateToken(data.token)
                navigate('/rooms');
            } else {
                alert(data.message)
            }

        } catch (err) {
            console.error(err.message);
        }
    }

    return (
        <>
            <h2>Signup</h2>
            <Form onSubmit={handleSubmit}>
                <FormGroup floating>
                    <Input
                        id='userNameSignup'
                        innerRef={userNameRef}
                        placeholder='your username here'
                        name='userName'
                        type='text'

                    />
                    <Label for='userNameSignup'>Username</Label>
                </FormGroup>
                <FormGroup>
                    <Label>email</Label>
                    <Input
                        innerRef={emailRef}
                        type='email'
                        placeholder='you@email.com'
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Password</Label>
                    <Input
                        innerRef={passwordRef}
                        type='password'
                    />
                </FormGroup>
                <FullButton>
                    <Button type='submit'>Signup</Button>
                </FullButton>
            </Form>
        </>
    )
}

export default Signup
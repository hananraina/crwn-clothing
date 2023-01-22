import { useState,useContext } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import './sign-up-form.styles.scss';
import Button from '../button/button.component.jsx';
import FormField from '../form-input/form-input.component'
import { UserContext } from "../../contexts/user.context.jsx";

const defaultFormFields={
    displayName:'',
    email:'',
    password:'',
    confirmPassword:''
}
const SignUpForm = () =>{
    const [formFields,setFormFields] = useState(defaultFormFields);
    const {displayName,email,password,confirmPassword}=formFields;
    
    const {setCurrentUser}=useContext(UserContext);

    const handleChange = (event) =>{
        const {name,value} = event.target;
        setFormFields({...formFields,[name]: value})
    }

    const handleSubmit = async (event)=>{
        event.preventDefault();

        if(password != confirmPassword){        
            alert("passwords dont match");
            return;
        }

        try{
            const {user} = await createAuthUserWithEmailAndPassword(email,password);
            await createUserDocumentFromAuth(user,{displayName})
            resetFields();
            setCurrentUser(user);
        }catch(error){
            if(error.code == 'auth/email-already-in-use')
                alert('Email already in use')
            console.log(error)
        }
    }

    const resetFields=()=>{
        setFormFields(defaultFormFields);
    }

    return (
        <div className="sign-up-container">
            <h2>Dont have an account?</h2>
            <span>Sign up with your email and password</span>
                <form onSubmit={handleSubmit}>
                   <FormField
                   label='Display Name'
                   name='displayName'
                   type='text'
                   onChange={handleChange}
                   value={displayName}
                   required
                   />
 
                   <FormField label='Email' type="email" value={email} onChange={handleChange} name='email' required/>

                   <FormField label='Password' type="password" value={password} onChange={handleChange} name='password' required/>

                   <FormField label='Confirm Password' type="password" value={confirmPassword} onChange={handleChange} name='confirmPassword' required/>

                   <Button type="submit">Sign Up</Button>
                </form>
        </div>
    )
}

export default SignUpForm;
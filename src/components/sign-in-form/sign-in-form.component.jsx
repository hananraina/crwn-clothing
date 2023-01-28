import { useState } from "react";
import { signInWithGooglePopup, createUserDocumentFromAuth, signInAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";
import Button,{BUTTON_TYPE_CLASSES} from '../button/button.component.jsx';
import FormField from '../form-input/form-input.component';
import { ButtonsContainer, SignInContainer } from "./sign-in-form.styles";


const defaultFormFields={
    email:'',
    password:'',
}
const SignInForm = () =>{
    const [formFields,setFormFields] = useState(defaultFormFields);
    const {email,password}=formFields;


    const signInWithGoogle= async () =>{
        await signInWithGooglePopup();
    }

    const handleChange = (event) =>{
        const {name,value} = event.target;
        setFormFields({...formFields,[name]: value})
    }

    const handleSubmit = async (event)=>{
        event.preventDefault();
        
        try{
            const {user} = await signInAuthUserWithEmailAndPassword(email,password);
            resetFields();
        }catch(error){
            switch(error.code){
                case 'auth/wrong-password':
                    alert('incorrect password');
                    break;
                case 'auth/user-not-found':
                    alert('No user found');
                    break;
                default:
                    console.log(error);
            }

        }
    }

    const resetFields=()=>{
        setFormFields(defaultFormFields);
    }

    return (
        <SignInContainer>
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
                <form onSubmit={handleSubmit}>
                   <FormField label='Email' type="email" value={email} onChange={handleChange} name='email' required/>
                   <FormField label='Password' type="password" value={password} onChange={handleChange} name='password' required/>
                   <ButtonsContainer>
                    <Button type="submit">Sign In</Button>
                    <Button buttonType={BUTTON_TYPE_CLASSES.google} type='button' onClick={signInWithGoogle}>Google Sign In</Button>
                   </ButtonsContainer>
                </form>
        </SignInContainer>
    )
}

export default SignInForm;
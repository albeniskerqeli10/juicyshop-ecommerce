import {Form} from 'react-bootstrap';


const TextInput = ({type,placeholder,value ,onChange ,label, name, required,controlId ,children}) => {
    return(
        <Form.Group controlId={controlId} >
        {children}
                <Form.Control name={name}  label={label} type={type} placeholder={placeholder} value={value} onChange={onChange} required ></Form.Control>
            </Form.Group>
    )
}

export default TextInput;
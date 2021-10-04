import {Form} from 'react-bootstrap';


const TextInput = ({type,placeholder,value ,onChange}) => {
    return(
        <Form.Group >
                <Form.Control type={type} placeholder={placeholder} value={value} onChange={onChange} required></Form.Control>
            </Form.Group>
    )
}

export default TextInput;
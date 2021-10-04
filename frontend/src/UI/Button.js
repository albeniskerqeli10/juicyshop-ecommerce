import {Button as ButtonBs} from 'react-bootstrap';

const Button = ({children ,type, onClick, variant, className , size,href , disabled ,as}) => {
    return(
        <ButtonBs type={type} variant={variant} className={className} onClick={onClick}  size={size} href={href} disabled={disabled} as={as}>{children}</ButtonBs>
    )
    }

    export default Button;
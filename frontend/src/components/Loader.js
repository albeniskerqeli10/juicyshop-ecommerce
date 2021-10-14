
import {Spinner} from 'react-bootstrap';


const Loader = () => {
    return(
        <Spinner animation="border" role="status" style={{
            width:"30px", height:"30px", margin:"auto", display:"flex",
        }}>
            <span className="sr-only">Loading</span>
        </Spinner>
    )
}
export default Loader;
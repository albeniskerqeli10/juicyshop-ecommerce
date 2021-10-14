import { useState, useEffect } from "react";
import { Row, Col, Image, ListGroup, Card, Form} from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "../components/Rating";
import Loader from '../components/Loader';
import Message from '../components/Message';

import {useDispatch ,useSelector} from 'react-redux';
import {listProductsDetails} from '../redux/actions/productActions.js';
import Button from "../UI/Button";
const ProductScreen = ({ history, match }) => {
  const [qty , setQty] = useState(1);
const productDetails = useSelector(state => state.productDetails);
const {product,error,loading} = productDetails;
const dispatch = useDispatch();

const addToCartHandler = (e) => {
 history.push(`/cart/${match.params.id}?qty=${qty}`)
}

useEffect(() => {
  dispatch(listProductsDetails(match.params.id));  
}, [dispatch, match])
  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>

      {loading?<Loader/>:error?<Message variant="danger">Error</Message> :<Row>
        <Col md={6}>
          <Image loading="lazy" src={product.image} alt={product.name} fluid />
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
              />
            </ListGroup.Item>
            <ListGroup.Item>Price:${product.price}</ListGroup.Item>
            <ListGroup.Item>Description: {product.description}</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>Price</Col>
                  <Col>
                    <strong>${product.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                  {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'};
                  </Col>
                </Row>
              </ListGroup.Item>
              {product.countInStock > 0 &&  (
                <ListGroup.Item>
                <Row>
                  <Col>Qty</Col>
                  <Col>
                    <Form.Control as="select" value={qty} onChange={e => setQty(e.target.value)}>
                    {
                      [...Array(product.countInStock).keys()].map(x => (
                      <option key={x+1} value={x+1}>
                       {x + 1}
                      </option>
                      ))
                    }
                    </Form.Control>
                  </Col>
                </Row>
                </ListGroup.Item>
              )}
              <ListGroup.Item>
              <Button className="btn-block" onClick={addToCartHandler} type="button" disabled={product.countInStock === 0}>Add To Cart</Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
      }
    </>
  );
};

export default ProductScreen;

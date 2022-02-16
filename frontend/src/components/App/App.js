import './App.css';
import React, { Fragment, useReducer, useState } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import CompanyList from '../companiesList';
import Navbar from 'react-bootstrap/Navbar';

const formReducer = (state, event) => {
  if (event.reset) {
    return {
      company_name: '',
      nit: '',
    }
  }
  return {
    ...state,
    [event.name]: event.value
  }
}

function App() {
  const [formData, setFormData] = useReducer(formReducer, {});

  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = event => {
    event.preventDefault();
    setSubmitting(true);

    axios('http://54.173.90.250/api/v1/company/', {
      method : "POST",
      headers: {"Content-Type": "application/json"},
      data: {
        company_name : formData.company_name,
        nit: formData.nit,
        address: formData.address,
        phone: formData.phone
      }
    })
    .then(res => {
      console.log(res);
      console.log(res.data);
      setSubmitting(false);
      setFormData({
        reset: true
      })
      window.location.reload();
    })
  }

  const handleChange = event => {
    const isCheckbox = event.target.type === 'checkbox';
    setFormData({
      name: event.target.name,
      value: isCheckbox ? event.target.checked : event.target.value,
    });
  }
  return (
    <Fragment>
      <Navbar bg="dark">
        <Navbar.Brand href="#home">
          <img
            src="https://litethinking.com/static/media/Logo_Lite_Thinking_Sin_Fondo.0aa257fa.png"
            width="120"
            height="60"
            className="d-inline-block align-top"
            alt="Lite Thinking logo"
          />
        </Navbar.Brand>
      </Navbar>
      <div className="wrapper">
        <CompanyList />
        <br></br>
        <h3>Agrega una nueva compa&ntilde;a</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group as={Row}>
            <Form.Label column sm="2">Nombre</Form.Label>
            <Col sm="8">
              <Form.Control size="md" disabled={submitting} placeholder="Ingresa el nombre de la compañia" type="text" name="company_name" onChange={handleChange} value={formData.company_name || ''} />
            </Col>
          </Form.Group>

          <Form.Group as={Row}>
            <Form.Label column sm="2">NIT</Form.Label>
            <Col sm="8">
              <Form.Control size="md" disabled={submitting} placeholder="Ingresa el Nit de la compañia" type="text" name="nit" onChange={handleChange} value={formData.nit || ''}></Form.Control>
            </Col>
          </Form.Group>

          <Form.Group as={Row}>
            <Form.Label column sm="2">Direcci&oacute;n</Form.Label>
            <Col sm="8">
              <Form.Control size="md" disabled={submitting} placeholder="Ingresa la dirección de la compañia" type="text" name="address" onChange={handleChange} value={formData.address || ''}></Form.Control>
            </Col>
          </Form.Group>

          <Form.Group as={Row}>
            <Form.Label column sm="2">Telefono</Form.Label>
            <Col sm="8">
              <Form.Control size="md" disabled={submitting} placeholder="Ingresa el telefono de la compañia" type="text" name="phone" onChange={handleChange} value={formData.phone || ''}></Form.Control>
            </Col>
          </Form.Group>
          {submitting && <div>
          Se est&aacute; agregando tu nueva compa&ntilde;ia:
          <ul>
            {Object.entries(formData).map(([name, value]) => (
              <li key={name}>{value.toString()}</li>
            ))}
          </ul>
        </div>}
          <Button variant="success" type="submit" disabled={submitting} size="lg">Agregar</Button>
        </Form>
      </div>
    </Fragment>
  );
}

export default App;

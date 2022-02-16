import React, { Fragment } from "react";
import axios from "axios";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';


export default class CompanyList extends React.Component {
    state = {
        companies: [],
        show: false,
        submitting: false,
        company_name : "",
        address : "",
        phone : "",
        nit : "",
    }
    loading = false;
    deleteCompany(event, id) {
        this.loading = true;
        axios(`http://54.173.90.250/api/v1/companyDelete/${id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        })
            .then(res => {
                console.log(res.data)
                this.loading = false;
                window.location.reload();
            }

            )
    }

    handleClose() {
        console.log("cerre")
        const show = false;
        console.log(this.state)
        this.setState({ show: show })
    }

    handleShow() {
        console.log("entre");
        const show = true;
        console.log(this.state.show)
        this.setState({ show: show })
    }

    handleSubmit = (event, id)=> {
        event.preventDefault();
        console.log(event.target)
        axios(`http://54.173.90.250/api/v1/company/${id}`, {
            method : "PUT",
            headers: {"Content-Type": "application/json"},
            data: {
              company_name : this.state.company_name || event.target[0].value,
              nit: this.state.nit || event.target[1].value,
              address: this.state.address || event.target[2].value,
              phone: this.state.phone || event.target[3].value
            }
          })
          .then(res => {
            console.log(res);
            console.log(res.data);
            window.location.reload();
          })
    }
    componentDidMount() {
        axios.get(`http://54.173.90.250/api/v1/company/`)
            .then(res => {
                const companies = res.data.results;
                this.setState({ companies })
            })
    }

    handleChange = event => {
          let value = event.target.value;
          this.setState({ [event.target.name] : value});
      }


    render() {
        return (
            <Fragment>
                <h3>Lista de compa&ntilde;ias</h3>
                {this.loading && <Spinner />}
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre de la compa&ntilde;ia</th>
                            <th>Direcci&oacute;n</th>
                            <th>NIT</th>
                            <th>Telefono</th>
                            <th>Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.companies.map(company => {
                                return (<tr key={company.id}>
                                    <td>{company.id}</td>
                                    <td>{company.company_name}</td>
                                    <td>{company.address}</td>
                                    <td>{company.nit}</td>
                                    <td>{company.phone}</td>
                                    <td><Button variant="danger" onClick={(e) => this.deleteCompany(e, company.id)}>Eliminar</Button></td>
                                    <td><Button variant="primary" onClick={() => this.handleShow()}>Actualizar</Button></td>

                                    <Modal
                                        show={this.state.show}
                                        onHide={() => this.handleClose()}
                                        backdrop="static"
                                        keyboard={false}
                                    >
                                        <Modal.Header closeButton>
                                            <Modal.Title>Actualizar compa&ntilde;ia</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <Form onSubmit={(e) => this.handleSubmit(e, company.id)}>
                                                <Form.Group as={Row}>
                                                    <Form.Label column sm="2">Nombre</Form.Label>
                                                    <Col sm="8">
                                                        <Form.Control size="md" disabled={this.state.submitting} placeholder="Ingresa el nombre de la compañia" type="text" name="company_name" defaultValue={company.company_name} onChange={this.handleChange} value={this.state.company_name || company.company_name}></Form.Control>
                                                    </Col>
                                                </Form.Group>

                                                <Form.Group as={Row}>
                                                    <Form.Label column sm="2">NIT</Form.Label>
                                                    <Col sm="8">
                                                        <Form.Control size="md" disabled={this.state.submitting} placeholder="Ingresa el Nit de la compañia" type="text" name="nit" defaultValue={company.nit || ''} onChange={this.handleChange} value={this.state.nit || company.nit} ></Form.Control>
                                                    </Col>
                                                </Form.Group>

                                                <Form.Group as={Row}>
                                                    <Form.Label column sm="2">Direcci&oacute;n</Form.Label>
                                                    <Col sm="8">
                                                        <Form.Control size="md" disabled={this.state.submitting} placeholder="Ingresa la dirección de la compañia" type="text" name="address" defaultValue={company.address || ''} onChange={this.handleChange} value={this.state.address || company.address}></Form.Control>
                                                    </Col>
                                                </Form.Group>

                                                <Form.Group as={Row}>
                                                    <Form.Label column sm="2">Telefono</Form.Label>
                                                    <Col sm="8">
                                                        <Form.Control size="md" disabled={this.state.submitting} placeholder="Ingresa el telefono de la compañia" type="text" name="phone" defaultValue={company.phone || ''} onChange={this.handleChange} value={this.state.phone || company.phone}></Form.Control>
                                                    </Col>
                                                </Form.Group>
                                                <Button variant="primary" type="submit" >Actualizar</Button>
                                            </Form>
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <Button variant="secondary" onClick={() => this.handleClose()}>
                                                Close
                                            </Button>
                                        </Modal.Footer>
                                    </Modal>
                                </tr>)
                            })
                        }
                    </tbody>
                </Table>
            </Fragment>
        )
    }
}
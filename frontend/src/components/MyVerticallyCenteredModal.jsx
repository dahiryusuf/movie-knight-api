import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import LinkPage from './LinkPage'
export default function MyVerticallyCenteredModal(props) {
  return (
    <div>
          <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Your Watch Party
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
       <LinkPage link = {props.link} ></LinkPage>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
    </div>
  )
}

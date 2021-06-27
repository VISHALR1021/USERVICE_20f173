import React from "react";
import { Form } from "react-bootstrap";

function Input(props) {
  return (
    <div>
      <Form.Group>
        <Form.Label>{props.lable}</Form.Label>
        <Form.Control
          lable={props.lable}
          type={props.type}
          placeholder={props.placeholder}
          value={props.value}
          onChange={props.onChange}
          as={props.as}
          rows={props.rows}
          name={props.name}
          required={true}
        />
        <Form.Text className="text-muted">{props.error}</Form.Text>
      </Form.Group>
    </div>
  );
}

export default Input;

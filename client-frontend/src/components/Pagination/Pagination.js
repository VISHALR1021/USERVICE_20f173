import React from "react";
import { Pagination } from "react-bootstrap";

export default function MyPagination(props) {
  return (
    <div>
      <Pagination style={{ justifyContent: "center" }}>
        <Pagination.First />
        <Pagination.Prev />

        <Pagination.Item>{10}</Pagination.Item>
        <Pagination.Item>{11}</Pagination.Item>
        <Pagination.Item active>{12}</Pagination.Item>
        <Pagination.Item>{13}</Pagination.Item>
        <Pagination.Item>{14}</Pagination.Item>

        <Pagination.Next />
        <Pagination.Last />
      </Pagination>
    </div>
  );
}

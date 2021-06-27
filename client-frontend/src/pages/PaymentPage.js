import React, { useState } from "react";
import { Button, Box } from "@material-ui/core";

function Payment() {
  const [checkout, setCheckout] = useState(false);

  return (
    <div>
      <div>
        <div
          class="container-lg shadow p-3 mb-5 bg-body rounded text-dark "
          style={{ marginTop: "6%", backgroundColor: "white" }}
        >
          <div style={{ marginTop: "2%" }}>
            <h3 className="text-center">PAYMENT</h3>
          </div>
          <br></br>
          <div class="container-sm   text-dark ">
            <h4>Project Title</h4>
            <p className="text-muted">
              Mern Stack Project for Student Management System
            </p>

            <h4>Job Description</h4>
            <p className="text-muted">
              Cam voluptatem placeat odit similique. Quis qui nam praesentium
              corrupti voluptatum voluptatem sed deserunt. Sequi veritatis sit
              consequatur minus optio. Soluta quia ullam quam illo et aut
              repellat. Cam voluptatem placeat odit similique. Quis qui nam
              praesentium corrupti voluptatum voluptatem sed deserunt. Sequi
              veritatis sit consequatur minus optio. Soluta quia ullam quam illo
              et aut repellat.Cam voluptatem placeat odit similique. Quis qui
              nam praesentium corrupti voluptatum voluptatem sed deserunt. Sequi
              veritatis sit consequatur minus optio. Soluta quia ullam quam illo
              et aut repellat.
            </p>
            <h4>Amount should Pay for this job</h4>
            <h1>$50.99</h1>
            <div></div>
            <div style={{ width: "100%" }}>
              <Box display="flex" flexDirection="row-reverse" p={1} m={1}>
                <Button variant="contained">Proceed to Pay</Button>
              </Box>
            </div>
            <br></br>
          </div>
        </div>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
      </div>
    </div>
  );
}

export default Payment;

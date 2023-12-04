import { Button, Result } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

function NotFound(props) {
  const navigate = useNavigate();
  return (
    <Result
      status="404"
      title="404"
      subTitle="Erorr 404 Halaman tidak ditemukan."
      extra={
        <Button
          style={{ background: "#ffffff", color: "#072754" }}
          type="primary"
          onClick={() => navigate("/")}
        >
          Back
        </Button>
      }
    />
  );
}

export default NotFound;

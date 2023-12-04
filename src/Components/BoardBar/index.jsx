import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function BoardBar(props) {
  const [user, setUser] = useState("");

  useEffect(() => {
    if (localStorage.getItem("user")) {
      let nameUser = JSON.parse(localStorage.getItem("user")).username;
      setUser(nameUser.split(" ")[nameUser.split(" ").length - 1]);
    } else {
      setUser("");
    }
  }, [user]);

  return (
    <Box
      sx={{
        pl: 2,
        backgroundColor: "#f1f2f4",
        width: "100%",
        height: (theme) => theme.trello.boardBarHeight,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        overflowX: "auto",
        color: "#000000",
        fontWeight: "bold",
        fontSize: "18px",
      }}
    >
      <span>{user ? `Board ${user}` : "Projek Daily Task Manajemen"}</span>
    </Box>
  );
}

export default BoardBar;

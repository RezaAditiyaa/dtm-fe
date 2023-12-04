import React, { useEffect, useRef, useState } from "react";
import { AiOutlineClose, AiOutlinePlus } from "react-icons/ai";
import { editBoard } from "../../Service/service";
import { editBoardContent } from "../../Utilities/variable";

function AddColumn(props) {
  const { board, setColumns, listColumns, columns } = props;
  const [isCreateColumn, setIsCreateColumn] = useState(false);
  const [titleColumn, setTitleColumn] = useState("");
  const addcolumnRef = useRef(null);
  //ENTER TO SUBMIT TO ADD NEW COLUMN
  const handleKeyPress = (e) => {
    let key = e.keyCode || e.which;
    if (key === 13) {
      e.preventDefault();
      addNewColumn();
    }
  };

  //HANDLE ADD COLUMN
  const addNewColumn = () => {
    if (!titleColumn.trim()) {
      return;
    }
    let newColumn = {
      id: "column-" + Date.now(),
      boardId: board.id,
      title: titleColumn.trim(),
      cardOrder: [`column-${Date.now()}-placeholder-card`],
      cards: [
        {
          id: `column-${Date.now()}-placeholder-card`,
          boardId: "board-1",
          columnId: "column-" + Date.now(),
          FE_PlaceholerCard: true,
        },
      ],
    };
    let newColumn2 = {
      id: "column-" + Date.now(),
      boardId: board.id,
      title: titleColumn.trim(),
      cardOrder: [],
      cards: [],
    };

    setColumns([...columns, newColumn]);
    listColumns.current.columns.push(newColumn2);
    listColumns.current.columnOrder.push(newColumn2.id);
    localStorage.setItem("listColumns", JSON.stringify(listColumns.current));
    setTitleColumn("");
    addcolumnRef.current.focus();

    //DATA TO CALL API
    if (localStorage.getItem("user")) {
      editBoardContent();
    }
  };

  useEffect(() => {
    isCreateColumn && addcolumnRef.current.focus();
  }, [isCreateColumn]);

  //HANDLE DELETE SIGLE CARD
  window.addEventListener("click", function (event) {
    if (!event.target.closest(`#add-column`)) {
      setIsCreateColumn(false);
    } else {
      setIsCreateColumn(true);
    }
  });

  return (
    <>
      {isCreateColumn ? (
        <div className="column" id="add-column">
          <div className="card card-edit">
            <textarea
              ref={addcolumnRef}
              placeholder="Masukan nama card"
              value={titleColumn}
              className="texarea"
              name=""
              id=""
              rows="3"
              cols="10"
              onChange={(e) => setTitleColumn(e.target.value)}
              onKeyDown={(e) => handleKeyPress(e)}
            ></textarea>
          </div>
          <div className="card-edit-save">
            <div className="card-add-btn" onClick={addNewColumn}
            style={{ backgroundColor: '#7b34c0' }}
            >
              Tambahkan Card
            </div>
            <div
              className="card-edit-save-x"
              onClick={() => setIsCreateColumn(false)}
            >
              <AiOutlineClose />
            </div>
          </div>
        </div>
      ) : (
        <div
          className="column bg-836d9e"
          style={{ backgroundColor: '#7b34c0' }}
          onClick={() => setIsCreateColumn(true)}
        >
          <div className="btn-add-column">
            <AiOutlinePlus />
            Tambahkan card
          </div>
        </div>
      )}
    </>
  );
}

export default AddColumn;

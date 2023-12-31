import React, { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  MouseSensor,
} from "@dnd-kit/core";

import {
  arrayMove,
  SortableContext,
  useSortable,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";

import Column2 from "./Column2";
import AddColumn from "./AddColumn";

const COLUMN_HEADER_HEIGHT = "50px";
const COLUMN_FOOTER_HEIGHT = "56px";
function ListColumns(props) {
  const { columns, listColumns, board, setColumns } = props;

  return (
    <>
      <Box
        sx={{
          bgcolor: "inherit",
          width: "100%",
          height: "100%",
          display: "flex",
          overflowX: "auto",
          overflowY: "hidden",

          "&::-webkit-scrollbar": {
            WebkitAppearance: "none",
            bgcolor: "#ffffff00",
            borderRadius: "5px",
          },

          "&::-webkit-scrollbar:horizontal": {
            height: "12px",
          },

          "&::-webkit-scrollbar-thumb": {
            bgcolor: "#f1f2f4",
            borderRadius: "5px",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "#ffffff",
            borderRadius: "5px",
            m: 2,
          },
        }}
      >
        <SortableContext
          strategy={horizontalListSortingStrategy}
          items={columns?.map((e) => e.id)}
        >
          {columns &&
            columns.length > 0 &&
            columns.map((column) => {
              return (
                <Column2
                  listColumns={listColumns}
                  key={column.id}
                  column={column}
                  columns={columns}
                  setColumns={setColumns}
                />
              );
            })}
        </SortableContext>
        <AddColumn
          board={board}
          setColumns={setColumns}
          listColumns={listColumns}
          columns={columns}
        />
      </Box>
    </>
  );
}

export default ListColumns;

import React, { useState } from "react";
import { Box, Grid, GridItem, Image, Text, Button } from "@chakra-ui/react";
import { FaChessPawn, FaChessRook, FaChessKnight, FaChessBishop, FaChessQueen, FaChessKing } from "react-icons/fa";

const Chess = () => {
  const [board, setBoard] = useState([
    ["br", "bn", "bb", "bq", "bk", "bb", "bn", "br"],
    ["bp", "bp", "bp", "bp", "bp", "bp", "bp", "bp"],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["wp", "wp", "wp", "wp", "wp", "wp", "wp", "wp"],
    ["wr", "wn", "wb", "wq", "wk", "wb", "wn", "wr"],
  ]);

  const [player, setPlayer] = useState("white");

  const getPiece = (piece) => {
    switch (piece) {
      case "bp":
        return <FaChessPawn color="black" />;
      case "br":
        return <FaChessRook color="black" />;
      case "bn":
        return <FaChessKnight color="black" />;
      case "bb":
        return <FaChessBishop color="black" />;
      case "bq":
        return <FaChessQueen color="black" />;
      case "bk":
        return <FaChessKing color="black" />;
      case "wp":
        return <FaChessPawn color="white" />;
      case "wr":
        return <FaChessRook color="white" />;
      case "wn":
        return <FaChessKnight color="white" />;
      case "wb":
        return <FaChessBishop color="white" />;
      case "wq":
        return <FaChessQueen color="white" />;
      case "wk":
        return <FaChessKing color="white" />;
      default:
        return null;
    }
  };

  const [selectedPiece, setSelectedPiece] = useState(null);

  const handleMove = (rowIndex, colIndex) => {
    if (selectedPiece) {
      const newBoard = [...board];
      const [fromRow, fromCol] = selectedPiece;
      newBoard[rowIndex][colIndex] = newBoard[fromRow][fromCol];
      newBoard[fromRow][fromCol] = "";
      setBoard(newBoard);
      setPlayer(player === "white" ? "black" : "white");
      setSelectedPiece(null);
    } else if (board[rowIndex][colIndex]) {
      setSelectedPiece([rowIndex, colIndex]);
    }
  };

  return (
    <Box>
      <Text fontSize="2xl" mb={4}>
        Chess Game
      </Text>
      <Grid templateColumns="repeat(8, 1fr)" gap={0} width="400px" height="400px">
        {board.map((row, rowIndex) =>
          row.map((col, colIndex) => (
            <GridItem key={`${rowIndex}-${colIndex}`} bg={(rowIndex + colIndex) % 2 === 0 ? "gray.100" : "gray.400"} display="flex" justifyContent="center" alignItems="center" fontSize="2rem" onClick={() => handleMove(rowIndex, colIndex)}>
              {getPiece(col)}
            </GridItem>
          )),
        )}
      </Grid>
      <Text mt={4}>Current Player: {player}</Text>
    </Box>
  );
};

export default Chess;

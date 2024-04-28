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

  const isValidMove = (fromRow, fromCol, toRow, toCol) => {
    const piece = board[fromRow][fromCol];
    const targetPiece = board[toRow][toCol];
    if (piece[0] === targetPiece[0]) return false;

    switch (piece) {
      case "bp":
        if (fromCol === toCol && (toRow === fromRow + 1 || (fromRow === 1 && toRow === 3 && board[2][fromCol] === "")) && targetPiece === "") return true;
        if (Math.abs(fromCol - toCol) === 1 && toRow === fromRow + 1 && targetPiece[0] === "w") return true;
        break;
      case "wp":
        if (fromCol === toCol && (toRow === fromRow - 1 || (fromRow === 6 && toRow === 4 && board[5][fromCol] === "")) && targetPiece === "") return true;
        if (Math.abs(fromCol - toCol) === 1 && toRow === fromRow - 1 && targetPiece[0] === "b") return true;
        break;
      default:
        return false;
    }
    return false;
  };

  const handleMove = (rowIndex, colIndex) => {
    if (selectedPiece && selectedPiece[0] === rowIndex && selectedPiece[1] === colIndex) {
      setSelectedPiece(null);
    } else if (selectedPiece && isValidMove(selectedPiece[0], selectedPiece[1], rowIndex, colIndex)) {
      const newBoard = [...board];
      const [fromRow, fromCol] = selectedPiece;
      newBoard[rowIndex][colIndex] = newBoard[fromRow][fromCol];
      newBoard[fromRow][fromCol] = "";
      setBoard(newBoard);
      setPlayer(player === "white" ? "black" : "white");
      setSelectedPiece(null);
    } else if (board[rowIndex][colIndex] && board[rowIndex][colIndex][0] === (player === "white" ? "w" : "b")) {
      setSelectedPiece([rowIndex, colIndex]);
    }
  };

  return (
    <Box>
      <Text fontSize="2xl" mb={4}>
        Chess Game
      </Text>
      <Grid templateColumns="repeat(8, 1fr)" gap={0} width="400px" height="400px" templateRows="repeat(8, 1fr)">
        {board.map((row, rowIndex) =>
          row.map((col, colIndex) => (
            <GridItem key={`${rowIndex}-${colIndex}`} bg={selectedPiece && selectedPiece[0] === rowIndex && selectedPiece[1] === colIndex ? "yellow.300" : (rowIndex + colIndex) % 2 === 0 ? "gray.300" : "gray.400"} display="flex" justifyContent="center" alignItems="center" fontSize="2rem" width="50px" height="50px" onClick={() => handleMove(rowIndex, colIndex)}>
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

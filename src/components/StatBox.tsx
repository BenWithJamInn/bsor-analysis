import React from 'react';
import {Box, useTheme} from "@mui/material";
import {tokens} from "../Theme";

interface StatBoxProps {
  color: string
  children: React.ReactNode;
}

const StatBox = (props: StatBoxProps) => {

  return (
    <Box
      bgcolor={props.color}
      height="100%"
      borderRadius="5px"
      width="5rem"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      {props.children}
    </Box>
  );
};

export default StatBox;
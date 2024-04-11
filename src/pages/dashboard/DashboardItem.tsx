import React, {useRef} from 'react';
import {Box, Typography, useTheme} from "@mui/material";
import {tokens} from "../../Theme";

interface DashboardItemProps {
  title: string;
  children: React.ReactNode;
}

const DashboardItem = (props: DashboardItemProps) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box
      bgcolor={colors.primary[400]}
      height="100%"
      width="100%"
      borderRadius="10px"
    >
      <Box
        bgcolor={colors.primary[300]}
        p={0.25}
        borderRadius="7px 7px 0 0"
        className="drag-handle"
      >
        <Typography variant="h5">
          {props.title}
        </Typography>
      </Box>
      <Box p={1}>
        {props.children}
      </Box>
    </Box>
  );
};

export default DashboardItem;
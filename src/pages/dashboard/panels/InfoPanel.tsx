import React from 'react';
import {Panel} from "./Panel";
import {Box, Button} from "@mui/material";

const InfoPanelElement = () => {
  // const rawReplay = useSelector((state: RootState) => state.rawReplays.value)
  // const dispatch = useDispatch();

  return (
    <Box>
      Information here<br/>
      <Button color="primary">Test</Button>
    </Box>
  );
};

export const infoPanel = {
  info: {
    title: "Information",
    minW: 3,
    minH: 2,
    static: true
  },
  element: <InfoPanelElement />
} as Panel;
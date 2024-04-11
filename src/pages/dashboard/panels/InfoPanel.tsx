import React from 'react';
import {Panel} from "./Panel";
import {Box, Button} from "@mui/material";

const InfoPanelElement = () => {
  // const rawReplay = useSelector((state: RootState) => state.rawReplays.value)
  // const dispatch = useDispatch();
  const [count, setCount] = React.useState(0);

  return (
    <Box>
      Information here<br/>
      {count}
      <Button onClick={() => setCount(count + 1)}>Test</Button>
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
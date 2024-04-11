import React, {useContext} from 'react';
import {ColorModeContext, tokens} from "../../Theme";
import {Avatar, Box, Divider, Grid, IconButton, InputBase, Typography, useTheme} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import {
  DarkModeOutlined,
  LightModeOutlined,
  NotificationsOutlined,
  PersonOutlined,
  SettingsOutlined
} from "@mui/icons-material";
import {useFormik} from "formik";
import * as Yup from 'yup';
import {fetchScore} from "../../data/DataManager";
import {useSelector} from "react-redux";
import {RootState} from "../../state/store";
import StatBox from "../../components/StatBox";


const TopBar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const rawReplay = useSelector((state: RootState) => state.scoreData)

  const formik = useFormik({
    initialValues: {
      scoreid: ""
    },
    onSubmit: async values => {
      const ignored = fetchScore(values.scoreid);
    },
    validationSchema: Yup.object({
      scoreid: Yup.number()
        .positive('Must be positive!')
        .required('Required')
    })
  })

  const activeData = rawReplay.scores[rawReplay.activeScoreID || ""]
  let player = null, song = null, score = null;
  if (activeData) {
    player = activeData.scoreInfo.player;
    song = activeData.scoreInfo.song;
    score = activeData.scoreInfo
  }

  return (
    <Box
      height="4rem"
      display="flex"
      justifyContent="space-between"
      // bgcolor={colors.primary[400]}
      borderBottom={`1px solid ${colors.primary[300]}`}
    >
      <Box
        height="100%"
        display="flex"
        alignItems="center"
        p={1}
      >
        {/*Search Bar*/}
        <Box
          display="flex"
          bgcolor={colors.primary[400]}
          borderRadius="3px"
          border={`1px solid ${formik.errors.scoreid && formik.touched.scoreid ? colors.redAccent[500] : "transparent"}`}
        >
          <form onSubmit={formik.handleSubmit}>
            <InputBase
              sx={{ml: 2, flex: 1}}
              id="scoerid"
              name="scoreid"
              placeholder="Beatleader Score ID"
              value={formik.values.scoreid}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <IconButton type="submit" sx={{p: 1}}>
              <SearchIcon/>
            </IconButton>
          </form>
        </Box>
        <Box ml="10px" display="flex" alignItems="center" gap="10px" height="100%" >
          {
            activeData ? (
              <>
                {/*Player Data*/}
                <Avatar src={player!.avatar} />
                <Typography variant="h4" >
                  {player!.name}
                </Typography>
                <Divider orientation="vertical" flexItem />
                {/*Song Info*/}
                <img src={song!.cover} height="40rem" style={{borderRadius: "10px"}} />
                <Box>
                  <Typography variant="h5">
                    {song!.name}
                  </Typography>
                  <Typography variant="h5">
                      {song!.author}
                  </Typography>
                </Box>
                <Divider orientation="vertical" flexItem />
                {/*Score Data*/}
                <StatBox color={colors.primary[300]}>
                  <Typography variant="h5">
                    {Math.round(score!.accuracy * 10000) / 100}%
                  </Typography>
                </StatBox>
                <StatBox color={colors.primary[300]}>
                  <Typography variant="h5">
                    {Math.round(score!.pp * 100) / 100}pp
                  </Typography>
                </StatBox>
                <Box>
                  <Grid
                    height="100%"
                    spacing={0.5}
                    container
                  >
                    <Grid item xs={12}>
                      <StatBox color={colors.primary[300]}>
                        <Typography variant="h5">
                          {Math.round(score!.pp * 100) / 100}pp
                        </Typography>
                      </StatBox>
                    </Grid>
                    <Grid item xs={12}>
                      <StatBox color={colors.primary[300]}>
                        <Typography variant="h5">
                          {Math.round(score!.pp * 100) / 100}pp
                        </Typography>
                      </StatBox>
                    </Grid>
                  </Grid>
                </Box>
              </>
            ) : (
              <Typography variant="h3">
                No Score Loaded
              </Typography>
            )
          }
        </Box>
      </Box>
      {/*Icons*/}
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === 'dark' ? (
            <DarkModeOutlined/>
          ) : (
            <LightModeOutlined/>
          )}
        </IconButton>
        <IconButton>
          <NotificationsOutlined/>
        </IconButton>
        <IconButton>
          <SettingsOutlined/>
        </IconButton>
        <IconButton>
          <PersonOutlined/>
        </IconButton>
      </Box>
    </Box>
  );
};

export default TopBar;
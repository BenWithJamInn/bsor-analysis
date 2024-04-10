import axios from "axios";
import {checkBSOR} from "./open-replay-decoder";
import {ReplayData} from "../state/rawReplaysSlice";
import {useSelector} from "react-redux";
import {RootState} from "../state/store";

export const axiosInstance = axios.create({
  timeout: 3000
})

export async function fetchScore(scoreID: string): Promise<ReplayData | null> {
  // get score info from beatleader
  const res = await axiosInstance.get("https://api.beatleader.xyz/score/" + scoreID)
  const scoreInfo = res.data;
  const replay = await checkBSOR(scoreInfo.replay, true)
  if (typeof replay === "string") {
    return null;
  }
  return {scoreInfo: scoreInfo, decodedReplay: replay};
}


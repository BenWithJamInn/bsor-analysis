import axios from "axios";
import {checkBSOR} from "./open-replay-decoder";
import {addScore, ReplayData} from "../state/rawReplaysSlice";
import {store} from "../state/store";
import {
  Handedness,
  Replay,
  ReplayNote,
  ReplayNoteProcessed,
  ReplayProcessed,
  ScoreType,
  TimeSeriesData
} from "./DataTypes";
import {array} from "yup";
import {log} from "node:util";

export const axiosInstance = axios.create({
  timeout: 3000
})

/**
 * Fetch score from beatleader and process the data. After processing update redux store
 *
 * @param scoreID
 */
export async function fetchScore(scoreID: string) {
  // get score info from beatleader
  const res = await axiosInstance.get("https://api.beatleader.xyz/score/" + scoreID)
  const scoreInfo = res.data;
  const replay = await checkBSOR(scoreInfo.replay, true) as Replay | string;
  if (typeof replay === "string") {
    return null;
  }

  // storeReplayData(replay);
  const processedReplay = processReplayData(replay);
  const timeSeriesData = processTimeSeriesData(processedReplay);
  storeReplayData({scoreInfo, processedReplay, timeSeriesData});
}

/**
 * processes the replay data for additional statistics such as score and handedness of each note
 *
 * @param replayData
 */
function processReplayData(replayData: Replay): ReplayProcessed {
  // notes
  let processedNotes = [];
  for (let note of replayData.notes) {
    processedNotes.push(processNoteData(note));
  }

  // assemble
  return {
    ...replayData,
    notes: processedNotes
  } as ReplayProcessed;
}

/**
 * Processes each note data to include additional statistics such as score and handedness
 *
 * @param note the note to process
 */
function processNoteData(note: ReplayNote): ReplayNoteProcessed {
  let processedData = {
    ...note
  } as ReplayNoteProcessed;
  console.log(note)
  // handedness
  processedData.handedness = note.noteCutInfo.saberType as Handedness; // CAN BE UNDEFINED // not cut incase of miss
  // data extracted from noteID
  let x = note.noteID;
  processedData.cutDirection = x % 10;
  x = (x - processedData.cutDirection) / 10;
  processedData.colorType = x % 10;
  x = (x - processedData.colorType) / 10;
  processedData.noteLineLayer = x % 10;
  x = (x - processedData.noteLineLayer) / 10;
  processedData.lineIndex = x % 10;
  x = (x - processedData.lineIndex) / 10;
  processedData.scoringType = x % 10 as ScoreType;

  // score
  const scoreData = calcNoteScore(processedData);
  processedData.preScore = scoreData.beforeCutRawScore;
  processedData.postScore = scoreData.afterCutRawScore;
  processedData.accScore = scoreData.cutDistanceRawScore;
  processedData.score = processedData.preScore + processedData.postScore + processedData.accScore;

  return processedData;
}

/**
 * Calculates the score for individual notes
 *
 * @param note
 */
function calcNoteScore(note: ReplayNoteProcessed): {
  beforeCutRawScore: number;
  afterCutRawScore: number;
  cutDistanceRawScore: number;
} {
  const cut = note.noteCutInfo;
  if (!cut.directionOK || !cut.saberTypeOK || !cut.speedOK) {
    return {
      beforeCutRawScore: 0,
      afterCutRawScore: 0,
      cutDistanceRawScore: 0
    }
  }
  let beforeCutRawScore = 0;
  if (note.scoringType !== ScoreType.NOTE_SCORE_TYPE_BURSTSLIDERELEMENT) {
    if (note.scoringType === ScoreType.NOTE_SCORE_TYPE_SLIDERTAIL) {
      beforeCutRawScore = 70;
    } else {
      beforeCutRawScore = 70 * cut.beforeCutRating;
      beforeCutRawScore = Math.round(beforeCutRawScore);
      beforeCutRawScore = clamp(beforeCutRawScore, 0, 70);
    }
  }
  let afterCutRawScore = 0;
  if (note.scoringType !== ScoreType.NOTE_SCORE_TYPE_BURSTSLIDERELEMENT) {
    if (note.scoringType === ScoreType.NOTE_SCORE_TYPE_BURSTSLIDERHEAD) {
      afterCutRawScore = 0;
    } else if (note.scoringType === ScoreType.NOTE_SCORE_TYPE_SLIDERHEAD) {
      afterCutRawScore = 30;
    } else {
      afterCutRawScore = 30 * cut.afterCutRating;
      afterCutRawScore = Math.round(afterCutRawScore);
      afterCutRawScore = clamp(afterCutRawScore, 0, 30);
    }
  }
  let cutDistanceRawScore = 0;
  if (note.scoringType === ScoreType.NOTE_SCORE_TYPE_BURSTSLIDERELEMENT) {
    cutDistanceRawScore = 20;
  } else {
    cutDistanceRawScore = cut.cutDistanceToCenter / 0.3;
    cutDistanceRawScore = 1 - clamp(cutDistanceRawScore, 0, 1)
    cutDistanceRawScore = Math.round(15 * cutDistanceRawScore);
  }
  return {
    beforeCutRawScore,
    afterCutRawScore,
    cutDistanceRawScore
  };
}

/**
 * My does Math not have clamp built in?
 *
 * @param num
 * @param min
 * @param max
 */
function clamp(num: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, num));
}

// creates statistics such as accuracy and accumulated score over time
function processTimeSeriesData(replayData: ReplayProcessed): TimeSeriesData {
  // create empty time series OBJ
  const timeData = {
    time: [],
    maxScore: [],
    totalScore: [],
    averageScore: [],
    accuracy: [],
    leftTotalScore: [],
    leftMaxScore: [],
    leftAverageScore: [],
    leftAccuracy: [],
    rightTotalScore: [],
    rightMaxScore: [],
    rightAverageScore: [],
    rightAccuracy: []
  } as TimeSeriesData;

  for (let i = 0; i < replayData.notes.length; i++) {
    const note = replayData.notes[i];
    timeData.time.push(note.eventTime);
    // left
    if (note.handedness === Handedness.LEFT) {
      arrayTotalPush(timeData.leftMaxScore, 115);
      arrayTotalPush(timeData.leftTotalScore, note.score);
      timeData.leftAverageScore.push(timeData.leftTotalScore[timeData.leftTotalScore.length - 1] / timeData.leftTotalScore.length);
      timeData.leftAccuracy.push(timeData.leftTotalScore[timeData.leftTotalScore.length - 1] / timeData.leftMaxScore[timeData.leftMaxScore.length - 1]);
    }
    // right
    else {
      arrayTotalPush(timeData.rightMaxScore, 115);
      arrayTotalPush(timeData.rightTotalScore, note.score);
      timeData.rightAverageScore.push(timeData.rightTotalScore[timeData.rightTotalScore.length - 1] / timeData.rightTotalScore.length);
      timeData.rightTotalScore.push(timeData.rightTotalScore[timeData.rightTotalScore.length - 1] / timeData.rightMaxScore[timeData.rightMaxScore.length - 1]);
    }
    // both
    arrayTotalPush(timeData.maxScore, 115);
    arrayTotalPush(timeData.totalScore, note.score);
    timeData.averageScore.push(timeData.totalScore[timeData.totalScore.length - 1] / timeData.totalScore.length);
    timeData.accuracy.push(timeData.totalScore[timeData.totalScore.length - 1] / timeData.maxScore[timeData.maxScore.length - 1]);
  }
  return timeData;
}

function arrayTotalPush(arr: number[], val: number) {
  if (arr.length === 0) {
    arr.push(val);
  } else {
    arr.push(arr[arr.length - 1] + val);
  }
}

/**
 * Stores the replay data in the redux store
 *
 * @param replayData the replay data to store
 */
function storeReplayData(replayData: ReplayData) {
  console.log(replayData);
  store.dispatch(addScore({id: replayData.scoreInfo.id.toString(), data: replayData}))
}

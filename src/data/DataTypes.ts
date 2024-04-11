export interface Vector3D {
  x: number;
  y: number;
  z: number;
}

export enum Handedness {
  LEFT,
  RIGHT
}

export enum EventType {
  GOOD,
  BAD,
  MISS,
  BOMB
}

export enum ScoreType {
  NOTE_SCORE_TYPE_NORMAL_1,
  NOTE_SCORE_TYPE_IGNORE,
  NOTE_SCORE_TYPE_NOSCORE,
  NOTE_SCORE_TYPE_NORMAL_2,
  NOTE_SCORE_TYPE_SLIDERHEAD,
  NOTE_SCORE_TYPE_SLIDERTAIL,
  NOTE_SCORE_TYPE_BURSTSLIDERHEAD,
  NOTE_SCORE_TYPE_BURSTSLIDERELEMENT
}

// Replay Objects
export interface Replay {
  info: ReplayInfo;
  frames: ReplayFrame[];
  notes: ReplayNote[];
  pauses: any[];  // unused for now
  walls: any[];   // unused for now
  heights: any[]; // unused for now
}

export interface ReplayProcessed extends Replay {
  notes: ReplayNoteProcessed[];
}


export interface ReplayInfo {
  version: string;
  gameVersion: string;
  timestamp: string;
  playerID: string;
  playerName: string;
  platform: string;
  trackingSystem: string;
  hmd: string;
  controller: string;
  hash: string;
  songName: string;
  mapper: string;
  difficulty: string;
  score: number;
  mode: string;
  environment: string;
  modifiers: string;
  jumpDistance: number;
  leftHanded: boolean;
  height: number;
  startTime: number;
  failTime: number;
  speed: number;
}


export interface ReplayFrame {
  time: number;
  fps: number;
  head: {
    position: Vector3D;
    rotation: Vector3D;
  };
  left: {
    position: Vector3D;
    rotation: Vector3D;
  };
  right: {
    position: Vector3D;
    rotation: Vector3D;
  };
}


export interface ReplayNote {
  noteID: number;
  eventTime: number;
  spawnTime: number;
  eventType: number;
  noteCutInfo: ReplayNoteCutInfo;
}

export interface ReplayNoteProcessed extends ReplayNote {
  eventType: EventType;
  handedness: Handedness;
  preScore: number;
  postScore: number;
  accScore: number;
  score: number;
  // extracted from noteID
  cutDirection: number;
  colorType: number;
  noteLineLayer: number;
  lineIndex: number;
  scoringType: ScoreType;
}

export interface ReplayNoteCutInfo {
  speedOK: boolean;
  directionOK: boolean;
  saberTypeOK: boolean;
  wasCutTooSoon: boolean;
  saberSpeed: number;
  saberDir: Vector3D;
  saberType: number;
  timeDeviation: number;
  cutDirDeviation: number;
  cutPoint: Vector3D;
  cutNormal: Vector3D;
  cutDistanceToCenter: number;
  cutAngle: number;
  beforeCutRating: number;
  afterCutRating: number;
}


// Score Objects
export interface Score {
  accPP: string;
  accuracy: number;
  baseScore: number;
  bombCuts: number;
  bonusPp: number;
  controller: number;
  country: any | null;
  difficulty: Difficulty;
  fcAccuracy: number;
  fcPp: number;
  fullCombo: number;
  hmd: number;
  id: number;
  leaderboardId: string;
  maxCombo: number;
  maxStreak: number | null;
  metadata: any | null;
  missedNotes: number;
  modifiedScore: number;
  modifiersmodifiers: number;
  modifiers: string;
  offsets: Offsets;
  passPP: number;
  pauses: number;
  platform: string;
  playCount: number;
  player: Player;
  pp: number;
  priority: number;
  rank: number;
  rankVotingrankVoting: any | null;
  replay: string;
  replaysWatched: number;
  scoreImprovement: any | null;
  song: Song;
  techPP: number;
  timepost: number;
  timeset: string;
  wallsHit: number;
  weight: number;
}

export interface Difficulty {
  id: number;
  value: number;
  mode: number;
  difficultyName: string;
  modeName: string;
  status: number;
  modifierValues: {
    modifierId: number
    da: number
    fs: number
    sf: number
    ss: number
    gn: number
    na: number
    nb: number
    nf: number
    no: number
    pm: number
    sc: number
    sa: number
    op: number
  };
  modifiersRating: {
    id: number
    fsPredictedAcc: number
    fsPassRating: number
    fsAccRating: number
    fsTechRating: number
    fsStars: number
    ssPredictedAcc: number
    ssPassRating: number
    ssAccRating: number
    ssTechRating: number
    ssStars: number
    sfPredictedAcc: number
    sfPassRating: number
    sfAccRating: number
    sfTechRating: number
    sfStars: number
  };
  nominatedTime: number
  qualifiedTime: number
  rankedTime: number
  speedTags: number
  styleTags: number
  featureTags: number
  stars: number
  predictedAcc: number
  passRating: number
  accRating: number
  techRating: number
  type: number
  njs: number
  nps: number
  notes: number
  bombs: number
  walls: number
  maxScore: number
  duration: number
  requirements: number
}


export interface Offsets {
  frames: number;
  heights: number;
  id: number;
  notes: number;
  pauses: number;
  walls: number;
}


export interface Player {
  id: string;
  name: string;
  platform: string;
  avatar: string;
  country: string;
  bot: boolean;
  pp: number;
  rank: number;
  countryRank: number;
  role: string;
  socials: {
    id: number;
    service: string;
    link: string;
    user: string;
    userId: string;
    playerId: string;
  }[];
  contextExtensions: any | null;
  patreonFeatures: {
    id: number;
    bio: string;
    message: string;
    leftSaberColor: string;
    rightSaberColor: string;
  };
  profileSettings: {
    id: number;
    bio: string | null;
    message: string | null;
    effectName: string;
    profileAppearance: string;
    hue: number;
    saturation: number;
    leftSaberColor: any | null;
    rightSaberColor: any | null;
    profileCover: any | null;
    starredFriends: string;
    showBots: boolean;
    showAllRatings: boolean;
  };
  clanOrder: string;
  clans: any | null;
}

export interface Song {
  id: string
  hash: string
  cover: string;
  name: string;
  subName: string;
  author: string;
  mapper: string;
  downloadUrl: string;
}


// Time Series Data
export interface TimeSeriesData {
  time: number[];
  maxScore: number[];
  totalScore: number[];
  averageScore: number[];
  accuracy: number[];
  leftTotalScore: number[];
  leftMaxScore: number[];
  leftAverageScore: number[];
  leftAccuracy: number[];
  rightTotalScore: number[];
  rightMaxScore: number[];
  rightAverageScore: number[];
  rightAccuracy: number[];
}

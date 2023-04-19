interface Identifiers {
  phoneNumber: number;
}

interface GeneratedMaps {
  phoneNumber: string;
  createdAt: string;
  updatedAt: string;
}

interface RawScoring {
  fieldCount: number;
  affectedRows: number;
  insertId: number;
  info: string;
  serverStatus: number;
  warningStatus: number;
}

export interface SaveScoringResults {
  identifiers: Identifiers[];
  generatedMaps: GeneratedMaps[];
  raw: RawScoring;
}

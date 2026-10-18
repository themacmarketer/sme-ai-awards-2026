export type EvidenceState = 'stated' | 'corroborated' | 'inferred';
export type EvidenceGrade = 'A' | 'B' | 'C';
export type Tier = 'T0' | 'T1' | 'T2' | 'T3';

export interface Source {
  id: string;
  title: string;
  publisher: string;
  url: string;
  tier: Tier;
  published?: string;
  retrieved: string;
  status: 'valid' | 'unavailable' | 'unchecked';
  note?: string;
}

export interface Claim {
  id: string;
  text: string;
  sourceIds: string[];
  evidence: EvidenceState;
  basis?: string;
}

export interface Metric {
  label: string;
  value: string;
  unit?: string;
  baseline?: string;
  after?: string;
  period?: string;
  sourceIds: string[];
  attribution?: string;
}

export interface StackItem {
  layer: string;
  what: string;
  vendor?: string;
  origin: 'vendor' | 'in-house' | 'unknown';
  evidence: EvidenceState;
  sourceIds: string[];
  basis?: string;
}

export interface DiagramNode {
  id: string;
  label: string;
  kind: 'input' | 'process' | 'ai' | 'system' | 'human' | 'output';
  note?: string;
}

export interface Diagram {
  title: string;
  caption: string;
  nodes: DiagramNode[];
  edges: [string, string][];
}

export interface ReplicationLevel {
  level: 'Level 1' | 'Level 2' | 'Level 3';
  title: string;
  description: string;
  when: string;
}

export interface Replication {
  suitability: string[];
  requirements: string[];
  steps: string[];
  tools: string[];
  risks: string[];
  kpis: string[];
  levels: ReplicationLevel[];
}

export interface Inference {
  known: string;
  inferred: string;
  basis: string;
  alternatives: string;
  unverified: string;
}

export interface Winner {
  slug: string;
  name: string;
  sector: string;
  category: 'innovation' | 'adoption';
  companyUrl?: string;
  screenshot?: { src: string; capturedAt: string; sourceUrl: string };
  coverageDimensions?: Record<string, number>;
  headline: string;
  useCase: string;
  aiType: string;
  outcomes: ('Time' | 'Cost' | 'Revenue' | 'Quality' | 'Capacity')[];
  officialProfile: string;
  officialChallenges: string[];
  officialSolution: string;
  officialComponents: string[];
  metrics: Metric[];
  scqa: { s: string; c: string; q: string; a: string };
  takeaway: string;
  claims: Claim[];
  stack: StackItem[];
  timeline: { date: string; event: string; sourceIds: string[] }[];
  documentedWorkflow: Diagram;
  illustrativeWorkflow: Diagram;
  inference?: Inference;
  replication: Replication;
  sources: Source[];
  gaps: string[];
  confidence: EvidenceGrade;
  coverage: number;
  researchedAt: string;
  updatedAt: string;
}

export interface DatasetMeta {
  title: string;
  tagline: string;
  canonicalSource: string;
  extractedAt: string;
  researchedAt: string;
  totalWinners: number;
  categories: { key: string; label: string; count: number }[];
  evidenceGrades: Record<string, number>;
  sectors: Record<string, number>;
  useCases: Record<string, number>;
  aiTypes: Record<string, number>;
  outcomes: Record<string, number>;
  averageCoverage: number;
}

export interface Dataset {
  meta: DatasetMeta;
  winners: Winner[];
}

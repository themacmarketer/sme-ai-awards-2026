import { z } from 'zod';

export const EvidenceStateSchema = z.enum(['stated', 'corroborated', 'inferred']);
export const EvidenceGradeSchema = z.enum(['A', 'B', 'C']);
export const TierSchema = z.enum(['T0', 'T1', 'T2', 'T3']);

export const SourceSchema = z.object({
  id: z.string().min(3),
  title: z.string().min(3),
  publisher: z.string().min(2),
  url: z.string().url(),
  tier: TierSchema,
  published: z.string().optional(),
  retrieved: z.string().min(4),
  status: z.enum(['valid', 'unavailable', 'unchecked']),
  note: z.string().optional(),
});

export const ClaimSchema = z.object({
  id: z.string().min(3),
  text: z.string().min(10),
  sourceIds: z.array(z.string()).min(1),
  evidence: EvidenceStateSchema,
  basis: z.string().optional(),
});

export const MetricSchema = z.object({
  label: z.string().min(3),
  value: z.string().min(1),
  unit: z.string().optional(),
  baseline: z.string().optional(),
  after: z.string().optional(),
  period: z.string().optional(),
  sourceIds: z.array(z.string()).min(1),
  attribution: z.string().optional(),
});

export const StackItemSchema = z.object({
  layer: z.string().min(2),
  what: z.string().min(2),
  vendor: z.string().optional(),
  origin: z.enum(['vendor', 'in-house', 'unknown']),
  evidence: EvidenceStateSchema,
  sourceIds: z.array(z.string()).min(1),
  basis: z.string().optional(),
});

export const DiagramNodeSchema = z.object({
  id: z.string(),
  label: z.string(),
  kind: z.enum(['input', 'process', 'ai', 'system', 'human', 'output']),
  note: z.string().optional(),
});

export const DiagramSchema = z.object({
  title: z.string(),
  caption: z.string(),
  nodes: z.array(DiagramNodeSchema).min(2),
  edges: z.array(z.tuple([z.string(), z.string()])),
});

export const ReplicationSchema = z.object({
  suitability: z.array(z.string()).min(1),
  requirements: z.array(z.string()).min(1),
  steps: z.array(z.string()).min(1),
  tools: z.array(z.string()).min(1),
  risks: z.array(z.string()).min(1),
  kpis: z.array(z.string()).min(1),
  levels: z
    .array(
      z.object({
        level: z.enum(['Level 1', 'Level 2', 'Level 3']),
        title: z.string(),
        description: z.string(),
        when: z.string(),
      })
    )
    .length(3),
});

export const WinnerSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  name: z.string().min(2),
  sector: z.string().min(2),
  category: z.enum(['innovation', 'adoption']),
  companyUrl: z.string().url().optional(),
  headline: z.string().min(20),
  useCase: z.string().min(3),
  aiType: z.string().min(3),
  outcomes: z.array(z.enum(['Time', 'Cost', 'Revenue', 'Quality', 'Capacity'])).min(1),

  officialProfile: z.string().min(20),
  officialChallenges: z.array(z.string()).min(1),
  officialSolution: z.string().min(3),
  officialComponents: z.array(z.string()).min(1),

  metrics: z.array(MetricSchema).min(1),
  scqa: z.object({
    s: z.string().min(80),
    c: z.string().min(80),
    q: z.string().min(30),
    a: z.string().min(80),
  }),
  takeaway: z.string().min(30),

  claims: z.array(ClaimSchema).min(1),
  stack: z.array(StackItemSchema).min(2),

  timeline: z.array(
    z.object({ date: z.string(), event: z.string(), sourceIds: z.array(z.string()).min(1) })
  ),

  documentedWorkflow: DiagramSchema,
  illustrativeWorkflow: DiagramSchema,

  inference: z
    .object({
      known: z.string(),
      inferred: z.string(),
      basis: z.string(),
      alternatives: z.string(),
      unverified: z.string(),
    })
    .optional(),

  replication: ReplicationSchema,
  sources: z.array(SourceSchema).min(1),
  gaps: z.array(z.string()).min(1),

  confidence: EvidenceGradeSchema,
  coverage: z.number().min(0).max(100),
  researchedAt: z.string(),
  updatedAt: z.string(),
});

export const DatasetSchema = z.object({
  meta: z.object({
    title: z.string(),
    canonicalSource: z.string().url(),
    extractedAt: z.string(),
    researchedAt: z.string(),
    totalWinners: z.number(),
    categories: z.array(z.object({ key: z.string(), label: z.string(), count: z.number() })),
  }),
  winners: z.array(WinnerSchema),
});

export type EvidenceState = z.infer<typeof EvidenceStateSchema>;
export type EvidenceGrade = z.infer<typeof EvidenceGradeSchema>;
export type Source = z.infer<typeof SourceSchema>;
export type Claim = z.infer<typeof ClaimSchema>;
export type Metric = z.infer<typeof MetricSchema>;
export type StackItem = z.infer<typeof StackItemSchema>;
export type Diagram = z.infer<typeof DiagramSchema>;
export type Winner = z.infer<typeof WinnerSchema>;
export type Dataset = z.infer<typeof DatasetSchema>;

import { z } from 'zod';

export const EvidenceState = z.enum(['stated', 'corroborated', 'inferred']);
export const EvidenceGrade = z.enum(['A', 'B', 'C']);

export const SourceSchema = z.object({
  id: z.string().min(3),
  title: z.string().min(3),
  publisher: z.string().min(2),
  url: z.string().url(),
  tier: z.enum(['T0', 'T1', 'T2', 'T3']),
  published: z.string().optional(),
  retrieved: z.string().min(4),
  status: z.enum(['valid', 'unavailable', 'unchecked']),
  note: z.string().optional(),
});

export const ClaimSchema = z.object({
  id: z.string().min(1),
  text: z.string().min(10),
  sourceIds: z.array(z.string()).min(1),
  evidence: EvidenceState,
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

export const StackItemSchema = z
  .object({
    layer: z.string().min(2),
    what: z.string().min(2),
    vendor: z.string().optional(),
    origin: z.enum(['vendor', 'in-house', 'unknown']),
    evidence: EvidenceState,
    sourceIds: z.array(z.string()).min(1),
    basis: z.string().optional(),
  })
  .refine((s) => s.evidence !== 'inferred' || (s.basis && s.basis.length > 10), {
    message: 'Inferred stack entries require a documented basis',
    path: ['basis'],
  });

const NodeSchema = z.object({
  id: z.string().min(1),
  label: z.string().min(1),
  kind: z.enum(['input', 'process', 'ai', 'system', 'human', 'output']),
  note: z.string().optional(),
});

export const DiagramSchema = z.object({
  title: z.string().min(3),
  caption: z.string().min(10),
  nodes: z.array(NodeSchema).min(2),
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
        title: z.string().min(2),
        description: z.string().min(10),
        when: z.string().min(5),
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
  screenshot: z
    .object({
      src: z.string().min(3),
      capturedAt: z.string().min(4),
      sourceUrl: z.string().url(),
    })
    .optional(),
  coverageDimensions: z.record(z.string(), z.number()).optional(),
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
    q: z.string().min(20),
    a: z.string().min(80),
  }),
  takeaway: z.string().min(20),
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
  confidence: EvidenceGrade,
  coverage: z.number().min(0).max(100),
  researchedAt: z.string(),
  updatedAt: z.string(),
});

export const DatasetSchema = z.object({
  meta: z.object({
    title: z.string(),
    tagline: z.string(),
    canonicalSource: z.string().url(),
    extractedAt: z.string(),
    researchedAt: z.string(),
    totalWinners: z.number(),
    categories: z.array(z.object({ key: z.string(), label: z.string(), count: z.number() })),
    evidenceGrades: z.record(z.string(), z.number()),
    sectors: z.record(z.string(), z.number()),
    useCases: z.record(z.string(), z.number()),
    aiTypes: z.record(z.string(), z.number()),
    outcomes: z.record(z.string(), z.number()),
    averageCoverage: z.number(),
  }),
  winners: z.array(WinnerSchema),
});

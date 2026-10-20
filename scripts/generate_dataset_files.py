import json
import csv
import os

with open('data/winners.json', 'r', encoding='utf-8') as f:
    winner_data = json.load(f)

winners = winner_data['winners']

try:
    with open('data/practitioner-cases.json', 'r', encoding='utf-8') as f:
        practitioner_cases = json.load(f)
except Exception:
    practitioner_cases = []

all_cases = winners + practitioner_cases

os.makedirs('public/data', exist_ok=True)

# Copy full winner JSON
with open('public/data/sme-ai-winners-2026.json', 'w', encoding='utf-8') as f:
    json.dump(winner_data, f, indent=2, ensure_ascii=False)

# Copy all cases JSON
all_cases_data = {
    "meta": {
        **winner_data["meta"],
        "totalCases": len(all_cases),
        "totalWinners": len(winners),
        "totalPractitioner": len(practitioner_cases),
    },
    "cases": all_cases
}
with open('public/data/sme-ai-all-cases.json', 'w', encoding='utf-8') as f:
    json.dump(all_cases_data, f, indent=2, ensure_ascii=False)

# Flatten to CSV
csv_fields = [
    'id',
    'cohort',
    'provenance',
    'disclosed_implementer',
    'name',
    'slug',
    'category',
    'sector',
    'useCase',
    'aiType',
    'headline',
    'confidence_grade',
    'coverage_pct',
    'official_solution',
    'primary_metric_label',
    'primary_metric_value',
    'all_metrics_count',
    'stack_layers_count',
    'named_vendors',
    'sources_count',
    'sources_beyond_t0',
    'company_url',
    'researched_at',
    'updated_at'
]

def write_csv(filepath, case_list):
    with open(filepath, 'w', newline='', encoding='utf-8') as f:
        writer = csv.DictWriter(f, fieldnames=csv_fields)
        writer.writeheader()
        for idx, w in enumerate(case_list):
            vendors = list(set([s['vendor'] for s in w['stack'] if s.get('vendor')]))
            independent_sources = len([s for s in w['sources'] if s.get('tier') not in ('T0', 'T1-SUBMITTED')])
            writer.writerow({
                'id': idx + 1,
                'cohort': w.get('cohort', 'award-2026'),
                'provenance': w.get('provenance', 'official-award'),
                'disclosed_implementer': w.get('disclosedImplementer', ''),
                'name': w['name'],
                'slug': w['slug'],
                'category': w['category'],
                'sector': w['sector'],
                'useCase': w['useCase'],
                'aiType': w['aiType'],
                'headline': w['headline'],
                'confidence_grade': w['confidence'],
                'coverage_pct': w['coverage'],
                'official_solution': w['officialSolution'],
                'primary_metric_label': w['metrics'][0]['label'] if w['metrics'] else '',
                'primary_metric_value': w['metrics'][0]['value'] if w['metrics'] else '',
                'all_metrics_count': len(w['metrics']),
                'stack_layers_count': len(w['stack']),
                'named_vendors': '; '.join(vendors) if vendors else 'None named',
                'sources_count': len(w['sources']),
                'sources_beyond_t0': independent_sources,
                'company_url': w.get('companyUrl', ''),
                'researched_at': w['researchedAt'],
                'updated_at': w['updatedAt']
            })

write_csv('public/data/sme-ai-winners-2026.csv', winners)
write_csv('public/data/sme-ai-all-cases.csv', all_cases)

print(f"Generated datasets successfully: {len(winners)} winners and {len(all_cases)} total cases.")

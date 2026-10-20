import json
import csv
import os

with open('data/winners.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

winners = data['winners']

os.makedirs('public/data', exist_ok=True)

# Copy full JSON
with open('public/data/sme-ai-winners-2026.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

# Flatten to CSV
csv_fields = [
    'id',
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

with open('public/data/sme-ai-winners-2026.csv', 'w', newline='', encoding='utf-8') as f:
    writer = csv.DictWriter(f, fieldnames=csv_fields)
    writer.writeheader()
    for idx, w in enumerate(winners):
        vendors = list(set([s['vendor'] for s in w['stack'] if s.get('vendor')]))
        independent_sources = len([s for s in w['sources'] if s.get('tier') != 'T0'])
        writer.writerow({
            'id': idx + 1,
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

print(f"Generated public/data/sme-ai-winners-2026.json and public/data/sme-ai-winners-2026.csv successfully with {len(winners)} rows.")

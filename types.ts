
export interface AssociationRule {
  antecedents: string[];
  consequents: string[];
  support: number;
  confidence: number;
  lift: number;
}

export interface FrequentItem {
  item: string;
  count: number;
}

export interface AnalysisResult {
  rules: AssociationRule[];
  top_items: FrequentItem[];
}

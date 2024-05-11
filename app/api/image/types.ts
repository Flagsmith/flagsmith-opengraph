export type Item = {
    feature_state_value?: string | number;
    feature_state_value_type: string;
    environment_name: string;
    feature_value: string;
    segment_name?: string;
}
export type TransformedItem  = Item & {
    segments?: Item[];
}

export type Item = {
    feature_state_value?: string | number;
    environment_name: string;
    feature_value: string | boolean;
    segment_name?: string;
}
export type TransformedItem  = Item & {
    segments?: Item[];
}

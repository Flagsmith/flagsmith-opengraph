import {Item, TransformedItem} from "@/app/util/types";

export function transformItems(items: Item[]): TransformedItem[] {
    return items.reduce((acc: TransformedItem[], curr: Item) => {
        if (curr.segment_name) {
            const index = acc.findIndex(item => item.environment_name === curr.environment_name);
                acc[index].segments = acc[index].segments || [];
                acc[index].segments!.push(curr);
        } else {
            acc.push(curr);
        }
        return acc;
    }, []).map((v)=>{
        return {
            ...v,
            feature_value: `${v.feature_value}`.toLowerCase() === 'true'
        }
    });
}

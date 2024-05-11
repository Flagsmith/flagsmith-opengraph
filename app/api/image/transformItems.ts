import {Item, TransformedItem} from "@/app/api/image/types";

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
    }, []);
}

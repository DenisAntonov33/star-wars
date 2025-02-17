export interface IListResponse<Item> {
    count: number;
    next: string | null;
    prev: string | null;
    results: Item[];
}
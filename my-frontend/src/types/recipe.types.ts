export interface Recipe {
    id?: number;
    title: string;
    description: string;
    instructions: string;
    nutritionalValue: string;
    steps: {
        step: string;
        order: number;
    }[];
}

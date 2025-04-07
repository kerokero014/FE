export interface Recipe {
    title: string;
    description: string;
    instructions: string;
    nutritionalValue: string;
    steps: {
        step: string;
        order: number;
    }[];
}

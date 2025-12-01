export interface IconStyle {
    id: number;
    name: string;
    description: string;
    visualPreview: string; // CSS color or gradient for preview
}

export interface GeneratedIcon {
    item: string;
    url: string;
}

export interface GenerationResponse {
    originalPrompt: string;
    styleId: number;
    icons: GeneratedIcon[];
}

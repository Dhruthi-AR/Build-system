export interface Preferences {
    roleKeywords: string[];
    preferredLocations: string[];
    preferredModes: string[];
    experienceLevel: string;
    skills: string[];
    minMatchScore: number;
}

export const defaultPreferences: Preferences = {
    roleKeywords: [],
    preferredLocations: [],
    preferredModes: [],
    experienceLevel: '',
    skills: [],
    minMatchScore: 40
};

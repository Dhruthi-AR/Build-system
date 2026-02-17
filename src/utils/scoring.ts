import { Job } from '../data/jobs';
import { Preferences } from '../types/preferences';

export function calculateMatchScore(job: Job, prefs: Preferences): number {
    let score = 0;

    if (!prefs) return 0;

    // 1. Role Keyword in Title (+25)
    // Check if ANY keyword is in title
    const titleLower = job.title.toLowerCase();
    const hasTitleMatch = prefs.roleKeywords.some(kw =>
        kw.trim() && titleLower.includes(kw.trim().toLowerCase())
    );
    if (hasTitleMatch) score += 25;

    // 2. Role Keyword in Description (+15)
    const descLower = job.description.toLowerCase();
    const hasDescMatch = prefs.roleKeywords.some(kw =>
        kw.trim() && descLower.includes(kw.trim().toLowerCase())
    );
    if (hasDescMatch) score += 15;

    // 3. Location Match (+15)
    // Job location must be in user's preferred locations list
    // Note: Job location might be "Bangalore", prefs might have "Bangalore".
    // Check exact inclusion or partial? "Matches preferredLocations" usually means inclusion.
    // Given multi-select input, we check if job.location is in the list.
    if (prefs.preferredLocations.some(loc => job.location.includes(loc) || loc.includes(job.location))) {
        score += 15;
    }

    // 4. Mode Match (+10)
    if (prefs.preferredModes.includes(job.mode)) {
        score += 10;
    }

    // 5. Experience Match (+10)
    if (job.experience === prefs.experienceLevel) {
        score += 10;
    }

    // 6. Skills Overlap (+15)
    // If ANY user skill is in job skills
    const jobSkillsLower = job.skills.map(s => s.toLowerCase());
    const hasSkillOverlap = prefs.skills.some(userSkill =>
        userSkill.trim() && jobSkillsLower.includes(userSkill.trim().toLowerCase())
    );
    if (hasSkillOverlap) score += 15;

    // 7. Freshness (+5)
    if (job.postedDaysAgo <= 2) {
        score += 5;
    }

    // 8. Source (+5)
    if (job.source === 'LinkedIn') {
        score += 5;
    }

    return Math.min(score, 100);
}

export function getScoreColor(score: number): string {
    if (score >= 80) return '#4C6B4F'; // Deep Green
    if (score >= 60) return '#B18632'; // Amber/Gold
    if (score >= 40) return '#555555'; // Neutral
    return '#999999'; // Grey
}

export function extractSalary(salaryStr: string): number {
    // Extract first number found. e.g. "3-5 LPA" -> 3. "₹15k..." -> 15.
    // Normalized to rough annual comparable? hard with mixed units (LPA vs Month).
    // For simple sorting, just extracting the first number is often "good enough" for a mock.
    // "30k" -> 30. "3 LPA" -> 3. This is flawed but requested "simple numeric extract".
    const match = salaryStr.match(/(\d+)/);
    return match ? parseInt(match[0], 10) : 0;
}

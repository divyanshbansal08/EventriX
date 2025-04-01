import { z } from 'zod';

export const eventSchema = z.object({
    clubName: z.string().optional(),
    councilName: z.string().optional(),
    eventName: z.string().refine((val) => val.trim().length > 0, {
        message: "Event name cannot be empty"
    }),
    short_description: z.string(),
    description: z.string(),
    date: z.date(),
    time: z.string(),
    location: z.string(),
    status: z.enum(["Upcoming", "Ongoing"]),
    coverImage: z.object({
        public_id: z.string().or(z.literal("")).optional(),
        url: z.string().url().or(z.literal("")).optional()
    }).optional(),
    clubID: z.string().optional()
});
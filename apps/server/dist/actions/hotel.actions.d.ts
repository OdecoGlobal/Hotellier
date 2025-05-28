export declare function getAllHotelsActions({ query, limit, page, rating, sort, }: {
    query: string;
    limit?: number;
    page: number;
    rating?: string;
    sort?: string;
}): Promise<{
    status: string;
    data: {
        name: string;
        id: string;
        address: string;
        createdAt: Date;
        slug: string;
        description: string;
        banner: string | null;
        ownerId: string;
        state: string;
        lga: string;
        latitude: number;
        longitude: number;
        services: string[];
        locationBrief: string;
    }[];
    totalPages: number;
}>;
//# sourceMappingURL=hotel.actions.d.ts.map
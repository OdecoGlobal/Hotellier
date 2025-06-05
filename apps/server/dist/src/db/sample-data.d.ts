declare const sampleData: {
    users: ({
        userName: string;
        email: string;
        password: string;
        role: "USER";
    } | {
        userName: string;
        email: string;
        password: string;
        role: "OWNER";
    } | {
        userName: string;
        email: string;
        password: string;
        role: "ADMIN";
    })[];
    hotels: {
        name: string;
        slug: string;
        description: string;
        banner: string;
        state: string;
        lga: string;
        latitude: number;
        longitude: number;
        address: string;
        locationBrief: string;
        services: string[];
    }[];
    roomCategories: {
        name: string;
        description: string;
        hotelSlug: string;
        basePrice: number;
        capacity: number;
        amenities: string[];
    }[];
    rooms: {
        roomNumber: string;
        price: number;
        available: boolean;
        categoryName: string;
        hotelSlug: string;
    }[];
};
export default sampleData;
//# sourceMappingURL=sample-data.d.ts.map
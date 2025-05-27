import { hashSync } from "bcryptjs";
import { Role } from "@prisma/client";

// Fixed sample data with consistent references
const sampleData = {
  users: [
    {
      userName: "Mark",
      email: "mark@example.com",
      password: hashSync("123456789", 10),
      role: Role.USER,
    },
    {
      userName: "Jane",
      email: "jane@example.com",
      password: hashSync("123456789", 10),
      role: Role.USER,
    },
    {
      userName: "HotelOwner1",
      email: "owner1@example.com",
      password: hashSync("123456789", 10),
      role: Role.OWNER,
    },
    {
      userName: "HotelOwner2",
      email: "owner2@example.com",
      password: hashSync("123456789", 10),
      role: Role.OWNER,
    },
    {
      userName: "Admin",
      email: "admin@example.com",
      password: hashSync("123456789", 10),
      role: Role.ADMIN,
    },
  ],

  hotels: [
    {
      name: "Grand Lagos Hotel",
      slug: "grand-lagos-hotel",
      description:
        "Luxury hotel in the heart of Lagos with world-class amenities",
      banner: "https://example.com/hotel1.jpg",
      state: "Lagos",
      lga: "Ikeja",
      latitude: 6.5244,
      longitude: 3.3792,
      address: "1 Victoria Island, Lagos",
      locationBrief:
        "Prime location in Victoria Island, Lagos with beach access.",
      services: ["wifi", "gym", "pool", "spa"],
    },
    {
      name: "Savannah Suites",
      slug: "savannah-suites",
      description: "Affordable luxury located in the heart of Abuja.",
      banner: "https://example.com/images/savannah.jpg",
      state: "FCT",
      lga: "Garki",
      latitude: 9.0578,
      longitude: 7.4951,
      address: "45 Unity Street, Garki",
      locationBrief: "Close to CBD and government offices.",
      services: ["wifi", "restaurant", "bar", "laundry"],
    },
    {
      name: "Kano Heritage Inn",
      slug: "kano-heritage-inn",
      description:
        "Traditional hospitality meets modern comfort in ancient Kano.",
      banner: "https://example.com/images/kano-heritage.jpg",
      state: "Kano",
      lga: "Nassarawa",
      latitude: 12.0022,
      longitude: 8.5919,
      address: "15 Emir's Palace Road, Nassarawa, Kano",
      locationBrief: "Historic location near ancient city walls.",
      services: [
        "wifi",
        "traditional_restaurant",
        "cultural_tours",
        "handicraft_shop",
      ],
    },
  ],

  roomCategories: [
    // Grand Lagos Hotel rooms
    {
      name: "Standard Room",
      description: "Comfortable standard room with basic amenities",
      hotelSlug: "grand-lagos-hotel",
      basePrice: 15000,
      capacity: 2,
      amenities: ["AC", "WiFi", "TV", "Mini Fridge"],
    },
    {
      name: "Deluxe Suite",
      description: "Spacious suite with premium amenities",
      hotelSlug: "grand-lagos-hotel",
      basePrice: 35000,
      capacity: 3,
      amenities: ["AC", "WiFi", "TV", "Mini Bar", "Balcony", "Living Area"],
    },

    // Savannah Suites rooms
    {
      name: "Executive Room",
      description: "Business-friendly room with work desk",
      hotelSlug: "savannah-suites",
      basePrice: 25000,
      capacity: 2,
      amenities: [
        "AC",
        "WiFi",
        "Work Desk",
        "Coffee Machine",
        "Business Center Access",
      ],
    },
    {
      name: "Presidential Suite",
      description: "Luxurious suite with separate living area",
      hotelSlug: "savannah-suites",
      basePrice: 50000,
      capacity: 4,
      amenities: [
        "AC",
        "WiFi",
        "Living Room",
        "Dining Area",
        "Kitchen",
        "Jacuzzi",
        "Butler Service",
      ],
    },

    // Kano Heritage Inn rooms
    {
      name: "Heritage Room",
      description: "Traditional room with cultural decorations",
      hotelSlug: "kano-heritage-inn",
      basePrice: 12000,
      capacity: 2,
      amenities: ["AC", "WiFi", "Traditional Decor", "Cultural Artifacts"],
    },
    {
      name: "Royal Suite",
      description: "Spacious suite inspired by Emirate architecture",
      hotelSlug: "kano-heritage-inn",
      basePrice: 28000,
      capacity: 3,
      amenities: [
        "AC",
        "WiFi",
        "Traditional Decor",
        "Private Courtyard",
        "Cultural Library",
      ],
    },
  ],

  // If you have a Room model, here's the fixed room data
  rooms: [
    // Grand Lagos Hotel rooms
    {
      roomNumber: "101",
      price: 15000,
      available: true,
      categoryName: "Standard Room",
      hotelSlug: "grand-lagos-hotel",
    },
    {
      roomNumber: "102",
      price: 15000,
      available: true,
      categoryName: "Standard Room",
      hotelSlug: "grand-lagos-hotel",
    },
    {
      roomNumber: "201",
      price: 35000,
      available: true,
      categoryName: "Deluxe Suite",
      hotelSlug: "grand-lagos-hotel",
    },
    {
      roomNumber: "202",
      price: 35000,
      available: false,
      categoryName: "Deluxe Suite",
      hotelSlug: "grand-lagos-hotel",
    },

    // Savannah Suites rooms
    {
      roomNumber: "301",
      price: 25000,
      available: true,
      categoryName: "Executive Room",
      hotelSlug: "savannah-suites",
    },
    {
      roomNumber: "302",
      price: 25000,
      available: true,
      categoryName: "Executive Room",
      hotelSlug: "savannah-suites",
    },
    {
      roomNumber: "401",
      price: 50000,
      available: true,
      categoryName: "Presidential Suite",
      hotelSlug: "savannah-suites",
    },
    {
      roomNumber: "402",
      price: 50000,
      available: false,
      categoryName: "Presidential Suite",
      hotelSlug: "savannah-suites",
    },

    // Kano Heritage Inn rooms
    {
      roomNumber: "H01",
      price: 12000,
      available: true,
      categoryName: "Heritage Room",
      hotelSlug: "kano-heritage-inn",
    },
    {
      roomNumber: "H02",
      price: 12000,
      available: true,
      categoryName: "Heritage Room",
      hotelSlug: "kano-heritage-inn",
    },
    {
      roomNumber: "R01",
      price: 28000,
      available: true,
      categoryName: "Royal Suite",
      hotelSlug: "kano-heritage-inn",
    },
  ],
};

export default sampleData;

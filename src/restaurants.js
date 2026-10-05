const DEFAULT_RESTAURANT_SETTINGS = {
  branchesEnabled: false,
  branches: [],
  theme: {
    primary: "#7c3aed",
    dark: "#171717",
  },
  timezone: "Asia/Baghdad",
  currency: "د.ع",
  orderEnabled: true,
orderingHours: {
  enabled: false,

  saturday: {
    enabled: false,
    start: "00:00",
    end: "23:59",
  },

  sunday: {
    enabled: true,
    start: "00:00",
    end: "23:59",
  },

  monday: {
    enabled: false,
    start: "00:00",
    end: "23:59",
  },

  tuesday: {
    enabled: false,
    start: "00:00",
    end: "23:59",
  },

  wednesday: {
    enabled: false,
    start: "00:00",
    end: "23:59",
  },

  thursday: {
    enabled: false,
    start: "00:00",
    end: "23:59",
  },

  friday: {
    enabled: false,
    start: "00:00",
    end: "23:59",
  },
},
};

function createRestaurant(settings) {
  return {
    ...DEFAULT_RESTAURANT_SETTINGS,
    ...settings,

    theme: {
      ...DEFAULT_RESTAURANT_SETTINGS.theme,
      ...(settings.theme || {}),
    },

   orderingHours: {
  ...DEFAULT_RESTAURANT_SETTINGS.orderingHours,
  ...(settings.orderingHours || {}),

  saturday: {
    ...DEFAULT_RESTAURANT_SETTINGS.orderingHours.saturday,
    ...(settings.orderingHours?.saturday || {}),
  },

  sunday: {
    ...DEFAULT_RESTAURANT_SETTINGS.orderingHours.sunday,
    ...(settings.orderingHours?.sunday || {}),
  },

  monday: {
    ...DEFAULT_RESTAURANT_SETTINGS.orderingHours.monday,
    ...(settings.orderingHours?.monday || {}),
  },

  tuesday: {
    ...DEFAULT_RESTAURANT_SETTINGS.orderingHours.tuesday,
    ...(settings.orderingHours?.tuesday || {}),
  },

  wednesday: {
    ...DEFAULT_RESTAURANT_SETTINGS.orderingHours.wednesday,
    ...(settings.orderingHours?.wednesday || {}),
  },

  thursday: {
    ...DEFAULT_RESTAURANT_SETTINGS.orderingHours.thursday,
    ...(settings.orderingHours?.thursday || {}),
  },

  friday: {
    ...DEFAULT_RESTAURANT_SETTINGS.orderingHours.friday,
    ...(settings.orderingHours?.friday || {}),
  },
},

    branches: settings.branches || [],
  };
}

const restaurants = [
  createRestaurant({
    slug: "chef-bashar",
    name: "Chef Bashar",
    description: "مطعم يقدم اشهى الاطباق العربية والغربية",
    phone: "9647722248374",
    location: "https://maps.app.goo.gl/mxJWrzvZRNE1VjkU6",
    logo: "CH",
    logoImage: "/logos/1.jpg",

    orderingHours: {
  enabled: true,
  start: "15:00",
  end: "23:00",
},

    branchesEnabled: true,

    branches: [
      {
        id: "chef-bashar-1",
        name: "الفرع الرئيسي - شارع الطابو",
        phone: "9647722248374",
        location: "https://maps.app.goo.gl/UBaXso4jnComYST58",
      },
      {
        id: "chef-bashar-2",
        name: "الفرع الثاني - التحرير",
        phone: "9647722248374",
        location: "https://maps.app.goo.gl/E22C2G2T7Q5Y4i5o9",
      },
      {
        id: "chef-bashar-3",
        name: "الفرع الثالث - تقاطع القدس",
        phone: "9647722248374",
        location: "https://maps.app.goo.gl/UBaXso4jnComYST58",
      },
    ],

    theme: {
      primary: "#7c3aed",
      dark: "#171717",
    },

    currency: "د.ع",
    orderEnabled: true,
  }),

  createRestaurant({
  slug: "abu-zaid",
  name: "مطعم أبو زيد",
  description: " أبو زيد يقدم لكم أفضل الأطعمة العربية",
  phone: "9647722248374",
  location: "https://maps.app.goo.gl/Z69x37WkCz8pX4MDA",
  logo: "AZ",
  logoImage: "/logos/55.png",
 orderingHours: {
  enabled: false,
  start: "09:00",
  end: "23:59",
},
  branchesEnabled: true,
  branches: [
{
        id: "abu-zaid-1",
        name: "الفرع الرئيسي - شارع الجامعة",
        phone: "9647722248374",
        location: "https://maps.app.goo.gl/UBaXso4jnComYST58",
      },

      {
        id: "abu-zaid-2",
        name: "الفرع الثاني - التحرير",
        phone: "9647729511166",
        location: "https://maps.app.goo.gl/E22C2G2T7Q5Y4i5o9",
      },
  ],

  theme: {
    primary: "#2563eb",
    dark: "#111827",
  },

  currency: "د.ع",
  orderEnabled: true,
}),
];

export function getRestaurantBySlug(slug) {
  return restaurants.find(
    (restaurant) => restaurant.slug === slug
  );
}

export function getAllRestaurants() {
  return restaurants;
}

export default restaurants;
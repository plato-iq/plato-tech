import { getRestaurantBySlug } from "./restaurants";
import { getMenuBySlug } from "./menuData";

export function getRestaurant(slug) {
  return getRestaurantBySlug(slug);
}
export function getRestaurantSettings(slug) {
  const restaurant = getRestaurant(slug);

  if (!restaurant) {
    return null;
  }

  return {
    slug: restaurant.slug,
    name: restaurant.name,
    description: restaurant.description,
    phone: restaurant.phone,
    location: restaurant.location,
    logo: restaurant.logo,
    logoImage: restaurant.logoImage,
    heroImage: restaurant.heroImage,
    branchesEnabled: restaurant.branchesEnabled,
    branches: restaurant.branches || [],
    theme: restaurant.theme,
    currency: restaurant.currency,
    orderEnabled: restaurant.orderEnabled,
    orderingHours: restaurant.orderingHours,
    timezone: restaurant.timezone,
  };
}
export function getRestaurantMenu(slug) {
  return getMenuBySlug(slug);
}

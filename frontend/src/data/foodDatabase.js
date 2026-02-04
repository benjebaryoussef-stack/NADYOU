// Base de données d'aliments française avec valeurs nutritionnelles pour 100g

export const FRENCH_FOODS_DB = [
  // Protéines / Viandes
  { id: "blanc-poulet", name: "Blanc de poulet", category: "Viandes", calories: 165, proteins: 31, carbs: 0, fats: 3.6, leucine: 2.5, isoleucine: 1.4, valine: 1.5 },
  { id: "poulet-roti", name: "Poulet rôti", category: "Viandes", calories: 239, proteins: 27, carbs: 0, fats: 14, leucine: 2.2, isoleucine: 1.3, valine: 1.4 },
  { id: "dinde", name: "Dinde", category: "Viandes", calories: 135, proteins: 30, carbs: 0, fats: 1, leucine: 2.4, isoleucine: 1.3, valine: 1.4 },
  { id: "boeuf-hache", name: "Bœuf haché", category: "Viandes", calories: 250, proteins: 26, carbs: 0, fats: 15, leucine: 2.1, isoleucine: 1.2, valine: 1.3 },
  { id: "steak", name: "Steak", category: "Viandes", calories: 271, proteins: 25, carbs: 0, fats: 19, leucine: 2.0, isoleucine: 1.1, valine: 1.2 },
  { id: "saucisse-poulet", name: "Saucisse de poulet", category: "Viandes", calories: 195, proteins: 16, carbs: 3, fats: 13, leucine: 1.3, isoleucine: 0.8, valine: 0.9 },
  { id: "cotelettes-agneau", name: "Côtelettes d'agneau", category: "Viandes", calories: 294, proteins: 25, carbs: 0, fats: 21, leucine: 2.0, isoleucine: 1.1, valine: 1.2 },
  { id: "foie-veau", name: "Foie de veau", category: "Viandes", calories: 140, proteins: 20, carbs: 3.9, fats: 4.8, leucine: 1.6, isoleucine: 0.9, valine: 1.1 },

  // Poissons / Fruits de mer
  { id: "saumon", name: "Saumon", category: "Poissons", calories: 208, proteins: 20, carbs: 0, fats: 13, leucine: 1.6, isoleucine: 0.9, valine: 1.0 },
  { id: "thon", name: "Thon", category: "Poissons", calories: 144, proteins: 30, carbs: 0, fats: 1, leucine: 2.3, isoleucine: 1.3, valine: 1.5 },
  { id: "cabillaud", name: "Cabillaud", category: "Poissons", calories: 82, proteins: 18, carbs: 0, fats: 0.7, leucine: 1.4, isoleucine: 0.8, valine: 0.9 },
  { id: "merlan", name: "Merlan", category: "Poissons", calories: 86, proteins: 19, carbs: 0, fats: 1, leucine: 1.5, isoleucine: 0.9, valine: 1.0 },
  { id: "sardine", name: "Sardine", category: "Poissons", calories: 208, proteins: 25, carbs: 0, fats: 11, leucine: 2.0, isoleucine: 1.2, valine: 1.3 },
  { id: "maquereau", name: "Maquereau", category: "Poissons", calories: 205, proteins: 19, carbs: 0, fats: 14, leucine: 1.5, isoleucine: 0.9, valine: 1.0 },
  { id: "crevettes", name: "Crevettes", category: "Fruits de mer", calories: 99, proteins: 24, carbs: 0, fats: 0.3, leucine: 1.9, isoleucine: 1.1, valine: 1.2 },
  { id: "moules", name: "Moules", category: "Fruits de mer", calories: 86, proteins: 12, carbs: 3.7, fats: 2.2, leucine: 0.9, isoleucine: 0.5, valine: 0.6 },
  { id: "calamars", name: "Calamars", category: "Fruits de mer", calories: 92, proteins: 16, carbs: 3, fats: 1.4, leucine: 1.2, isoleucine: 0.7, valine: 0.8 },
  { id: "coquilles-saint-jacques", name: "Coquilles Saint-Jacques", category: "Fruits de mer", calories: 88, proteins: 16, carbs: 3.2, fats: 1, leucine: 1.2, isoleucine: 0.7, valine: 0.8 },

  // Féculents
  { id: "riz-blanc", name: "Riz blanc", category: "Féculents", calories: 130, proteins: 2.7, carbs: 28, fats: 0.3, leucine: 0.2, isoleucine: 0.1, valine: 0.1 },
  { id: "riz-complet", name: "Riz complet", category: "Féculents", calories: 111, proteins: 2.6, carbs: 23, fats: 0.9, leucine: 0.2, isoleucine: 0.1, valine: 0.1 },
  { id: "pates", name: "Pâtes", category: "Féculents", calories: 131, proteins: 5, carbs: 25, fats: 1.1, leucine: 0.3, isoleucine: 0.2, valine: 0.2 },
  { id: "pates-completes", name: "Pâtes complètes", category: "Féculents", calories: 124, proteins: 5.3, carbs: 23, fats: 1.3, leucine: 0.4, isoleucine: 0.2, valine: 0.2 },
  { id: "quinoa", name: "Quinoa", category: "Féculents", calories: 120, proteins: 4.4, carbs: 21, fats: 1.9, leucine: 0.3, isoleucine: 0.2, valine: 0.2 },
  { id: "semoule", name: "Semoule", category: "Féculents", calories: 112, proteins: 3.8, carbs: 23, fats: 0.2, leucine: 0.3, isoleucine: 0.1, valine: 0.2 },
  { id: "pommes-terre", name: "Pommes de terre", category: "Féculents", calories: 77, proteins: 2, carbs: 17, fats: 0.1, leucine: 0.1, isoleucine: 0.1, valine: 0.1 },
  { id: "patate-douce", name: "Patate douce", category: "Féculents", calories: 86, proteins: 1.6, carbs: 20, fats: 0.1, leucine: 0.1, isoleucine: 0.05, valine: 0.1 },
  { id: "pain-blanc", name: "Pain blanc", category: "Féculents", calories: 265, proteins: 9, carbs: 49, fats: 3.2, leucine: 0.6, isoleucine: 0.3, valine: 0.4 },
  { id: "pain-complet", name: "Pain complet", category: "Féculents", calories: 247, proteins: 13, carbs: 41, fats: 3.4, leucine: 0.9, isoleucine: 0.5, valine: 0.6 },
  { id: "baguette", name: "Baguette", category: "Féculents", calories: 280, proteins: 9, carbs: 55, fats: 2, leucine: 0.6, isoleucine: 0.3, valine: 0.4 },
  { id: "tortilla", name: "Tortilla", category: "Féculents", calories: 312, proteins: 8, carbs: 51, fats: 8, leucine: 0.5, isoleucine: 0.3, valine: 0.4 },

  // Légumes
  { id: "brocoli", name: "Brocoli", category: "Légumes", calories: 34, proteins: 2.8, carbs: 7, fats: 0.4, leucine: 0.2, isoleucine: 0.1, valine: 0.2 },
  { id: "epinards", name: "Épinards", category: "Légumes", calories: 23, proteins: 2.9, carbs: 3.6, fats: 0.4, leucine: 0.2, isoleucine: 0.1, valine: 0.2 },
  { id: "haricots-verts", name: "Haricots verts", category: "Légumes", calories: 31, proteins: 1.8, carbs: 7, fats: 0.2, leucine: 0.1, isoleucine: 0.1, valine: 0.1 },
  { id: "carottes", name: "Carottes", category: "Légumes", calories: 41, proteins: 0.9, carbs: 10, fats: 0.2, leucine: 0.05, isoleucine: 0.03, valine: 0.04 },
  { id: "courgettes", name: "Courgettes", category: "Légumes", calories: 17, proteins: 1.2, carbs: 3.1, fats: 0.3, leucine: 0.1, isoleucine: 0.05, valine: 0.1 },
  { id: "tomates", name: "Tomates", category: "Légumes", calories: 18, proteins: 0.9, carbs: 3.9, fats: 0.2, leucine: 0.05, isoleucine: 0.03, valine: 0.04 },
  { id: "salade-verte", name: "Salade verte", category: "Légumes", calories: 15, proteins: 1.4, carbs: 2.9, fats: 0.2, leucine: 0.1, isoleucine: 0.05, valine: 0.1 },
  { id: "chou-fleur", name: "Chou-fleur", category: "Légumes", calories: 25, proteins: 1.9, carbs: 5, fats: 0.3, leucine: 0.1, isoleucine: 0.05, valine: 0.1 },
  { id: "poivron-rouge", name: "Poivron rouge", category: "Légumes", calories: 31, proteins: 1, carbs: 6, fats: 0.3, leucine: 0.05, isoleucine: 0.03, valine: 0.05 },
  { id: "poivron-vert", name: "Poivron vert", category: "Légumes", calories: 20, proteins: 0.9, carbs: 4.6, fats: 0.2, leucine: 0.05, isoleucine: 0.03, valine: 0.05 },
  { id: "concombre", name: "Concombre", category: "Légumes", calories: 15, proteins: 0.7, carbs: 3.6, fats: 0.1, leucine: 0.03, isoleucine: 0.02, valine: 0.03 },
  { id: "oignons", name: "Oignons", category: "Légumes", calories: 40, proteins: 1.1, carbs: 9, fats: 0.1, leucine: 0.05, isoleucine: 0.03, valine: 0.05 },
  { id: "champignons", name: "Champignons", category: "Légumes", calories: 22, proteins: 3.1, carbs: 3.3, fats: 0.3, leucine: 0.2, isoleucine: 0.1, valine: 0.2 },

  // Fruits
  { id: "banane", name: "Banane", category: "Fruits", calories: 89, proteins: 1.1, carbs: 23, fats: 0.3, leucine: 0.07, isoleucine: 0.03, valine: 0.05 },
  { id: "pomme", name: "Pomme", category: "Fruits", calories: 52, proteins: 0.3, carbs: 14, fats: 0.2, leucine: 0.02, isoleucine: 0.01, valine: 0.02 },
  { id: "poire", name: "Poire", category: "Fruits", calories: 57, proteins: 0.4, carbs: 15, fats: 0.1, leucine: 0.02, isoleucine: 0.01, valine: 0.02 },
  { id: "orange", name: "Orange", category: "Fruits", calories: 47, proteins: 0.9, carbs: 12, fats: 0.1, leucine: 0.03, isoleucine: 0.02, valine: 0.03 },
  { id: "mandarine", name: "Mandarine", category: "Fruits", calories: 53, proteins: 0.8, carbs: 13, fats: 0.3, leucine: 0.03, isoleucine: 0.02, valine: 0.03 },
  { id: "fraises", name: "Fraises", category: "Fruits", calories: 32, proteins: 0.7, carbs: 7.7, fats: 0.3, leucine: 0.03, isoleucine: 0.01, valine: 0.02 },
  { id: "myrtilles", name: "Myrtilles", category: "Fruits", calories: 57, proteins: 0.7, carbs: 14, fats: 0.3, leucine: 0.03, isoleucine: 0.02, valine: 0.03 },
  { id: "raisin", name: "Raisin", category: "Fruits", calories: 69, proteins: 0.7, carbs: 18, fats: 0.2, leucine: 0.02, isoleucine: 0.01, valine: 0.02 },
  { id: "kiwi", name: "Kiwi", category: "Fruits", calories: 61, proteins: 1.1, carbs: 15, fats: 0.5, leucine: 0.05, isoleucine: 0.03, valine: 0.04 },
  { id: "melon", name: "Melon", category: "Fruits", calories: 34, proteins: 0.8, carbs: 8, fats: 0.2, leucine: 0.03, isoleucine: 0.02, valine: 0.03 },
  { id: "pasteque", name: "Pastèque", category: "Fruits", calories: 30, proteins: 0.6, carbs: 7.6, fats: 0.2, leucine: 0.02, isoleucine: 0.01, valine: 0.02 },
  { id: "ananas", name: "Ananas", category: "Fruits", calories: 50, proteins: 0.5, carbs: 13, fats: 0.1, leucine: 0.02, isoleucine: 0.01, valine: 0.02 },

  // Produits laitiers / Œufs
  { id: "oeufs", name: "Œufs", category: "Œufs", calories: 155, proteins: 13, carbs: 1.1, fats: 11, leucine: 1.1, isoleucine: 0.7, valine: 0.9 },
  { id: "oeuf-dur", name: "Œuf dur", category: "Œufs", calories: 155, proteins: 13, carbs: 1.1, fats: 11, leucine: 1.1, isoleucine: 0.7, valine: 0.9 },
  { id: "oeuf-au-plat", name: "Œuf au plat", category: "Œufs", calories: 196, proteins: 14, carbs: 1, fats: 15, leucine: 1.2, isoleucine: 0.8, valine: 1.0 },
  { id: "blanc-oeuf", name: "Blanc d'œuf", category: "Œufs", calories: 52, proteins: 11, carbs: 0.7, fats: 0.2, leucine: 0.9, isoleucine: 0.6, valine: 0.7 },
  { id: "jaune-oeuf", name: "Jaune d'œuf", category: "Œufs", calories: 322, proteins: 16, carbs: 3.6, fats: 27, leucine: 1.4, isoleucine: 0.9, valine: 1.1 },
  { id: "omelette", name: "Omelette", category: "Œufs", calories: 154, proteins: 11, carbs: 0.6, fats: 12, leucine: 1.0, isoleucine: 0.6, valine: 0.8 },
  { id: "oeufs-brouilles", name: "Œufs brouillés", category: "Œufs", calories: 149, proteins: 10, carbs: 1.6, fats: 11, leucine: 0.9, isoleucine: 0.6, valine: 0.7 },
  { id: "fromage-blanc", name: "Fromage blanc", category: "Produits laitiers", calories: 47, proteins: 8, carbs: 3.5, fats: 0.2, leucine: 0.8, isoleucine: 0.5, valine: 0.6 },
  { id: "yaourt-nature", name: "Yaourt nature", category: "Produits laitiers", calories: 61, proteins: 3.5, carbs: 4.7, fats: 3.3, leucine: 0.3, isoleucine: 0.2, valine: 0.2 },
  { id: "lait-entier", name: "Lait entier", category: "Produits laitiers", calories: 61, proteins: 3.2, carbs: 4.8, fats: 3.3, leucine: 0.3, isoleucine: 0.2, valine: 0.2 },
  { id: "lait-demi-ecreme", name: "Lait demi-écrémé", category: "Produits laitiers", calories: 46, proteins: 3.3, carbs: 4.8, fats: 1.6, leucine: 0.3, isoleucine: 0.2, valine: 0.2 },
  { id: "lait-ecreme", name: "Lait écrémé", category: "Produits laitiers", calories: 34, proteins: 3.4, carbs: 5, fats: 0.1, leucine: 0.3, isoleucine: 0.2, valine: 0.2 },
  { id: "fromage-cheddar", name: "Fromage cheddar", category: "Produits laitiers", calories: 403, proteins: 25, carbs: 1.3, fats: 33, leucine: 2.4, isoleucine: 1.5, valine: 1.7 },
  { id: "mozzarella", name: "Mozzarella", category: "Produits laitiers", calories: 280, proteins: 28, carbs: 2.2, fats: 17, leucine: 2.7, isoleucine: 1.4, valine: 1.8 },
  { id: "parmesan", name: "Parmesan", category: "Produits laitiers", calories: 431, proteins: 38, carbs: 4.1, fats: 29, leucine: 3.5, isoleucine: 1.9, valine: 2.4 },

  // Snacks / Céréales
  { id: "cereales-corn-flakes", name: "Céréales corn flakes", category: "Snacks", calories: 357, proteins: 7.9, carbs: 84, fats: 0.9, leucine: 0.5, isoleucine: 0.3, valine: 0.4 },
  { id: "muesli", name: "Muesli", category: "Snacks", calories: 366, proteins: 10, carbs: 66, fats: 6.9, leucine: 0.7, isoleucine: 0.4, valine: 0.5 },
  { id: "barre-cereales", name: "Barre de céréales", category: "Snacks", calories: 471, proteins: 7, carbs: 68, fats: 19, leucine: 0.4, isoleucine: 0.2, valine: 0.3 },
  { id: "amandes", name: "Amandes", category: "Snacks", calories: 579, proteins: 21, carbs: 22, fats: 50, leucine: 1.5, isoleucine: 0.7, valine: 0.9 },
  { id: "noix", name: "Noix", category: "Snacks", calories: 654, proteins: 15, carbs: 14, fats: 65, leucine: 1.2, isoleucine: 0.6, valine: 0.8 },
  { id: "noisettes", name: "Noisettes", category: "Snacks", calories: 628, proteins: 15, carbs: 17, fats: 61, leucine: 1.1, isoleucine: 0.5, valine: 0.7 },
  { id: "chocolat-noir", name: "Chocolat noir", category: "Snacks", calories: 546, proteins: 7.8, carbs: 46, fats: 31, leucine: 0.4, isoleucine: 0.2, valine: 0.3 },
  { id: "biscuits", name: "Biscuits", category: "Snacks", calories: 502, proteins: 6.3, carbs: 63, fats: 25, leucine: 0.4, isoleucine: 0.2, valine: 0.3 },
  { id: "crackers", name: "Crackers", category: "Snacks", calories: 439, proteins: 9.4, carbs: 71, fats: 12, leucine: 0.6, isoleucine: 0.3, valine: 0.4 },

  // Huiles / Sauces / Condiments
  { id: "huile-olive", name: "Huile d'olive", category: "Huiles", calories: 884, proteins: 0, carbs: 0, fats: 100, leucine: 0, isoleucine: 0, valine: 0 },
  { id: "huile-tournesol", name: "Huile de tournesol", category: "Huiles", calories: 884, proteins: 0, carbs: 0, fats: 100, leucine: 0, isoleucine: 0, valine: 0 },
  { id: "beurre", name: "Beurre", category: "Huiles", calories: 717, proteins: 0.9, carbs: 0.1, fats: 81, leucine: 0.1, isoleucine: 0.05, valine: 0.06 },
  { id: "mayonnaise", name: "Mayonnaise", category: "Sauces", calories: 680, proteins: 1.5, carbs: 0.6, fats: 75, leucine: 0.1, isoleucine: 0.05, valine: 0.1 },
  { id: "ketchup", name: "Ketchup", category: "Sauces", calories: 112, proteins: 1.2, carbs: 27, fats: 0.1, leucine: 0.05, isoleucine: 0.02, valine: 0.03 },
  { id: "sauce-soja", name: "Sauce soja", category: "Sauces", calories: 53, proteins: 5.6, carbs: 4.9, fats: 0.6, leucine: 0.4, isoleucine: 0.2, valine: 0.3 },
  { id: "moutarde", name: "Moutarde", category: "Condiments", calories: 66, proteins: 3.7, carbs: 5.3, fats: 3.3, leucine: 0.2, isoleucine: 0.1, valine: 0.2 },
  { id: "vinaigre-balsamique", name: "Vinaigre balsamique", category: "Condiments", calories: 88, proteins: 0.5, carbs: 17, fats: 0, leucine: 0, isoleucine: 0, valine: 0 },

  // Boissons
  { id: "eau", name: "Eau", category: "Boissons", calories: 0, proteins: 0, carbs: 0, fats: 0, leucine: 0, isoleucine: 0, valine: 0 },
  { id: "cafe", name: "Café", category: "Boissons", calories: 2, proteins: 0.3, carbs: 0, fats: 0, leucine: 0, isoleucine: 0, valine: 0 },
  { id: "the", name: "Thé", category: "Boissons", calories: 1, proteins: 0, carbs: 0.3, fats: 0, leucine: 0, isoleucine: 0, valine: 0 },
  { id: "jus-orange", name: "Jus d'orange", category: "Boissons", calories: 45, proteins: 0.7, carbs: 10, fats: 0.2, leucine: 0.03, isoleucine: 0.02, valine: 0.03 },
  { id: "jus-pomme", name: "Jus de pomme", category: "Boissons", calories: 46, proteins: 0.1, carbs: 11, fats: 0.1, leucine: 0.01, isoleucine: 0.01, valine: 0.01 },
  { id: "smoothie", name: "Smoothie", category: "Boissons", calories: 65, proteins: 1.5, carbs: 15, fats: 0.5, leucine: 0.1, isoleucine: 0.05, valine: 0.08 },

  // Protéines végétales
  { id: "tofu", name: "Tofu", category: "Végétal", calories: 76, proteins: 8, carbs: 1.9, fats: 4.8, leucine: 0.6, isoleucine: 0.4, valine: 0.4 },
  { id: "tempeh", name: "Tempeh", category: "Végétal", calories: 193, proteins: 19, carbs: 9, fats: 11, leucine: 1.4, isoleucine: 0.8, valine: 0.9 },
  { id: "lentilles", name: "Lentilles cuites", category: "Végétal", calories: 116, proteins: 9, carbs: 20, fats: 0.4, leucine: 0.7, isoleucine: 0.4, valine: 0.5 },
  { id: "pois-chiches", name: "Pois chiches", category: "Végétal", calories: 164, proteins: 9, carbs: 27, fats: 2.6, leucine: 0.6, isoleucine: 0.4, valine: 0.4 },

  // Compléments
  { id: "whey", name: "Whey protéine", category: "Suppléments", calories: 400, proteins: 80, carbs: 7, fats: 6, leucine: 8.6, isoleucine: 4.5, valine: 5.0 },
  { id: "caseine", name: "Caséine", category: "Suppléments", calories: 360, proteins: 78, carbs: 8, fats: 3, leucine: 8.0, isoleucine: 4.2, valine: 4.8 },
];

// Fonction de recherche dans la base de données
export const searchFoods = (query) => {
  if (!query || query.length < 1) return [];
  
  const normalizedQuery = query.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  
  return FRENCH_FOODS_DB.filter(food => {
    const normalizedName = food.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const normalizedCategory = food.category.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    return normalizedName.includes(normalizedQuery) || normalizedCategory.includes(normalizedQuery);
  }).slice(0, 10); // Limiter à 10 résultats
};

// Fonction pour obtenir les détails d'un aliment par ID
export const getFoodById = (id) => {
  return FRENCH_FOODS_DB.find(food => food.id === id);
};

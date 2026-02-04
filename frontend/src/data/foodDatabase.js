// Base de données d'aliments française avec valeurs nutritionnelles pour 100g

export const FRENCH_FOODS_DB = [
  // ==================== VIANDES ====================
  { id: "blanc-poulet", name: "Blanc de poulet", category: "Viandes", calories: 165, proteins: 31, carbs: 0, fats: 3.6, leucine: 2.5, isoleucine: 1.4, valine: 1.5 },
  { id: "poulet-roti", name: "Poulet rôti", category: "Viandes", calories: 239, proteins: 27, carbs: 0, fats: 14, leucine: 2.2, isoleucine: 1.3, valine: 1.4 },
  { id: "cuisse-poulet", name: "Cuisse de poulet", category: "Viandes", calories: 177, proteins: 26, carbs: 0, fats: 8, leucine: 2.1, isoleucine: 1.2, valine: 1.3 },
  { id: "aile-poulet", name: "Aile de poulet", category: "Viandes", calories: 203, proteins: 30, carbs: 0, fats: 8.1, leucine: 2.3, isoleucine: 1.3, valine: 1.4 },
  { id: "dinde", name: "Dinde", category: "Viandes", calories: 135, proteins: 30, carbs: 0, fats: 1, leucine: 2.4, isoleucine: 1.3, valine: 1.4 },
  { id: "escalope-dinde", name: "Escalope de dinde", category: "Viandes", calories: 110, proteins: 24, carbs: 0, fats: 1.5, leucine: 2.0, isoleucine: 1.1, valine: 1.2 },
  { id: "boeuf-hache", name: "Bœuf haché", category: "Viandes", calories: 250, proteins: 26, carbs: 0, fats: 15, leucine: 2.1, isoleucine: 1.2, valine: 1.3 },
  { id: "boeuf-hache-5", name: "Bœuf haché 5%", category: "Viandes", calories: 137, proteins: 21, carbs: 0, fats: 5, leucine: 1.8, isoleucine: 1.0, valine: 1.1 },
  { id: "steak", name: "Steak", category: "Viandes", calories: 271, proteins: 25, carbs: 0, fats: 19, leucine: 2.0, isoleucine: 1.1, valine: 1.2 },
  { id: "entrecote", name: "Entrecôte", category: "Viandes", calories: 291, proteins: 24, carbs: 0, fats: 21, leucine: 1.9, isoleucine: 1.1, valine: 1.2 },
  { id: "rosbif", name: "Rosbif", category: "Viandes", calories: 175, proteins: 27, carbs: 0, fats: 7, leucine: 2.2, isoleucine: 1.2, valine: 1.3 },
  { id: "carpaccio-boeuf", name: "Carpaccio de bœuf", category: "Viandes", calories: 121, proteins: 22, carbs: 0.5, fats: 3, leucine: 1.8, isoleucine: 1.0, valine: 1.1 },
  { id: "tartare-boeuf", name: "Tartare de bœuf", category: "Viandes", calories: 180, proteins: 20, carbs: 1, fats: 10, leucine: 1.6, isoleucine: 0.9, valine: 1.0 },
  { id: "escalope-veau", name: "Escalope de veau", category: "Viandes", calories: 172, proteins: 31, carbs: 0, fats: 5, leucine: 2.4, isoleucine: 1.3, valine: 1.4 },
  { id: "foie-veau", name: "Foie de veau", category: "Viandes", calories: 140, proteins: 20, carbs: 3.9, fats: 4.8, leucine: 1.6, isoleucine: 0.9, valine: 1.1 },
  { id: "cotelettes-agneau", name: "Côtelettes d'agneau", category: "Viandes", calories: 294, proteins: 25, carbs: 0, fats: 21, leucine: 2.0, isoleucine: 1.1, valine: 1.2 },
  { id: "gigot-agneau", name: "Gigot d'agneau", category: "Viandes", calories: 234, proteins: 25, carbs: 0, fats: 14, leucine: 2.0, isoleucine: 1.1, valine: 1.2 },
  { id: "canard", name: "Canard", category: "Viandes", calories: 337, proteins: 19, carbs: 0, fats: 28, leucine: 1.5, isoleucine: 0.9, valine: 1.0 },
  { id: "magret-canard", name: "Magret de canard", category: "Viandes", calories: 230, proteins: 22, carbs: 0, fats: 15, leucine: 1.8, isoleucine: 1.0, valine: 1.1 },
  { id: "lapin", name: "Lapin", category: "Viandes", calories: 136, proteins: 21, carbs: 0, fats: 5, leucine: 1.7, isoleucine: 1.0, valine: 1.1 },
  { id: "saucisse-poulet", name: "Saucisse de poulet", category: "Viandes", calories: 195, proteins: 16, carbs: 3, fats: 13, leucine: 1.3, isoleucine: 0.8, valine: 0.9 },

  // ==================== POISSONS ====================
  { id: "saumon", name: "Saumon", category: "Poissons", calories: 208, proteins: 20, carbs: 0, fats: 13, leucine: 1.6, isoleucine: 0.9, valine: 1.0 },
  { id: "saumon-fume", name: "Saumon fumé", category: "Poissons", calories: 117, proteins: 18, carbs: 0, fats: 4.5, leucine: 1.4, isoleucine: 0.8, valine: 0.9 },
  { id: "thon", name: "Thon", category: "Poissons", calories: 144, proteins: 30, carbs: 0, fats: 1, leucine: 2.3, isoleucine: 1.3, valine: 1.5 },
  { id: "thon-conserve", name: "Thon en conserve", category: "Poissons", calories: 116, proteins: 26, carbs: 0, fats: 1, leucine: 2.0, isoleucine: 1.1, valine: 1.3 },
  { id: "cabillaud", name: "Cabillaud", category: "Poissons", calories: 82, proteins: 18, carbs: 0, fats: 0.7, leucine: 1.4, isoleucine: 0.8, valine: 0.9 },
  { id: "merlan", name: "Merlan", category: "Poissons", calories: 86, proteins: 19, carbs: 0, fats: 1, leucine: 1.5, isoleucine: 0.9, valine: 1.0 },
  { id: "sardine", name: "Sardine", category: "Poissons", calories: 208, proteins: 25, carbs: 0, fats: 11, leucine: 2.0, isoleucine: 1.2, valine: 1.3 },
  { id: "maquereau", name: "Maquereau", category: "Poissons", calories: 205, proteins: 19, carbs: 0, fats: 14, leucine: 1.5, isoleucine: 0.9, valine: 1.0 },
  { id: "truite", name: "Truite", category: "Poissons", calories: 119, proteins: 20, carbs: 0, fats: 4, leucine: 1.6, isoleucine: 0.9, valine: 1.0 },
  { id: "bar", name: "Bar (loup de mer)", category: "Poissons", calories: 97, proteins: 18, carbs: 0, fats: 2, leucine: 1.4, isoleucine: 0.8, valine: 0.9 },
  { id: "sole", name: "Sole", category: "Poissons", calories: 86, proteins: 18, carbs: 0, fats: 1.2, leucine: 1.4, isoleucine: 0.8, valine: 0.9 },
  { id: "dorade", name: "Dorade", category: "Poissons", calories: 100, proteins: 20, carbs: 0, fats: 2, leucine: 1.6, isoleucine: 0.9, valine: 1.0 },
  { id: "anchois", name: "Anchois", category: "Poissons", calories: 131, proteins: 20, carbs: 0, fats: 5, leucine: 1.6, isoleucine: 0.9, valine: 1.0 },
  { id: "hareng", name: "Hareng", category: "Poissons", calories: 158, proteins: 18, carbs: 0, fats: 9, leucine: 1.4, isoleucine: 0.8, valine: 0.9 },
  { id: "colin", name: "Colin", category: "Poissons", calories: 82, proteins: 17, carbs: 0, fats: 1, leucine: 1.4, isoleucine: 0.8, valine: 0.9 },
  { id: "lieu-noir", name: "Lieu noir", category: "Poissons", calories: 81, proteins: 19, carbs: 0, fats: 0.5, leucine: 1.5, isoleucine: 0.9, valine: 1.0 },

  // ==================== FRUITS DE MER ====================
  { id: "crevettes", name: "Crevettes", category: "Fruits de mer", calories: 99, proteins: 24, carbs: 0, fats: 0.3, leucine: 1.9, isoleucine: 1.1, valine: 1.2 },
  { id: "crevettes-grises", name: "Crevettes grises", category: "Fruits de mer", calories: 90, proteins: 19, carbs: 0, fats: 1.5, leucine: 1.5, isoleucine: 0.9, valine: 1.0 },
  { id: "moules", name: "Moules", category: "Fruits de mer", calories: 86, proteins: 12, carbs: 3.7, fats: 2.2, leucine: 0.9, isoleucine: 0.5, valine: 0.6 },
  { id: "calamars", name: "Calamars", category: "Fruits de mer", calories: 92, proteins: 16, carbs: 3, fats: 1.4, leucine: 1.2, isoleucine: 0.7, valine: 0.8 },
  { id: "coquilles-saint-jacques", name: "Coquilles Saint-Jacques", category: "Fruits de mer", calories: 88, proteins: 16, carbs: 3.2, fats: 1, leucine: 1.2, isoleucine: 0.7, valine: 0.8 },
  { id: "huitres", name: "Huîtres", category: "Fruits de mer", calories: 69, proteins: 9, carbs: 4, fats: 2, leucine: 0.7, isoleucine: 0.4, valine: 0.5 },
  { id: "homard", name: "Homard", category: "Fruits de mer", calories: 89, proteins: 19, carbs: 0, fats: 1, leucine: 1.5, isoleucine: 0.9, valine: 1.0 },
  { id: "crabe", name: "Crabe", category: "Fruits de mer", calories: 87, proteins: 18, carbs: 0, fats: 1, leucine: 1.4, isoleucine: 0.8, valine: 0.9 },
  { id: "poulpe", name: "Poulpe", category: "Fruits de mer", calories: 82, proteins: 15, carbs: 2, fats: 1, leucine: 1.2, isoleucine: 0.7, valine: 0.8 },

  // ==================== ŒUFS ====================
  { id: "oeufs", name: "Œufs", category: "Œufs", calories: 155, proteins: 13, carbs: 1.1, fats: 11, leucine: 1.1, isoleucine: 0.7, valine: 0.9 },
  { id: "oeuf-dur", name: "Œuf dur", category: "Œufs", calories: 155, proteins: 13, carbs: 1.1, fats: 11, leucine: 1.1, isoleucine: 0.7, valine: 0.9 },
  { id: "oeuf-au-plat", name: "Œuf au plat", category: "Œufs", calories: 196, proteins: 14, carbs: 1, fats: 15, leucine: 1.2, isoleucine: 0.8, valine: 1.0 },
  { id: "oeuf-poche", name: "Œuf poché", category: "Œufs", calories: 143, proteins: 12, carbs: 1, fats: 10, leucine: 1.0, isoleucine: 0.6, valine: 0.8 },
  { id: "blanc-oeuf", name: "Blanc d'œuf", category: "Œufs", calories: 52, proteins: 11, carbs: 0.7, fats: 0.2, leucine: 0.9, isoleucine: 0.6, valine: 0.7 },
  { id: "jaune-oeuf", name: "Jaune d'œuf", category: "Œufs", calories: 322, proteins: 16, carbs: 3.6, fats: 27, leucine: 1.4, isoleucine: 0.9, valine: 1.1 },
  { id: "omelette", name: "Omelette", category: "Œufs", calories: 154, proteins: 11, carbs: 0.6, fats: 12, leucine: 1.0, isoleucine: 0.6, valine: 0.8 },
  { id: "oeufs-brouilles", name: "Œufs brouillés", category: "Œufs", calories: 149, proteins: 10, carbs: 1.6, fats: 11, leucine: 0.9, isoleucine: 0.6, valine: 0.7 },

  // ==================== PRODUITS LAITIERS ====================
  { id: "fromage-blanc", name: "Fromage blanc", category: "Produits laitiers", calories: 47, proteins: 8, carbs: 3.5, fats: 0.2, leucine: 0.8, isoleucine: 0.5, valine: 0.6 },
  { id: "fromage-blanc-20", name: "Fromage blanc 20%", category: "Produits laitiers", calories: 80, proteins: 8, carbs: 4, fats: 3.5, leucine: 0.8, isoleucine: 0.5, valine: 0.6 },
  { id: "skyr", name: "Skyr", category: "Produits laitiers", calories: 63, proteins: 11, carbs: 4, fats: 0.2, leucine: 1.0, isoleucine: 0.6, valine: 0.7 },
  { id: "cottage-cheese", name: "Cottage cheese", category: "Produits laitiers", calories: 98, proteins: 11, carbs: 3.4, fats: 4.3, leucine: 1.0, isoleucine: 0.6, valine: 0.7 },
  { id: "yaourt-nature", name: "Yaourt nature", category: "Produits laitiers", calories: 61, proteins: 3.5, carbs: 4.7, fats: 3.3, leucine: 0.3, isoleucine: 0.2, valine: 0.2 },
  { id: "yaourt-grec", name: "Yaourt grec", category: "Produits laitiers", calories: 97, proteins: 9, carbs: 3.6, fats: 5, leucine: 0.8, isoleucine: 0.5, valine: 0.6 },
  { id: "yaourt-0", name: "Yaourt 0%", category: "Produits laitiers", calories: 45, proteins: 4.5, carbs: 6, fats: 0.1, leucine: 0.4, isoleucine: 0.2, valine: 0.3 },
  { id: "lait-entier", name: "Lait entier", category: "Produits laitiers", calories: 61, proteins: 3.2, carbs: 4.8, fats: 3.3, leucine: 0.3, isoleucine: 0.2, valine: 0.2 },
  { id: "lait-demi-ecreme", name: "Lait demi-écrémé", category: "Produits laitiers", calories: 46, proteins: 3.3, carbs: 4.8, fats: 1.6, leucine: 0.3, isoleucine: 0.2, valine: 0.2 },
  { id: "lait-ecreme", name: "Lait écrémé", category: "Produits laitiers", calories: 34, proteins: 3.4, carbs: 5, fats: 0.1, leucine: 0.3, isoleucine: 0.2, valine: 0.2 },
  { id: "lait-amande", name: "Lait d'amande", category: "Produits laitiers", calories: 24, proteins: 0.5, carbs: 3, fats: 1.1, leucine: 0.03, isoleucine: 0.02, valine: 0.02 },
  { id: "lait-avoine", name: "Lait d'avoine", category: "Produits laitiers", calories: 46, proteins: 1, carbs: 8, fats: 1.5, leucine: 0.05, isoleucine: 0.03, valine: 0.04 },
  { id: "lait-soja", name: "Lait de soja", category: "Produits laitiers", calories: 54, proteins: 3.3, carbs: 6, fats: 1.8, leucine: 0.3, isoleucine: 0.2, valine: 0.2 },
  { id: "creme-fraiche", name: "Crème fraîche", category: "Produits laitiers", calories: 292, proteins: 2.4, carbs: 3, fats: 30, leucine: 0.2, isoleucine: 0.1, valine: 0.1 },
  { id: "creme-legere", name: "Crème légère 15%", category: "Produits laitiers", calories: 153, proteins: 2.6, carbs: 4, fats: 15, leucine: 0.2, isoleucine: 0.1, valine: 0.1 },
  { id: "fromage-cheddar", name: "Fromage cheddar", category: "Produits laitiers", calories: 403, proteins: 25, carbs: 1.3, fats: 33, leucine: 2.4, isoleucine: 1.5, valine: 1.7 },
  { id: "mozzarella", name: "Mozzarella", category: "Produits laitiers", calories: 280, proteins: 28, carbs: 2.2, fats: 17, leucine: 2.7, isoleucine: 1.4, valine: 1.8 },
  { id: "parmesan", name: "Parmesan", category: "Produits laitiers", calories: 431, proteins: 38, carbs: 4.1, fats: 29, leucine: 3.5, isoleucine: 1.9, valine: 2.4 },
  { id: "emmental", name: "Emmental", category: "Produits laitiers", calories: 380, proteins: 29, carbs: 0, fats: 29, leucine: 2.8, isoleucine: 1.5, valine: 1.9 },
  { id: "comte", name: "Comté", category: "Produits laitiers", calories: 418, proteins: 28, carbs: 0.3, fats: 34, leucine: 2.7, isoleucine: 1.4, valine: 1.8 },
  { id: "gruyere", name: "Gruyère", category: "Produits laitiers", calories: 413, proteins: 30, carbs: 0.4, fats: 32, leucine: 2.9, isoleucine: 1.5, valine: 2.0 },
  { id: "camembert", name: "Camembert", category: "Produits laitiers", calories: 299, proteins: 20, carbs: 0.5, fats: 24, leucine: 1.9, isoleucine: 1.0, valine: 1.3 },
  { id: "brie", name: "Brie", category: "Produits laitiers", calories: 334, proteins: 21, carbs: 0.5, fats: 28, leucine: 2.0, isoleucine: 1.1, valine: 1.4 },
  { id: "feta", name: "Feta", category: "Produits laitiers", calories: 264, proteins: 14, carbs: 4, fats: 21, leucine: 1.4, isoleucine: 0.7, valine: 0.9 },
  { id: "chevre-frais", name: "Chèvre frais", category: "Produits laitiers", calories: 268, proteins: 19, carbs: 1, fats: 21, leucine: 1.5, isoleucine: 0.8, valine: 1.0 },
  { id: "ricotta", name: "Ricotta", category: "Produits laitiers", calories: 174, proteins: 11, carbs: 3, fats: 13, leucine: 1.1, isoleucine: 0.6, valine: 0.7 },
  { id: "mascarpone", name: "Mascarpone", category: "Produits laitiers", calories: 429, proteins: 4.6, carbs: 3, fats: 44, leucine: 0.4, isoleucine: 0.2, valine: 0.3 },

  // ==================== FÉCULENTS ====================
  { id: "riz-blanc", name: "Riz blanc cuit", category: "Féculents", calories: 130, proteins: 2.7, carbs: 28, fats: 0.3, leucine: 0.2, isoleucine: 0.1, valine: 0.1 },
  { id: "riz-complet", name: "Riz complet cuit", category: "Féculents", calories: 111, proteins: 2.6, carbs: 23, fats: 0.9, leucine: 0.2, isoleucine: 0.1, valine: 0.1 },
  { id: "riz-basmati", name: "Riz basmati cuit", category: "Féculents", calories: 121, proteins: 3.5, carbs: 25, fats: 0.4, leucine: 0.2, isoleucine: 0.1, valine: 0.2 },
  { id: "riz-thai", name: "Riz thaï cuit", category: "Féculents", calories: 129, proteins: 2.7, carbs: 28, fats: 0.3, leucine: 0.2, isoleucine: 0.1, valine: 0.1 },
  { id: "pates", name: "Pâtes cuites", category: "Féculents", calories: 131, proteins: 5, carbs: 25, fats: 1.1, leucine: 0.3, isoleucine: 0.2, valine: 0.2 },
  { id: "pates-completes", name: "Pâtes complètes cuites", category: "Féculents", calories: 124, proteins: 5.3, carbs: 23, fats: 1.3, leucine: 0.4, isoleucine: 0.2, valine: 0.2 },
  { id: "spaghetti", name: "Spaghetti cuits", category: "Féculents", calories: 131, proteins: 5, carbs: 25, fats: 1.1, leucine: 0.3, isoleucine: 0.2, valine: 0.2 },
  { id: "quinoa", name: "Quinoa cuit", category: "Féculents", calories: 120, proteins: 4.4, carbs: 21, fats: 1.9, leucine: 0.3, isoleucine: 0.2, valine: 0.2 },
  { id: "boulgour", name: "Boulgour cuit", category: "Féculents", calories: 83, proteins: 3.1, carbs: 18, fats: 0.2, leucine: 0.2, isoleucine: 0.1, valine: 0.1 },
  { id: "couscous", name: "Couscous cuit", category: "Féculents", calories: 112, proteins: 3.8, carbs: 23, fats: 0.2, leucine: 0.3, isoleucine: 0.1, valine: 0.2 },
  { id: "semoule", name: "Semoule cuite", category: "Féculents", calories: 112, proteins: 3.8, carbs: 23, fats: 0.2, leucine: 0.3, isoleucine: 0.1, valine: 0.2 },
  { id: "pommes-terre", name: "Pommes de terre cuites", category: "Féculents", calories: 77, proteins: 2, carbs: 17, fats: 0.1, leucine: 0.1, isoleucine: 0.1, valine: 0.1 },
  { id: "puree", name: "Purée de pommes de terre", category: "Féculents", calories: 113, proteins: 2, carbs: 16, fats: 5, leucine: 0.1, isoleucine: 0.1, valine: 0.1 },
  { id: "frites", name: "Frites", category: "Féculents", calories: 312, proteins: 3.4, carbs: 41, fats: 15, leucine: 0.2, isoleucine: 0.1, valine: 0.2 },
  { id: "patate-douce", name: "Patate douce cuite", category: "Féculents", calories: 86, proteins: 1.6, carbs: 20, fats: 0.1, leucine: 0.1, isoleucine: 0.05, valine: 0.1 },
  { id: "pain-blanc", name: "Pain blanc", category: "Féculents", calories: 265, proteins: 9, carbs: 49, fats: 3.2, leucine: 0.6, isoleucine: 0.3, valine: 0.4 },
  { id: "pain-complet", name: "Pain complet", category: "Féculents", calories: 247, proteins: 13, carbs: 41, fats: 3.4, leucine: 0.9, isoleucine: 0.5, valine: 0.6 },
  { id: "pain-cereales", name: "Pain aux céréales", category: "Féculents", calories: 265, proteins: 10, carbs: 45, fats: 5, leucine: 0.7, isoleucine: 0.4, valine: 0.5 },
  { id: "pain-seigle", name: "Pain de seigle", category: "Féculents", calories: 259, proteins: 8.5, carbs: 48, fats: 3.3, leucine: 0.5, isoleucine: 0.3, valine: 0.4 },
  { id: "baguette", name: "Baguette", category: "Féculents", calories: 280, proteins: 9, carbs: 55, fats: 2, leucine: 0.6, isoleucine: 0.3, valine: 0.4 },
  { id: "pain-mie", name: "Pain de mie", category: "Féculents", calories: 274, proteins: 8, carbs: 49, fats: 5, leucine: 0.5, isoleucine: 0.3, valine: 0.4 },
  { id: "tortilla", name: "Tortilla", category: "Féculents", calories: 312, proteins: 8, carbs: 51, fats: 8, leucine: 0.5, isoleucine: 0.3, valine: 0.4 },
  { id: "wrap", name: "Wrap", category: "Féculents", calories: 312, proteins: 8, carbs: 51, fats: 8, leucine: 0.5, isoleucine: 0.3, valine: 0.4 },

  // ==================== PETIT-DÉJEUNER ====================
  { id: "flocons-avoine", name: "Flocons d'avoine", category: "Petit-déjeuner", calories: 389, proteins: 17, carbs: 66, fats: 7, leucine: 1.3, isoleucine: 0.7, valine: 0.9 },
  { id: "porridge", name: "Porridge (préparé)", category: "Petit-déjeuner", calories: 71, proteins: 2.5, carbs: 12, fats: 1.5, leucine: 0.2, isoleucine: 0.1, valine: 0.2 },
  { id: "granola", name: "Granola", category: "Petit-déjeuner", calories: 471, proteins: 10, carbs: 64, fats: 20, leucine: 0.8, isoleucine: 0.4, valine: 0.5 },
  { id: "muesli", name: "Muesli", category: "Petit-déjeuner", calories: 366, proteins: 10, carbs: 66, fats: 6.9, leucine: 0.7, isoleucine: 0.4, valine: 0.5 },
  { id: "cereales-corn-flakes", name: "Corn flakes", category: "Petit-déjeuner", calories: 357, proteins: 7.9, carbs: 84, fats: 0.9, leucine: 0.5, isoleucine: 0.3, valine: 0.4 },
  { id: "cereales-special-k", name: "Special K", category: "Petit-déjeuner", calories: 379, proteins: 14, carbs: 75, fats: 1.5, leucine: 0.9, isoleucine: 0.5, valine: 0.6 },
  { id: "croissant", name: "Croissant", category: "Petit-déjeuner", calories: 406, proteins: 8, carbs: 45, fats: 21, leucine: 0.5, isoleucine: 0.3, valine: 0.4 },
  { id: "pain-chocolat", name: "Pain au chocolat", category: "Petit-déjeuner", calories: 414, proteins: 7, carbs: 48, fats: 22, leucine: 0.5, isoleucine: 0.3, valine: 0.3 },
  { id: "brioche", name: "Brioche", category: "Petit-déjeuner", calories: 357, proteins: 8, carbs: 52, fats: 13, leucine: 0.5, isoleucine: 0.3, valine: 0.4 },
  { id: "pancakes", name: "Pancakes", category: "Petit-déjeuner", calories: 227, proteins: 6, carbs: 28, fats: 10, leucine: 0.5, isoleucine: 0.3, valine: 0.3 },
  { id: "crepes", name: "Crêpes", category: "Petit-déjeuner", calories: 227, proteins: 6, carbs: 28, fats: 10, leucine: 0.5, isoleucine: 0.3, valine: 0.3 },
  { id: "gaufres", name: "Gaufres", category: "Petit-déjeuner", calories: 291, proteins: 7, carbs: 33, fats: 14, leucine: 0.5, isoleucine: 0.3, valine: 0.4 },
  { id: "confiture", name: "Confiture", category: "Petit-déjeuner", calories: 278, proteins: 0.4, carbs: 69, fats: 0.1, leucine: 0.01, isoleucine: 0.01, valine: 0.01 },
  { id: "miel", name: "Miel", category: "Petit-déjeuner", calories: 304, proteins: 0.3, carbs: 82, fats: 0, leucine: 0.01, isoleucine: 0.01, valine: 0.01 },
  { id: "pate-tartiner", name: "Pâte à tartiner chocolat", category: "Petit-déjeuner", calories: 539, proteins: 6, carbs: 58, fats: 31, leucine: 0.4, isoleucine: 0.2, valine: 0.3 },
  { id: "beurre-cacahuete", name: "Beurre de cacahuète", category: "Petit-déjeuner", calories: 588, proteins: 25, carbs: 20, fats: 50, leucine: 1.7, isoleucine: 0.9, valine: 1.1 },
  { id: "beurre-amande", name: "Beurre d'amande", category: "Petit-déjeuner", calories: 614, proteins: 21, carbs: 19, fats: 56, leucine: 1.5, isoleucine: 0.7, valine: 0.9 },

  // ==================== LÉGUMES ====================
  { id: "avocat", name: "Avocat", category: "Légumes", calories: 160, proteins: 2, carbs: 9, fats: 15, leucine: 0.14, isoleucine: 0.08, valine: 0.1 },
  { id: "brocoli", name: "Brocoli", category: "Légumes", calories: 34, proteins: 2.8, carbs: 7, fats: 0.4, leucine: 0.2, isoleucine: 0.1, valine: 0.2 },
  { id: "epinards", name: "Épinards", category: "Légumes", calories: 23, proteins: 2.9, carbs: 3.6, fats: 0.4, leucine: 0.2, isoleucine: 0.1, valine: 0.2 },
  { id: "haricots-verts", name: "Haricots verts", category: "Légumes", calories: 31, proteins: 1.8, carbs: 7, fats: 0.2, leucine: 0.1, isoleucine: 0.1, valine: 0.1 },
  { id: "carottes", name: "Carottes", category: "Légumes", calories: 41, proteins: 0.9, carbs: 10, fats: 0.2, leucine: 0.05, isoleucine: 0.03, valine: 0.04 },
  { id: "courgettes", name: "Courgettes", category: "Légumes", calories: 17, proteins: 1.2, carbs: 3.1, fats: 0.3, leucine: 0.1, isoleucine: 0.05, valine: 0.1 },
  { id: "aubergine", name: "Aubergine", category: "Légumes", calories: 25, proteins: 1, carbs: 6, fats: 0.2, leucine: 0.05, isoleucine: 0.03, valine: 0.05 },
  { id: "tomates", name: "Tomates", category: "Légumes", calories: 18, proteins: 0.9, carbs: 3.9, fats: 0.2, leucine: 0.05, isoleucine: 0.03, valine: 0.04 },
  { id: "tomates-cerises", name: "Tomates cerises", category: "Légumes", calories: 18, proteins: 0.9, carbs: 3.9, fats: 0.2, leucine: 0.05, isoleucine: 0.03, valine: 0.04 },
  { id: "salade-verte", name: "Salade verte", category: "Légumes", calories: 15, proteins: 1.4, carbs: 2.9, fats: 0.2, leucine: 0.1, isoleucine: 0.05, valine: 0.1 },
  { id: "laitue", name: "Laitue", category: "Légumes", calories: 15, proteins: 1.4, carbs: 2.9, fats: 0.2, leucine: 0.1, isoleucine: 0.05, valine: 0.1 },
  { id: "roquette", name: "Roquette", category: "Légumes", calories: 25, proteins: 2.6, carbs: 3.7, fats: 0.7, leucine: 0.2, isoleucine: 0.1, valine: 0.1 },
  { id: "chou-fleur", name: "Chou-fleur", category: "Légumes", calories: 25, proteins: 1.9, carbs: 5, fats: 0.3, leucine: 0.1, isoleucine: 0.05, valine: 0.1 },
  { id: "chou-kale", name: "Chou kale", category: "Légumes", calories: 49, proteins: 4.3, carbs: 9, fats: 0.9, leucine: 0.3, isoleucine: 0.2, valine: 0.2 },
  { id: "chou-rouge", name: "Chou rouge", category: "Légumes", calories: 31, proteins: 1.4, carbs: 7, fats: 0.2, leucine: 0.1, isoleucine: 0.05, valine: 0.08 },
  { id: "chou-blanc", name: "Chou blanc", category: "Légumes", calories: 25, proteins: 1.3, carbs: 6, fats: 0.1, leucine: 0.08, isoleucine: 0.04, valine: 0.06 },
  { id: "choux-bruxelles", name: "Choux de Bruxelles", category: "Légumes", calories: 43, proteins: 3.4, carbs: 9, fats: 0.3, leucine: 0.2, isoleucine: 0.1, valine: 0.2 },
  { id: "poivron-rouge", name: "Poivron rouge", category: "Légumes", calories: 31, proteins: 1, carbs: 6, fats: 0.3, leucine: 0.05, isoleucine: 0.03, valine: 0.05 },
  { id: "poivron-vert", name: "Poivron vert", category: "Légumes", calories: 20, proteins: 0.9, carbs: 4.6, fats: 0.2, leucine: 0.05, isoleucine: 0.03, valine: 0.05 },
  { id: "poivron-jaune", name: "Poivron jaune", category: "Légumes", calories: 27, proteins: 1, carbs: 6, fats: 0.2, leucine: 0.05, isoleucine: 0.03, valine: 0.05 },
  { id: "concombre", name: "Concombre", category: "Légumes", calories: 15, proteins: 0.7, carbs: 3.6, fats: 0.1, leucine: 0.03, isoleucine: 0.02, valine: 0.03 },
  { id: "oignons", name: "Oignons", category: "Légumes", calories: 40, proteins: 1.1, carbs: 9, fats: 0.1, leucine: 0.05, isoleucine: 0.03, valine: 0.05 },
  { id: "oignon-rouge", name: "Oignon rouge", category: "Légumes", calories: 40, proteins: 1.1, carbs: 9, fats: 0.1, leucine: 0.05, isoleucine: 0.03, valine: 0.05 },
  { id: "echalote", name: "Échalote", category: "Légumes", calories: 72, proteins: 2.5, carbs: 17, fats: 0.1, leucine: 0.08, isoleucine: 0.05, valine: 0.07 },
  { id: "ail", name: "Ail", category: "Légumes", calories: 149, proteins: 6.4, carbs: 33, fats: 0.5, leucine: 0.3, isoleucine: 0.2, valine: 0.3 },
  { id: "champignons", name: "Champignons", category: "Légumes", calories: 22, proteins: 3.1, carbs: 3.3, fats: 0.3, leucine: 0.2, isoleucine: 0.1, valine: 0.2 },
  { id: "champignons-paris", name: "Champignons de Paris", category: "Légumes", calories: 22, proteins: 3.1, carbs: 3.3, fats: 0.3, leucine: 0.2, isoleucine: 0.1, valine: 0.2 },
  { id: "asperges", name: "Asperges", category: "Légumes", calories: 20, proteins: 2.2, carbs: 3.9, fats: 0.1, leucine: 0.1, isoleucine: 0.06, valine: 0.1 },
  { id: "celeri", name: "Céleri", category: "Légumes", calories: 14, proteins: 0.7, carbs: 3, fats: 0.2, leucine: 0.04, isoleucine: 0.02, valine: 0.04 },
  { id: "celeri-rave", name: "Céleri-rave", category: "Légumes", calories: 42, proteins: 1.5, carbs: 9, fats: 0.3, leucine: 0.07, isoleucine: 0.04, valine: 0.06 },
  { id: "fenouil", name: "Fenouil", category: "Légumes", calories: 31, proteins: 1.2, carbs: 7, fats: 0.2, leucine: 0.06, isoleucine: 0.03, valine: 0.05 },
  { id: "poireaux", name: "Poireaux", category: "Légumes", calories: 61, proteins: 1.5, carbs: 14, fats: 0.3, leucine: 0.08, isoleucine: 0.04, valine: 0.07 },
  { id: "petits-pois", name: "Petits pois", category: "Légumes", calories: 81, proteins: 5.4, carbs: 14, fats: 0.4, leucine: 0.3, isoleucine: 0.2, valine: 0.2 },
  { id: "mais", name: "Maïs", category: "Légumes", calories: 86, proteins: 3.3, carbs: 19, fats: 1.2, leucine: 0.4, isoleucine: 0.1, valine: 0.2 },
  { id: "betterave", name: "Betterave", category: "Légumes", calories: 43, proteins: 1.6, carbs: 10, fats: 0.2, leucine: 0.07, isoleucine: 0.04, valine: 0.06 },
  { id: "radis", name: "Radis", category: "Légumes", calories: 16, proteins: 0.7, carbs: 3.4, fats: 0.1, leucine: 0.03, isoleucine: 0.02, valine: 0.03 },
  { id: "artichaut", name: "Artichaut", category: "Légumes", calories: 47, proteins: 3.3, carbs: 11, fats: 0.2, leucine: 0.2, isoleucine: 0.1, valine: 0.1 },

  // ==================== FRUITS ====================
  { id: "banane", name: "Banane", category: "Fruits", calories: 89, proteins: 1.1, carbs: 23, fats: 0.3, leucine: 0.07, isoleucine: 0.03, valine: 0.05 },
  { id: "pomme", name: "Pomme", category: "Fruits", calories: 52, proteins: 0.3, carbs: 14, fats: 0.2, leucine: 0.02, isoleucine: 0.01, valine: 0.02 },
  { id: "poire", name: "Poire", category: "Fruits", calories: 57, proteins: 0.4, carbs: 15, fats: 0.1, leucine: 0.02, isoleucine: 0.01, valine: 0.02 },
  { id: "orange", name: "Orange", category: "Fruits", calories: 47, proteins: 0.9, carbs: 12, fats: 0.1, leucine: 0.03, isoleucine: 0.02, valine: 0.03 },
  { id: "clementine", name: "Clémentine", category: "Fruits", calories: 47, proteins: 0.9, carbs: 12, fats: 0.1, leucine: 0.03, isoleucine: 0.02, valine: 0.03 },
  { id: "mandarine", name: "Mandarine", category: "Fruits", calories: 53, proteins: 0.8, carbs: 13, fats: 0.3, leucine: 0.03, isoleucine: 0.02, valine: 0.03 },
  { id: "pamplemousse", name: "Pamplemousse", category: "Fruits", calories: 42, proteins: 0.8, carbs: 11, fats: 0.1, leucine: 0.03, isoleucine: 0.02, valine: 0.02 },
  { id: "citron", name: "Citron", category: "Fruits", calories: 29, proteins: 1.1, carbs: 9, fats: 0.3, leucine: 0.04, isoleucine: 0.02, valine: 0.03 },
  { id: "fraises", name: "Fraises", category: "Fruits", calories: 32, proteins: 0.7, carbs: 7.7, fats: 0.3, leucine: 0.03, isoleucine: 0.01, valine: 0.02 },
  { id: "framboises", name: "Framboises", category: "Fruits", calories: 52, proteins: 1.2, carbs: 12, fats: 0.7, leucine: 0.05, isoleucine: 0.02, valine: 0.04 },
  { id: "myrtilles", name: "Myrtilles", category: "Fruits", calories: 57, proteins: 0.7, carbs: 14, fats: 0.3, leucine: 0.03, isoleucine: 0.02, valine: 0.03 },
  { id: "mures", name: "Mûres", category: "Fruits", calories: 43, proteins: 1.4, carbs: 10, fats: 0.5, leucine: 0.05, isoleucine: 0.02, valine: 0.04 },
  { id: "cerises", name: "Cerises", category: "Fruits", calories: 63, proteins: 1.1, carbs: 16, fats: 0.2, leucine: 0.03, isoleucine: 0.01, valine: 0.02 },
  { id: "raisin", name: "Raisin", category: "Fruits", calories: 69, proteins: 0.7, carbs: 18, fats: 0.2, leucine: 0.02, isoleucine: 0.01, valine: 0.02 },
  { id: "kiwi", name: "Kiwi", category: "Fruits", calories: 61, proteins: 1.1, carbs: 15, fats: 0.5, leucine: 0.05, isoleucine: 0.03, valine: 0.04 },
  { id: "mangue", name: "Mangue", category: "Fruits", calories: 60, proteins: 0.8, carbs: 15, fats: 0.4, leucine: 0.04, isoleucine: 0.02, valine: 0.03 },
  { id: "ananas", name: "Ananas", category: "Fruits", calories: 50, proteins: 0.5, carbs: 13, fats: 0.1, leucine: 0.02, isoleucine: 0.01, valine: 0.02 },
  { id: "papaye", name: "Papaye", category: "Fruits", calories: 43, proteins: 0.5, carbs: 11, fats: 0.3, leucine: 0.02, isoleucine: 0.01, valine: 0.01 },
  { id: "melon", name: "Melon", category: "Fruits", calories: 34, proteins: 0.8, carbs: 8, fats: 0.2, leucine: 0.03, isoleucine: 0.02, valine: 0.03 },
  { id: "pasteque", name: "Pastèque", category: "Fruits", calories: 30, proteins: 0.6, carbs: 7.6, fats: 0.2, leucine: 0.02, isoleucine: 0.01, valine: 0.02 },
  { id: "peche", name: "Pêche", category: "Fruits", calories: 39, proteins: 0.9, carbs: 10, fats: 0.3, leucine: 0.03, isoleucine: 0.02, valine: 0.02 },
  { id: "nectarine", name: "Nectarine", category: "Fruits", calories: 44, proteins: 1.1, carbs: 11, fats: 0.3, leucine: 0.03, isoleucine: 0.02, valine: 0.03 },
  { id: "abricot", name: "Abricot", category: "Fruits", calories: 48, proteins: 1.4, carbs: 11, fats: 0.4, leucine: 0.05, isoleucine: 0.03, valine: 0.04 },
  { id: "prune", name: "Prune", category: "Fruits", calories: 46, proteins: 0.7, carbs: 11, fats: 0.3, leucine: 0.02, isoleucine: 0.01, valine: 0.02 },
  { id: "grenade", name: "Grenade", category: "Fruits", calories: 83, proteins: 1.7, carbs: 19, fats: 1.2, leucine: 0.06, isoleucine: 0.03, valine: 0.05 },
  { id: "figue", name: "Figue fraîche", category: "Fruits", calories: 74, proteins: 0.8, carbs: 19, fats: 0.3, leucine: 0.03, isoleucine: 0.01, valine: 0.02 },
  { id: "dattes", name: "Dattes", category: "Fruits", calories: 282, proteins: 2.5, carbs: 75, fats: 0.4, leucine: 0.08, isoleucine: 0.04, valine: 0.06 },
  { id: "raisins-secs", name: "Raisins secs", category: "Fruits", calories: 299, proteins: 3.1, carbs: 79, fats: 0.5, leucine: 0.08, isoleucine: 0.04, valine: 0.06 },
  { id: "abricots-secs", name: "Abricots secs", category: "Fruits", calories: 241, proteins: 3.4, carbs: 63, fats: 0.5, leucine: 0.1, isoleucine: 0.05, valine: 0.07 },
  { id: "figues-sechees", name: "Figues séchées", category: "Fruits", calories: 249, proteins: 3.3, carbs: 64, fats: 0.9, leucine: 0.09, isoleucine: 0.04, valine: 0.06 },
  { id: "pruneaux", name: "Pruneaux", category: "Fruits", calories: 240, proteins: 2.2, carbs: 64, fats: 0.4, leucine: 0.06, isoleucine: 0.03, valine: 0.05 },

  // ==================== NOIX ET GRAINES ====================
  { id: "amandes", name: "Amandes", category: "Noix et graines", calories: 579, proteins: 21, carbs: 22, fats: 50, leucine: 1.5, isoleucine: 0.7, valine: 0.9 },
  { id: "noix", name: "Noix", category: "Noix et graines", calories: 654, proteins: 15, carbs: 14, fats: 65, leucine: 1.2, isoleucine: 0.6, valine: 0.8 },
  { id: "noisettes", name: "Noisettes", category: "Noix et graines", calories: 628, proteins: 15, carbs: 17, fats: 61, leucine: 1.1, isoleucine: 0.5, valine: 0.7 },
  { id: "noix-cajou", name: "Noix de cajou", category: "Noix et graines", calories: 553, proteins: 18, carbs: 30, fats: 44, leucine: 1.5, isoleucine: 0.8, valine: 1.1 },
  { id: "noix-pecan", name: "Noix de pécan", category: "Noix et graines", calories: 691, proteins: 9, carbs: 14, fats: 72, leucine: 0.6, isoleucine: 0.3, valine: 0.5 },
  { id: "noix-macadamia", name: "Noix de macadamia", category: "Noix et graines", calories: 718, proteins: 8, carbs: 14, fats: 76, leucine: 0.5, isoleucine: 0.3, valine: 0.4 },
  { id: "noix-bresil", name: "Noix du Brésil", category: "Noix et graines", calories: 656, proteins: 14, carbs: 12, fats: 66, leucine: 1.2, isoleucine: 0.5, valine: 0.8 },
  { id: "pistaches", name: "Pistaches", category: "Noix et graines", calories: 560, proteins: 20, carbs: 28, fats: 45, leucine: 1.6, isoleucine: 0.9, valine: 1.2 },
  { id: "cacahuetes", name: "Cacahuètes", category: "Noix et graines", calories: 567, proteins: 26, carbs: 16, fats: 49, leucine: 1.7, isoleucine: 0.9, valine: 1.1 },
  { id: "graines-chia", name: "Graines de chia", category: "Noix et graines", calories: 486, proteins: 17, carbs: 42, fats: 31, leucine: 1.2, isoleucine: 0.7, valine: 1.0 },
  { id: "graines-lin", name: "Graines de lin", category: "Noix et graines", calories: 534, proteins: 18, carbs: 29, fats: 42, leucine: 1.2, isoleucine: 0.8, valine: 1.0 },
  { id: "graines-tournesol", name: "Graines de tournesol", category: "Noix et graines", calories: 584, proteins: 21, carbs: 20, fats: 51, leucine: 1.4, isoleucine: 0.9, valine: 1.1 },
  { id: "graines-courge", name: "Graines de courge", category: "Noix et graines", calories: 559, proteins: 30, carbs: 11, fats: 49, leucine: 2.4, isoleucine: 1.3, valine: 1.6 },
  { id: "graines-sesame", name: "Graines de sésame", category: "Noix et graines", calories: 573, proteins: 18, carbs: 23, fats: 50, leucine: 1.4, isoleucine: 0.8, valine: 1.0 },
  { id: "noix-coco-rapee", name: "Noix de coco râpée", category: "Noix et graines", calories: 660, proteins: 6, carbs: 24, fats: 62, leucine: 0.5, isoleucine: 0.3, valine: 0.4 },

  // ==================== LÉGUMINEUSES ====================
  { id: "lentilles", name: "Lentilles cuites", category: "Légumineuses", calories: 116, proteins: 9, carbs: 20, fats: 0.4, leucine: 0.7, isoleucine: 0.4, valine: 0.5 },
  { id: "lentilles-corail", name: "Lentilles corail cuites", category: "Légumineuses", calories: 116, proteins: 9, carbs: 20, fats: 0.4, leucine: 0.7, isoleucine: 0.4, valine: 0.5 },
  { id: "pois-chiches", name: "Pois chiches cuits", category: "Légumineuses", calories: 164, proteins: 9, carbs: 27, fats: 2.6, leucine: 0.6, isoleucine: 0.4, valine: 0.4 },
  { id: "haricots-rouges", name: "Haricots rouges cuits", category: "Légumineuses", calories: 127, proteins: 9, carbs: 22, fats: 0.5, leucine: 0.7, isoleucine: 0.4, valine: 0.5 },
  { id: "haricots-blancs", name: "Haricots blancs cuits", category: "Légumineuses", calories: 139, proteins: 9, carbs: 25, fats: 0.5, leucine: 0.7, isoleucine: 0.4, valine: 0.5 },
  { id: "haricots-noirs", name: "Haricots noirs cuits", category: "Légumineuses", calories: 132, proteins: 9, carbs: 24, fats: 0.5, leucine: 0.7, isoleucine: 0.4, valine: 0.5 },
  { id: "feves", name: "Fèves cuites", category: "Légumineuses", calories: 110, proteins: 8, carbs: 19, fats: 0.4, leucine: 0.6, isoleucine: 0.3, valine: 0.4 },
  { id: "pois-casses", name: "Pois cassés cuits", category: "Légumineuses", calories: 118, proteins: 8, carbs: 21, fats: 0.4, leucine: 0.6, isoleucine: 0.3, valine: 0.4 },
  { id: "edamame", name: "Edamame", category: "Légumineuses", calories: 121, proteins: 11, carbs: 10, fats: 5, leucine: 0.9, isoleucine: 0.5, valine: 0.6 },
  { id: "tofu", name: "Tofu", category: "Légumineuses", calories: 76, proteins: 8, carbs: 1.9, fats: 4.8, leucine: 0.6, isoleucine: 0.4, valine: 0.4 },
  { id: "tofu-ferme", name: "Tofu ferme", category: "Légumineuses", calories: 144, proteins: 15, carbs: 3, fats: 9, leucine: 1.1, isoleucine: 0.7, valine: 0.7 },
  { id: "tofu-soyeux", name: "Tofu soyeux", category: "Légumineuses", calories: 55, proteins: 5, carbs: 2, fats: 3, leucine: 0.4, isoleucine: 0.2, valine: 0.3 },
  { id: "tempeh", name: "Tempeh", category: "Légumineuses", calories: 193, proteins: 19, carbs: 9, fats: 11, leucine: 1.4, isoleucine: 0.8, valine: 0.9 },
  { id: "houmous", name: "Houmous", category: "Légumineuses", calories: 166, proteins: 8, carbs: 14, fats: 10, leucine: 0.5, isoleucine: 0.3, valine: 0.3 },

  // ==================== SAUCES ET CONDIMENTS ====================
  { id: "huile-olive", name: "Huile d'olive", category: "Huiles", calories: 884, proteins: 0, carbs: 0, fats: 100, leucine: 0, isoleucine: 0, valine: 0 },
  { id: "huile-coco", name: "Huile de coco", category: "Huiles", calories: 862, proteins: 0, carbs: 0, fats: 100, leucine: 0, isoleucine: 0, valine: 0 },
  { id: "huile-tournesol", name: "Huile de tournesol", category: "Huiles", calories: 884, proteins: 0, carbs: 0, fats: 100, leucine: 0, isoleucine: 0, valine: 0 },
  { id: "huile-colza", name: "Huile de colza", category: "Huiles", calories: 884, proteins: 0, carbs: 0, fats: 100, leucine: 0, isoleucine: 0, valine: 0 },
  { id: "beurre", name: "Beurre", category: "Huiles", calories: 717, proteins: 0.9, carbs: 0.1, fats: 81, leucine: 0.1, isoleucine: 0.05, valine: 0.06 },
  { id: "beurre-doux", name: "Beurre doux", category: "Huiles", calories: 717, proteins: 0.9, carbs: 0.1, fats: 81, leucine: 0.1, isoleucine: 0.05, valine: 0.06 },
  { id: "mayonnaise", name: "Mayonnaise", category: "Sauces", calories: 680, proteins: 1.5, carbs: 0.6, fats: 75, leucine: 0.1, isoleucine: 0.05, valine: 0.1 },
  { id: "mayonnaise-legere", name: "Mayonnaise légère", category: "Sauces", calories: 324, proteins: 1, carbs: 5, fats: 33, leucine: 0.05, isoleucine: 0.03, valine: 0.05 },
  { id: "ketchup", name: "Ketchup", category: "Sauces", calories: 112, proteins: 1.2, carbs: 27, fats: 0.1, leucine: 0.05, isoleucine: 0.02, valine: 0.03 },
  { id: "sauce-soja", name: "Sauce soja", category: "Sauces", calories: 53, proteins: 5.6, carbs: 4.9, fats: 0.6, leucine: 0.4, isoleucine: 0.2, valine: 0.3 },
  { id: "sauce-tomate", name: "Sauce tomate", category: "Sauces", calories: 29, proteins: 1.3, carbs: 6, fats: 0.2, leucine: 0.05, isoleucine: 0.03, valine: 0.04 },
  { id: "pesto", name: "Pesto", category: "Sauces", calories: 387, proteins: 5, carbs: 6, fats: 38, leucine: 0.4, isoleucine: 0.2, valine: 0.3 },
  { id: "guacamole", name: "Guacamole", category: "Sauces", calories: 160, proteins: 2, carbs: 9, fats: 15, leucine: 0.14, isoleucine: 0.08, valine: 0.1 },
  { id: "moutarde", name: "Moutarde", category: "Condiments", calories: 66, proteins: 3.7, carbs: 5.3, fats: 3.3, leucine: 0.2, isoleucine: 0.1, valine: 0.2 },
  { id: "vinaigre-balsamique", name: "Vinaigre balsamique", category: "Condiments", calories: 88, proteins: 0.5, carbs: 17, fats: 0, leucine: 0, isoleucine: 0, valine: 0 },
  { id: "vinaigre-cidre", name: "Vinaigre de cidre", category: "Condiments", calories: 22, proteins: 0, carbs: 0.9, fats: 0, leucine: 0, isoleucine: 0, valine: 0 },
  { id: "tahini", name: "Tahini (purée de sésame)", category: "Condiments", calories: 595, proteins: 17, carbs: 21, fats: 54, leucine: 1.3, isoleucine: 0.7, valine: 0.9 },

  // ==================== BOISSONS ====================
  { id: "eau", name: "Eau", category: "Boissons", calories: 0, proteins: 0, carbs: 0, fats: 0, leucine: 0, isoleucine: 0, valine: 0 },
  { id: "cafe", name: "Café noir", category: "Boissons", calories: 2, proteins: 0.3, carbs: 0, fats: 0, leucine: 0, isoleucine: 0, valine: 0 },
  { id: "cafe-latte", name: "Café latte", category: "Boissons", calories: 120, proteins: 6, carbs: 10, fats: 5, leucine: 0.5, isoleucine: 0.3, valine: 0.3 },
  { id: "cappuccino", name: "Cappuccino", category: "Boissons", calories: 75, proteins: 4, carbs: 6, fats: 4, leucine: 0.3, isoleucine: 0.2, valine: 0.2 },
  { id: "espresso", name: "Espresso", category: "Boissons", calories: 3, proteins: 0.2, carbs: 0.5, fats: 0, leucine: 0, isoleucine: 0, valine: 0 },
  { id: "the-vert", name: "Thé vert", category: "Boissons", calories: 1, proteins: 0, carbs: 0.3, fats: 0, leucine: 0, isoleucine: 0, valine: 0 },
  { id: "the-noir", name: "Thé noir", category: "Boissons", calories: 1, proteins: 0, carbs: 0.3, fats: 0, leucine: 0, isoleucine: 0, valine: 0 },
  { id: "jus-orange", name: "Jus d'orange", category: "Boissons", calories: 45, proteins: 0.7, carbs: 10, fats: 0.2, leucine: 0.03, isoleucine: 0.02, valine: 0.03 },
  { id: "jus-pomme", name: "Jus de pomme", category: "Boissons", calories: 46, proteins: 0.1, carbs: 11, fats: 0.1, leucine: 0.01, isoleucine: 0.01, valine: 0.01 },
  { id: "smoothie", name: "Smoothie fruits", category: "Boissons", calories: 65, proteins: 1.5, carbs: 15, fats: 0.5, leucine: 0.1, isoleucine: 0.05, valine: 0.08 },
  { id: "smoothie-proteine", name: "Smoothie protéiné", category: "Boissons", calories: 150, proteins: 20, carbs: 12, fats: 3, leucine: 2.0, isoleucine: 1.0, valine: 1.2 },
  { id: "eau-coco", name: "Eau de coco", category: "Boissons", calories: 19, proteins: 0.7, carbs: 4, fats: 0.2, leucine: 0.02, isoleucine: 0.01, valine: 0.02 },
  { id: "boisson-energisante", name: "Boisson énergisante", category: "Boissons", calories: 45, proteins: 0, carbs: 11, fats: 0, leucine: 0, isoleucine: 0, valine: 0 },

  // ==================== SNACKS ====================
  { id: "chocolat-noir", name: "Chocolat noir 70%", category: "Snacks", calories: 598, proteins: 8, carbs: 46, fats: 43, leucine: 0.5, isoleucine: 0.3, valine: 0.4 },
  { id: "chocolat-lait", name: "Chocolat au lait", category: "Snacks", calories: 535, proteins: 8, carbs: 59, fats: 30, leucine: 0.6, isoleucine: 0.4, valine: 0.5 },
  { id: "barre-cereales", name: "Barre de céréales", category: "Snacks", calories: 471, proteins: 7, carbs: 68, fats: 19, leucine: 0.4, isoleucine: 0.2, valine: 0.3 },
  { id: "barre-proteinee", name: "Barre protéinée", category: "Snacks", calories: 350, proteins: 20, carbs: 35, fats: 12, leucine: 2.0, isoleucine: 1.0, valine: 1.2 },
  { id: "biscuits", name: "Biscuits secs", category: "Snacks", calories: 502, proteins: 6.3, carbs: 63, fats: 25, leucine: 0.4, isoleucine: 0.2, valine: 0.3 },
  { id: "crackers", name: "Crackers", category: "Snacks", calories: 439, proteins: 9.4, carbs: 71, fats: 12, leucine: 0.6, isoleucine: 0.3, valine: 0.4 },
  { id: "chips", name: "Chips", category: "Snacks", calories: 536, proteins: 7, carbs: 53, fats: 33, leucine: 0.4, isoleucine: 0.2, valine: 0.3 },
  { id: "pop-corn", name: "Pop-corn nature", category: "Snacks", calories: 375, proteins: 11, carbs: 74, fats: 4, leucine: 1.0, isoleucine: 0.3, valine: 0.4 },
  { id: "galettes-riz", name: "Galettes de riz", category: "Snacks", calories: 387, proteins: 7, carbs: 85, fats: 3, leucine: 0.5, isoleucine: 0.3, valine: 0.4 },

  // ==================== PLATS PRÉPARÉS ====================
  { id: "pizza-margherita", name: "Pizza Margherita", category: "Plats préparés", calories: 266, proteins: 11, carbs: 33, fats: 10, leucine: 0.8, isoleucine: 0.5, valine: 0.6 },
  { id: "pizza-4-fromages", name: "Pizza 4 fromages", category: "Plats préparés", calories: 290, proteins: 14, carbs: 28, fats: 14, leucine: 1.0, isoleucine: 0.6, valine: 0.7 },
  { id: "burger", name: "Burger (bœuf)", category: "Plats préparés", calories: 295, proteins: 17, carbs: 24, fats: 14, leucine: 1.3, isoleucine: 0.7, valine: 0.9 },
  { id: "burger-poulet", name: "Burger poulet", category: "Plats préparés", calories: 260, proteins: 18, carbs: 25, fats: 10, leucine: 1.4, isoleucine: 0.8, valine: 0.9 },
  { id: "kebab", name: "Kebab", category: "Plats préparés", calories: 215, proteins: 15, carbs: 20, fats: 8, leucine: 1.1, isoleucine: 0.6, valine: 0.8 },
  { id: "sandwich-jambon", name: "Sandwich jambon-beurre", category: "Plats préparés", calories: 280, proteins: 12, carbs: 35, fats: 10, leucine: 0.7, isoleucine: 0.4, valine: 0.5 },
  { id: "sandwich-poulet", name: "Sandwich poulet", category: "Plats préparés", calories: 250, proteins: 16, carbs: 30, fats: 7, leucine: 1.2, isoleucine: 0.7, valine: 0.8 },
  { id: "wrap-poulet", name: "Wrap poulet", category: "Plats préparés", calories: 220, proteins: 14, carbs: 25, fats: 7, leucine: 1.1, isoleucine: 0.6, valine: 0.7 },
  { id: "salade-cesar", name: "Salade César", category: "Plats préparés", calories: 190, proteins: 12, carbs: 8, fats: 13, leucine: 0.9, isoleucine: 0.5, valine: 0.6 },
  { id: "sushi-maki", name: "Sushi maki (6 pièces)", category: "Plats préparés", calories: 180, proteins: 6, carbs: 35, fats: 2, leucine: 0.4, isoleucine: 0.2, valine: 0.3 },
  { id: "sashimi-saumon", name: "Sashimi saumon", category: "Plats préparés", calories: 208, proteins: 20, carbs: 0, fats: 13, leucine: 1.6, isoleucine: 0.9, valine: 1.0 },
  { id: "poke-bowl", name: "Poke bowl", category: "Plats préparés", calories: 420, proteins: 25, carbs: 45, fats: 15, leucine: 1.8, isoleucine: 1.0, valine: 1.2 },
  { id: "quiche-lorraine", name: "Quiche lorraine", category: "Plats préparés", calories: 300, proteins: 10, carbs: 20, fats: 20, leucine: 0.8, isoleucine: 0.5, valine: 0.6 },
  { id: "lasagnes", name: "Lasagnes", category: "Plats préparés", calories: 188, proteins: 11, carbs: 18, fats: 8, leucine: 0.9, isoleucine: 0.5, valine: 0.6 },
  { id: "gratin-dauphinois", name: "Gratin dauphinois", category: "Plats préparés", calories: 138, proteins: 4, carbs: 14, fats: 7, leucine: 0.3, isoleucine: 0.2, valine: 0.2 },
  { id: "ratatouille", name: "Ratatouille", category: "Plats préparés", calories: 55, proteins: 1.5, carbs: 7, fats: 2.5, leucine: 0.08, isoleucine: 0.04, valine: 0.06 },
  { id: "couscous-legumes", name: "Couscous aux légumes", category: "Plats préparés", calories: 150, proteins: 5, carbs: 28, fats: 2, leucine: 0.3, isoleucine: 0.2, valine: 0.2 },

  // ==================== SUPPLÉMENTS ====================
  { id: "whey", name: "Whey protéine", category: "Suppléments", calories: 400, proteins: 80, carbs: 7, fats: 6, leucine: 8.6, isoleucine: 4.5, valine: 5.0 },
  { id: "whey-isolate", name: "Whey isolate", category: "Suppléments", calories: 370, proteins: 90, carbs: 2, fats: 1, leucine: 9.5, isoleucine: 5.0, valine: 5.5 },
  { id: "caseine", name: "Caséine", category: "Suppléments", calories: 360, proteins: 78, carbs: 8, fats: 3, leucine: 8.0, isoleucine: 4.2, valine: 4.8 },
  { id: "bcaa", name: "BCAA (poudre)", category: "Suppléments", calories: 0, proteins: 0, carbs: 0, fats: 0, leucine: 50, isoleucine: 25, valine: 25 },
  { id: "creatine", name: "Créatine monohydrate", category: "Suppléments", calories: 0, proteins: 0, carbs: 0, fats: 0, leucine: 0, isoleucine: 0, valine: 0 },
  { id: "proteine-vegetale", name: "Protéine végétale (pois)", category: "Suppléments", calories: 380, proteins: 80, carbs: 5, fats: 5, leucine: 6.5, isoleucine: 3.5, valine: 4.0 },
  { id: "gainer", name: "Gainer", category: "Suppléments", calories: 400, proteins: 25, carbs: 65, fats: 5, leucine: 2.5, isoleucine: 1.3, valine: 1.5 },
];

// Fonction de recherche dans la base de données
export const searchFoods = (query) => {
  if (!query || query.length < 1) return [];
  
  // Normaliser la requête : enlever accents et remplacer œ par oe
  const normalizedQuery = query
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/œ/g, "oe")
    .replace(/æ/g, "ae");
  
  return FRENCH_FOODS_DB.filter(food => {
    // Normaliser le nom : enlever accents et remplacer œ par oe
    const normalizedName = food.name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/œ/g, "oe")
      .replace(/æ/g, "ae");
    const normalizedCategory = food.category
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/œ/g, "oe")
      .replace(/æ/g, "ae");
    return normalizedName.includes(normalizedQuery) || normalizedCategory.includes(normalizedQuery);
  }).slice(0, 15); // Limiter à 15 résultats
};

// Fonction pour obtenir les détails d'un aliment par ID
export const getFoodById = (id) => {
  return FRENCH_FOODS_DB.find(food => food.id === id);
};

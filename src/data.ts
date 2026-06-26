import { DatasetItem } from "./types";

export const PLANT_DATASETS: DatasetItem[] = [
  {
    id: "plantvillage-leaves",
    name: "PlantVillage Dataset (Leveled Leaf Imagery)",
    description: "The primary reference dataset comprising over 54,000 images of healthy and diseased crop leaves categorized across 38 distinct classes.",
    sampleCount: 54305,
    fileSize: "827 MB",
    downloadUrl: "https://github.com/spMohanty/PlantVillage-Dataset",
    category: "Leaves"
  },
  {
    id: "citrus-canker-pathology",
    name: "Citrus Canker & Decay Dataset",
    description: "High-resolution macro images detailing citrus fruit and leaf bacterial cankers, rust mites, and nutritional chlorosis.",
    sampleCount: 1240,
    fileSize: "145 MB",
    downloadUrl: "https://www.kaggle.com/datasets/emmarex/plantdisease",
    category: "Fruit"
  },
  {
    id: "tomato-disease-finetune",
    name: "Tomato Leaf Blight & Septoria Corpus",
    description: "A highly specialized diagnostic collection focused on Early Blight, Late Blight, Tomato Yellow Leaf Curl, and healthy controls.",
    sampleCount: 18200,
    fileSize: "412 MB",
    downloadUrl: "https://github.com/spMohanty/PlantVillage-Dataset/tree/master/raw/color",
    category: "Leaves"
  },
  {
    id: "rice-rice-blast-fungi",
    name: "Rice Blast & Brown Spot Pathology Subset",
    description: "Annotated instances of severe Oryza sativa leaf blasts, brown spots, and leaf smuts critical for early warning systems.",
    sampleCount: 3350,
    fileSize: "89 MB",
    downloadUrl: "https://www.kaggle.com/datasets/vbookshelf/rice-leaf-diseases",
    category: "Vegetables"
  }
];

export const GENERAL_FAQ = [
  {
    question: "How should I position the plant leaf when using the live camera?",
    answer: "For optimal analysis, place a single leaf flat in front of the camera under natural, diffuse lighting. Avoid deep shadows or high levels of glare. Ensure the primary leaf lesion or discoloration is centered in the frame and in sharp focus."
  },
  {
    question: "Which plant species does the AI disease detector support?",
    answer: "Our system is trained on a broad range of agricultural crops and ornamental species, including Tomatoes, Potatoes, Apples, Grapes, Citrus, Peaches, Corn, Rice, Soybeans, Peppers, and general house plants."
  },
  {
    question: "Are the recommendations organic or chemical-based?",
    answer: "Gemini's diagnostic output prioritizes integrated pest management (IPM) techniques. This means organic, biosecurity-friendly, and mechanical remedies are highlighted first, followed by safe chemical recommendations if organic measures are insufficient."
  }
];

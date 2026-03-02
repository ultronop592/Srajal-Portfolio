"use client";
import ElegantCarousel from '@/components/ui/elegant-carousel';

// Demo with sample project data
const demoProjects = [
  {
    title: "AI-Powered Waterborne Disease Predictor",
    description: "Deep Learning model for medical report analysis",
    details: "A Bi-LSTM model that analyzes medical reports to predict waterborne diseases, showcasing advanced NLP and sequence modeling skills.",
    github: "https://github.com/ultronop592/WaterBrone-Diease-Prediction.git",
    liveDemo: "https://waterbrone-diease-prediction-byble.streamlit.app/",
    tech: ["Deep Learning", "Bi-LSTM", "NLP", "Streamlit", "Python", "TensorFlow/Keras"],
    category: "ai",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070&auto=format&fit=crop",
  },
  {
    title: "Fake News Classifier using RNN",
    description: "Deep learning-based text classification",
    details: "Built a Fake News Classifier using Bidirectional LSTM for accurate text classification.",
    github: "https://github.com/ultronop592/FakeNews-Classifier-using-RNN.git",
    liveDemo: "https://fakenews-classifier-using-rnn-6.onrender.com/",
    tech: ["Python", "TensorFlow/Keras", "Deep Learning", "LSTM"],
    category: "ai",
    image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=2070&auto=format&fit=crop",
  },
  {
    title: "Movie Recommendation System",
    description: "Content-based recommendations with TF‑IDF",
    details: "End-to-end movie recommender with TF‑IDF and cosine similarity using OMDB API.",
    github: "https://github.com/ultronop592/Movie-Recommendation-System.git",
    liveDemo: "https://movierecommendationssystem76.streamlit.app/",
    tech: ["Python", "Streamlit", "NLP", "OMDB API"],
    category: "ai",
    image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2070&auto=format&fit=crop",
  },
];

export default function Demo() {
  return <ElegantCarousel projects={demoProjects} />;
}

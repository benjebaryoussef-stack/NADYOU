import React from 'react';
import '@/App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import { Toaster } from '@/components/ui/sonner';
import { LandingPage } from '@/pages/LandingPage';
import { LoginPage } from '@/pages/LoginPage';
import { RegisterPage } from '@/pages/RegisterPage';
import { OnboardingPage } from '@/pages/OnboardingPage';
import { DashboardPage } from '@/pages/DashboardPage';
import { WorkoutsPage } from '@/pages/WorkoutsPage';
import { NutritionPage } from '@/pages/NutritionPage';
import { ProgressPage } from '@/pages/ProgressPage';
import { AIPage } from '@/pages/AIPage';
import { PremiumPage } from '@/pages/PremiumPage';
import { MoodTrackerPage } from '@/pages/MoodTrackerPage';

function App() {
  return (
    <AuthProvider>
      <div className="App dark">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/onboarding" element={<OnboardingPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/workouts" element={<WorkoutsPage />} />
            <Route path="/nutrition" element={<NutritionPage />} />
            <Route path="/progress" element={<ProgressPage />} />
            <Route path="/ai" element={<AIPage />} />
            <Route path="/premium" element={<PremiumPage />} />
            <Route path="/premium/success" element={<PremiumPage />} />
            <Route path="/mood-tracker" element={<MoodTrackerPage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </BrowserRouter>
        <Toaster position="top-right" />
      </div>
    </AuthProvider>
  );
}

export default App;
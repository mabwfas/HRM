import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import OnboardingManual, { OnboardingSubmissions } from './OnboardingManual.tsx'
import KRAKPIManual, { KRASubmissions } from './KRAKPIManual.tsx'

// Simple routing based on pathname
const getComponent = () => {
    const path = window.location.pathname;

    if (path === '/onboarding' || path === '/onboarding/') {
        return <OnboardingManual />;
    }
    if (path === '/onboarding-submissions' || path === '/onboarding-submissions/') {
        return <OnboardingSubmissions />;
    }
    if (path === '/kra-kpi' || path === '/kra-kpi/') {
        return <KRAKPIManual />;
    }
    if (path === '/kra-submissions' || path === '/kra-submissions/') {
        return <KRASubmissions />;
    }

    return <App />;
};

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        {getComponent()}
    </StrictMode>,
)

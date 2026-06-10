import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { createContext, useContext, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import type { CaseBundle } from './types';
import { demoCase } from './data/seed';

import Landing from './screens/Landing';
import Estimator from './screens/Estimator';
import Qualify from './screens/Qualify';
import Result from './screens/Result';
import Intake from './screens/Intake';
import Upload from './screens/Upload';
import Assembly from './screens/Assembly';
import Review from './screens/Review';
import SignPay from './screens/SignPay';
import Filed from './screens/Filed';
import Login from './screens/Login';
import Dashboard from './screens/Dashboard';

// ---- App state -----------------------------------------------------------
interface CaseState {
  bundle: CaseBundle;
  qualified: boolean;
  attorneyApproved: boolean;
  setQualified: (v: boolean) => void;
  setAttorneyApproved: (v: boolean) => void;
}

const CaseContext = createContext<CaseState | null>(null);

export function useCase(): CaseState {
  const ctx = useContext(CaseContext);
  if (!ctx) throw new Error('useCase must be used within CaseProvider');
  return ctx;
}

function CaseProvider({ children }: { children: ReactNode }) {
  const [bundle] = useState<CaseBundle>(demoCase);
  const [qualified, setQualified] = useState(false);
  const [attorneyApproved, setAttorneyApproved] = useState(false);

  const value = useMemo(
    () => ({ bundle, qualified, attorneyApproved, setQualified, setAttorneyApproved }),
    [bundle, qualified, attorneyApproved]
  );

  return <CaseContext.Provider value={value}>{children}</CaseContext.Provider>;
}

// ---- Gates ---------------------------------------------------------------
// Gate 1: user must clear the qualifying screen before entering the workflow.
function RequireQualified({ children }: { children: ReactNode }) {
  const { qualified } = useCase();
  const location = useLocation();
  if (!qualified) return <Navigate to="/qualify" replace state={{ from: location }} />;
  return <>{children}</>;
}

// Gate 2: filing is blocked until an attorney has reviewed and approved.
function RequireAttorneyApproval({ children }: { children: ReactNode }) {
  const { attorneyApproved } = useCase();
  if (!attorneyApproved) return <Navigate to="/review" replace />;
  return <>{children}</>;
}

export default function App() {
  return (
    <CaseProvider>
      <Routes>
        <Route path="/" element={<Landing />} />
<Route path="/login" element={<Login />} />
<Route path="/dashboard" element={<RequireQualified><Dashboard /></RequireQualified>} />
        <Route path="/estimate" element={<Estimator />} />
        <Route path="/qualify" element={<Qualify />} />
        <Route path="/result" element={<Result />} />

        <Route
          path="/intake"
          element={
            <RequireQualified>
              <Intake />
            </RequireQualified>
          }
        />
        <Route
          path="/upload"
          element={
            <RequireQualified>
              <Upload />
            </RequireQualified>
          }
        />
        <Route
          path="/assembly"
          element={
            <RequireQualified>
              <Assembly />
            </RequireQualified>
          }
        />
        <Route
          path="/review"
          element={
            <RequireQualified>
              <Review />
            </RequireQualified>
          }
        />
        <Route
          path="/sign-pay"
          element={
            <RequireQualified>
              <RequireAttorneyApproval>
                <SignPay />
              </RequireAttorneyApproval>
            </RequireQualified>
          }
        />
        <Route
          path="/filed"
          element={
            <RequireQualified>
              <RequireAttorneyApproval>
                <Filed />
              </RequireAttorneyApproval>
            </RequireQualified>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </CaseProvider>
  );
}

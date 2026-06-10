import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from './Layout';

type Answer = 'yes' | 'no' | null;

interface Question {
  key: string;
  prompt: string;
  // The answer required to remain eligible for the uncontested flat-fee flow.
  qualifyingAnswer: 'yes' | 'no';
  disqualifyNote: string;
}

const QUESTIONS: Question[] = [
  {
    key: 'residency',
    prompt: 'Has either spouse lived in Missouri for at least 90 days?',
    qualifyingAnswer: 'yes',
    disqualifyNote: 'Missouri requires 90-day residency before filing for dissolution.',
  },
  {
    key: 'agreement',
    prompt: 'Do both spouses agree on all terms (property, debts, and any children)?',
    qualifyingAnswer: 'yes',
    disqualifyNote: 'A contested case needs full attorney representation, not the flat-fee flow.',
  },
  {
    key: 'pregnancy',
    prompt: 'Is either spouse currently pregnant?',
    qualifyingAnswer: 'no',
    disqualifyNote: 'Missouri courts generally will not finalize a dissolution while a spouse is pregnant.',
  },
  {
    key: 'no_attorney',
    prompt: 'Is the other spouse already represented by an attorney in this matter?',
    qualifyingAnswer: 'no',
    disqualifyNote: 'When the other side has counsel, this self-guided flow is not appropriate.',
  },
];

export default function Qualify() {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState<Record<string, Answer>>({});

  const allAnswered = QUESTIONS.every((q) => answers[q.key]);
  const failed = QUESTIONS.filter((q) => answers[q.key] && answers[q.key] !== q.qualifyingAnswer);
  const passes = allAnswered && failed.length === 0;

  function setAnswer(key: string, value: Answer) {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  }

  function handleContinue() {
    if (!passes) return;
  
    navigate('/result');
  }

  return (
    <Layout
      title="Do you qualify?"
      subtitle="Four quick questions confirm this is the right path for your case."
      currentPath="/qualify"
      footer={
        <button
          onClick={handleContinue}
          disabled={!passes}
          className="rounded-md bg-indigo-600 px-5 py-2.5 font-medium text-white disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          Continue
        </button>
      }
    >
      <div className="space-y-5">
        {QUESTIONS.map((q) => {
          const current = answers[q.key];
          const isFail = current && current !== q.qualifyingAnswer;
          return (
            <div key={q.key} className="rounded-lg border border-slate-200 bg-white p-4">
              <p className="font-medium">{q.prompt}</p>
              <div className="mt-3 flex gap-3">
                {(['yes', 'no'] as const).map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setAnswer(q.key, opt)}
                    className={
                      'rounded-md border px-4 py-1.5 text-sm capitalize ' +
                      (current === opt
                        ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                        : 'border-slate-300 text-slate-600 hover:bg-slate-50')
                    }
                  >
                    {opt}
                  </button>
                ))}
              </div>
              {isFail && <p className="mt-2 text-sm text-amber-700">{q.disqualifyNote}</p>}
            </div>
          );
        })}

        {allAnswered && !passes && (
          <div className="rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm text-amber-800">
            Based on your answers, the flat-fee uncontested flow may not fit your situation. We recommend
            a consultation with the attorney before proceeding.
          </div>
        )}
      </div>
    </Layout>
  );
}

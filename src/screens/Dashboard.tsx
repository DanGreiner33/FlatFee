import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCase } from '../App';

/**
 * Client Dashboard. Shows the case status, the gating state
 * (qualification + attorney review) and links into each step of
 * the flat-fee divorce workflow.
 */
interface Step {
  key: string;
  label: string;
  path: string;
  done: boolean;
  locked: boolean;
}

export default function Dashboard() {
  const nav = useNavigate();
  const { bundle, qualified, attorneyApproved } = useCase();
const pet = bundle.parties.find((p) => p.role === 'petitioner');

  const steps: Step[] = [
    { key: 'qualify', label: 'Qualification', path: '/qualify', done: qualified, locked: false },
    { key: 'intake', label: 'Case Intake', path: '/intake', done: false, locked: !qualified },
    { key: 'upload', label: 'Document Upload', path: '/upload', done: false, locked: !qualified },
    { key: 'assembly', label: 'Document Assembly', path: '/assembly', done: false, locked: !qualified },
    { key: 'review', label: 'Attorney Review', path: '/review', done: attorneyApproved, locked: !qualified },
    { key: 'sign', label: 'Sign & Pay', path: '/sign-pay', done: false, locked: !attorneyApproved },
    { key: 'filed', label: 'Filed', path: '/filed', done: false, locked: !attorneyApproved },
  ];

  return (
    <div className="dash-wrap">
      <header className="dash-header">
        <h1 className="dash-title">Your Divorce Case</h1>
        <p className="dash-sub">
                          {pet?.first_name ? `Welcome back, ${pet.first_name}.` : 'Welcome back.'}
      </header>

      <section className="dash-status">
        <div className={qualified ? 'dash-badge dash-badge-ok' : 'dash-badge'}>
          {qualified ? 'Qualified' : 'Not yet qualified'}
        </div>
        <div className={attorneyApproved ? 'dash-badge dash-badge-ok' : 'dash-badge dash-badge-pending'}>
          {attorneyApproved ? 'Attorney Approved' : 'Awaiting attorney review'}
        </div>
      </section>

      <ol className="dash-steps">
        {steps.map((s, i) => (
          <li
            key={s.key}
            className={
              'dash-step' +
              (s.done ? ' dash-step-done' : '') +
              (s.locked ? ' dash-step-locked' : '')
            }
          >
            <span className="dash-step-num">{i + 1}</span>
            <span className="dash-step-label">{s.label}</span>
            <span className="dash-step-action">
              {s.locked ? (
                <span className="dash-step-lock">Locked</span>
              ) : (
                <button className="dash-step-btn" onClick={() => nav(s.path)}>
                  {s.done ? 'Review' : 'Open'}
                </button>
              )}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}

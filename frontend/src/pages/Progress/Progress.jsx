import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';

// import "react-calendar-heatmap/dist/react-calendar-heatmap.css";
const Progress = ({ solvedProblems = [] }) => {
  const totalSolved = solvedProblems.length;

  // 1. Dynamic Category Logic
  const categories = useMemo(() => {
    if (totalSolved === 0) return []; 
    const counts = solvedProblems.reduce((acc, problem) => {
      const cat = problem.category || 'Other';
      acc[cat] = (acc[cat] || 0) + 1;
      return acc;
    }, {});

    const colors = ['#22c55e', '#eab308', '#ef4444', '#6366f1', '#a855f7'];
    return Object.keys(counts).map((key, index) => ({
      name: key,
      value: counts[key],
      color: colors[index % colors.length]
    }));
  }, [solvedProblems, totalSolved]);

  const difficultyStats = [
    { label: 'Easy', solved: solvedProblems.filter(p => p.difficulty === 'Easy').length, total: 706, color: '#22c55e' },
    { label: 'Medium', solved: solvedProblems.filter(p => p.difficulty === 'Medium').length, total: 1492, color: '#eab308' },
    { label: 'Hard', solved: solvedProblems.filter(p => p.difficulty === 'Hard').length, total: 620, color: '#ef4444' }
  ];

  const cardStyle = {
    backgroundColor: 'white',
    padding: '28px',
    borderRadius: '16px',
    border: '1px solid #f1f5f9',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.04)',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', maxWidth: '1200px', margin: '0 auto' }}>
      
      {/* 1. METRICS RIBBON */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
        {[
          { label: 'Total Submissions', value: totalSolved, icon: '📊' },
          { label: 'Current Streak', value: totalSolved > 0 ? '1 Day' : '0 Days', icon: '🔥' },
          { label: 'Target Completion', value: totalSolved > 0 ? `${((totalSolved/50)*100).toFixed(0)}%` : '0%', icon: '🎯' },
          { label: 'Active Months', value: totalSolved > 0 ? '1' : '0', icon: '📅' },
        ].map((stat, i) => (
          <div key={i} style={{ ...cardStyle, padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: '11px', color: '#94a3b8', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{stat.label}</div>
              <div style={{ fontSize: '22px', fontWeight: '900', color: '#1e293b', marginTop: '4px' }}>{stat.value}</div>
            </div>
            <span style={{ fontSize: '24px' }}>{stat.icon}</span>
          </div>
        ))}
      </div>

      {/* 2. TOP ROW: Progress & Categories */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px' }}>
        
        {/* Progress Card */}
        <div style={{ ...cardStyle, display: 'flex', alignItems: 'center', gap: '50px' }}>
          <div style={{ position: 'relative', width: '150px', height: '150px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: '42px', fontWeight: '900', color: '#1e293b' }}>{totalSolved}</span>
            <span style={{ fontSize: '11px', color: '#64748b', textTransform: 'uppercase', fontWeight: '700', letterSpacing: '1px' }}>Solved</span>
            <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
              <circle cx="75" cy="75" r="68" stroke="#f1f5f9" strokeWidth="12" fill="transparent" />
              <circle cx="75" cy="75" r="68" stroke="#f97316" strokeWidth="12" fill="transparent" 
                strokeDasharray="427" strokeDashoffset={427 - (427 * Math.min(totalSolved / 50, 1))} strokeLinecap="round" 
                style={{ transition: 'stroke-dashoffset 1.5s ease-in-out' }}
              />
            </svg>
          </div>
          
          <div style={{ flex: 1 }}>
            {difficultyStats.map((item) => (
              <div key={item.label} style={{ marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '8px' }}>
                  <span style={{ fontWeight: '700', color: '#64748b' }}>{item.label}</span>
                  <span style={{ color: '#1e293b', fontWeight: '700' }}>{item.solved}<span style={{color: '#cbd5e1', fontWeight: '400'}}>/{item.total}</span></span>
                </div>
                <div style={{ width: '100%', height: '10px', backgroundColor: '#f1f5f9', borderRadius: '20px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${(item.solved/item.total)*100}%`, backgroundColor: item.color, borderRadius: '20px', transition: 'width 1s ease' }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category Card */}
        <div style={cardStyle}>
          <h3 style={{ fontSize: '13px', fontWeight: '700', color: '#64748b', marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '1px' }}>Category Breakdown</h3>
          <div style={{ width: '100%', height: '220px', position: 'relative' }}>
            {totalSolved > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={categories} innerRadius={70} outerRadius={95} paddingAngle={8} dataKey="value" stroke="none">
                    {categories.map((entry, index) => <Cell key={index} fill={entry.color} />)}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: '120px', height: '120px', border: '3px dashed #e2e8f0', borderRadius: '50%', marginBottom: '15px' }} />
                <span style={{ color: '#94a3b8', fontSize: '14px' }}>No category data yet</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 3. ACTIVITY CALENDAR (GitHub Style) */}
      <div style={cardStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
          <h3 style={{ fontSize: '13px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px', margin: 0 }}>Activity Calendar</h3>
          <div style={{ fontSize: '12px', color: '#94a3b8', fontWeight: '600' }}>{totalSolved} submissions in 2026</div>
        </div>

        <div style={{ width: '100%', overflowX: 'auto', paddingBottom: '10px' }}>
          <div style={{ minWidth: '900px', display: 'flex', gap: '12px' }}>
            {/* Weekday Labels */}
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', paddingTop: '32px', paddingBottom: '12px', fontSize: '10px', color: '#cbd5e1', fontWeight: '700', textTransform: 'uppercase' }}>
              <span>Mon</span>
              <span>Wed</span>
              <span>Fri</span>
            </div>

            <div style={{ flex: 1 }}>
              <CalendarHeatmap
                startDate={new Date('2026-01-01')}
                endDate={new Date('2026-12-31')}
                gutterSize={3}
                values={solvedProblems.map(p => ({ 
                  date: p.date || new Date().toISOString().split('T')[0], 
                  count: 1 
                }))}
                showMonthLabels={true}
                classForValue={(value) => {
                  if (!value) return 'color-empty';
                  return `color-scale-${Math.min(value.count, 4)}`;
                }}
              />
            </div>
          </div>
        </div>

        {/* Legend Row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '15px', borderTop: '1px solid #f8fafc', paddingTop: '15px' }}>
          <div style={{ fontSize: '12px', color: '#64748b', fontWeight: '500' }}>
            Active days: <span style={{ color: '#1e293b', fontWeight: '800' }}>{totalSolved > 0 ? '1' : '0'}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#94a3b8', fontWeight: '600' }}>
            <span>Less</span>
            <div style={{ display: 'flex', gap: '3px' }}>
              {['#f1f5f9', '#bbf7d0', '#4ade80', '#16a34a', '#14532d'].map(c => (
                <div key={c} style={{ width: '11px', height: '11px', borderRadius: '2.5px', backgroundColor: c }} />
              ))}
            </div>
            <span>More</span>
          </div>
        </div>

        <style>{`
          .react-calendar-heatmap text { font-size: 11px; fill: #94a3b8; font-weight: 700; }
          .react-calendar-heatmap .color-empty { fill: #f1f5f9; }
          .react-calendar-heatmap .color-scale-1 { fill: #bbf7d0; }
          .react-calendar-heatmap .color-scale-2 { fill: #4ade80; }
          .react-calendar-heatmap .color-scale-3 { fill: #16a34a; }
          .react-calendar-heatmap .color-scale-4 { fill: #14532d; }
          .react-calendar-heatmap rect { rx: 3; ry: 3; transition: all 0.2s; }
          .react-calendar-heatmap rect:hover { fill: #f97316; cursor: pointer; transform: scale(1.1); transform-origin: center; }
        `}</style>
      </div>
    </div>
  );
};

export default Progress;
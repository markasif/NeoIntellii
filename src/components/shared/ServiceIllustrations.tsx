import React from "react";

// Shared SVG building blocks
const TextLine = ({ x, y, width, color ="#D1D5DB"}: { x: number; y: number; width: number; color?: string }) => (
 <rect x={x} y={y} width={width} height={8} rx={4} fill={color} />
);

const Avatar = ({ cx, cy, r = 14, color ="#3B82F6"}: { cx: number; cy: number; r?: number; color?: string }) => (
 <g>
 <circle cx={cx} cy={cy} r={r} fill={`${color}20`} />
 <circle cx={cx} cy={cy - 2} r={r * 0.32} fill={color} />
 <ellipse cx={cx} cy={cy + r * 0.45} rx={r * 0.5} ry={r * 0.28} fill={color} />
 </g>
);

const Badge = ({ x, y, text, color ="#3B82F6"}: { x: number; y: number; text: string; color?: string }) => (
 <g>
 <rect x={x} y={y} width={text.length * 6.5 + 16} height={22} rx={11} fill={`${color}15`} />
 <text x={x + 8} y={y + 15} fontSize="10" fill={color} fontFamily="system-ui" fontWeight="500">{text}</text>
 </g>
);

const ProgressBar = ({ x, y, width, progress, color ="#3B82F6"}: { x: number; y: number; width: number; progress: number; color?: string }) => (
 <g>
 <rect x={x} y={y} width={width} height={8} rx={4} fill="#E5E7EB"/>
 <rect x={x} y={y} width={width * progress} height={8} rx={4} fill={color} />
 </g>
);

// ─── GCC SETUP & LAUNCH ───
// Shows a stylized Bangalore tech park skyline with a launch/setup checklist
export const GCCSetupLaunch = () => (
 <svg viewBox="0 0 320 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
 {/* Modern Bangalore tech park building */}
 <rect x="40" y="50" width="140" height="130" rx="8" fill="#E5E7EB"/>
 <rect x="50" y="60" width="28" height="20" rx="3" fill="#DBEAFE"/>
 <rect x="84" y="60" width="28" height="20" rx="3" fill="#DBEAFE"/>
 <rect x="118" y="60" width="28" height="20" rx="3" fill="#DBEAFE"/>
 <rect x="50" y="88" width="28" height="20" rx="3" fill="#DBEAFE"/>
 <rect x="84" y="88" width="28" height="20" rx="3" fill="#DBEAFE"/>
 <rect x="118" y="88" width="28" height="20" rx="3" fill="#DBEAFE"/>
 <rect x="50" y="116" width="28" height="20" rx="3" fill="#DBEAFE"/>
 <rect x="84" y="116" width="28" height="20" rx="3" fill="#DBEAFE"/>
 <rect x="118" y="116" width="28" height="20" rx="3" fill="#DBEAFE"/>
 {/* Building entrance */}
 <rect x="84" y="148" width="28" height="32" rx="3" fill="#93C5FD"/>
 {/* Antenna / spire */}
 <rect x="108" y="35" width="3" height="15" rx="1.5" fill="#9CA3AF"/>
 <circle cx="109.5" cy="33" r="3" fill="#3B82F6"/>
 {/* Setup checklist floating card */}
 <rect x="195" y="45" width="105" height="130" rx="10" fill="white" filter="url(#shadow1)"/>
 <rect x="207" y="58" width="14" height="14" rx="3" fill="#DBEAFE"/>
 <path d="M211 65l3 3 5-6" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
 <TextLine x={227} y={62} width={60} />
 <rect x="207" y="82" width="14" height="14" rx="3" fill="#DBEAFE"/>
 <path d="M211 89l3 3 5-6" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
 <TextLine x={227} y={86} width={50} />
 <rect x="207" y="106" width="14" height="14" rx="3" fill="#DBEAFE"/>
 <path d="M211 113l3 3 5-6" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
 <TextLine x={227} y={110} width={55} />
 <rect x="207" y="130" width="14" height="14" rx="3" fill="#E5E7EB"/>
 <TextLine x={227} y={134} width={45} />
 <Badge x={207} y={152} text="India" color="#3B82F6"/>
 <defs>
 <filter id="shadow1" x="-4" y="-2" width="113" height="140" filterUnits="userSpaceOnUse">
 <feDropShadow dx="0" dy="2" stdDeviation="4" floodOpacity="0.08"/>
 </filter>
 </defs>
 </svg>
);

// ─── TALENT & LEADERSHIP (Homepage) / TALENT MANAGEMENT (GCC page) ───
// Shows candidate profiles with skill scores like Resume Analyzer
export const TalentLeadership = () => (
 <svg viewBox="0 0 320 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
 <rect x="40" y="30" width="240" height="160" rx="12" fill="white" filter="url(#shadowTL)"/>
 {/* Row 1 */}
 <Avatar cx={72} cy={68} r={16} />
 <TextLine x={96} y={58} width={70} color="#374151"/>
 <TextLine x={96} y={72} width={50} />
 <ProgressBar x={180} y={62} width={80} progress={0.92} />
 <text x="266" y="72" fontSize="12" fill="#374151" fontFamily="system-ui" fontWeight="600">92%</text>
 {/* Row 2 */}
 <Avatar cx={72} cy={112} r={16} />
 <TextLine x={96} y={102} width={60} color="#374151"/>
 <TextLine x={96} y={116} width={45} />
 <ProgressBar x={180} y={106} width={80} progress={0.87} />
 <text x="266" y="116" fontSize="12" fill="#374151" fontFamily="system-ui" fontWeight="600">87%</text>
 {/* Row 3 */}
 <Avatar cx={72} cy={156} r={16} />
 <TextLine x={96} y={146} width={65} color="#374151"/>
 <TextLine x={96} y={160} width={40} />
 <ProgressBar x={180} y={150} width={80} progress={0.74} />
 <text x="266" y="160" fontSize="12" fill="#374151" fontFamily="system-ui" fontWeight="600">74%</text>
 <defs>
 <filter id="shadowTL"><feDropShadow dx="0" dy="2" stdDeviation="6" floodOpacity="0.06"/></filter>
 </defs>
 </svg>
);

// ─── TECHNOLOGY FOUNDATION (Homepage) / TECHNOLOGY INFRASTRUCTURE (GCC) ───
// Shows a cloud-server architecture diagram
export const TechnologyFoundation = () => (
 <svg viewBox="0 0 320 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
 {/* Cloud */}
 <ellipse cx="160" cy="52" rx="50" ry="28" fill="#DBEAFE"/>
 <ellipse cx="140" cy="50" rx="30" ry="22" fill="#DBEAFE"/>
 <ellipse cx="180" cy="50" rx="30" ry="22" fill="#DBEAFE"/>
 <rect x="120" y="50" width="80" height="20" fill="#DBEAFE"/>
 <path d="M147 52l5 5 9-10" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round"/>
 {/* Connection lines */}
 <line x1="120" y1="75" x2="80" y2="110" stroke="#93C5FD" strokeWidth="1.5" strokeDasharray="4 3"/>
 <line x1="160" y1="75" x2="160" y2="110" stroke="#93C5FD" strokeWidth="1.5" strokeDasharray="4 3"/>
 <line x1="200" y1="75" x2="240" y2="110" stroke="#93C5FD" strokeWidth="1.5" strokeDasharray="4 3"/>
 {/* Server nodes */}
 <rect x="50" y="110" width="60" height="70" rx="8" fill="white" stroke="#E5E7EB" strokeWidth="1.5"/>
 <rect x="58" y="120" width="44" height="6" rx="3" fill="#3B82F6"/>
 <rect x="58" y="132" width="44" height="6" rx="3" fill="#93C5FD"/>
 <rect x="58" y="144" width="44" height="6" rx="3" fill="#DBEAFE"/>
 <circle cx="66" cy="166" r="3" fill="#10B981"/>
 <TextLine x={74} y={163} width={24} />
 <rect x="130" y="110" width="60" height="70" rx="8" fill="white" stroke="#E5E7EB" strokeWidth="1.5"/>
 <rect x="138" y="120" width="44" height="6" rx="3" fill="#3B82F6"/>
 <rect x="138" y="132" width="44" height="6" rx="3" fill="#93C5FD"/>
 <rect x="138" y="144" width="44" height="6" rx="3" fill="#DBEAFE"/>
 <circle cx="146" cy="166" r="3" fill="#10B981"/>
 <TextLine x={154} y={163} width={24} />
 <rect x="210" y="110" width="60" height="70" rx="8" fill="white" stroke="#E5E7EB" strokeWidth="1.5"/>
 <rect x="218" y="120" width="44" height="6" rx="3" fill="#3B82F6"/>
 <rect x="218" y="132" width="44" height="6" rx="3" fill="#93C5FD"/>
 <rect x="218" y="144" width="44" height="6" rx="3" fill="#DBEAFE"/>
 <circle cx="226" cy="166" r="3" fill="#10B981"/>
 <TextLine x={234} y={163} width={24} />
 </svg>
);

// ─── AI-FIRST GCC (Homepage) ───
// Shows a neural network / AI brain connected to data streams
export const AIFirstGCC = () => (
 <svg viewBox="0 0 320 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
 {/* Central AI brain */}
 <circle cx="160" cy="110" r="40" fill="#DBEAFE"/>
 <circle cx="160" cy="110" r="28" fill="#93C5FD" opacity="0.4"/>
 {/* Neural connections inside */}
 <circle cx="148" cy="100" r="5" fill="#3B82F6"/>
 <circle cx="172" cy="100" r="5" fill="#3B82F6"/>
 <circle cx="155" cy="120" r="5" fill="#3B82F6"/>
 <circle cx="168" cy="118" r="4" fill="#3B82F6"/>
 <circle cx="160" cy="105" r="3" fill="#2563EB"/>
 <line x1="148" y1="100" x2="160" y2="105" stroke="#3B82F6" strokeWidth="1.5"/>
 <line x1="172" y1="100" x2="160" y2="105" stroke="#3B82F6" strokeWidth="1.5"/>
 <line x1="155" y1="120" x2="160" y2="105" stroke="#3B82F6" strokeWidth="1.5"/>
 <line x1="168" y1="118" x2="160" y2="105" stroke="#3B82F6" strokeWidth="1.5"/>
 <line x1="148" y1="100" x2="155" y2="120" stroke="#3B82F6" strokeWidth="1" opacity="0.5"/>
 <line x1="172" y1="100" x2="168" y2="118" stroke="#3B82F6" strokeWidth="1" opacity="0.5"/>
 {/* Data input streams */}
 <rect x="30" y="60" width="60" height="28" rx="6" fill="white" stroke="#E5E7EB" strokeWidth="1"/>
 <TextLine x={38} y={70} width={44} color="#93C5FD"/>
 <rect x="30" y="100" width="60" height="28" rx="6" fill="white" stroke="#E5E7EB" strokeWidth="1"/>
 <TextLine x={38} y={110} width={38} color="#93C5FD"/>
 <rect x="30" y="140" width="60" height="28" rx="6" fill="white" stroke="#E5E7EB" strokeWidth="1"/>
 <TextLine x={38} y={150} width={42} color="#93C5FD"/>
 {/* Arrows to brain */}
 <path d="M90 74 L120 95" stroke="#93C5FD" strokeWidth="1.5" markerEnd="url(#arrowAI)"/>
 <path d="M90 114 L120 112" stroke="#93C5FD" strokeWidth="1.5" markerEnd="url(#arrowAI)"/>
 <path d="M90 154 L120 130" stroke="#93C5FD" strokeWidth="1.5" markerEnd="url(#arrowAI)"/>
 {/* Output cards */}
 <rect x="230" y="65" width="65" height="35" rx="6" fill="white" stroke="#E5E7EB" strokeWidth="1"/>
 <TextLine x={238} y={76} width={44} color="#3B82F6"/>
 <TextLine x={238} y={88} width={36} />
 <rect x="230" y="115" width="65" height="35" rx="6" fill="white" stroke="#E5E7EB" strokeWidth="1"/>
 <TextLine x={238} y={126} width={40} color="#3B82F6"/>
 <TextLine x={238} y={138} width={48} />
 {/* Arrows from brain */}
 <path d="M200 95 L230 82" stroke="#3B82F6" strokeWidth="1.5" markerEnd="url(#arrowAI)"/>
 <path d="M200 120 L230 130" stroke="#3B82F6" strokeWidth="1.5" markerEnd="url(#arrowAI)"/>
 <defs>
 <marker id="arrowAI" viewBox="0 0 6 6" refX="5" refY="3" markerWidth="6" markerHeight="6" orient="auto">
 <path d="M0 0L6 3L0 6Z" fill="#3B82F6"/>
 </marker>
 </defs>
 </svg>
);

// ─── OPERATIONS EXCELLENCE ───
// Shows a KPI dashboard with charts and metrics
export const OperationsExcellence = () => (
 <svg viewBox="0 0 320 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
 <rect x="30" y="30" width="260" height="160" rx="12" fill="white" filter="url(#shadowOE)"/>
 {/* Header tabs */}
 <TextLine x={42} y={44} width={50} color="#3B82F6"/>
 <TextLine x={100} y={44} width={40} />
 <TextLine x={148} y={44} width={45} />
 <line x1="42" y1="58" x2="92" y2="58" stroke="#3B82F6" strokeWidth="2"/>
 <line x1="30" y1="60" x2="290" y2="60" stroke="#E5E7EB" strokeWidth="1"/>
 {/* KPI cards row */}
 <rect x="42" y="70" width="72" height="45" rx="6" fill="#F9FAFB"/>
 <text x="52" y="88" fontSize="16" fill="#374151" fontFamily="system-ui" fontWeight="700">98.2%</text>
 <TextLine x={52} y={100} width={40} />
 <rect x="124" y="70" width="72" height="45" rx="6" fill="#F9FAFB"/>
 <text x="134" y="88" fontSize="16" fill="#3B82F6" fontFamily="system-ui" fontWeight="700">4.2s</text>
 <TextLine x={134} y={100} width={38} />
 <rect x="206" y="70" width="72" height="45" rx="6" fill="#F9FAFB"/>
 <text x="216" y="88" fontSize="16" fill="#10B981" fontFamily="system-ui" fontWeight="700">↑ 12%</text>
 <TextLine x={216} y={100} width={42} />
 {/* Mini bar chart */}
 <rect x="42" y="170" width="16" height="12" rx="2" fill="#DBEAFE"/>
 <rect x="64" y="158" width="16" height="24" rx="2" fill="#DBEAFE"/>
 <rect x="86" y="150" width="16" height="32" rx="2" fill="#93C5FD"/>
 <rect x="108" y="142" width="16" height="40" rx="2" fill="#93C5FD"/>
 <rect x="130" y="135" width="16" height="47" rx="2" fill="#3B82F6"/>
 <rect x="152" y="130" width="16" height="52" rx="2" fill="#3B82F6"/>
 {/* Mini line chart */}
 <polyline points="200,172 215,160 230,165 245,148 260,140 275,132" stroke="#3B82F6" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
 <circle cx="275" cy="132" r="3" fill="#3B82F6"/>
 <defs>
 <filter id="shadowOE"><feDropShadow dx="0" dy="2" stdDeviation="6" floodOpacity="0.06"/></filter>
 </defs>
 </svg>
);

// ─── COMPLIANCE & GOVERNANCE ───
// Shows a compliance document with shield and audit checklist
export const ComplianceGovernance = () => (
 <svg viewBox="0 0 320 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
 {/* Document */}
 <rect x="60" y="25" width="130" height="170" rx="10" fill="white" filter="url(#shadowCG)"/>
 <TextLine x={75} y={42} width={90} color="#374151"/>
 <TextLine x={75} y={58} width={100} />
 <TextLine x={75} y={70} width={80} />
 <line x1="75" y1="84" x2="175" y2="84" stroke="#E5E7EB" strokeWidth="1"/>
 {/* Audit items */}
 <rect x="75" y="94" width="14" height="14" rx="3" fill="#DCFCE7"/>
 <path d="M79 101l3 3 5-6" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
 <TextLine x={95} y={98} width={70} />
 <rect x="75" y="116" width="14" height="14" rx="3" fill="#DCFCE7"/>
 <path d="M79 123l3 3 5-6" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
 <TextLine x={95} y={120} width={60} />
 <rect x="75" y="138" width="14" height="14" rx="3" fill="#DCFCE7"/>
 <path d="M79 145l3 3 5-6" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
 <TextLine x={95} y={142} width={65} />
 <rect x="75" y="160" width="14" height="14" rx="3" fill="#FEF3C7"/>
 <TextLine x={95} y={164} width={55} />
 {/* Shield overlay */}
 <g transform="translate(210, 55)">
 <path d="M35 5 L65 18 L65 45 C65 60 50 72 35 78 C20 72 5 60 5 45 L5 18 Z" fill="#DBEAFE" stroke="#3B82F6" strokeWidth="1.5"/>
 <path d="M25 42 L32 49 L47 34" stroke="#3B82F6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
 </g>
 {/* Status badge */}
 <Badge x={210} y={145} text="Compliant" color="#10B981"/>
 <Badge x={210} y={172} text="Audited" color="#3B82F6"/>
 <defs>
 <filter id="shadowCG"><feDropShadow dx="0" dy="2" stdDeviation="6" floodOpacity="0.06"/></filter>
 </defs>
 </svg>
);

// ─── AI ADVISORY & STRATEGY ───
// Shows a strategy roadmap with AI elements
export const AIAdvisoryStrategy = () => (
 <svg viewBox="0 0 320 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
 <rect x="30" y="30" width="260" height="160" rx="12" fill="white" filter="url(#shadowAAS)"/>
 {/* Header */}
 <circle cx="50" cy="48" r="10" fill="#DBEAFE"/>
 <text x="48" y="52" fontSize="10" fill="#3B82F6" fontFamily="system-ui" textAnchor="middle">AI</text>
 <TextLine x={66} y={44} width={80} color="#374151"/>
 <line x1="30" y1="62" x2="290" y2="62" stroke="#E5E7EB" strokeWidth="1"/>
 {/* Roadmap lanes */}
 <text x="42" y="80" fontSize="9" fill="#9CA3AF" fontFamily="system-ui">Q1</text>
 <text x="106" y="80" fontSize="9" fill="#9CA3AF" fontFamily="system-ui">Q2</text>
 <text x="170" y="80" fontSize="9" fill="#9CA3AF" fontFamily="system-ui">Q3</text>
 <text x="234" y="80" fontSize="9" fill="#9CA3AF" fontFamily="system-ui">Q4</text>
 <line x1="42" y1="85" x2="278" y2="85" stroke="#E5E7EB" strokeWidth="1"/>
 {/* Strategy bars */}
 <rect x="42" y="92" width="100" height="20" rx="5" fill="#DBEAFE"/>
 <TextLine x={50} y={99} width={60} color="#3B82F6"/>
 <rect x="110" y="118" width="90" height="20" rx="5" fill="#93C5FD" opacity="0.4"/>
 <TextLine x={118} y={125} width={50} color="#3B82F6"/>
 <rect x="170" y="144" width="108" height="20" rx="5" fill="#3B82F6" opacity="0.2"/>
 <TextLine x={178} y={151} width={70} color="#3B82F6"/>
 {/* Milestone diamonds */}
 <g transform="translate(140, 100) rotate(45)"><rect width="8" height="8" rx="1.5" fill="#3B82F6"/></g>
 <g transform="translate(198, 126) rotate(45)"><rect width="8" height="8" rx="1.5" fill="#3B82F6"/></g>
 <g transform="translate(272, 152) rotate(45)"><rect width="8" height="8" rx="1.5" fill="#3B82F6"/></g>
 {/* Priority label */}
 <Badge x={42} y={172} text="High Priority" color="#3B82F6"/>
 <defs>
 <filter id="shadowAAS"><feDropShadow dx="0" dy="2" stdDeviation="6" floodOpacity="0.06"/></filter>
 </defs>
 </svg>
);

// ─── AI GCC SETUP & OPERATIONS ───
// Shows team topology with connected workflow pods
export const AIGCCSetupOperations = () => (
 <svg viewBox="0 0 320 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
 {/* Central ops hub */}
 <rect x="110" y="70" width="100" height="80" rx="12" fill="white" stroke="#3B82F6" strokeWidth="1.5"/>
 <circle cx="140" cy="95" r="10" fill="#DBEAFE"/>
 <text x="140" y="99" fontSize="8" fill="#3B82F6" fontFamily="system-ui" textAnchor="middle">OPS</text>
 <circle cx="180" cy="95" r="10" fill="#DBEAFE"/>
 <text x="180" y="99" fontSize="8" fill="#3B82F6" fontFamily="system-ui" textAnchor="middle">AI</text>
 <TextLine x={125} y={120} width={70} color="#374151"/>
 <TextLine x={130} y={133} width={60} />
 {/* Team pod - left */}
 <rect x="20" y="40" width="70" height="55" rx="8" fill="#F9FAFB" stroke="#E5E7EB" strokeWidth="1"/>
 <Avatar cx={42} cy={56} r={10} />
 <Avatar cx={62} cy={56} r={10} />
 <TextLine x={28} y={76} width={54} />
 {/* Team pod - right */}
 <rect x="230" y="40" width="70" height="55" rx="8" fill="#F9FAFB" stroke="#E5E7EB" strokeWidth="1"/>
 <Avatar cx={252} cy={56} r={10} />
 <Avatar cx={272} cy={56} r={10} />
 <TextLine x={238} y={76} width={54} />
 {/* Team pod - bottom left */}
 <rect x="20" y="125" width="70" height="55" rx="8" fill="#F9FAFB" stroke="#E5E7EB" strokeWidth="1"/>
 <Avatar cx={42} cy={141} r={10} />
 <Avatar cx={62} cy={141} r={10} />
 <TextLine x={28} y={161} width={54} />
 {/* Team pod - bottom right */}
 <rect x="230" y="125" width="70" height="55" rx="8" fill="#F9FAFB" stroke="#E5E7EB" strokeWidth="1"/>
 <Avatar cx={252} cy={141} r={10} />
 <Avatar cx={272} cy={141} r={10} />
 <TextLine x={238} y={161} width={54} />
 {/* Connection lines */}
 <line x1="90" y1="67" x2="110" y2="85" stroke="#93C5FD" strokeWidth="1.5" strokeDasharray="4 3"/>
 <line x1="230" y1="67" x2="210" y2="85" stroke="#93C5FD" strokeWidth="1.5" strokeDasharray="4 3"/>
 <line x1="90" y1="152" x2="110" y2="135" stroke="#93C5FD" strokeWidth="1.5" strokeDasharray="4 3"/>
 <line x1="230" y1="152" x2="210" y2="135" stroke="#93C5FD" strokeWidth="1.5" strokeDasharray="4 3"/>
 </svg>
);

// ─── ENTERPRISE GENERATIVE AI ───
// Shows a generative AI interface like the JD Generator reference
export const EnterpriseGenerativeAI = () => (
 <svg viewBox="0 0 320 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
 <rect x="40" y="25" width="240" height="170" rx="12" fill="white" filter="url(#shadowEGA)"/>
 {/* AI icon + header */}
 <rect x="55" y="40" width="28" height="28" rx="8" fill="#DBEAFE"/>
 <text x="69" y="58" fontSize="11" fill="#3B82F6" fontFamily="system-ui" fontWeight="600" textAnchor="middle">AI</text>
 <TextLine x={92} y={48} width={120} color="#374151"/>
 <TextLine x={92} y={60} width={80} />
 <line x1="55" y1="78" x2="265" y2="78" stroke="#E5E7EB" strokeWidth="1"/>
 {/* Generated content lines */}
 <TextLine x={55} y={90} width={195} color="#93C5FD"/>
 <TextLine x={55} y={104} width={180} color="#93C5FD"/>
 <TextLine x={55} y={118} width={160} />
 <TextLine x={55} y={132} width={190} />
 <TextLine x={55} y={146} width={140} />
 {/* Tags */}
 <Badge x={55} y={162} text="Generated" color="#10B981"/>
 <Badge x={135} y={162} text="Enterprise" color="#3B82F6"/>
 {/* Sparkle */}
 <g transform="translate(248, 35)">
 <path d="M8 0 L10 6 L16 8 L10 10 L8 16 L6 10 L0 8 L6 6Z" fill="#3B82F6" opacity="0.6"/>
 </g>
 <defs>
 <filter id="shadowEGA"><feDropShadow dx="0" dy="2" stdDeviation="6" floodOpacity="0.06"/></filter>
 </defs>
 </svg>
);

// ─── DATA ENGINEERING ───
// Shows data pipeline flow
export const DataEngineering = () => (
 <svg viewBox="0 0 320 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
 {/* Source databases */}
 <rect x="20" y="40" width="55" height="40" rx="6" fill="white" stroke="#E5E7EB" strokeWidth="1.5"/>
 <ellipse cx="47" cy="48" rx="18" ry="5" fill="#DBEAFE"/>
 <rect x="29" y="48" width="36" height="14" fill="white" stroke="#E5E7EB" strokeWidth="1"/>
 <ellipse cx="47" cy="62" rx="18" ry="5" fill="#DBEAFE"/>
 <rect x="20" y="100" width="55" height="40" rx="6" fill="white" stroke="#E5E7EB" strokeWidth="1.5"/>
 <ellipse cx="47" cy="108" rx="18" ry="5" fill="#DBEAFE"/>
 <rect x="29" y="108" width="36" height="14" fill="white" stroke="#E5E7EB" strokeWidth="1"/>
 <ellipse cx="47" cy="122" rx="18" ry="5" fill="#DBEAFE"/>
 <rect x="20" y="160" width="55" height="40" rx="6" fill="white" stroke="#E5E7EB" strokeWidth="1.5"/>
 <ellipse cx="47" cy="168" rx="18" ry="5" fill="#DBEAFE"/>
 <rect x="29" y="168" width="36" height="14" fill="white" stroke="#E5E7EB" strokeWidth="1"/>
 <ellipse cx="47" cy="182" rx="18" ry="5" fill="#DBEAFE"/>
 {/* Pipeline arrows */}
 <path d="M75 60 L110 110" stroke="#93C5FD" strokeWidth="2" markerEnd="url(#arrowDE)"/>
 <path d="M75 120 L110 115" stroke="#93C5FD" strokeWidth="2" markerEnd="url(#arrowDE)"/>
 <path d="M75 180 L110 120" stroke="#93C5FD" strokeWidth="2" markerEnd="url(#arrowDE)"/>
 {/* ETL process */}
 <rect x="110" y="90" width="70" height="50" rx="10" fill="#3B82F6" opacity="0.1" stroke="#3B82F6" strokeWidth="1.5"/>
 <text x="145" y="112" fontSize="10" fill="#3B82F6" fontFamily="system-ui" fontWeight="600" textAnchor="middle">Transform</text>
 <text x="145" y="126" fontSize="8" fill="#93C5FD" fontFamily="system-ui" textAnchor="middle">ETL Pipeline</text>
 {/* Output arrow */}
 <path d="M180 115 L215 115" stroke="#3B82F6" strokeWidth="2" markerEnd="url(#arrowDE)"/>
 {/* Data warehouse */}
 <rect x="215" y="65" width="85" height="100" rx="10" fill="white" stroke="#3B82F6" strokeWidth="1.5"/>
 <TextLine x={225} y={80} width={65} color="#3B82F6"/>
 <rect x="225" y="95" width="65" height="8" rx="4" fill="#DBEAFE"/>
 <rect x="225" y="110" width="65" height="8" rx="4" fill="#DBEAFE"/>
 <rect x="225" y="125" width="65" height="8" rx="4" fill="#DBEAFE"/>
 <rect x="225" y="140" width="45" height="8" rx="4" fill="#DBEAFE"/>
 <circle cx="280" cy="144" r="5" fill="#10B981"/>
 <defs>
 <marker id="arrowDE" viewBox="0 0 6 6" refX="5" refY="3" markerWidth="6" markerHeight="6" orient="auto">
 <path d="M0 0L6 3L0 6Z" fill="#3B82F6"/>
 </marker>
 </defs>
 </svg>
);

// ─── MLOPS & LLMOPS ───
// Shows a CI/CD model lifecycle pipeline
export const MLOpsLLMOps = () => (
 <svg viewBox="0 0 320 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
 <rect x="25" y="30" width="270" height="160" rx="12" fill="white" filter="url(#shadowML)"/>
 {/* Pipeline stages */}
 <rect x="40" y="50" width="55" height="40" rx="6" fill="#DBEAFE"/>
 <text x="67" y="66" fontSize="8" fill="#3B82F6" fontFamily="system-ui" fontWeight="600" textAnchor="middle">Train</text>
 <TextLine x={48} y={78} width={40} />
 <path d="M95 70 L110 70" stroke="#93C5FD" strokeWidth="2" markerEnd="url(#arrowML)"/>
 <rect x="112" y="50" width="55" height="40" rx="6" fill="#93C5FD" opacity="0.3"/>
 <text x="139" y="66" fontSize="8" fill="#3B82F6" fontFamily="system-ui" fontWeight="600" textAnchor="middle">Evaluate</text>
 <TextLine x={120} y={78} width={40} />
 <path d="M167 70 L182 70" stroke="#93C5FD" strokeWidth="2" markerEnd="url(#arrowML)"/>
 <rect x="184" y="50" width="55" height="40" rx="6" fill="#3B82F6" opacity="0.15"/>
 <text x="211" y="66" fontSize="8" fill="#3B82F6" fontFamily="system-ui" fontWeight="600" textAnchor="middle">Deploy</text>
 <TextLine x={192} y={78} width={40} />
 <path d="M239 70 L254 70" stroke="#93C5FD" strokeWidth="2" markerEnd="url(#arrowML)"/>
 <circle cx="268" cy="70" r="10" fill="#DCFCE7"/>
 <path d="M264 70l3 3 5-6" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
 {/* Model versions */}
 <line x1="40" y1="105" x2="280" y2="105" stroke="#E5E7EB" strokeWidth="1"/>
 <text x="40" y="120" fontSize="9" fill="#9CA3AF" fontFamily="system-ui">Model Versions</text>
 <rect x="40" y="130" width="75" height="28" rx="6" fill="#F9FAFB"/>
 <TextLine x={48} y={138} width={30} color="#374151"/>
 <TextLine x={48} y={148} width={50} />
 <rect x="125" y="130" width="75" height="28" rx="6" fill="#F9FAFB"/>
 <TextLine x={133} y={138} width={30} color="#374151"/>
 <TextLine x={133} y={148} width={50} />
 <rect x="210" y="130" width="75" height="28" rx="6" fill="#DBEAFE" stroke="#3B82F6" strokeWidth="1"/>
 <TextLine x={218} y={138} width={30} color="#3B82F6"/>
 <TextLine x={218} y={148} width={50} color="#93C5FD"/>
 {/* Monitoring dots */}
 <circle cx="255" cy="172" r="3" fill="#10B981"/>
 <TextLine x={262} y={170} width={20} color="#10B981"/>
 <defs>
 <marker id="arrowML" viewBox="0 0 6 6" refX="5" refY="3" markerWidth="6" markerHeight="6" orient="auto">
 <path d="M0 0L6 3L0 6Z" fill="#93C5FD"/>
 </marker>
 <filter id="shadowML"><feDropShadow dx="0" dy="2" stdDeviation="6" floodOpacity="0.06"/></filter>
 </defs>
 </svg>
);

// ─── RESPONSIBLE AI GOVERNANCE ───
// Shows balanced scales with fairness metrics
export const ResponsibleAI = () => (
 <svg viewBox="0 0 320 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
 {/* Balance beam */}
 <circle cx="160" cy="50" r="12" fill="#DBEAFE"/>
 <text x="160" y="54" fontSize="10" fill="#3B82F6" fontFamily="system-ui" fontWeight="600" textAnchor="middle">AI</text>
 <rect x="158" y="62" width="4" height="40" rx="2" fill="#D1D5DB"/>
 <rect x="80" y="95" width="160" height="4" rx="2" fill="#D1D5DB"/>
 {/* Left scale - Fairness */}
 <rect x="80" y="95" width="4" height="25" rx="2" fill="#D1D5DB"/>
 <rect x="52" y="120" width="60" height="65" rx="8" fill="white" stroke="#E5E7EB" strokeWidth="1.5"/>
 <text x="82" y="137" fontSize="8" fill="#374151" fontFamily="system-ui" fontWeight="600" textAnchor="middle">Fairness</text>
 <ProgressBar x={60} y={145} width={44} progress={0.88} color="#10B981"/>
 <text x="82" y="163" fontSize="8" fill="#374151" fontFamily="system-ui" fontWeight="600" textAnchor="middle">Explain.</text>
 <ProgressBar x={60} y={169} width={44} progress={0.92} color="#3B82F6"/>
 {/* Right scale - Risk */}
 <rect x="236" y="95" width="4" height="25" rx="2" fill="#D1D5DB"/>
 <rect x="208" y="120" width="60" height="65" rx="8" fill="white" stroke="#E5E7EB" strokeWidth="1.5"/>
 <text x="238" y="137" fontSize="8" fill="#374151" fontFamily="system-ui" fontWeight="600" textAnchor="middle">Compliance</text>
 <ProgressBar x={216} y={145} width={44} progress={0.95} color="#10B981"/>
 <text x="238" y="163" fontSize="8" fill="#374151" fontFamily="system-ui" fontWeight="600" textAnchor="middle">Risk</text>
 <ProgressBar x={216} y={169} width={44} progress={0.15} color="#F59E0B"/>
 {/* Center status */}
 <Badge x={130} y={196} text="Governed" color="#10B981"/>
 </svg>
);

// ─── PRODUCT ENGINEERING ───
// Shows a code editor / app wireframe
export const ProductEngineering = () => (
 <svg viewBox="0 0 320 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
 <rect x="30" y="25" width="260" height="170" rx="12" fill="#1F2937"/>
 {/* Title bar */}
 <circle cx="48" cy="40" r="4.5" fill="#EF4444"/>
 <circle cx="62" cy="40" r="4.5" fill="#F59E0B"/>
 <circle cx="76" cy="40" r="4.5" fill="#10B981"/>
 <TextLine x={150} y={37} width={80} color="#4B5563"/>
 <line x1="30" y1="52" x2="290" y2="52" stroke="#374151" strokeWidth="1"/>
 {/* Sidebar */}
 <rect x="30" y="52" width="60" height="143" rx="0" fill="#111827"/>
 <TextLine x={38} y={65} width={42} color="#6B7280"/>
 <TextLine x={38} y={80} width={36} color="#3B82F6"/>
 <TextLine x={38} y={95} width={40} color="#6B7280"/>
 <TextLine x={38} y={110} width={32} color="#6B7280"/>
 <TextLine x={38} y={125} width={38} color="#6B7280"/>
 {/* Code lines */}
 <TextLine x={100} y={68} width={24} color="#7C3AED"/>
 <TextLine x={130} y={68} width={60} color="#3B82F6"/>
 <TextLine x={110} y={82} width={40} color="#10B981"/>
 <TextLine x={156} y={82} width={30} color="#F59E0B"/>
 <TextLine x={110} y={96} width={70} color="#93C5FD"/>
 <TextLine x={110} y={110} width={50} color="#10B981"/>
 <TextLine x={166} y={110} width={30} color="#D1D5DB"/>
 <TextLine x={110} y={124} width={80} color="#93C5FD"/>
 <TextLine x={110} y={138} width={40} color="#7C3AED"/>
 <TextLine x={156} y={138} width={55} color="#F59E0B"/>
 <TextLine x={100} y={152} width={24} color="#7C3AED"/>
 {/* Terminal output at bottom */}
 <rect x="90" y="165" width="200" height="25" rx="4" fill="#0F172A"/>
 <circle cx="102" cy="177" r="3" fill="#10B981"/>
 <TextLine x={110} y={174} width={80} color="#10B981"/>
 </svg>
);

// ─── DATA PLATFORM ───
// Shows layered data architecture
export const DataPlatform = () => (
 <svg viewBox="0 0 320 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
 {/* Layers */}
 <rect x="50" y="30" width="220" height="38" rx="8" fill="#DBEAFE" stroke="#93C5FD" strokeWidth="1"/>
 <text x="160" y="48" fontSize="10" fill="#3B82F6" fontFamily="system-ui" fontWeight="600" textAnchor="middle">Analytics & BI</text>
 <TextLine x={90} y={56} width={140} color="#93C5FD"/>
 <rect x="50" y="76" width="220" height="38" rx="8" fill="#93C5FD" opacity="0.2" stroke="#93C5FD" strokeWidth="1"/>
 <text x="160" y="94" fontSize="10" fill="#3B82F6" fontFamily="system-ui" fontWeight="600" textAnchor="middle">Data Processing</text>
 <TextLine x={90} y={102} width={140} color="#93C5FD"/>
 <rect x="50" y="122" width="220" height="38" rx="8" fill="#3B82F6" opacity="0.1" stroke="#3B82F6" strokeWidth="1"/>
 <text x="160" y="140" fontSize="10" fill="#3B82F6" fontFamily="system-ui" fontWeight="600" textAnchor="middle">Data Lake / Lakehouse</text>
 <TextLine x={90} y={148} width={140} color="#93C5FD"/>
 <rect x="50" y="168" width="220" height="38" rx="8" fill="#F9FAFB" stroke="#E5E7EB" strokeWidth="1"/>
 <text x="160" y="186" fontSize="10" fill="#6B7280" fontFamily="system-ui" fontWeight="600" textAnchor="middle">Data Sources</text>
 <TextLine x={90} y={194} width={140} />
 {/* Arrows between layers */}
 <path d="M160 68 L160 76" stroke="#3B82F6" strokeWidth="1.5" markerEnd="url(#arrowDP)"/>
 <path d="M160 114 L160 122" stroke="#3B82F6" strokeWidth="1.5" markerEnd="url(#arrowDP)"/>
 <path d="M160 160 L160 168" stroke="#9CA3AF" strokeWidth="1.5" markerEnd="url(#arrowDPg)"/>
 <defs>
 <marker id="arrowDP" viewBox="0 0 6 6" refX="5" refY="3" markerWidth="6" markerHeight="6" orient="auto">
 <path d="M0 0L6 3L0 6Z" fill="#3B82F6"/>
 </marker>
 <marker id="arrowDPg" viewBox="0 0 6 6" refX="5" refY="3" markerWidth="6" markerHeight="6" orient="auto">
 <path d="M0 0L6 3L0 6Z" fill="#9CA3AF"/>
 </marker>
 </defs>
 </svg>
);

// ─── PROCESS AUTOMATION ───
// Shows automated workflow with gears and connected steps
export const ProcessAutomation = () => (
 <svg viewBox="0 0 320 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
 {/* Workflow steps */}
 <rect x="25" y="70" width="70" height="55" rx="8" fill="white" stroke="#E5E7EB" strokeWidth="1.5"/>
 <circle cx="60" cy="86" r="10" fill="#DBEAFE"/>
 <TextLine x={35} y={104} width={50} color="#374151"/>
 <TextLine x={40} y={114} width={40} />
 <path d="M95 97 L115 97" stroke="#93C5FD" strokeWidth="2" markerEnd="url(#arrowPA)"/>
 {/* Gear/automation icon in middle */}
 <rect x="115" y="65" width="90" height="65" rx="10" fill="#DBEAFE" stroke="#3B82F6" strokeWidth="1.5"/>
 <g transform="translate(145, 82)">
 <circle cx="15" cy="15" r="12" fill="none" stroke="#3B82F6" strokeWidth="2"/>
 <circle cx="15" cy="15" r="5" fill="#3B82F6"/>
 {/* Gear teeth */}
 <rect x="12" y="0" width="6" height="6" rx="1" fill="#3B82F6"/>
 <rect x="12" y="24" width="6" height="6" rx="1" fill="#3B82F6"/>
 <rect x="0" y="12" width="6" height="6" rx="1" fill="#3B82F6"/>
 <rect x="24" y="12" width="6" height="6" rx="1" fill="#3B82F6"/>
 </g>
 <text x="160" y="120" fontSize="8" fill="#3B82F6" fontFamily="system-ui" fontWeight="600" textAnchor="middle">Automate</text>
 <path d="M205 97 L225 97" stroke="#93C5FD" strokeWidth="2" markerEnd="url(#arrowPA)"/>
 {/* Output */}
 <rect x="225" y="70" width="70" height="55" rx="8" fill="white" stroke="#E5E7EB" strokeWidth="1.5"/>
 <circle cx="260" cy="86" r="10" fill="#DCFCE7"/>
 <path d="M256 86l3 3 5-6" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
 <TextLine x={235} y={104} width={50} color="#374151"/>
 <TextLine x={240} y={114} width={40} />
 {/* Bottom stats */}
 <rect x="60" y="150" width="200" height="35" rx="8" fill="#F9FAFB"/>
 <text x="100" y="170" fontSize="14" fill="#3B82F6" fontFamily="system-ui" fontWeight="700">85%</text>
 <TextLine x={130} y={166} width={40} />
 <rect x="180" y="155" width="1" height="25" fill="#E5E7EB"/>
 <text x="195" y="170" fontSize="14" fill="#10B981" fontFamily="system-ui" fontWeight="700">3x</text>
 <TextLine x={218} y={166} width={30} />
 <defs>
 <marker id="arrowPA" viewBox="0 0 6 6" refX="5" refY="3" markerWidth="6" markerHeight="6" orient="auto">
 <path d="M0 0L6 3L0 6Z" fill="#93C5FD"/>
 </marker>
 </defs>
 </svg>
);

// ─── INTEGRATION PROGRAMS ───
// Shows connected systems / API mesh
export const IntegrationPrograms = () => (
 <svg viewBox="0 0 320 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
 {/* Central API hub */}
 <circle cx="160" cy="110" r="30" fill="#DBEAFE" stroke="#3B82F6" strokeWidth="1.5"/>
 <text x="160" y="107" fontSize="10" fill="#3B82F6" fontFamily="system-ui" fontWeight="700" textAnchor="middle">API</text>
 <text x="160" y="119" fontSize="8" fill="#93C5FD" fontFamily="system-ui" textAnchor="middle">Gateway</text>
 {/* System nodes */}
 <rect x="20" y="35" width="65" height="35" rx="6" fill="white" stroke="#E5E7EB" strokeWidth="1.5"/>
 <TextLine x={28} y={48} width={50} color="#374151"/>
 <TextLine x={28} y={60} width={35} />
 <rect x="235" y="35" width="65" height="35" rx="6" fill="white" stroke="#E5E7EB" strokeWidth="1.5"/>
 <TextLine x={243} y={48} width={50} color="#374151"/>
 <TextLine x={243} y={60} width={35} />
 <rect x="20" y="150" width="65" height="35" rx="6" fill="white" stroke="#E5E7EB" strokeWidth="1.5"/>
 <TextLine x={28} y={163} width={50} color="#374151"/>
 <TextLine x={28} y={175} width={35} />
 <rect x="235" y="150" width="65" height="35" rx="6" fill="white" stroke="#E5E7EB" strokeWidth="1.5"/>
 <TextLine x={243} y={163} width={50} color="#374151"/>
 <TextLine x={243} y={175} width={35} />
 {/* Connection lines */}
 <line x1="85" y1="52" x2="132" y2="95" stroke="#93C5FD" strokeWidth="1.5" strokeDasharray="4 3"/>
 <line x1="235" y1="52" x2="188" y2="95" stroke="#93C5FD" strokeWidth="1.5" strokeDasharray="4 3"/>
 <line x1="85" y1="167" x2="132" y2="125" stroke="#93C5FD" strokeWidth="1.5" strokeDasharray="4 3"/>
 <line x1="235" y1="167" x2="188" y2="125" stroke="#93C5FD" strokeWidth="1.5" strokeDasharray="4 3"/>
 {/* Data flow indicators */}
 <circle cx="108" cy="74" r="4" fill="#3B82F6" opacity="0.6"/>
 <circle cx="212" cy="74" r="4" fill="#3B82F6" opacity="0.6"/>
 <circle cx="108" cy="146" r="4" fill="#3B82F6" opacity="0.6"/>
 <circle cx="212" cy="146" r="4" fill="#3B82F6" opacity="0.6"/>
 </svg>
);

// ─── AI & DATA POD ───
// Shows a data science workspace with charts and metrics
export const AIDataPod = () => (
 <svg viewBox="0 0 320 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
 <rect x="30" y="25" width="260" height="170" rx="12" fill="white" filter="url(#shadowADP)"/>
 {/* Team avatars */}
 <Avatar cx={55} cy={48} r={12} />
 <Avatar cx={78} cy={48} r={12} />
 <Avatar cx={101} cy={48} r={12} />
 <Avatar cx={124} cy={48} r={12} color="#7C3AED"/>
 <circle cx="147" cy="48" r="12" fill="#F3F4F6"/>
 <text x="147" y="52" fontSize="9" fill="#9CA3AF" fontFamily="system-ui" textAnchor="middle">+3</text>
 <line x1="30" y1="68" x2="290" y2="68" stroke="#E5E7EB" strokeWidth="1"/>
 {/* Chart area */}
 <rect x="42" y="78" width="130" height="80" rx="6" fill="#F9FAFB"/>
 {/* Scatter plot dots */}
 <circle cx="62" cy="140" r="4" fill="#3B82F6" opacity="0.6"/>
 <circle cx="78" cy="125" r="5" fill="#3B82F6" opacity="0.7"/>
 <circle cx="95" cy="132" r="3" fill="#3B82F6" opacity="0.5"/>
 <circle cx="108" cy="108" r="6" fill="#3B82F6" opacity="0.8"/>
 <circle cx="125" cy="115" r="4" fill="#3B82F6" opacity="0.6"/>
 <circle cx="140" cy="98" r="5" fill="#3B82F6"/>
 <circle cx="155" cy="92" r="4" fill="#3B82F6" opacity="0.7"/>
 {/* Trend line */}
 <line x1="55" y1="145" x2="165" y2="88" stroke="#3B82F6" strokeWidth="1.5" strokeDasharray="4 2"/>
 {/* Side metrics */}
 <TextLine x={185} y={82} width={50} color="#374151"/>
 <text x="185" y="102" fontSize="18" fill="#3B82F6" fontFamily="system-ui" fontWeight="700">94.7%</text>
 <TextLine x={185} y={115} width={60} />
 <TextLine x={185} y={132} width={50} color="#374151"/>
 <text x="185" y="152" fontSize="18" fill="#10B981" fontFamily="system-ui" fontWeight="700">↑ 23%</text>
 <TextLine x={185} y={165} width={55} />
 <defs>
 <filter id="shadowADP"><feDropShadow dx="0" dy="2" stdDeviation="6" floodOpacity="0.06"/></filter>
 </defs>
 </svg>
);

// ─── ENGINEERING POD ───
// Shows a terminal / dev tools interface
export const EngineeringPod = () => (
 <svg viewBox="0 0 320 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
 <rect x="30" y="25" width="260" height="170" rx="12" fill="white" filter="url(#shadowEP)"/>
 {/* Team bar */}
 <Avatar cx={55} cy={46} r={11} color="#10B981"/>
 <Avatar cx={76} cy={46} r={11} color="#3B82F6"/>
 <Avatar cx={97} cy={46} r={11} color="#7C3AED"/>
 <Avatar cx={118} cy={46} r={11} color="#F59E0B"/>
 <Badge x={140} y={36} text="Sprint 14" color="#3B82F6"/>
 <line x1="30" y1="64" x2="290" y2="64" stroke="#E5E7EB" strokeWidth="1"/>
 {/* PR cards */}
 <rect x="42" y="74" width="236" height="32" rx="6" fill="#F9FAFB"/>
 <circle cx="56" cy="90" r="6" fill="#DCFCE7"/>
 <path d="M53 90l2 2 4-5" stroke="#10B981" strokeWidth="1.2" strokeLinecap="round"/>
 <TextLine x={68} y={84} width={120} color="#374151"/>
 <TextLine x={68} y={96} width={80} />
 <Badge x={220} y={80} text="Merged" color="#10B981"/>
 <rect x="42" y="114" width="236" height="32" rx="6" fill="#F9FAFB"/>
 <circle cx="56" cy="130" r="6" fill="#FEF3C7"/>
 <circle cx="56" cy="130" r="2.5" fill="#F59E0B"/>
 <TextLine x={68} y={124} width={110} color="#374151"/>
 <TextLine x={68} y={136} width={90} />
 <Badge x={210} y={120} text="In Review" color="#F59E0B"/>
 <rect x="42" y="154" width="236" height="32" rx="6" fill="#F9FAFB"/>
 <circle cx="56" cy="170" r="6" fill="#DBEAFE"/>
 <circle cx="56" cy="170" r="2.5" fill="#3B82F6"/>
 <TextLine x={68} y={164} width={130} color="#374151"/>
 <TextLine x={68} y={176} width={70} />
 <Badge x={220} y={160} text="Open" color="#3B82F6"/>
 <defs>
 <filter id="shadowEP"><feDropShadow dx="0" dy="2" stdDeviation="6" floodOpacity="0.06"/></filter>
 </defs>
 </svg>
);

// ─── TRANSFORMATION POD ───
// Shows a Kanban board / project management interface
export const TransformationPod = () => (
 <svg viewBox="0 0 320 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
 <rect x="25" y="25" width="270" height="170" rx="12" fill="white" filter="url(#shadowTP)"/>
 {/* Column headers */}
 <text x="68" y="46" fontSize="9" fill="#9CA3AF" fontFamily="system-ui" fontWeight="600" textAnchor="middle" letterSpacing="1">PLANNED</text>
 <text x="160" y="46" fontSize="9" fill="#9CA3AF" fontFamily="system-ui" fontWeight="600" textAnchor="middle" letterSpacing="1">IN PROGRESS</text>
 <text x="252" y="46" fontSize="9" fill="#9CA3AF" fontFamily="system-ui" fontWeight="600" textAnchor="middle" letterSpacing="1">COMPLETE</text>
 <line x1="25" y1="55" x2="295" y2="55" stroke="#E5E7EB" strokeWidth="1"/>
 <line x1="115" y1="55" x2="115" y2="195" stroke="#E5E7EB" strokeWidth="1"/>
 <line x1="205" y1="55" x2="205" y2="195" stroke="#E5E7EB" strokeWidth="1"/>
 {/* Planned column cards */}
 <rect x="35" y="62" width="70" height="35" rx="5" fill="#F9FAFB"/>
 <TextLine x={41} y={72} width={55} color="#374151"/>
 <TextLine x={41} y={84} width={40} />
 <rect x="35" y="104" width="70" height="35" rx="5" fill="#F9FAFB"/>
 <TextLine x={41} y={114} width={50} color="#374151"/>
 <TextLine x={41} y={126} width={45} />
 <rect x="35" y="146" width="70" height="35" rx="5" fill="#F9FAFB"/>
 <TextLine x={41} y={156} width={48} color="#374151"/>
 <TextLine x={41} y={168} width={35} />
 {/* In Progress column */}
 <rect x="125" y="62" width="70" height="35" rx="5" fill="#DBEAFE"/>
 <TextLine x={131} y={72} width={55} color="#3B82F6"/>
 <TextLine x={131} y={84} width={40} color="#93C5FD"/>
 <rect x="125" y="104" width="70" height="35" rx="5" fill="#DBEAFE"/>
 <TextLine x={131} y={114} width={50} color="#3B82F6"/>
 <TextLine x={131} y={126} width={45} color="#93C5FD"/>
 {/* Complete column */}
 <rect x="215" y="62" width="70" height="35" rx="5" fill="#DCFCE7"/>
 <TextLine x={221} y={72} width={55} color="#10B981"/>
 <TextLine x={221} y={84} width={40} color="#86EFAC"/>
 <rect x="215" y="104" width="70" height="35" rx="5" fill="#DCFCE7"/>
 <TextLine x={221} y={114} width={50} color="#10B981"/>
 <TextLine x={221} y={126} width={42} color="#86EFAC"/>
 <rect x="215" y="146" width="70" height="35" rx="5" fill="#DCFCE7"/>
 <TextLine x={221} y={156} width={48} color="#10B981"/>
 <TextLine x={221} y={168} width={38} color="#86EFAC"/>
 <defs>
 <filter id="shadowTP"><feDropShadow dx="0" dy="2" stdDeviation="6" floodOpacity="0.06"/></filter>
 </defs>
 </svg>
);

// ─── ARCHITECTURE POD ───
// Shows a system architecture diagram / blueprint
export const ArchitecturePod = () => (
 <svg viewBox="0 0 320 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
 <rect x="25" y="25" width="270" height="170" rx="12" fill="white" filter="url(#shadowAP)"/>
 {/* Blueprint grid subtle */}
 <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
 <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#E5E7EB" strokeWidth="0.5" opacity="0.5"/>
 </pattern>
 <rect x="25" y="25" width="270" height="170" rx="12" fill="url(#grid)"/>
 {/* Architecture boxes */}
 <rect x="105" y="38" width="110" height="30" rx="6" fill="#DBEAFE" stroke="#3B82F6" strokeWidth="1"/>
 <text x="160" y="57" fontSize="9" fill="#3B82F6" fontFamily="system-ui" fontWeight="600" textAnchor="middle">Presentation Layer</text>
 <rect x="45" y="82" width="100" height="30" rx="6" fill="#93C5FD" opacity="0.25" stroke="#3B82F6" strokeWidth="1"/>
 <text x="95" y="101" fontSize="9" fill="#3B82F6" fontFamily="system-ui" fontWeight="600" textAnchor="middle">API Gateway</text>
 <rect x="175" y="82" width="100" height="30" rx="6" fill="#93C5FD" opacity="0.25" stroke="#3B82F6" strokeWidth="1"/>
 <text x="225" y="101" fontSize="9" fill="#3B82F6" fontFamily="system-ui" fontWeight="600" textAnchor="middle">Auth Service</text>
 <rect x="45" y="126" width="65" height="30" rx="6" fill="#3B82F6" opacity="0.1" stroke="#93C5FD" strokeWidth="1"/>
 <text x="77" y="145" fontSize="8" fill="#3B82F6" fontFamily="system-ui" fontWeight="500" textAnchor="middle">Service A</text>
 <rect x="128" y="126" width="65" height="30" rx="6" fill="#3B82F6" opacity="0.1" stroke="#93C5FD" strokeWidth="1"/>
 <text x="160" y="145" fontSize="8" fill="#3B82F6" fontFamily="system-ui" fontWeight="500" textAnchor="middle">Service B</text>
 <rect x="210" y="126" width="65" height="30" rx="6" fill="#3B82F6" opacity="0.1" stroke="#93C5FD" strokeWidth="1"/>
 <text x="242" y="145" fontSize="8" fill="#3B82F6" fontFamily="system-ui" fontWeight="500" textAnchor="middle">Service C</text>
 <rect x="105" y="170" width="110" height="20" rx="6" fill="#F9FAFB" stroke="#E5E7EB" strokeWidth="1"/>
 <text x="160" y="184" fontSize="8" fill="#6B7280" fontFamily="system-ui" fontWeight="500" textAnchor="middle">Database Layer</text>
 {/* Arrows */}
 <line x1="160" y1="68" x2="95" y2="82" stroke="#93C5FD" strokeWidth="1"/>
 <line x1="160" y1="68" x2="225" y2="82" stroke="#93C5FD" strokeWidth="1"/>
 <line x1="95" y1="112" x2="77" y2="126" stroke="#93C5FD" strokeWidth="1"/>
 <line x1="95" y1="112" x2="160" y2="126" stroke="#93C5FD" strokeWidth="1"/>
 <line x1="225" y1="112" x2="242" y2="126" stroke="#93C5FD" strokeWidth="1"/>
 <line x1="160" y1="156" x2="160" y2="170" stroke="#9CA3AF" strokeWidth="1" strokeDasharray="3 2"/>
 <line x1="77" y1="156" x2="130" y2="170" stroke="#9CA3AF" strokeWidth="1" strokeDasharray="3 2"/>
 <line x1="242" y1="156" x2="190" y2="170" stroke="#9CA3AF" strokeWidth="1" strokeDasharray="3 2"/>
 <defs>
 <filter id="shadowAP"><feDropShadow dx="0" dy="2" stdDeviation="6" floodOpacity="0.06"/></filter>
 </defs>
 </svg>
);

// ─── ILLUSTRATION MAP ───
export type IllustrationKey =
 |"gcc-setup-launch"
 |"talent-leadership"
 |"talent-management"
 |"technology-foundation"
 |"technology-infrastructure"
 |"ai-first-gcc"
 |"operations-excellence"
 |"compliance-governance"
 |"ai-advisory-strategy"
 |"ai-gcc-setup-operations"
 |"enterprise-generative-ai"
 |"data-engineering"
 |"mlops-llmops"
 |"responsible-ai"
 |"product-engineering"
 |"data-platform"
 |"process-automation"
 |"integration-programs"
 |"ai-data-pod"
 |"engineering-pod"
 |"transformation-pod"
 |"architecture-pod";

export const illustrationMap: Record<IllustrationKey, React.FC> = {
"gcc-setup-launch": GCCSetupLaunch,
"talent-leadership": TalentLeadership,
"talent-management": TalentLeadership, // Same visual candidate profiles
"technology-foundation": TechnologyFoundation,
"technology-infrastructure": TechnologyFoundation, // Same visual infra diagram
"ai-first-gcc": AIFirstGCC,
"operations-excellence": OperationsExcellence,
"compliance-governance": ComplianceGovernance,
"ai-advisory-strategy": AIAdvisoryStrategy,
"ai-gcc-setup-operations": AIGCCSetupOperations,
"enterprise-generative-ai": EnterpriseGenerativeAI,
"data-engineering": DataEngineering,
"mlops-llmops": MLOpsLLMOps,
"responsible-ai": ResponsibleAI,
"product-engineering": ProductEngineering,
"data-platform": DataPlatform,
"process-automation": ProcessAutomation,
"integration-programs": IntegrationPrograms,
"ai-data-pod": AIDataPod,
"engineering-pod": EngineeringPod,
"transformation-pod": TransformationPod,
"architecture-pod": ArchitecturePod,
};

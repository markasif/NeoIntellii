"use client";

import React from "react";
import { motion } from "framer-motion";

export interface DataCapabilityItem {
  title: string;
  body?: string;
  desc?: string;
  image?: string;
}

// 1. Data Platform Architecture Visual
function DataPlatformArchVisual() {
  return (
    <div className="relative w-full h-full flex items-center justify-center select-none overflow-hidden bg-[#041126]">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-36 h-28 bg-[#169DC8]/20 rounded-full blur-2xl pointer-events-none" />
      <svg viewBox="0 0 240 140" fill="none" className="w-[88%] h-[88%] overflow-visible pointer-events-none">
        <defs>
          <linearGradient id="dpa-tier1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0D306C" />
            <stop offset="100%" stopColor="#071D42" />
          </linearGradient>
          <linearGradient id="dpa-cyan" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#169DC8" />
            <stop offset="100%" stopColor="#38BDF8" />
          </linearGradient>
          <filter id="dpa-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* 3 Medallion Lakehouse Tiers */}
        <rect x="24" y="94" width="192" height="26" rx="6" fill="url(#dpa-tier1)" stroke="#169DC8" strokeOpacity="0.4" strokeWidth="1.2" />
        <rect x="36" y="58" width="168" height="26" rx="6" fill="url(#dpa-tier1)" stroke="#38BDF8" strokeOpacity="0.6" strokeWidth="1.2" />
        <rect x="48" y="22" width="144" height="26" rx="6" fill="#0D306C" stroke="#38BDF8" strokeWidth="1.5" />

        {/* Text Labels inside tiers */}
        <text x="120" y="111" textAnchor="middle" fill="#94A3B8" fontSize="9" fontWeight="700" fontFamily="monospace" letterSpacing="1.5">RAW / INGESTION</text>
        <text x="120" y="75" textAnchor="middle" fill="#38BDF8" fontSize="9" fontWeight="700" fontFamily="monospace" letterSpacing="1.5">TRANSFORMED / LAKEHOUSE</text>
        <text x="120" y="39" textAnchor="middle" fill="#FFFFFF" fontSize="9.5" fontWeight="800" fontFamily="monospace" letterSpacing="1.5">AI-READY PRODUCTS</text>

        {/* Vertical Data Flow Connectors */}
        <line x1="70" y1="94" x2="70" y2="84" stroke="url(#dpa-cyan)" strokeWidth="2" strokeDasharray="3 3" />
        <line x1="120" y1="94" x2="120" y2="84" stroke="url(#dpa-cyan)" strokeWidth="2" strokeDasharray="3 3" />
        <line x1="170" y1="94" x2="170" y2="84" stroke="url(#dpa-cyan)" strokeWidth="2" strokeDasharray="3 3" />

        <line x1="85" y1="58" x2="85" y2="48" stroke="url(#dpa-cyan)" strokeWidth="2" strokeDasharray="3 3" />
        <line x1="120" y1="58" x2="120" y2="48" stroke="url(#dpa-cyan)" strokeWidth="2" strokeDasharray="3 3" />
        <line x1="155" y1="58" x2="155" y2="48" stroke="url(#dpa-cyan)" strokeWidth="2" strokeDasharray="3 3" />

        {/* Luminous Pulsing Nodes */}
        <circle cx="120" cy="22" r="3.5" fill="#38BDF8" filter="url(#dpa-glow)" />
      </svg>
    </div>
  );
}

// 2. Batch and Streaming Visual
function BatchStreamingVisual() {
  return (
    <div className="relative w-full h-full flex items-center justify-center select-none overflow-hidden bg-[#041126]">
      <div className="absolute top-1/2 left-1/3 w-32 h-32 bg-[#38BDF8]/15 rounded-full blur-2xl pointer-events-none" />
      <svg viewBox="0 0 240 140" fill="none" className="w-[88%] h-[88%] overflow-visible pointer-events-none">
        <defs>
          <linearGradient id="bs-stream-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0D306C" />
            <stop offset="50%" stopColor="#169DC8" />
            <stop offset="100%" stopColor="#38BDF8" />
          </linearGradient>
          <filter id="bs-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Top: Streaming Sine Wave */}
        <path d="M 20,42 Q 55,18 90,42 T 160,42 T 220,42" stroke="url(#bs-stream-grad)" strokeWidth="3" strokeLinecap="round" filter="url(#bs-glow)" />
        <circle cx="90" cy="42" r="4" fill="#38BDF8" filter="url(#bs-glow)" />
        <circle cx="160" cy="42" r="4" fill="#38BDF8" filter="url(#bs-glow)" />
        <text x="25" y="24" fill="#38BDF8" fontSize="8.5" fontWeight="700" fontFamily="monospace" letterSpacing="1">REAL-TIME STREAMING (KAFKA)</text>

        {/* Bottom: Scheduled Batch Blocks */}
        <text x="25" y="80" fill="#94A3B8" fontSize="8.5" fontWeight="700" fontFamily="monospace" letterSpacing="1">SCHEDULED BATCH PIPELINE</text>
        <g transform="translate(20, 92)">
          <rect x="0" y="0" width="38" height="24" rx="4" fill="#0D306C" stroke="#169DC8" strokeWidth="1.2" />
          <text x="19" y="15" textAnchor="middle" fill="#FFFFFF" fontSize="8" fontWeight="600" fontFamily="monospace">00:00</text>
          
          <rect x="52" y="0" width="38" height="24" rx="4" fill="#0D306C" stroke="#169DC8" strokeWidth="1.2" />
          <text x="71" y="15" textAnchor="middle" fill="#FFFFFF" fontSize="8" fontWeight="600" fontFamily="monospace">06:00</text>
          
          <rect x="104" y="0" width="38" height="24" rx="4" fill="#0D306C" stroke="#169DC8" strokeWidth="1.2" />
          <text x="123" y="15" textAnchor="middle" fill="#FFFFFF" fontSize="8" fontWeight="600" fontFamily="monospace">12:00</text>

          <rect x="156" y="0" width="38" height="24" rx="4" fill="#071D42" stroke="#38BDF8" strokeWidth="1.5" />
          <text x="175" y="15" textAnchor="middle" fill="#38BDF8" fontSize="8" fontWeight="700" fontFamily="monospace">18:00</text>
        </g>
      </svg>
    </div>
  );
}

// 3. AI-Ready Data Products Visual
function DataProductsVisual() {
  return (
    <div className="relative w-full h-full flex items-center justify-center select-none overflow-hidden bg-[#041126]">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-[#169DC8]/20 rounded-full blur-2xl pointer-events-none" />
      <svg viewBox="0 0 240 140" fill="none" className="w-[88%] h-[88%] overflow-visible pointer-events-none">
        <defs>
          <linearGradient id="dp-card-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#082247" />
            <stop offset="100%" stopColor="#051630" />
          </linearGradient>
          <filter id="dp-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* 2 Data Product Package Cards */}
        <g transform="translate(18, 16)">
          <rect x="0" y="0" width="96" height="106" rx="8" fill="url(#dp-card-grad)" stroke="#169DC8" strokeOpacity="0.6" strokeWidth="1.3" />
          <rect x="8" y="10" width="80" height="16" rx="3" fill="#0D306C" />
          <text x="48" y="21" textAnchor="middle" fill="#38BDF8" fontSize="7.5" fontWeight="700" fontFamily="monospace">CUSTOMER_360</text>
          
          {/* Metadata pill badges */}
          <rect x="8" y="34" width="46" height="12" rx="2" fill="#169DC8" fillOpacity="0.2" />
          <text x="31" y="42.5" textAnchor="middle" fill="#38BDF8" fontSize="6.5" fontWeight="700">v2.4.0</text>
          
          <rect x="8" y="52" width="60" height="12" rx="2" fill="#10B981" fillOpacity="0.2" />
          <text x="38" y="60.5" textAnchor="middle" fill="#34D399" fontSize="6.5" fontWeight="700">CONTRACT: PASS</text>
          
          <line x1="8" y1="76" x2="88" y2="76" stroke="#169DC8" strokeOpacity="0.3" strokeDasharray="2 2" />
          <text x="48" y="93" textAnchor="middle" fill="#94A3B8" fontSize="7" fontWeight="600">SLA: 99.99%</text>
        </g>

        <g transform="translate(126, 16)">
          <rect x="0" y="0" width="96" height="106" rx="8" fill="url(#dp-card-grad)" stroke="#38BDF8" strokeWidth="1.5" />
          <rect x="8" y="10" width="80" height="16" rx="3" fill="#0D306C" />
          <text x="48" y="21" textAnchor="middle" fill="#38BDF8" fontSize="7.5" fontWeight="700" fontFamily="monospace">FINANCIAL_TXN</text>
          
          {/* Metadata pill badges */}
          <rect x="8" y="34" width="46" height="12" rx="2" fill="#169DC8" fillOpacity="0.2" />
          <text x="31" y="42.5" textAnchor="middle" fill="#38BDF8" fontSize="6.5" fontWeight="700">v4.1.0</text>
          
          <rect x="8" y="52" width="60" height="12" rx="2" fill="#10B981" fillOpacity="0.2" />
          <text x="38" y="60.5" textAnchor="middle" fill="#34D399" fontSize="6.5" fontWeight="700">LINEAGE: OWNED</text>
          
          <line x1="8" y1="76" x2="88" y2="76" stroke="#38BDF8" strokeOpacity="0.3" strokeDasharray="2 2" />
          <text x="48" y="93" textAnchor="middle" fill="#38BDF8" fontSize="7" fontWeight="700">REUSABLE ML SET</text>
        </g>
      </svg>
    </div>
  );
}

// 4. RAG and Unstructured Data Foundation Visual
function RagFoundationVisual() {
  return (
    <div className="relative w-full h-full flex items-center justify-center select-none overflow-hidden bg-[#041126]">
      <div className="absolute top-1/2 left-2/3 w-32 h-32 bg-[#38BDF8]/15 rounded-full blur-2xl pointer-events-none" />
      <svg viewBox="0 0 240 140" fill="none" className="w-[88%] h-[88%] overflow-visible pointer-events-none">
        <defs>
          <filter id="rag-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Left: Unstructured Document */}
        <g transform="translate(20, 26)">
          <rect x="0" y="0" width="44" height="60" rx="4" fill="#0D306C" stroke="#169DC8" strokeWidth="1.2" />
          <line x1="8" y1="12" x2="36" y2="12" stroke="#38BDF8" strokeWidth="1.5" />
          <line x1="8" y1="22" x2="30" y2="22" stroke="#94A3B8" strokeWidth="1.5" />
          <line x1="8" y1="32" x2="36" y2="32" stroke="#94A3B8" strokeWidth="1.5" />
          <line x1="8" y1="42" x2="24" y2="42" stroke="#94A3B8" strokeWidth="1.5" />
          <text x="22" y="78" textAnchor="middle" fill="#94A3B8" fontSize="7.5" fontWeight="700" fontFamily="monospace">DOCS / PDF</text>
        </g>

        {/* Arrow to Chunking */}
        <path d="M 72,56 L 90,56" stroke="#38BDF8" strokeWidth="1.8" markerEnd="url(#arrow)" />

        {/* Center: Chunks */}
        <g transform="translate(98, 26)">
          <rect x="0" y="0" width="34" height="16" rx="3" fill="#082247" stroke="#38BDF8" strokeWidth="1" />
          <rect x="0" y="22" width="34" height="16" rx="3" fill="#082247" stroke="#38BDF8" strokeWidth="1" />
          <rect x="0" y="44" width="34" height="16" rx="3" fill="#082247" stroke="#38BDF8" strokeWidth="1" />
          <text x="17" y="78" textAnchor="middle" fill="#38BDF8" fontSize="7.5" fontWeight="700" fontFamily="monospace">CHUNKS</text>
        </g>

        {/* Arrow to Embedding Vectors */}
        <path d="M 140,56 L 158,56" stroke="#38BDF8" strokeWidth="1.8" />

        {/* Right: Vector Store Embeddings */}
        <g transform="translate(166, 20)">
          <rect x="0" y="0" width="54" height="72" rx="6" fill="#071D42" stroke="#38BDF8" strokeWidth="1.5" />
          <circle cx="18" cy="20" r="3" fill="#38BDF8" filter="url(#rag-glow)" />
          <circle cx="36" cy="28" r="3" fill="#169DC8" />
          <circle cx="24" cy="44" r="3" fill="#38BDF8" filter="url(#rag-glow)" />
          <circle cx="40" cy="54" r="3" fill="#00E5FF" />
          <line x1="18" y1="20" x2="36" y2="28" stroke="#169DC8" strokeOpacity="0.6" strokeWidth="1" />
          <line x1="36" y1="28" x2="24" y2="44" stroke="#169DC8" strokeOpacity="0.6" strokeWidth="1" />
          <text x="27" y="84" textAnchor="middle" fill="#FFFFFF" fontSize="7.5" fontWeight="800" fontFamily="monospace">VECTORS</text>
        </g>
      </svg>
    </div>
  );
}

// 5. Evaluation Datasets Visual
function EvaluationDatasetsVisual() {
  return (
    <div className="relative w-full h-full flex items-center justify-center select-none overflow-hidden bg-[#041126]">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-[#10B981]/15 rounded-full blur-2xl pointer-events-none" />
      <svg viewBox="0 0 240 140" fill="none" className="w-[88%] h-[88%] overflow-visible pointer-events-none">
        <defs>
          <filter id="eval-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Golden Benchmark Card */}
        <g transform="translate(24, 18)">
          <rect x="0" y="0" width="192" height="104" rx="8" fill="#082247" stroke="#169DC8" strokeOpacity="0.5" strokeWidth="1.2" />
          
          <rect x="12" y="12" width="168" height="22" rx="4" fill="#0D306C" />
          <text x="20" y="26.5" fill="#38BDF8" fontSize="8.5" fontWeight="800" fontFamily="monospace">GOLDEN_EVAL_SUITE_v3</text>
          <rect x="136" y="15" width="40" height="16" rx="3" fill="#10B981" />
          <text x="156" y="26.5" textAnchor="middle" fill="#FFFFFF" fontSize="7.5" fontWeight="800">PASSED</text>

          {/* Test Metrics Rows */}
          <g transform="translate(12, 44)">
            <text x="0" y="10" fill="#94A3B8" fontSize="8" fontWeight="600">RAG Groundedness</text>
            <rect x="94" y="2" width="74" height="8" rx="2" fill="#041126" />
            <rect x="94" y="2" width="70" height="8" rx="2" fill="#38BDF8" />

            <text x="0" y="28" fill="#94A3B8" fontSize="8" fontWeight="600">Context Precision</text>
            <rect x="94" y="20" width="74" height="8" rx="2" fill="#041126" />
            <rect x="94" y="20" width="67" height="8" rx="2" fill="#169DC8" />

            <text x="0" y="46" fill="#94A3B8" fontSize="8" fontWeight="600">Answer Relevance</text>
            <rect x="94" y="38" width="74" height="8" rx="2" fill="#041126" />
            <rect x="94" y="38" width="72" height="8" rx="2" fill="#10B981" />
          </g>
        </g>
      </svg>
    </div>
  );
}

// 6. Feature and Vector Infrastructure Visual
function FeatureVectorVisual() {
  return (
    <div className="relative w-full h-full flex items-center justify-center select-none overflow-hidden bg-[#041126]">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-36 h-32 bg-[#38BDF8]/15 rounded-full blur-2xl pointer-events-none" />
      <svg viewBox="0 0 240 140" fill="none" className="w-[88%] h-[88%] overflow-visible pointer-events-none">
        <defs>
          <filter id="fv-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* 3D Isometric Coordinate / Feature Grid */}
        <path d="M 40,70 L 120,24 L 200,70 L 120,116 Z" stroke="#169DC8" strokeOpacity="0.4" strokeWidth="1.2" fill="#0D306C" fillOpacity="0.4" />
        <path d="M 40,70 L 120,70 L 200,70" stroke="#169DC8" strokeOpacity="0.3" strokeDasharray="3 3" />
        <path d="M 120,24 L 120,116" stroke="#169DC8" strokeOpacity="0.3" strokeDasharray="3 3" />

        {/* Feature & Vector Cluster Nodes */}
        <circle cx="95" cy="55" r="4.5" fill="#38BDF8" filter="url(#fv-glow)" />
        <circle cx="145" cy="48" r="4" fill="#00E5FF" filter="url(#fv-glow)" />
        <circle cx="130" cy="85" r="5" fill="#38BDF8" filter="url(#fv-glow)" />
        <circle cx="75" cy="78" r="3.5" fill="#169DC8" />
        <circle cx="165" cy="72" r="3.5" fill="#169DC8" />

        {/* Connection rays */}
        <line x1="95" y1="55" x2="145" y2="48" stroke="#38BDF8" strokeWidth="1.5" strokeOpacity="0.8" />
        <line x1="95" y1="55" x2="130" y2="85" stroke="#38BDF8" strokeWidth="1.5" strokeOpacity="0.8" />
        <line x1="145" y1="48" x2="130" y2="85" stroke="#38BDF8" strokeWidth="1.5" strokeOpacity="0.8" />

        <text x="120" y="130" textAnchor="middle" fill="#FFFFFF" fontSize="8.5" fontWeight="800" fontFamily="monospace" letterSpacing="1.2">
          LOW-LATENCY SERVING &lt;10ms
        </text>
      </svg>
    </div>
  );
}

// 7. Governance and Lineage Visual
function GovernanceLineageVisual() {
  return (
    <div className="relative w-full h-full flex items-center justify-center select-none overflow-hidden bg-[#041126]">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-[#169DC8]/20 rounded-full blur-2xl pointer-events-none" />
      <svg viewBox="0 0 240 140" fill="none" className="w-[88%] h-[88%] overflow-visible pointer-events-none">
        <defs>
          <filter id="gov-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Lineage Directed Acyclic Graph (DAG) */}
        {/* Source 1 */}
        <rect x="20" y="24" width="46" height="24" rx="4" fill="#0D306C" stroke="#169DC8" strokeWidth="1.2" />
        <text x="43" y="39" textAnchor="middle" fill="#94A3B8" fontSize="7.5" fontWeight="700" fontFamily="monospace">DB_SRC1</text>

        {/* Source 2 */}
        <rect x="20" y="76" width="46" height="24" rx="4" fill="#0D306C" stroke="#169DC8" strokeWidth="1.2" />
        <text x="43" y="91" textAnchor="middle" fill="#94A3B8" fontSize="7.5" fontWeight="700" fontFamily="monospace">API_SRC2</text>

        {/* Transform Node */}
        <rect x="96" y="50" width="52" height="26" rx="5" fill="#071D42" stroke="#38BDF8" strokeWidth="1.5" />
        <text x="122" y="66" textAnchor="middle" fill="#38BDF8" fontSize="8" fontWeight="800" fontFamily="monospace">TRANSFORM</text>

        {/* Model Target Node */}
        <rect x="176" y="50" width="46" height="26" rx="5" fill="#0D306C" stroke="#10B981" strokeWidth="1.5" />
        <text x="199" y="66" textAnchor="middle" fill="#FFFFFF" fontSize="8" fontWeight="800" fontFamily="monospace">AI MODEL</text>

        {/* Directed Lineage Paths */}
        <path d="M 66,36 C 80,36 85,63 96,63" stroke="#38BDF8" strokeWidth="1.8" />
        <path d="M 66,88 C 80,88 85,63 96,63" stroke="#38BDF8" strokeWidth="1.8" />
        <path d="M 148,63 L 176,63" stroke="#10B981" strokeWidth="2" />

        {/* Security / Lineage Audit Stamp */}
        <text x="120" y="112" textAnchor="middle" fill="#34D399" fontSize="8" fontWeight="700" fontFamily="monospace">
          ✓ DPDP AUDIT TRAIL VERIFIED
        </text>
      </svg>
    </div>
  );
}

// 8. Data FinOps Visual
function DataFinOpsVisual() {
  return (
    <div className="relative w-full h-full flex items-center justify-center select-none overflow-hidden bg-[#041126]">
      <div className="absolute bottom-0 right-1/4 w-32 h-32 bg-[#169DC8]/20 rounded-full blur-2xl pointer-events-none" />
      <svg viewBox="0 0 240 140" fill="none" className="w-[88%] h-[88%] overflow-visible pointer-events-none">
        <defs>
          <linearGradient id="fin-bar-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.95" />
            <stop offset="40%" stopColor="#169DC8" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#082247" stopOpacity="0.15" />
          </linearGradient>
          <linearGradient id="fin-line-grad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#008EC4" />
            <stop offset="100%" stopColor="#38BDF8" />
          </linearGradient>
          <filter id="fin-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* 4 ascending glowing pillars with rounded caps */}
        <rect x="25" y="85" width="22" height="42" rx="4" fill="url(#fin-bar-grad)" />
        <rect x="75" y="65" width="22" height="62" rx="4" fill="url(#fin-bar-grad)" />
        <rect x="125" y="42" width="22" height="85" rx="4" fill="url(#fin-bar-grad)" />
        <rect x="175" y="20" width="22" height="107" rx="4" fill="url(#fin-bar-grad)" />

        {/* Dynamic sweeping bezier curve trendline */}
        <path
          d="M 15,116 C 65,105 115,75 185,22"
          stroke="url(#fin-line-grad)"
          strokeWidth="3"
          strokeLinecap="round"
          filter="url(#fin-glow)"
        />

        {/* Luminous Apex Node */}
        <circle cx="185" cy="22" r="5" fill="#38BDF8" filter="url(#fin-glow)" />
        <circle cx="185" cy="22" r="2.5" fill="#FFFFFF" />

        <text x="36" y="132" fill="#94A3B8" fontSize="7" fontWeight="600" textAnchor="middle">STORAGE</text>
        <text x="86" y="132" fill="#94A3B8" fontSize="7" fontWeight="600" textAnchor="middle">COMPUTE</text>
        <text x="136" y="132" fill="#94A3B8" fontSize="7" fontWeight="600" textAnchor="middle">SERVING</text>
        <text x="186" y="132" fill="#38BDF8" fontSize="7" fontWeight="700" textAnchor="middle">ROI VALUE</text>
      </svg>
    </div>
  );
}

const CAPABILITY_VISUALS = [
  <DataPlatformArchVisual key="dpa" />,
  <BatchStreamingVisual key="bs" />,
  <DataProductsVisual key="dp" />,
  <RagFoundationVisual key="rag" />,
  <EvaluationDatasetsVisual key="eval" />,
  <FeatureVectorVisual key="fv" />,
  <GovernanceLineageVisual key="gov" />,
  <DataFinOpsVisual key="fin" />,
];

export interface DataCapabilitiesGridProps {
  items: DataCapabilityItem[];
  theme?: "navy" | "light";
  className?: string;
}

/**
 * DataCapabilitiesGrid - Renders Capabilities / Metrics with the exact visual
 * treatment of Operational Standards from GCC Operations Workplace IT & Security:
 * - 4-column responsive grid (4, 4, 4 layout)
 * - 16:10 rectangle visual frame on top with glow and hover-scale
 * - Supports custom images or interactive telemetry SVGs
 * - Fully supports both "navy" (default) and "light" editorial design tokens
 */
export default function DataCapabilitiesGrid({
  items,
  theme = "navy",
  className = "",
}: DataCapabilitiesGridProps) {
  const isLight = theme === "light";

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7 lg:gap-8 ${className}`}>
      {items.map((item, index) => {
        const visual = item.image ? (
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          CAPABILITY_VISUALS[index % CAPABILITY_VISUALS.length]
        );

        return (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: (index % 4) * 0.06 }}
            className="group flex flex-col text-left select-none"
          >
            {/* 1. Rectangle Image / Visual on Top */}
            <div
              className={`relative w-full aspect-[16/10] rounded-xl overflow-hidden mb-3.5 border transition-all duration-300 ${
                isLight
                  ? "border-[#CBD5E1]/80 bg-slate-100 shadow-[0_2px_12px_rgba(13,48,108,0.06)] group-hover:border-[#169DC8]/60 group-hover:shadow-[0_8px_25px_rgba(22,157,200,0.2)]"
                  : "border-white/10 bg-[#071D42]/60 shadow-[0_4px_20px_rgba(0,0,0,0.35)] group-hover:border-[#38BDF8]/40 group-hover:shadow-[0_8px_25px_rgba(56,189,248,0.2)]"
              }`}
            >
              {visual}
            </div>

            {/* 2. Heading Below Image */}
            <h3
              className={`font-extrabold text-[15.5px] sm:text-[17px] leading-snug tracking-tight transition-colors mb-2 font-manrope ${
                isLight
                  ? "text-[#0D244D] group-hover:text-[#008EC4]"
                  : "text-white group-hover:text-[#38BDF8]"
              }`}
            >
              {item.title}
            </h3>

            {/* 3. Description Below Heading */}
            <p
              className={`text-xs sm:text-[13px] leading-relaxed font-normal ${
                isLight ? "text-[#505D74]" : "text-[#94A3B8]"
              }`}
            >
              {item.body ?? item.desc}
            </p>
          </motion.div>
        );
      })}
    </div>
  );
}

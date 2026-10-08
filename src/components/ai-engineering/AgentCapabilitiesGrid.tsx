"use client";

import React from "react";
import { motion } from "framer-motion";

export interface AgentCapabilityItem {
  title: string;
  body: string;
  image?: string;
  imageAlt?: string;
}

export interface AgentCapabilitiesGridProps {
  items: AgentCapabilityItem[];
  theme?: "navy" | "light";
  className?: string;
}

// 1. Workflow Discovery and Automation Design Visual
function WorkflowDiscoveryVisual() {
  return (
    <div className="relative w-full h-full flex items-center justify-center select-none overflow-hidden bg-[#041126]">
      <div className="absolute top-1/2 left-1/3 w-32 h-32 bg-[#169DC8]/20 rounded-full blur-2xl pointer-events-none" />
      <svg viewBox="0 0 240 140" fill="none" className="w-[88%] h-[88%] overflow-visible pointer-events-none">
        <defs>
          <linearGradient id="wd-cyan" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="100%" stopColor="#008EC4" />
          </linearGradient>
          <filter id="wd-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Start Trigger Node */}
        <g transform="translate(16, 45)">
          <rect x="0" y="0" width="46" height="26" rx="6" fill="#0D306C" stroke="#38BDF8" strokeWidth="1.4" filter="url(#wd-glow)" />
          <text x="23" y="16.5" textAnchor="middle" fill="#FFFFFF" fontSize="8" fontWeight="800" fontFamily="monospace">PROCESS</text>
        </g>

        {/* Connecting Line to Decision Diamond */}
        <line x1="62" y1="58" x2="88" y2="58" stroke="#38BDF8" strokeWidth="1.8" strokeDasharray="3 3" />

        {/* Decision Diamond (Workflow Discovery) */}
        <g transform="translate(108, 58)">
          <polygon points="0,-22 24,0 0,22 -24,0" fill="#071D42" stroke="#38BDF8" strokeWidth="1.5" />
          <text x="0" y="3" textAnchor="middle" fill="#38BDF8" fontSize="6.5" fontWeight="800" fontFamily="monospace">TRIAGE</text>
        </g>

        {/* Branch Up: L1 Deterministic */}
        <path d="M 108,36 L 108,24 L 140,24" stroke="#94A3B8" strokeWidth="1.4" />
        <g transform="translate(144, 12)">
          <rect x="0" y="0" width="76" height="22" rx="4" fill="#082247" stroke="#94A3B8" strokeOpacity="0.6" strokeWidth="1" />
          <text x="38" y="14.5" textAnchor="middle" fill="#94A3B8" fontSize="7" fontWeight="700" fontFamily="monospace">L1: RULES / RPA</text>
        </g>

        {/* Branch Center: L2 AI-Assisted */}
        <line x1="132" y1="58" x2="144" y2="58" stroke="#38BDF8" strokeWidth="1.4" />
        <g transform="translate(144, 47)">
          <rect x="0" y="0" width="76" height="22" rx="4" fill="#082247" stroke="#169DC8" strokeWidth="1.2" />
          <text x="38" y="14.5" textAnchor="middle" fill="#38BDF8" fontSize="7" fontWeight="700" fontFamily="monospace">L2: AI ASSISTED</text>
        </g>

        {/* Branch Down: L3 Agentic */}
        <path d="M 108,80 L 108,98 L 140,98" stroke="#38BDF8" strokeWidth="1.8" filter="url(#wd-glow)" />
        <g transform="translate(144, 87)">
          <rect x="0" y="0" width="76" height="24" rx="5" fill="#0D306C" stroke="#00E5FF" strokeWidth="1.6" filter="url(#wd-glow)" />
          <text x="38" y="15.5" textAnchor="middle" fill="#00E5FF" fontSize="7.5" fontWeight="800" fontFamily="monospace">L3: AGENTIC FLOW</text>
        </g>

        {/* Active Pulse Nodes */}
        <circle cx="88" cy="58" r="3" fill="#38BDF8" filter="url(#wd-glow)" />
        <circle cx="140" cy="98" r="3" fill="#00E5FF" filter="url(#wd-glow)" />
      </svg>
    </div>
  );
}

// 2. Agent Architecture Visual
function AgentArchitectureVisual() {
  return (
    <div className="relative w-full h-full flex items-center justify-center select-none overflow-hidden bg-[#041126]">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-[#38BDF8]/15 rounded-full blur-2xl pointer-events-none" />
      <svg viewBox="0 0 240 140" fill="none" className="w-[88%] h-[88%] overflow-visible pointer-events-none">
        <defs>
          <filter id="aa-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Central Core: Cognitive Agent Loop */}
        <g transform="translate(86, 38)">
          <rect x="0" y="0" width="68" height="64" rx="10" fill="#0D306C" stroke="#38BDF8" strokeWidth="1.6" filter="url(#aa-glow)" />
          <circle cx="34" cy="24" r="10" fill="#071D42" stroke="#00E5FF" strokeWidth="1.4" />
          <circle cx="34" cy="24" r="4" fill="#38BDF8" filter="url(#aa-glow)" />
          <text x="34" y="44" textAnchor="middle" fill="#FFFFFF" fontSize="7" fontWeight="800" fontFamily="monospace">AGENT CORE</text>
          <text x="34" y="54" textAnchor="middle" fill="#38BDF8" fontSize="6" fontWeight="700" fontFamily="monospace">REASONING LOOP</text>
        </g>

        {/* Orbiting Module Top: Planning Pattern */}
        <g transform="translate(86, 8)">
          <rect x="0" y="0" width="68" height="18" rx="4" fill="#071D42" stroke="#169DC8" strokeWidth="1.2" />
          <text x="34" y="12" textAnchor="middle" fill="#38BDF8" fontSize="6.5" fontWeight="700" fontFamily="monospace">PLANNER & ROUTER</text>
        </g>
        <line x1="120" y1="26" x2="120" y2="38" stroke="#38BDF8" strokeWidth="1.5" strokeDasharray="2 2" />

        {/* Orbiting Module Left: Durable Memory / State */}
        <g transform="translate(8, 48)">
          <rect x="0" y="0" width="64" height="42" rx="5" fill="#082247" stroke="#169DC8" strokeWidth="1.2" />
          <text x="32" y="18" textAnchor="middle" fill="#94A3B8" fontSize="6.5" fontWeight="700" fontFamily="monospace">MEMORY STORE</text>
          <rect x="8" y="24" width="48" height="10" rx="2" fill="#0D306C" />
          <text x="32" y="31.5" textAnchor="middle" fill="#34D399" fontSize="6" fontWeight="700" fontFamily="monospace">STATE: SAVED</text>
        </g>
        <line x1="72" y1="70" x2="86" y2="70" stroke="#38BDF8" strokeWidth="1.5" />

        {/* Orbiting Module Right: Approved Tool Boundary */}
        <g transform="translate(168, 48)">
          <rect x="0" y="0" width="64" height="42" rx="5" fill="#082247" stroke="#38BDF8" strokeWidth="1.2" />
          <text x="32" y="18" textAnchor="middle" fill="#38BDF8" fontSize="6.5" fontWeight="700" fontFamily="monospace">TOOL BUS</text>
          <rect x="8" y="24" width="48" height="10" rx="2" fill="#071D42" stroke="#38BDF8" strokeWidth="0.8" />
          <text x="32" y="31.5" textAnchor="middle" fill="#38BDF8" fontSize="6" fontWeight="700" fontFamily="monospace">SCOPED API</text>
        </g>
        <line x1="154" y1="70" x2="168" y2="70" stroke="#38BDF8" strokeWidth="1.5" />

        {/* Bottom Tag */}
        <g transform="translate(80, 114)">
          <rect x="0" y="0" width="80" height="16" rx="3" fill="#071D42" stroke="#169DC8" strokeOpacity="0.5" strokeWidth="1" />
          <text x="40" y="11" textAnchor="middle" fill="#94A3B8" fontSize="6.5" fontWeight="600" fontFamily="monospace">DETERMINISTIC GUARDRAILS</text>
        </g>
        <line x1="120" y1="102" x2="120" y2="114" stroke="#169DC8" strokeWidth="1.2" />
      </svg>
    </div>
  );
}

// 3. Tool and Integration Layer Visual (MCP Protocol)
function ToolIntegrationVisual() {
  return (
    <div className="relative w-full h-full flex items-center justify-center select-none overflow-hidden bg-[#041126]">
      <div className="absolute top-1/2 left-2/3 w-32 h-32 bg-[#38BDF8]/15 rounded-full blur-2xl pointer-events-none" />
      <svg viewBox="0 0 240 140" fill="none" className="w-[88%] h-[88%] overflow-visible pointer-events-none">
        <defs>
          <filter id="ti-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Left: Agent Tool Invocation Hub */}
        <g transform="translate(16, 26)">
          <rect x="0" y="0" width="86" height="88" rx="8" fill="#082247" stroke="#169DC8" strokeWidth="1.4" />
          <rect x="8" y="10" width="70" height="18" rx="3" fill="#0D306C" />
          <text x="43" y="22" textAnchor="middle" fill="#38BDF8" fontSize="7" fontWeight="800" fontFamily="monospace">MCP REGISTRY</text>
          
          <rect x="8" y="34" width="70" height="14" rx="2" fill="#071D42" />
          <circle cx="16" cy="41" r="2.5" fill="#34D399" />
          <text x="45" y="44" textAnchor="middle" fill="#FFFFFF" fontSize="6" fontWeight="600" fontFamily="monospace">crm_lookup_v2</text>

          <rect x="8" y="52" width="70" height="14" rx="2" fill="#071D42" />
          <circle cx="16" cy="59" r="2.5" fill="#34D399" />
          <text x="45" y="62" textAnchor="middle" fill="#FFFFFF" fontSize="6" fontWeight="600" fontFamily="monospace">sap_post_invoice</text>

          <rect x="8" y="70" width="70" height="14" rx="2" fill="#071D42" />
          <circle cx="16" cy="77" r="2.5" fill="#38BDF8" />
          <text x="45" y="80" textAnchor="middle" fill="#FFFFFF" fontSize="6" fontWeight="600" fontFamily="monospace">email_draft_send</text>
        </g>

        {/* Center Bus Connectors */}
        <path d="M 102,41 L 136,36" stroke="#38BDF8" strokeWidth="1.5" strokeDasharray="3 2" />
        <path d="M 102,59 L 136,70" stroke="#34D399" strokeWidth="1.5" />
        <path d="M 102,77 L 136,104" stroke="#38BDF8" strokeWidth="1.5" strokeDasharray="3 2" />

        {/* Right: Connected Enterprise Systems */}
        <g transform="translate(136, 22)">
          <rect x="0" y="0" width="88" height="26" rx="5" fill="#0D306C" stroke="#38BDF8" strokeWidth="1.2" />
          <text x="44" y="16.5" textAnchor="middle" fill="#FFFFFF" fontSize="7.5" fontWeight="700" fontFamily="monospace">SALESFORCE CRM</text>
        </g>

        <g transform="translate(136, 56)">
          <rect x="0" y="0" width="88" height="28" rx="5" fill="#071D42" stroke="#34D399" strokeWidth="1.5" filter="url(#ti-glow)" />
          <text x="44" y="15" textAnchor="middle" fill="#34D399" fontSize="7.5" fontWeight="800" fontFamily="monospace">SAP / ERP SYSTEM</text>
          <text x="44" y="24" textAnchor="middle" fill="#94A3B8" fontSize="5.5" fontWeight="600" fontFamily="monospace">MUTATION APPROVED</text>
        </g>

        <g transform="translate(136, 92)">
          <rect x="0" y="0" width="88" height="26" rx="5" fill="#0D306C" stroke="#169DC8" strokeWidth="1.2" />
          <text x="44" y="16.5" textAnchor="middle" fill="#FFFFFF" fontSize="7.5" fontWeight="700" fontFamily="monospace">GRAPHQL / REST</text>
        </g>
      </svg>
    </div>
  );
}

// 4. Permission and Identity Model Visual
function PermissionIdentityVisual() {
  return (
    <div className="relative w-full h-full flex items-center justify-center select-none overflow-hidden bg-[#041126]">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-[#F59E0B]/15 rounded-full blur-2xl pointer-events-none" />
      <svg viewBox="0 0 240 140" fill="none" className="w-[88%] h-[88%] overflow-visible pointer-events-none">
        <defs>
          <filter id="pi-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Identity Token Card */}
        <g transform="translate(24, 16)">
          <rect x="0" y="0" width="192" height="108" rx="8" fill="#082247" stroke="#169DC8" strokeOpacity="0.6" strokeWidth="1.3" />

          {/* Header Bar */}
          <rect x="12" y="10" width="168" height="24" rx="4" fill="#0D306C" />
          <circle cx="26" cy="22" r="5" fill="#F59E0B" filter="url(#pi-glow)" />
          <text x="38" y="25" fill="#FFFFFF" fontSize="8" fontWeight="800" fontFamily="monospace">PRINCIPAL: AGENT_IDENTITY_09</text>
          <rect x="136" y="14" width="38" height="16" rx="3" fill="#10B981" />
          <text x="155" y="24.5" textAnchor="middle" fill="#FFFFFF" fontSize="6.5" fontWeight="800">AUDITED</text>

          {/* Granular Permission Rows */}
          <g transform="translate(12, 42)">
            {/* Permission 1: Read */}
            <rect x="0" y="0" width="80" height="22" rx="3" fill="#071D42" stroke="#38BDF8" strokeWidth="0.8" />
            <text x="8" y="14" fill="#38BDF8" fontSize="6.5" fontWeight="700" fontFamily="monospace">READ: CONTRACTS</text>
            <text x="70" y="14" textAnchor="middle" fill="#34D399" fontSize="7" fontWeight="800">✓</text>

            {/* Permission 2: Draft */}
            <rect x="88" y="0" width="80" height="22" rx="3" fill="#071D42" stroke="#38BDF8" strokeWidth="0.8" />
            <text x="96" y="14" fill="#38BDF8" fontSize="6.5" fontWeight="700" fontFamily="monospace">WRITE: DRAFT_MSG</text>
            <text x="158" y="14" textAnchor="middle" fill="#34D399" fontSize="7" fontWeight="800">✓</text>

            {/* Permission 3: Payment Exec (Escalate) */}
            <rect x="0" y="28" width="168" height="26" rx="4" fill="#0D306C" stroke="#F59E0B" strokeWidth="1.2" />
            <text x="10" y="16.5" fill="#FBBF24" fontSize="7" fontWeight="800" fontFamily="monospace">PAYMENT EXECUTION (&gt; $5,000)</text>
            <rect x="118" y="6" width="44" height="14" rx="2" fill="#F59E0B" />
            <text x="140" y="15.5" textAnchor="middle" fill="#071D42" fontSize="6" fontWeight="900">ESCALATE</text>
          </g>
        </g>
      </svg>
    </div>
  );
}

// 5. Human-in-the-Loop Design Visual
function HumanInTheLoopVisual() {
  return (
    <div className="relative w-full h-full flex items-center justify-center select-none overflow-hidden bg-[#041126]">
      <div className="absolute top-1/2 left-2/3 w-32 h-32 bg-[#10B981]/15 rounded-full blur-2xl pointer-events-none" />
      <svg viewBox="0 0 240 140" fill="none" className="w-[88%] h-[88%] overflow-visible pointer-events-none">
        <defs>
          <filter id="hitl-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Left: Agent Prepared Task Card */}
        <g transform="translate(16, 20)">
          <rect x="0" y="0" width="94" height="100" rx="7" fill="#082247" stroke="#169DC8" strokeWidth="1.2" />
          <rect x="8" y="10" width="78" height="16" rx="3" fill="#0D306C" />
          <text x="47" y="21" textAnchor="middle" fill="#38BDF8" fontSize="7" fontWeight="700" fontFamily="monospace">AGENT PROPOSAL</text>
          
          <rect x="8" y="32" width="78" height="30" rx="3" fill="#071D42" />
          <text x="14" y="44" fill="#94A3B8" fontSize="6" fontWeight="600">Refund: $840.00</text>
          <text x="14" y="54" fill="#94A3B8" fontSize="6" fontWeight="600">Client: Acquired Inc</text>
          
          {/* Calibrated Confidence Badge */}
          <rect x="8" y="68" width="78" height="16" rx="3" fill="#169DC8" fillOpacity="0.2" />
          <text x="47" y="79" textAnchor="middle" fill="#38BDF8" fontSize="6.5" fontWeight="700" fontFamily="monospace">CONFIDENCE: 94.6%</text>
        </g>

        {/* Handshake Arrow to Review Station */}
        <line x1="110" y1="70" x2="128" y2="70" stroke="#38BDF8" strokeWidth="2" strokeDasharray="3 2" />

        {/* Right: Human Review Station */}
        <g transform="translate(130, 20)">
          <rect x="0" y="0" width="94" height="100" rx="7" fill="#0D306C" stroke="#34D399" strokeWidth="1.4" filter="url(#hitl-glow)" />
          <rect x="8" y="10" width="78" height="16" rx="3" fill="#071D42" />
          <text x="47" y="21" textAnchor="middle" fill="#34D399" fontSize="7" fontWeight="800" fontFamily="monospace">HUMAN GATE</text>

          {/* Action Decision Buttons */}
          <g transform="translate(8, 34)">
            <rect x="0" y="0" width="78" height="18" rx="3" fill="#10B981" />
            <text x="39" y="12" textAnchor="middle" fill="#FFFFFF" fontSize="6.5" fontWeight="800">APPROVE ACTION</text>
          </g>

          <g transform="translate(8, 56)">
            <rect x="0" y="0" width="78" height="16" rx="3" fill="#071D42" stroke="#38BDF8" strokeWidth="1" />
            <text x="39" y="11" textAnchor="middle" fill="#38BDF8" fontSize="6" fontWeight="700">EDIT INLINE</text>
          </g>

          {/* Review SLA */}
          <text x="47" y="88" textAnchor="middle" fill="#94A3B8" fontSize="6" fontWeight="600" fontFamily="monospace">AVG REVIEW: 18 SEC</text>
        </g>
      </svg>
    </div>
  );
}

// 6. Evaluation and Simulation Visual
function EvaluationSimulationVisual() {
  return (
    <div className="relative w-full h-full flex items-center justify-center select-none overflow-hidden bg-[#041126]">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-[#38BDF8]/15 rounded-full blur-2xl pointer-events-none" />
      <svg viewBox="0 0 240 140" fill="none" className="w-[88%] h-[88%] overflow-visible pointer-events-none">
        <defs>
          <filter id="es-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Sandbox Harness Header */}
        <g transform="translate(20, 16)">
          <rect x="0" y="0" width="200" height="108" rx="8" fill="#082247" stroke="#169DC8" strokeOpacity="0.6" strokeWidth="1.3" />

          {/* Top Test Suite Banner */}
          <rect x="12" y="10" width="176" height="24" rx="4" fill="#0D306C" />
          <text x="22" y="24.5" fill="#38BDF8" fontSize="8" fontWeight="800" fontFamily="monospace">AGENT_SIMULATION_SANDBOX</text>
          <rect x="144" y="14" width="38" height="16" rx="3" fill="#10B981" />
          <text x="163" y="24.5" textAnchor="middle" fill="#FFFFFF" fontSize="6.5" fontWeight="800">99.4%</text>

          {/* Test Metrics Matrix */}
          <g transform="translate(12, 42)">
            {/* Metric 1 */}
            <text x="0" y="10" fill="#94A3B8" fontSize="7" fontWeight="600">Tool Argument Precision</text>
            <rect x="100" y="2" width="76" height="8" rx="2" fill="#071D42" />
            <rect x="100" y="2" width="74" height="8" rx="2" fill="#38BDF8" filter="url(#es-glow)" />

            {/* Metric 2 */}
            <text x="0" y="26" fill="#94A3B8" fontSize="7" fontWeight="600">Trajectory Policy Adherence</text>
            <rect x="100" y="18" width="76" height="8" rx="2" fill="#071D42" />
            <rect x="100" y="18" width="72" height="8" rx="2" fill="#34D399" />

            {/* Metric 3 */}
            <text x="0" y="42" fill="#94A3B8" fontSize="7" fontWeight="600">Failure Recovery & Retry</text>
            <rect x="100" y="34" width="76" height="8" rx="2" fill="#071D42" />
            <rect x="100" y="34" width="68" height="8" rx="2" fill="#00E5FF" />

            {/* Release Gate Pass Note */}
            <line x1="0" y1="52" x2="176" y2="52" stroke="#169DC8" strokeOpacity="0.3" strokeDasharray="2 2" />
            <text x="88" y="61" textAnchor="middle" fill="#38BDF8" fontSize="6.5" fontWeight="700" fontFamily="monospace">5,000 SYNTHETIC RUNS BEFORE DEPLOY</text>
          </g>
        </g>
      </svg>
    </div>
  );
}

// 7. Monitoring and AgentOps Visual
function MonitoringAgentOpsVisual() {
  return (
    <div className="relative w-full h-full flex items-center justify-center select-none overflow-hidden bg-[#041126]">
      <div className="absolute top-1/2 left-1/3 w-32 h-32 bg-[#38BDF8]/15 rounded-full blur-2xl pointer-events-none" />
      <svg viewBox="0 0 240 140" fill="none" className="w-[88%] h-[88%] overflow-visible pointer-events-none">
        <defs>
          <filter id="ao-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Trace Waterfall Header */}
        <g transform="translate(18, 16)">
          <rect x="0" y="0" width="204" height="108" rx="8" fill="#082247" stroke="#169DC8" strokeOpacity="0.5" strokeWidth="1.2" />

          {/* Trace Title Bar */}
          <rect x="10" y="10" width="184" height="20" rx="3" fill="#0D306C" />
          <text x="18" y="23" fill="#38BDF8" fontSize="7.5" fontWeight="800" fontFamily="monospace">TRACE_ID: #892-AG-PROD</text>
          <text x="156" y="23" fill="#34D399" fontSize="6.5" fontWeight="700" fontFamily="monospace">640ms p95</text>

          {/* Waterfall Steps */}
          <g transform="translate(10, 38)">
            {/* Step 1: Input & Planning */}
            <text x="0" y="10" fill="#94A3B8" fontSize="6.5" fontWeight="600">1. Plan & Context</text>
            <rect x="74" y="2" width="36" height="9" rx="2" fill="#169DC8" />

            {/* Step 2: Tool Call */}
            <text x="0" y="24" fill="#94A3B8" fontSize="6.5" fontWeight="600">2. DB Query Tool</text>
            <rect x="112" y="16" width="48" height="9" rx="2" fill="#38BDF8" filter="url(#ao-glow)" />

            {/* Step 3: Validation & Output */}
            <text x="0" y="38" fill="#94A3B8" fontSize="6.5" fontWeight="600">3. Policy Check</text>
            <rect x="162" y="30" width="22" height="9" rx="2" fill="#10B981" />

            {/* Telemetry Stats Footer */}
            <line x1="0" y1="46" x2="184" y2="46" stroke="#169DC8" strokeOpacity="0.3" />
            <text x="0" y="58" fill="#94A3B8" fontSize="6" fontWeight="600">Cost/Task: $0.0028</text>
            <text x="80" y="58" fill="#94A3B8" fontSize="6" fontWeight="600">Policy: 0 Unsafe Actions</text>
            <text x="162" y="58" fill="#38BDF8" fontSize="6" fontWeight="700">STATUS: OK</text>
          </g>
        </g>
      </svg>
    </div>
  );
}

// 8. Migration from Rules and RPA Visual
function RpaMigrationVisual() {
  return (
    <div className="relative w-full h-full flex items-center justify-center select-none overflow-hidden bg-[#041126]">
      <div className="absolute top-1/2 left-2/3 w-32 h-32 bg-[#00E5FF]/15 rounded-full blur-2xl pointer-events-none" />
      <svg viewBox="0 0 240 140" fill="none" className="w-[88%] h-[88%] overflow-visible pointer-events-none">
        <defs>
          <filter id="rm-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Left: Brittle Legacy RPA */}
        <g transform="translate(18, 22)">
          <rect x="0" y="0" width="84" height="96" rx="6" fill="#082247" stroke="#94A3B8" strokeOpacity="0.4" strokeWidth="1" />
          <rect x="6" y="8" width="72" height="16" rx="3" fill="#071D42" />
          <text x="42" y="19" textAnchor="middle" fill="#94A3B8" fontSize="6.5" fontWeight="700" fontFamily="monospace">LEGACY RPA</text>

          {/* Rigid Blocks */}
          <rect x="6" y="30" width="72" height="14" rx="2" fill="#0D306C" />
          <text x="42" y="39.5" textAnchor="middle" fill="#94A3B8" fontSize="6" fontWeight="600">FIXED UI SCRAPE</text>

          <rect x="6" y="48" width="72" height="14" rx="2" fill="#0D306C" stroke="#EF4444" strokeWidth="0.8" strokeDasharray="2 2" />
          <text x="42" y="57.5" textAnchor="middle" fill="#F87171" fontSize="6" fontWeight="600">BREAKS ON VARIATION</text>

          <text x="42" y="82" textAnchor="middle" fill="#EF4444" fontSize="6" fontWeight="700" fontFamily="monospace">HIGH MAINTENANCE</text>
        </g>

        {/* Migration Transition Pulse Vector */}
        <path d="M 104,70 L 134,70" stroke="#00E5FF" strokeWidth="2" filter="url(#rm-glow)" markerEnd="url(#arrow)" />
        <text x="119" y="62" textAnchor="middle" fill="#38BDF8" fontSize="6" fontWeight="800" fontFamily="monospace">MIGRATE</text>

        {/* Right: Adaptive Agentic Architecture */}
        <g transform="translate(138, 22)">
          <rect x="0" y="0" width="84" height="96" rx="6" fill="#0D306C" stroke="#00E5FF" strokeWidth="1.4" filter="url(#rm-glow)" />
          <rect x="6" y="8" width="72" height="16" rx="3" fill="#071D42" />
          <text x="42" y="19" textAnchor="middle" fill="#00E5FF" fontSize="6.5" fontWeight="800" fontFamily="monospace">AI AGENTIC</text>

          {/* Adaptive Reasoning Blocks */}
          <rect x="6" y="30" width="72" height="14" rx="2" fill="#082247" stroke="#38BDF8" strokeWidth="0.8" />
          <text x="42" y="39.5" textAnchor="middle" fill="#38BDF8" fontSize="6" fontWeight="700">UNSTRUCTURED INPUT</text>

          <rect x="6" y="48" width="72" height="14" rx="2" fill="#082247" stroke="#34D399" strokeWidth="0.8" />
          <text x="42" y="57.5" textAnchor="middle" fill="#34D399" fontSize="6" fontWeight="700">TOOL CALLING API</text>

          <text x="42" y="82" textAnchor="middle" fill="#34D399" fontSize="6.5" fontWeight="800" fontFamily="monospace">EXCEPTION RESILIENT</text>
        </g>
      </svg>
    </div>
  );
}

const AGENT_CAPABILITY_VISUALS = [
  <WorkflowDiscoveryVisual key="wd" />,
  <AgentArchitectureVisual key="aa" />,
  <ToolIntegrationVisual key="ti" />,
  <PermissionIdentityVisual key="pi" />,
  <HumanInTheLoopVisual key="hitl" />,
  <EvaluationSimulationVisual key="es" />,
  <MonitoringAgentOpsVisual key="mao" />,
  <RpaMigrationVisual key="rpa" />,
];

/**
 * AgentCapabilitiesGrid - Exact design of DataCapabilitiesGrid from services/ai-gcc/data-engineering:
 * - 4-column responsive grid (4, 4 layout)
 * - 16:10 rectangle visual frame on top with glow and hover-scale
 * - Bespoke interactive illustrations suited specifically for AI Agents Automation
 * - Fully supports both "navy" and "light" editorial design tokens
 */
export default function AgentCapabilitiesGrid({
  items,
  theme = "navy",
  className = "",
}: AgentCapabilitiesGridProps) {
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
          AGENT_CAPABILITY_VISUALS[index % AGENT_CAPABILITY_VISUALS.length]
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

            {/* 3. Descriptive Body */}
            <p
              className={`text-[13px] sm:text-[13.5px] leading-relaxed font-normal ${
                isLight ? "text-[#505D74]" : "text-[#94A3B8]"
              }`}
            >
              {item.body}
            </p>
          </motion.div>
        );
      })}
    </div>
  );
}

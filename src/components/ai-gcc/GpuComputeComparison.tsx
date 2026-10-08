import ResponsiveTable from "./ResponsiveTable";

const ROWS = [
  ["Cloud On-Demand", "Experiments, spiky development load, early inference with unknown demand.", "No commitment. Fastest to start. Elastic for bursts.", "Highest unit cost at sustained utilization. Capacity for popular accelerators is not guaranteed."],
  ["Cloud Reserved", "Predictable training or inference load you can forecast for a year or more.", "Lower unit cost than on-demand. Capacity assurance. Same cloud tooling.", "Commitment risk if the workload shrinks or the model strategy changes."],
  ["Dedicated GPU", "Sustained high utilization, strict data residency or isolation requirements, latency-sensitive inference.", "Lowest unit cost only at high utilization. Full control of the environment.", "Capital and operations burden. Hardware refresh risk. Idle capacity is pure cost."],
  ["Hybrid", "A steady base load plus variable peaks, or regulated data alongside general workloads.", "Right-sizes each workload. Keeps burst capacity elastic while the base runs reserved or dedicated.", "More moving parts: scheduling, networking, cost allocation and MLOps integration across environments."],
];

/** Compute model comparison. Deliberately free of prices, which change faster than a web page. */
export default function GpuComputeComparison() {
  return (
    <ResponsiveTable
      caption="Comparison of GPU compute models for an AI GCC"
      headers={["Model", "Best for", "Advantage", "Trade-off"]}
      rows={ROWS}
    />
  );
}

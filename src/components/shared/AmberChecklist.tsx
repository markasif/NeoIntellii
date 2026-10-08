import React, { type ReactNode } from "react";

interface NavyChecklistProps {
  items: (string | ReactNode)[];
  note?: string;
  iconType?: "question" | "check" | "number";
  children?: ReactNode;
  className?: string;
}

function renderItemContent(item: React.ReactNode) {
  if (typeof item === "string" && item.includes(": ")) {
    const colonIndex = item.indexOf(": ");
    const title = item.slice(0, colonIndex);
    const desc = item.slice(colonIndex + 2);
    return (
      <>
        <strong className="font-bold text-[#0D306C]">{title}:</strong> {desc}
      </>
    );
  }
  return item;
}

export default function AmberChecklist({
  items,
  note,
  iconType = "question",
  children,
  className = "",
}: NavyChecklistProps) {
  return (
    <div className={`max-w-4xl mx-auto ${className}`}>
      <ol className="space-y-2 list-none p-0">
        {items.map((item, index) => (
          <li
            key={typeof item === "string" ? item : `item-${index}`}
            className="group flex items-stretch bg-transparent hover:border-[#0D306C]/40 transition-all duration-300 overflow-hidden"
          >
            {/* Amber left accent bar */}
            <span
              className="w-1 shrink-0 bg-[#F19326] group-hover:bg-[#e07d10] transition-colors duration-300"
              aria-hidden="true"
            />

            {/* Creative badge — navy bg, amber icon or number */}
            <span
              className="relative flex items-center justify-center w-12 sm:w-14 shrink-0 bg-[#0D306C] border-r border-[#0D306C]/40 py-4 px-2 select-none"
              aria-hidden="true"
            >
              {iconType === "number" ? (
                /* Number count badge matching amber style */
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-md bg-[#F19326]/15 border border-[#F19326] flex items-center justify-center text-[#F19326] font-bold text-xs sm:text-sm font-mono shadow-sm">
                  {index + 1}
                </div>
              ) : iconType === "check" ? (
                /* Matching tick / checkmark icon */
                <svg
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 drop-shadow-sm"
                >
                  {/* Outer glow ring — subtle */}
                  <circle cx="16" cy="16" r="10.5" stroke="#F19326" strokeWidth="0.6" strokeOpacity="0.3" />

                  {/* Rounded square / badge body */}
                  <rect
                    x="5"
                    y="5"
                    width="22"
                    height="22"
                    rx="5"
                    fill="#F19326"
                    fillOpacity="0.15"
                    stroke="#F19326"
                    strokeWidth="1.4"
                  />

                  {/* Bold checkmark */}
                  <path
                    d="M10.5 16.5L14 20L21.5 12"
                    stroke="#F19326"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                /* Speech-bubble question mark icon */
                <svg
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 drop-shadow-sm"
                >
                  {/* Outer glow ring — subtle */}
                  <circle cx="16" cy="14" r="10.5" stroke="#F19326" strokeWidth="0.6" strokeOpacity="0.3" />

                  {/* Speech bubble body */}
                  <path
                    d="M6 4h20a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H18l-3 4-3-4H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z"
                    fill="#F19326"
                    fillOpacity="0.15"
                    stroke="#F19326"
                    strokeWidth="1.4"
                    strokeLinejoin="round"
                  />

                  {/* Question mark — arc */}
                  <path
                    d="M13 10.5a3.2 3.2 0 0 1 6 1.5c0 2.2-3 2.8-3 5"
                    stroke="#F19326"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {/* Question mark — dot */}
                  <circle cx="16" cy="19.5" r="1.1" fill="#F19326" />
                </svg>
              )}
            </span>

            {/* Content area — text always visible, white bg slides in on hover */}
            <div className="relative flex-1 overflow-hidden">
              <span
                className="absolute inset-0 bg-white -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out"
                aria-hidden="true"
              />
              <p className="relative py-4 px-5 text-[#2B3D66] font-medium text-sm sm:text-base leading-relaxed m-0">
                {renderItemContent(item)}
              </p>
            </div>
          </li>
        ))}
      </ol>

      {note && (
        <p className="text-[#505D74] text-sm leading-relaxed text-center max-w-2xl mx-auto mt-8">
          {note}
        </p>
      )}

      {children && <div className="mt-8 sm:mt-10">{children}</div>}
    </div>
  );
}

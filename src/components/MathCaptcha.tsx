import { useState, useCallback, useEffect } from "react";
import { RefreshCw, CheckCircle2 } from "lucide-react";

type Operator = "+" | "-" | "×";

interface Challenge {
  a: number;
  b: number;
  op: Operator;
  answer: number;
}

function generateChallenge(): Challenge {
  const ops: Operator[] = ["+", "-", "×"];
  const op = ops[Math.floor(Math.random() * ops.length)];
  let a: number, b: number, answer: number;

  switch (op) {
    case "+":
      a = Math.floor(Math.random() * 20) + 1;
      b = Math.floor(Math.random() * 20) + 1;
      answer = a + b;
      break;
    case "-":
      a = Math.floor(Math.random() * 20) + 5;
      b = Math.floor(Math.random() * a) + 1;
      answer = a - b;
      break;
    case "×":
      a = Math.floor(Math.random() * 9) + 2;
      b = Math.floor(Math.random() * 9) + 2;
      answer = a * b;
      break;
  }

  return { a: a!, b: b!, op, answer: answer! };
}

interface MathCaptchaProps {
  onVerified: (verified: boolean) => void;
  dark?: boolean;
}

export default function MathCaptcha({ onVerified, dark = false }: MathCaptchaProps) {
  // The challenge is generated on the client only, after mount, so the
  // server-rendered HTML and the first client render match exactly.
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [input, setInput] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setChallenge(generateChallenge());
  }, []);

  const refresh = useCallback(() => {
    setChallenge(generateChallenge());
    setInput("");
    setVerified(false);
    setError(false);
    onVerified(false);
  }, [onVerified]);

  // Reset captcha if parent resets (e.g. form re-render)
  useEffect(() => {
    return () => onVerified(false);
  }, [onVerified]);

  const handleCheck = () => {
    if (!challenge) return;
    const parsed = parseInt(input.trim(), 10);
    if (isNaN(parsed)) {
      setError(true);
      return;
    }
    if (parsed === challenge.answer) {
      setVerified(true);
      setError(false);
      onVerified(true);
    } else {
      setError(true);
      setInput("");
      // Generate a new challenge on wrong answer to prevent brute-force
      setChallenge(generateChallenge());
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleCheck();
    }
  };

  return (
    <div
      className={
        dark
          ? "rounded-xl border border-[#1E3A8A] bg-[#021838] p-4 text-white"
          : "rounded-xl border border-black/[0.08] bg-[#f5f5f7] p-4"
      }
    >
      <label
        className={
          dark
            ? "block text-xs font-mono font-bold uppercase tracking-wider text-slate-200 mb-2.5"
            : "block text-xs text-heading mb-3"
        }
      >
        Verify you&apos;re human
      </label>

      {verified ? (
        <div
          className={`flex items-center gap-2 text-sm font-semibold ${
            dark ? "text-emerald-400" : "text-emerald-600"
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          Verified
        </div>
      ) : (
        <div className="flex items-center gap-3 flex-wrap">
          <span
            className={`text-sm whitespace-nowrap ${
              dark ? "text-white font-mono font-semibold" : "text-heading"
            }`}
          >
            {challenge ? `${challenge.a} ${challenge.op} ${challenge.b} =` : "… ="}
          </span>
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              setError(false);
            }}
            onKeyDown={handleKeyDown}
            placeholder="?"
            className={
              dark
                ? `w-20 px-3 py-2 rounded-lg border text-center text-sm font-bold font-mono focus:outline-none focus:ring-2 transition-all ${
                    error
                      ? "border-rose-400 focus:ring-rose-400/30 bg-rose-950/40 text-rose-200"
                      : "border-[#1E3A8A] bg-[#06224A] text-white focus:border-[#00A3E0] focus:ring-[#00A3E0]/30"
                  }`
                : `w-20 px-3 py-2 rounded-lg border text-center text-sm focus:outline-none focus:ring-2 transition-all ${
                    error
                      ? "border-red-300 focus:ring-red-200 bg-red-50"
                      : "border-black/[0.08] focus:ring-primary/20 bg-white"
                  }`
            }
            aria-label={
              challenge
                ? `What is ${challenge.a} ${challenge.op === "×" ? "times" : challenge.op} ${challenge.b}?`
                : "Human verification question"
            }
          />
          <button
            type="button"
            onClick={handleCheck}
            className={
              dark
                ? "px-4 py-2 rounded-lg bg-[#00A3E0] hover:bg-[#008EC4] text-white text-xs font-bold font-manrope transition-all cursor-pointer shadow-xs"
                : "px-4 py-2 rounded-lg bg-heading text-white text-sm transition-opacity cursor-pointer"
            }
          >
            Verify
          </button>
          <button
            type="button"
            onClick={refresh}
            className={
              dark
                ? "p-2 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
                : "p-2 rounded-lg transition-colors cursor-pointer text-body-muted"
            }
            aria-label="New question"
            title="New question"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      )}

      {error && (
        <p className={`text-xs mt-2 ${dark ? "text-rose-400" : "text-red-500"}`}>
          Incorrect answer. Try the new question.
        </p>
      )}
    </div>
  );
}

export type LenisInstance = {
  scrollTo: (target: number, options?: { immediate?: boolean }) => void;
  raf: (time: number) => void;
  destroy: () => void;
};

export let activeLenis: LenisInstance | null = null;

export function setActiveLenis(val: LenisInstance | null) {
  activeLenis = val;
}

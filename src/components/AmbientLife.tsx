"use client";

/** Soft cinematic atmosphere behind every page — depth without stealing focus */
export function AmbientLife() {
  return (
    <>
      <div className="ambient-stage" aria-hidden>
        <div className="ambient-orb ambient-orb-a" />
        <div className="ambient-orb ambient-orb-b" />
        <div className="ambient-orb ambient-orb-c" />
        <div className="light-beam" />
      </div>
      <div className="film-grain" aria-hidden />
    </>
  );
}

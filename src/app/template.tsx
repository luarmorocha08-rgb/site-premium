/** Soft cross-page transition. Opacity only (CSS), so sticky/fixed descendants keep working. */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>;
}

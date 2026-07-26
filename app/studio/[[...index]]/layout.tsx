export const metadata = {
  title: 'LK Archi - Sanity Studio',
  description: 'Sanity Studio for LK Archi',
}

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  )
}

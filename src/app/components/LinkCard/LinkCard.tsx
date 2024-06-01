interface Link {
    to: string
    from: string
    clicks: string
    date: string
}

interface LinkCardProps {
  link: Link
}

export default function LinkCard({link}: LinkCardProps) {
  return (
    <main>
      <section className="flex flex-col pt-6 pl-52 gap-2">
        <h2 className="text-4xl">Link</h2>
        <section className="flex flex-col gap-1 text-sm">
          <p>
            Your link: <a className="text-blue-700" href={link.to}>{link.to}</a>
          </p>
          <p>
            From: <a className="text-blue-700" href={link.from}>{link.from}</a>
          </p>
          <p>Clicks counts: <strong>{link.clicks}</strong></p>
          <p>Creating date: <strong>{new Date(link.date).toLocaleDateString()}</strong></p>
        </section>
      </section>
    </main>
  )
} 
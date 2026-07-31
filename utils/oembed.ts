// CKEditor <oembed> → responsive iframe embed

function toEmbedUrl(url: string): string | null {
  const youtube = url.match(
    /(?:youtube\.com\/watch\?v=|youtube\.com\/embed\/|youtu\.be\/)([\w-]+)/,
  )
  if (youtube) return `https://www.youtube.com/embed/${youtube[1]}`

  const vimeo = url.match(/vimeo\.com\/(\d+)/)
  if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}`

  return null
}

export function resolveOembedTags(html: string): string {
  return html.replace(/<oembed url="([^"]+)"[^>]*><\/oembed>/g, (match, url) => {
    const embedUrl = toEmbedUrl(url)
    if (!embedUrl) return match

    return (
      `<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;">` +
      `<iframe src="${embedUrl}" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" ` +
      `allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" ` +
      `allowfullscreen></iframe></div>`
    )
  })
}

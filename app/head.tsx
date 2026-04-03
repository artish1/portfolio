const title = 'Mark Artishuk - Senior Software Engineer'
const url = 'https://markartishuk.com'
const description =
  'Senior Software Engineer building polished products with React, Three.js, and Node.js. Open to new opportunities.'
const author = 'Mark Artishuk'

export default function Head() {
  return (
    <>
      <meta charSet='utf-8' />
      <meta name='language' content='english' />
      <meta httpEquiv='content-type' content='text/html' />
      <meta name='author' content={author} />

      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='robots' content='index,follow' />

      {/* Open Graph */}
      <meta property='og:title' content={title} />
      <meta property='og:type' content='website' />
      <meta property='og:url' content={url} />
      <meta property='og:site_name' content={title} />
      <meta property='og:description' content={description} />

      {/* Icons */}
      <link rel='apple-touch-icon' href='/icons/apple-touch-icon.png' />
      <link rel='apple-touch-icon' sizes='16x16' href='/icons/favicon-16x16.png' />
      <link rel='apple-touch-icon' sizes='32x32' href='/icons/favicon-32x32.png' />
      <link rel='apple-touch-icon' sizes='180x180' href='/icons/apple-touch-icon.png' />
      <link rel='manifest' href='/manifest.json' />
      <link rel='mask-icon' color='#C8A47E' href='/icons/safari-pinned-tab.svg' />

      {/* Mobile */}
      <meta name='viewport' content='width=device-width, minimum-scale=1, initial-scale=1.0' />
      <meta name='theme-color' content='#28231F' />
      <link rel='shortcut icon' href='/icons/apple-touch-icon.png' />

      {/* Twitter */}
      <meta name='twitter:card' content='summary' />
      <meta name='twitter:title' content={title} />
      <meta name='twitter:description' content={description} />
    </>
  )
}

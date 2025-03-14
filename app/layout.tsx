import type { Metadata } from 'next'
import Script from 'next/script'
import { SITE } from '../config'
import './globals.css'

// 扩展申明
declare global{
  namespace JSX{
    interface IntrinsicElements {
      // 扩展 IntrinsicElements 否则无法识别自定义标签
      dot: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
    }
  }
}

export const metadata: Metadata = {
  ...SITE,
  title: `${SITE.title} - ${SITE.tagline}`,
  openGraph: {
    ...SITE,
    description: SITE.tagline,
    siteName: SITE.title,
    images: [
      {
        url: SITE.image,
        width: 1200,
        height: 630,
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@ccbikai',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        {
          (process.env.NODE_ENV === 'production' && !process.env.NEXT_PUBLIC_CLOUDFLARE_WORKER_HOST)
            ? (
                <>
                  <Script id="va-vaq">
                    {` window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); }; `}
                  </Script>
                  <Script async src="/FKYHsnzM/script.js" data-endpoint="/FKYHsnzM"></Script>
                </>
              )
            : null
        }
        {process.env.FOOTER_INJECT && (
          <div
            dangerouslySetInnerHTML={{ __html: process.env.FOOTER_INJECT }}
          />
        )}
      </body>
    </html>
  )
}

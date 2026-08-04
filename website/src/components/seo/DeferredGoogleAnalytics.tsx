'use client';

import Script from 'next/script';

type DeferredGoogleAnalyticsProps = {
  gaId: string;
};

export function DeferredGoogleAnalytics({
  gaId,
}: DeferredGoogleAnalyticsProps): React.ReactElement {
  return (
    <>
      <Script id="_next-ga-init" strategy="afterInteractive">{`
window.dataLayer=window.dataLayer||[];
function gtag(){window.dataLayer.push(arguments);}
window.gtag=gtag;
gtag('js',new Date());
gtag('config','${gaId}',{send_page_view:true});
`}</Script>
      <Script
        id="_next-ga"
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="lazyOnload"
      />
    </>
  );
}

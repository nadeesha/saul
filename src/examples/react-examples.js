import React from 'react';

// @t "has thumbnailImage" Thumbnail({thumbnailImage: 'fake'}) contains-dom img[src='url("fake")']
// @t "has pill" Thumbnail({isNew: true}) contains-dom div#foo{New}
// @t "has auction date" Thumbnail({formatAuctionDate: () => 'auczdate'}) contains-dom div{Auction auczdate}
export const Thumbnail = ({
  thumbnailImage,
  isNew,
  auctionDate,
  brandingLogoUrl,
  brandingColor,
  styles = {},
  formatAuctionDate = function noop() {},
  Branding = 'div',
  brandingStyles = {}
}) => (
  <div className={styles.thumbnailWrapper}>
    <div
      className={styles.thumbnail}
      style={{
        backgroundImage: `url("${thumbnailImage}")`
      }}
    >
      <img
        src={`url("${thumbnailImage}")`}
        alt=""
        className={styles.thumbnailImage}
      />
      {isNew && <div className={styles.pill} id={'foo'}>New</div>}
      <div className={styles.caption}>
        Auction {formatAuctionDate(auctionDate)}
      </div>
    </div>
    <Branding
      brandingColor={brandingColor}
      className={brandingStyles.thumbnailBranding}
      brandingLogoUrl={brandingLogoUrl}
    />
  </div>
);

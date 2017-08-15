import React from 'react'; // eslint-disable-line no-unused-vars

// @t "can render" Thumbnail({isNew: true}) ~matches-snapshot
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
}) =>
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
      {isNew &&
        <div className={styles.pill} id={'foo'}>
          New
        </div>}
      <div className={styles.caption}>
        Auction {formatAuctionDate(auctionDate)}
      </div>
    </div>
    <Branding
      brandingColor={brandingColor}
      className={brandingStyles.thumbnailBranding}
      brandingLogoUrl={brandingLogoUrl}
    />
  </div>;

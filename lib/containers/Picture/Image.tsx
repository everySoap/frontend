import React from 'react';
import LazyLoad from 'react-lazyload';

import { getPictureUrl } from '@lib/common/utils/image';
import { server } from '@lib/common/utils';
import { IPictureItemProps } from './Item';
import {
  ImageBox, ItemImage, Shadow, ImgBox,
} from './styles';

interface IPictureImage extends IPictureItemProps {
  blur?: boolean;
  zooming?: boolean;
  opacity?: boolean;
  fancybox?: boolean;
}

export const PictureImage: React.FC<IPictureImage> = ({
  detail,
  lazyload,
  size = 'regular',
  fancybox,
}) => {
  const height = (1 - (detail.width - detail.height) / detail.width) * 100 || 100;
  const imgRender = (
    <div style={{ width: '100%', height: '100%', position: 'absolute' }}>
      <ImgBox
        style={{ position: 'absolute', ...fancybox ? { cursor: 'zoom-in' } : {} }}
        {...(fancybox ? { 'data-fancybox': 'images', href: getPictureUrl(detail.key, 'full') } : {})}
      >
        <ItemImage
          src={getPictureUrl(detail.key, size)}
        />
      </ImgBox>
      <Shadow
        style={{
          backgroundImage: `url(${getPictureUrl(detail.key, size)})`,
          zIndex: 0,
        }}
      />
    </div>
  );
  return (
    <ImageBox height={height} background={detail.color}>
      <ImgBox style={{ position: 'absolute' }}>
        {
          detail.blurhashSrc ? (
            <img
              style={{
                width: '100%', borderRadius: '4px', height: '100%', objectFit: 'cover',
              }}
              src={detail.blurhashSrc}
              alt=""
            />
          ) : (
            <img
              style={{
                filter: 'blur(20px)', width: '100%', borderRadius: '4px', height: '100%', objectFit: 'cover',
              }}
              src={getPictureUrl(detail.key, 'thumbSmall')}
              alt=""
            />
          )
        }
      </ImgBox>
      {
        (lazyload || server) ? (
          <LazyLoad once resize height="100%" offset={400}>
            {imgRender}
          </LazyLoad>
        ) : (
          <>
            {imgRender}
          </>
        )
      }
    </ImageBox>
  );
};

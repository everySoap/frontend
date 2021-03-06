import React, { useCallback, useRef, useEffect } from 'react';

import { PictureEntity } from '@lib/common/interfaces/picture';
import { PictureStyle } from '@lib/common/utils/image';
import { Avatar, EmojiText } from '@lib/components';
import { A } from '@lib/components/A';
import { Lock, Zap } from '@lib/icon';
import { Popover } from '@lib/components/Popover';
import { useTranslation } from '@lib/i18n/useTranslation';
import { useAccountStore } from '@lib/stores/hooks';
import { observer } from 'mobx-react';
import Toast from '@lib/components/Toast';
import { useTheme } from '@lib/common/utils/themes/useTheme';
import { constants } from '@lib/common/constants/config';
import { PictureImage } from './Image';
import {
  HandleBox, InfoBox, ItemWrapper, UserBox, UserName, LockIcon, Link, LikeContent, HeartIcon, ChoiceBox,
} from './styles';
import { UserPopper } from './components/UserPopper';

const timer: number | undefined = undefined;

export interface IPictureItemProps {
  detail: PictureEntity;
  lazyload?: boolean;
  size?: PictureStyle;
  like?: (data: PictureEntity) => void;
}

export const PictureItem: React.FC<IPictureItemProps> = observer(({
  detail,
  like,
  lazyload,
  ...restProps
}) => {
  const likeLoading = useRef(false);
  const { isLogin } = useAccountStore();
  const { t } = useTranslation();
  const { colors } = useTheme();
  const onLike = useCallback(async () => {
    if (!isLogin) {
      Toast.warning('登录之后才可以喜欢哦！');
      return;
    }
    if (likeLoading.current) return;
    if (like) {
      likeLoading.current = true;
      try {
        await like(detail);
      } finally {
        setTimeout(() => likeLoading.current = false, constants.likePauseTime);
      }
    }
  }, [detail, isLogin, like]);
  // clear 喜欢的定时器
  useEffect(() => () => clearTimeout(timer));
  return (
    <ItemWrapper private={detail.isPrivate ? 1 : 0}>
      {
        detail.badge?.findIndex(v => v.name === 'choice') >= 0 && (
          <Popover
            openDelay={100}
            trigger="hover"
            placement="top"
            theme="dark"
            content={<span>{t('label.choice')}</span>}
          >
            <ChoiceBox style={{ position: 'absolute', zIndex: 3 }}>
              <Zap color="#fff" size={14} />
            </ChoiceBox>
          </Popover>
        )
      }
      <Link route={`/picture/${detail.id}`} />
      {
        detail.isPrivate && (
          <Popover
            openDelay={100}
            trigger="hover"
            placement="top"
            theme="dark"
            content={<span>{t('private_xx', t('label.picture'))}</span>}
          >
            <LockIcon>
              <Lock size={14} color="#fff" />
            </LockIcon>
          </Popover>
        )
      }
      <LikeContent
        transformTemplate={({ scale }: any) => `translate(0, 0) scale(${scale})`}
        whileHover={{ scale: 1 }}
        whileTap={{ scale: 0.94 }}
        onClick={onLike}
      >
        <HeartIcon
          size={16}
          color={colors.danger}
          islike={detail.isLike ? 1 : 0}
        />
        <p>{detail.likedCount}</p>
      </LikeContent>
      <InfoBox>
        <UserBox>
          <UserPopper username={detail.user.username}>
            <div style={{ fontSize: 0 }}>
              <A
                route={`/@${detail.user.username}`}
              >
                <Avatar
                  badge={detail.user.badge}
                  lazyload
                  src={detail.user.avatar}
                  size={32}
                />
              </A>
            </div>
          </UserPopper>
          <UserName
            route={`/@${detail.user.username}`}
          >
            <EmojiText
              text={detail.user.fullName}
            />
          </UserName>
        </UserBox>
        <HandleBox>
          {/* {
            isLogin
            && <LikeButton isLike={detail.isLike} onLike={onLike} />
          } */}
        </HandleBox>
      </InfoBox>
      <PictureImage lazyload={lazyload} detail={detail} {...restProps} />
    </ItemWrapper>
  );
});

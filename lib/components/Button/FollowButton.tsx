import React, { useMemo } from 'react';
import styled, { css } from 'styled-components';
import { observer } from 'mobx-react';

import { theme } from '@lib/common/utils/themes';
import { ArrowHorizontal, StrutAlign } from '@lib/icon';
import { useTranslation } from '@lib/i18n/useTranslation';
import { rem, darken } from 'polished';
import { UserEntity } from '@lib/common/interfaces/user';
import { useAccountStore } from '@lib/stores/hooks';
import { IButtonProps, Button } from '.';

interface IProps extends IButtonProps {
  isFollowing: number;
  user: UserEntity;
}

const LButton = styled(Button)<{ isFollowing: number; unContent: string }>`
  padding-left: ${rem(22)};
  padding-right: ${rem(22)};
  font-weight: 600;
  background-color: ${theme('colors.primary')};
  color: #fff;
  cursor: pointer;
  text-align: center;
  :hover {
    background-color: ${_ => darken(0.05, theme('colors.primary')(_))};
  }
  ${_ => (_.isFollowing !== 0 ? css`
    background-color: ${theme('colors.gray')(_)};
    color: ${theme('colors.secondary')(_)};
    &:hover {
      background-color: ${darken(0.05, theme('colors.gray')(_))};
    }
  ` : css``)}
  > span {
    display: inline-block;
    /* width: 100%; */
  }
`;

export const FollowButton: React.FC<IProps> = observer(({
  isFollowing, user, ...rest
}) => {
  const { t } = useTranslation();
  const { userInfo } = useAccountStore();
  const isMe = useMemo(() => userInfo && userInfo.username === user.username, [user.username, userInfo]);
  let content = t('follow.btn.follow');
  if (isFollowing === 1) content = t('follow.btn.following');
  if (isFollowing === 2) content = t('follow.btn.mutual_following');
  // 不允许自己关注自己，直接隐藏
  if (isMe) return null;
  return (
    <LButton
      {...rest}
      type="primary"
      shape="round"
      unContent={t('follow.btn.un_follow')}
      isFollowing={isFollowing}
      icon={isFollowing === 2 && (<ArrowHorizontal style={{ marginRight: rem(6) }} size={11} />)}
    >
      {content}
    </LButton>
  );
});

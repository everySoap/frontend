import React, { ReactElement } from 'react';

import styled from 'styled-components';
import { rem } from 'polished';
import { theme } from '@lib/common/utils/themes';
import { HelpCircle, StrutAlign } from '@lib/icon';
import { useTranslation } from '@lib/i18n/useTranslation';
import { customBreakpoints, customMedia } from '@lib/common/utils/mediaQuery';
import Modal, { IModalProps } from '../Modal';
import { Button, IButtonProps } from '../Button';

interface IConfirmProps extends IModalProps {
  title: string;
  confirmLoading?: boolean;
  confirmText?: string;
  confirmIcon?: ReactElement;
  confirmProps?: IButtonProps;
  cancelText?: string;
  cancelProps?: IButtonProps;
}

const StyleModal = styled(Modal)`
  max-width: ${rem(420)} !important;
  ${customMedia.lessThan('mobile')`
      max-width: calc(100% - ${rem(32)});
      /* margin: 0; */
  `}
`;

const Title = styled.span`
  font-weight: 600;
  font-size: ${_ => rem(theme('fontSizes[2]')(_))};
  line-height: 1.4;
`;

const Content = styled.div`
  display: flex;
  ${customMedia.lessThan('medium')`
    flex-direction: column;
    align-items: center;
  `}
`;

const BtnGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: ${rem(32)};
  & > :last-child {
    margin-left: ${rem(12)};
  }
  ${customMedia.lessThan('medium')`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: ${rem(8)};
    & > :last-child {
      margin-left: 0;
    }
  `}
`;

const HelpIcon = styled(HelpCircle)`
  margin-right: ${rem(24)};
  ${customMedia.lessThan('medium')`
    margin-right: 0;
    margin-bottom: ${rem(12)};
    width: 34px;
    height: 34px;
  `}
`;

export const Confirm: React.FC<IConfirmProps> = ({
  visible,
  onClose,
  title,
  cancelText,
  cancelProps = {},
  confirmIcon,
  confirmProps = {},
  confirmText,
  confirmLoading,
}) => {
  const { t } = useTranslation();
  return (
    <StyleModal
      fullscreen={false}
      visible={visible}
      onClose={onClose}
    >
      <Content>
        <HelpIcon color="#faad14" size={22} />
        <div>
          <Title>{title}</Title>
        </div>
      </Content>
      <BtnGroup>
        <Button
          {...cancelProps}
          onClick={onClose}
        >
          {cancelText || t('btn.cancel')}
        </Button>
        <Button icon={confirmIcon} {...confirmProps} type="primary" loading={confirmLoading}>
          {confirmText || t('btn.ok')}
        </Button>
      </BtnGroup>
    </StyleModal>
  );
};

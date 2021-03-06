import React, { useMemo } from 'react';
import { observer } from 'mobx-react';

import { ICustomNextContext, ICustomNextPage, IBaseScreenProps } from '@lib/common/interfaces/global';
import { PictureList } from '@lib/containers/Picture/List';
import { useTranslation } from '@lib/i18n/useTranslation';
import { getTitle, server } from '@lib/common/utils';
import { useScreenStores, useAccountStore } from '@lib/stores/hooks';
import { SEO, Nav, NavItem } from '@lib/components';
import { errorFilter } from '@lib/common/utils/error';

const Index: ICustomNextPage<IBaseScreenProps, {}> = observer(() => {
  const { t } = useTranslation();
  const { homeStore } = useScreenStores();
  const { isLogin } = useAccountStore();
  const {
    list, like, getPageList, isNoMore, restQuery,
  } = homeStore;
  const title = useMemo(() => getTitle(`home.nav.${restQuery.type.toLocaleLowerCase()}`, t), [restQuery.type, t]);
  return (
    <div>
      <SEO
        title={title}
        description="有趣的方式来和小伙伴分享你生活的照片。"
      />
      <Nav>
        <NavItem route="/">
          {t('home.nav.new')}
        </NavItem>
        <NavItem route="/hot">
          {t('home.nav.hot')}
        </NavItem>
        <NavItem route="/choice">
          {t('home.nav.choice')}
        </NavItem>
        {
          isLogin && (
            <NavItem route="/feed">
              {t('home.nav.feed')}
            </NavItem>
          )
        }
      </Nav>
      <PictureList
        noMore={isNoMore}
        onPage={getPageList}
        like={like}
        data={list}
      />
    </div>
  );
});

Index.getInitialProps = async ({ mobxStore, route, res }: ICustomNextContext) => {
  const { appStore, screen, accountStore } = mobxStore;
  const { params } = route;
  const { type } = params as Record<string, string>;
  const { homeStore } = screen;
  const { location } = appStore;
  const isPop = location && location.action === 'POP' && !server;
  let newType = (type || '').toLocaleLowerCase();
  if (!newType) {
    newType = 'new';
  }
  if (newType === 'feed' && !accountStore.isLogin && res) {
    res.redirect('/');
  }
  homeStore.setType(newType);
  try {
    if (isPop) {
      await homeStore.getListCache();
    } else {
      await homeStore.getList(false);
    }
    return {};
  } catch (err) {
    return errorFilter(err);
  }
};

export default Index;

import { AppRootProps, NavModelItem } from '@savantly/sprout-api';
import React, { useEffect } from 'react';
import { Route, Routes, useInRouterContext } from 'react-router-dom';
import { DynamicModuleLoader } from 'redux-dynamic-modules';
import FormEditor from './components/FormEditor';
import CreateFormPage from './components/pages/CreateFormPage';
import FormListPage from './components/pages/FormListPage';
import InfoPage from './components/pages/InfoPage';
import { getFormStateModule } from './state/FormStateModule';

interface Props extends AppRootProps { }

const TAB_CREATE = 'create';
const TAB_LIST = 'list';
const TAB_DEFAULT = 'default';

export const FormsRootPage = ({ path, onNavChanged, query, meta }: Props) => {
  useEffect(() => {
    const tabs: NavModelItem[] = [];
    tabs.push({
      text: 'Info',
      icon: 'fa fa-fw fa-file-text-o',
      url: '',
      id: TAB_DEFAULT,
    });
    tabs.push({
      text: 'List Forms',
      icon: 'fa fa-fw fa-file-text-o',
      url: TAB_LIST,
      id: TAB_LIST,
    });
    tabs.push({
      text: 'Edit Form',
      icon: 'fa fa-fw fa-file-text-o',
      url: 'form/123/edit',
      id: 'edit',
    });
    tabs.push({
      text: 'Create Forms',
      icon: 'fa fa-fw fa-file-text-o',
      url: TAB_CREATE,
      id: TAB_CREATE,
    });

    //const activeTab = query.tab || TAB_LIST;
    //tabs.forEach(tab => (tab.active = activeTab === tab.id));

    const node = {
      text: 'Form Management',
      img: `${meta.baseUrl}/${meta.info.logos.large}`,
      subTitle: 'Create and delete forms for the website',
      url: path,
      children: tabs,
    };

    // Update the page header
    onNavChanged({
      node: node,
      main: node,
    });
  }, [meta]);

  return (
    <div>
      <DynamicModuleLoader modules={[getFormStateModule()]}>
        <Routes>
          <Route path='list' element={<FormListPage />} />
          <Route path='create' element={<CreateFormPage />} />
          <Route path='form/:formId/edit' element={<FormEditor />} />
          <Route path='*' element={<InfoPage />} />
        </Routes>
      </DynamicModuleLoader>
    </div>
  );
};

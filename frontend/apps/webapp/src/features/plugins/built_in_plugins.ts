import { PanelPluginMeta, PluginMeta, PluginType } from '@savantly/sprout-api';
import * as textPanel from '../../plugins/panel/text/module';
import * as welcomeBanner from '../../plugins/panel/welcome/module';
import * as iframePanel from '../../plugins/panel/iframe/module';
import * as queryPanel from '../../plugins/panel/query/module';

const builtInPluginIndex: any = {
  '/plugins/panel/text/module': textPanel,
  '../../plugins/panel/welcome/module': welcomeBanner,
  '/plugins/panel/iframe/module': iframePanel,
  '/plugins/panel/query/module': queryPanel
};

const textPanelMeta: PanelPluginMeta = {
  baseUrl: '/plugins/panel/text',
  id: 'text',
  module: '/plugins/panel/text/module',
  info: {
    author: {
      name: 'Grafana Labs'
    },
    description: 'A simple text panel',
    links: [],
    logos: {
      large: '/plugins/panel/text/img/icn-text-panel.svg',
      small: '/plugins/panel/text/img/icn-text-panel.svg'
    },
    screenshots: [],
    updated: '2020-09-29',
    version: '0.0.1'
  },
  name: 'Text Panel',
  type: PluginType.panel,
  sort: 0
};

const iFramePanelMeta: PanelPluginMeta = {
  baseUrl: '/plugins/panel/iframe',
  id: 'iframe',
  module: '/plugins/panel/iframe/module',
  info: {
    author: {
      name: 'Savantly'
    },
    description: 'A simple iframe panel',
    links: [],
    logos: {
      large: '/plugins/panel/iframe/img/icn-text-panel.svg',
      small: '/plugins/panel/iframe/img/icn-text-panel.svg'
    },
    screenshots: [],
    updated: '2020-11-14',
    version: '0.0.1'
  },
  name: 'IFrame Panel',
  type: PluginType.panel,
  sort: 0
};

const queryPanelMeta: PanelPluginMeta = {
  baseUrl: '/plugins/panel/query',
  id: 'query',
  module: '/plugins/panel/query/module',
  info: {
    author: {
      name: 'Savantly'
    },
    description: 'A Panel that querys any URL with optional parameters',
    links: [],
    logos: {
      large: '/plugins/panel/query/img/icn-text-panel.svg',
      small: '/plugins/panel/query/img/icn-text-panel.svg'
    },
    screenshots: [],
    updated: '2020-12-06',
    version: '0.0.1'
  },
  name: 'Query Panel',
  type: PluginType.panel,
  sort: 0
};

export const builtInPluginMeta = {
  text: textPanelMeta,
  iframe: iFramePanelMeta,
  query: queryPanelMeta
};

export default builtInPluginIndex;

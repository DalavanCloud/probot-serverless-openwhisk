/*
 * Copyright 2018 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

/* eslint-env mocha */
/* eslint-disable global-require */
process.env.LOG_LEVEL = 'debug';

const assert = require('assert');
const { OpenWhiskWrapper, defaultsApp } = require('../index.js');
const pkgJson = require('../package.json');

describe('OpenWhisk Wrapper - Defaults', () => {
  it('Delivers PING', async () => {
    // eslint-disable-next-line no-new
    const main = new OpenWhiskWrapper()
      .withGithubPrivateKey('dummy')
      .create();

    const result = await main({
      __ow_method: 'get',
      __ow_path: '/ping',
    });

    delete result.headers.date;
    delete result.headers['x-request-id'];
    assert.deepEqual(result, {
      body: 'PONG',
      headers: {
        'cache-control': 'no-store, must-revalidate',
        connection: 'close',
        'content-length': '4',
        'x-powered-by': 'Express',
      },
      statusCode: 200,
    });
  });

  it('Redirects to default view', async () => {
    // eslint-disable-next-line no-new
    const main = new OpenWhiskWrapper()
      .withGithubPrivateKey('dummy')
      .withApp(defaultsApp)
      .create();

    const result = await main({
      __ow_method: 'get',
      __ow_path: '/',
    });
    delete result.headers.date;
    delete result.headers['x-request-id'];
    assert.deepEqual(result, {
      body: 'Found. Redirecting to /wskbot',
      headers: {
        'cache-control': 'no-store, must-revalidate',
        connection: 'close',
        'content-length': '29',
        'content-type': 'text/plain; charset=utf-8',
        location: '/wskbot',
        vary: 'Accept',
        'x-powered-by': 'Express',
      },
      statusCode: 302,
    });
  });

  it('Can deliver default view', async () => {
    // eslint-disable-next-line no-new
    const main = new OpenWhiskWrapper()
      .withGithubPrivateKey('dummy')
      .withApp(defaultsApp)
      .create();

    const result = await main({
      __ow_method: 'get',
      __ow_path: '/wskbot',
    });
    const match = `<h1>${pkgJson.name} v${pkgJson.version}</h1>`;
    assert.ok(result.body.indexOf(match) > 0);
  });

  it('Can use default view', async () => {
    // eslint-disable-next-line no-new
    const main = new OpenWhiskWrapper()
      .withGithubPrivateKey('dummy')
      .withApp(defaultsApp)
      .create();

    const result = await main({
      __ow_method: 'get',
      __ow_path: '/wskbot',
    });
    const match = `<h1>${pkgJson.name} v${pkgJson.version}</h1>`;
    assert.ok(result.body.indexOf(match) > 0);
  });
});
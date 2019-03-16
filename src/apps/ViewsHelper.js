/*
 * Copyright 2019 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
const path = require('path');
const express = require('express');

class ViewsHelper {
  constructor() {
    this._views = [];
    this._statics = [];
  }

  withView(route, template) {
    this._views[route] = template;
    return this;
  }

  withStaticDir(route, dir) {
    this._statics[route] = path.resolve(process.cwd(), dir);
    return this;
  }

  register() {
    return this.init.bind(this);
  }

  init(app) {
    const router = app.route();
    Object.keys(this._views).forEach((route) => {
      const view = this._views[route];
      app.log.info('register view: %s -> %s', route, view);
      router.get(route, async (req, res) => {
        res.render(view);
      });
    });

    Object.keys(this._statics).forEach((route) => {
      const dir = this._statics[route];
      app.log.info('register static: %s -> %s', route, dir);
      router.use(route, express.static(dir));
    });
  }
}
module.exports = ViewsHelper;

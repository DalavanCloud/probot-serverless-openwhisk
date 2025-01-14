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
const fs = require('fs');

const { name, version } = JSON.parse(fs.readFileSync('package.json', 'utf8'));

module.exports = `
<!DOCTYPE html>
<html lang="en" class="height-full">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${name} | built with Probot</title>
  </head>
  <body>
    <h1>${name} v${version}</h1>
    <p>This bot was built using <a href="https://github.com/probot/probot">Probot</a>, a framework for building GitHub Apps.</p>
    <p><a href="https://probot.github.io/docs/" class="btn btn-outline mr-2">Documentation</a></p>
    <p><a href="https://probot-slackin.herokuapp.com/" class="btn btn-outline">Chat on Slack</a></p>
  </body>
</html>
`;

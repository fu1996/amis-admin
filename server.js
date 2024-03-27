const express = require('express');
const http = require('http');
const path = require('path');
const reload = require('reload');
const bodyParser = require('body-parser');
const logger = require('morgan');

// 创建一个express实例
const app = express();

// 设置端口号
app.set('port', process.env.PORT || 4000);
// 设置日志
app.use(logger('dev'));
// 设置解析body
app.use(bodyParser.json()); // Parses json, multi-part (file), url-encoded

// 设置静态资源
app.use('/public', express.static('public'));
app.use('/pages', express.static('pages'));

// 设置所有请求都返回index.html
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// 创建一个http服务器
const server = http.createServer(app);

// 启动重载
// Reload code here
reload(app)
  .then(function (reloadReturned) {
    // reloadReturned is documented in the returns API in the README

    // Reload started, start web server
    server.listen(app.get('port'), function () {
      console.log(
        'Web server listening on port http://localhost:' + app.get('port')
      );
    });
  })
  .catch(function (err) {
    console.error(
      'Reload could not start, could not start server/sample app',
      err
    );
  });
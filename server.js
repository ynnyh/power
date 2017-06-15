var http = require('http');
var url = require('url');
var fs = require('fs');
var querystring = require('querystring');
var contentType = require('./contentType');

var server = http.createServer(function (sreq, sres) {
  var urlParts = url.parse(sreq.url);    //    解析路径
  var pathname = urlParts.pathname;

  //  获取文件后缀名
  var pointPosition = pathname.lastIndexOf('.');
  var mmieString = pathname.substring(pointPosition + 1);
  var mimeType = '';
  var cacheflg = false;
  //  这里可以扩展MIME的类型
  switch (mmieString) {
    case 'css':
      mimeType = 'text/css';
      cacheflg = true;
      break;
    case 'png':
      cacheflg = true;
      mimeType = 'image/png';
      break;
    case 'jade':
      mimeType = 'text/html';
      break;
    case 'html':
      mimeType = 'text/html';
      break;
    default:
      mimeType = 'text/plain';
  }
  //  固定参数，本示例是用的ajax请求，此处是将ajax的post参数写死，测试成功后，进一步接收参数。
  //  var post_data = querystring.stringify({
  //  func_id:'20000',
  //  pagesize:'24',
  //  pageindex:'0',
  //  username:'admin',
  //  pwd:'1234qwer',
  //  co:'62c8ad0a15d9d1ca38d5dee762a16e01'
  //  });

  //  只有oauth路径下的请求会被转发
  if (pathname.match(/\/oauth/) != null) {
    console.log('转发请求。。。。');
    var opts = {
      host: '192.168.1.170',
      port: 7081,
      path: urlParts.pathname,
      headers: sreq.headers,
      method: sreq.method
    };
    var content = '';

    sreq.on('data', function (data) {
      // 接收参数 ------ sreq.on("data",function(data){});接收html中ajax传递的参数
      var req = http.request(opts, function (res) {
        res.setEncoding('utf8');
        res.on('data', function (body) {
          console.log('return');
          content += body;
        }).on('end', function () {
          //  返回给前台
          if (res.headers != null && res.headers['set-cookie'] != null) {
            //  console.log("=======res.headers.cookie======="+res.headers.cookie);
            sres.writeHead(200, {
              'Content-Type': 'text/html',
              'Set-Cookie': res.headers['set-cookie']
            });
            //  将cookie放到response中
          } else {
            sres.writeHead(200, {'Content-Type': 'text/html'});
          }
          sres.write(content);
          sres.end();
        });
      });
      req.on('error', function (e) {
        console.log('Got error: ' + e.message);
      });
      //  console.log("固定参数===="+post_data);
      //  console.log("接收参数===="+data+"\n");
      if (sreq.headers.cookie != null) {
        req.setHeader('Cookie', sreq.headers.cookie);
      }
      // 获取request中的cookie</span>

      req.write(data + '\n');
      req.end();
    });
  } else {
    var realPath = 'e:' + pathname;
    //  前台的html需放到e:下
    fs.exists(realPath, function (exists) {
      if (!exists) {
        sres.writeHead(404, {'Content-Type': 'text/plain'});
        sres.write('404 not found.');
        // sres.end(data,'utf-8');
      } else {
        fs.readFile(realPath, 'binary', function (err, file) {
          if (err) {
            sres.writeHead(500, {'Content-Type': 'text/plain'});
            sres.end(err);
          } else {
            sres.writeHead(200, {'Content-Type': mimeType})
            sres.write(file, 'binary');
            sres.end();
          }
        });
      }
    });
  }
});
server.listen(8080, '127.0.0.1', function () {
  //  监听端口8080
  console.log('开始监听' + server.address().port + '......');
});
//  启用时输入node server.js,网站地址写http://localhost:8080/esp-pms-webapp/index.html
process.on('uncatchException', function (e) {
  console.log(e);
  process.exit(1);
});
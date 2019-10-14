/*
 * 
 * 
 * 
 * 
 *
 * One hundred thousand 
 * 
 * 
 * 
 * 
 * 
 */
import "../stylesheets/index.min.css";
import json from "../json/conf.json";
let xml = new XMLHttpRequest(),
    httpData = 'https://case.cbcoffee.cn/',
    filePush = 'http://test.cbcoffee.cn:8085/upload_file',
    assign = localStorage.getItem('token'),
    nextId = null,
    prevId = null,
    index = null,
    _eq = "",
    forShow = false,
    win = window, title = document.getElementsByClassName('title')[0],
    centent = document.getElementsByClassName('content-box')[0],
    next = document.getElementsByClassName('next')[0],
    photo = document.getElementsByClassName('photo')[0],
    prev = document.getElementsByClassName('prev')[0],
    loading = document.getElementsByClassName('module')[0],
    axios = require('axios'); //全局;

document.addEventListener("DOMContentLoaded", function () {
    json.forEach($e => {
        if ($e.pageId == 0) {
            index = 0;
            title.innerHTML = $e.question.title; //题目抬头
            $e.question.choice.forEach(($_, eq) => {  //选项列表
                _eq += `<li> <input type="radio" name="choice" ${eq == 0 ? 'checked=checked' : ''} data-topid="${$_.topId}"  data-lastid="${$_.lastId}" id="${eq}"><label for="${eq}"> ${$_.key} </label></li>`
            });
            centent.innerHTML = _eq;
            document.querySelectorAll('input').forEach((name, index) => {
                if (name.getAttribute('name') == 'choice') {
                    if (document.getElementsByTagName('input')[index].getAttribute('checked')) {
                        nextId = document.getElementsByTagName('input')[index].getAttribute('data-lastId');
                        prevId = document.getElementsByTagName('input')[index].getAttribute('data-topId');
                        next.setAttribute('data-value', nextId);
                        prev.setAttribute('data-value', prevId);
                    }
                }
            });
            document.querySelectorAll('li').forEach((elements, index) => {
                elements.addEventListener('click', _ele_ => {
                    _ele_.path[0].dataset['topid'] ? checkedBox({
                        topId: _ele_.path[0].dataset['topid'],
                        lastId: _ele_.path[0].dataset['lastid']
                    }) : null;
                })
            })
            prev.style.display = 'none';
            next.style.width = '100%';
        };
        return false;
    })
    document.getElementsByClassName('next')[0].addEventListener('click', function (e) {  //下一步的操作
        getCententsPage(this.getAttribute('data-value'));

    });
    document.getElementsByClassName('prev')[0].addEventListener('click', function (e) {  //上一步的操作
        getCententsPage(this.getAttribute('data-value'));

    })
    // xml.open('GET', httpData + 'create_maintain_flow?userId=891&userToken=1a2039f53653e2ea8bdcbb4cbb7d69ba', false);
    // xml.send();

    document.getElementsByClassName('push')[0].addEventListener('click', function (e) {  //上传图片
        document.getElementsByClassName('fileReader')[0].click();
        document.getElementsByClassName('fileReader')[0].onchange = function (e) {
            loading.style.display = 'block';
            var localFile = this.files[0];
            var reader = new FileReader();
            var content;
            reader.onload = function (event) {
                content = event.target.result;
                compress(content, 450, function (contentFile) {
                    // push image
                    let _$file = new FormData();
                    _$file.append('maintainerId', 41);
                    _$file.append('type', 18);
                    _$file.append('file', contentFile, 'cc.png');
                    axios({
                        method: "POST",
                        url: filePush,
                        data: _$file,
                        processData: false, //必不可少参数
                        traditional: true, //比不可少参数
                        contentType: false,//比不可少参数
                        headers: {
                          "Content-Type": false
                        //   headers: {'Content-Type':'application/x-www-form-urlencoded'}
                        },
                        onUploadProgress:function(progressEvent){ //原生获取上传进度的事件
                            if(progressEvent.lengthComputable){
                                //属性lengthComputable主要表明总共需要完成的工作量和已经完成的工作是否可以被测量
                                //如果lengthComputable为false，就获取不到progressEvent.total和progressEvent.loaded
                                if(progressEvent.total % progressEvent.loaded == +false){
                                    setTimeout(()=>{
                                        loading.style.display = 'none';
                                    },2000)
                                }
                            }
                        }
                      }).then(
                        response => {
                            let _imgBox = document.createElement('figure'), _img = document.createElement('img'), _clone = document.createElement('svg'), _use = document.createElement('use');
                            _imgBox.className = 'hash[imageBox]';
                            _img.src = response.data.realPath;
                            _imgBox.appendChild(_img);
                            _clone.className = 'icon';
                            _clone.setAttribute('aria-hidden', "true");
                            _use.setAttribute('xlink:href', "#ym-icon-guanbi");
                            _clone.appendChild(_use);
                            _imgBox.appendChild(_clone);
                            photo.appendChild(_imgBox);
                        }
                      ).catch((error) => {
                        console.log(error);
                      })
                });
            };
            reader.onerror = function () {
                alert("error");
            };
            reader.readAsDataURL(localFile, "UTF-8");
        }
    });
})

function compress(content, size, callback) {  //压缩拍摄上传
    if (content.length <= size * 1024) {
        callback(dataURItoBlob(content));
        return;
    }
    let canvas = document.createElement("canvas");
    let ctx = canvas.getContext("2d");
    let img = new Image();
    img.src = content;
    img.onload = function () {
        let width = img.width;
        let height = img.height;
        canvas.width = width;
        canvas.height = height;
        // 铺底色
        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, width, height);
        ctx.drawImage(img, 0, 0, width, height);
        let rate = (1024 * size) / content.length;
        console.log(content.length * 1024);
        //进行压缩
        content = canvas.toDataURL("image/jpeg", 0.2);
        console.log(content.length * 1024);
        let blob = dataURItoBlob(content);
        callback(blob);
    };
}
/**
 * base64 转二进制文件
 * @param {*} base64Data 
 */
function dataURItoBlob(base64Data) {
    var bytes = window.atob(base64Data.split(',')[1]); //去掉url的头，并转换为byte

    //处理异常,将ascii码小于0的转换为大于0
    var ab = new ArrayBuffer(bytes.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < bytes.length; i++) {
        ia[i] = bytes.charCodeAt(i);
    }

    return new Blob([ab], {
        type: 'image/png'
    });
}


function getCententsPage(params) {  //填报进度
    _eq = "", index = params;
    json.forEach($e => {
        if (nextId && prevId) {
            if ($e.pageId == params) {
                title.innerHTML = $e.question.title.replace('$', '<input class="_int_" type="number">'); //题目抬头
                new RegExp("10|11|12|13|15|16|18|19|20|21|22").test($e.pageId) ? forShow = true : forShow = false;
                $e.question.choice.forEach(($_, eq) => {  //选项列表
                    _eq += `<li> <input type="radio" name="choice" ${eq == 0 ? 'checked=checked' : ''}
                    data-topId="${$_.topId}"  data-lastId="${$_.lastId}"
                    id="${eq}">${!forShow ? `<label for="${eq}"> ${$_.key.replace("$", '<input class="_int_" type="number">')} </label>`
                    : `<div> ${$_.key.replace("$", '<input class="_int_" type="number">')} </div>`} </li>`;
                });
                if($e.pageId == 3 || $e.pageId == 9 || $e.pageId == 12 || $e.pageId == 20){  //判断是否需要上传图片
                    photo.style.display = 'block';
                }else{
                    photo.style.display = 'none';
                }
                centent.innerHTML = _eq;
                document.querySelectorAll('input').forEach((name, index) => {
                    if (name.getAttribute('name') == 'choice') {
                        if (document.getElementsByTagName('input')[index].getAttribute('checked')) {
                            nextId = document.getElementsByTagName('input')[index].getAttribute('data-lastId');
                            prevId = document.getElementsByTagName('input')[index].getAttribute('data-topId');
                            next.setAttribute('data-value', nextId);
                            prev.setAttribute('data-value', prevId);
                        }
                    }
                });
                document.querySelectorAll('li').forEach((elements, index) => {
                    elements.addEventListener('click', _ele_ => {
                        _ele_.path[0].dataset['topid'] ? checkedBox({
                            topId: _ele_.path[0].dataset['topid'],
                            lastId: _ele_.path[0].dataset['lastid']
                        }) : null;
                    })
                })
            };
        }
    });
    if(params == 0 || params == 22){   //进度不同的按钮文字提示
        prev.style.display = 'none';
        next.style.width = '100%';
        params == 22 ? (()=>{
            next.innerHTML = `完成`;
            next.addEventListener('click', () =>{
                WeixinJSBridge.call('closeWindow');
            }, true)
        })() : null;
    }else{
        prev.style.display = 'block';
        next.style.width = '33.33%';
    }
}

function checkedBox(params) {  //切换选择项目的任务继续Page ID fBizJ8
    nextId = params.lastId;
    prevId = params.topId;
    next.setAttribute('data-value', nextId);
    prev.setAttribute('data-value', prevId);
}
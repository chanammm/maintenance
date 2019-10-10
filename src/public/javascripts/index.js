import "../stylesheets/index.min.css";
import json from "../json/conf.json";
let xml = new XMLHttpRequest(),
    httpData = 'https://case.cbcoffee.cn/',
    nextId = null,
    prevId = null,
    _eq = "",
    win = window, title = document.getElementsByClassName('title')[0],
    centent = document.getElementsByClassName('content-box')[0],
    next = document.getElementsByClassName('next')[0],
    prev = document.getElementsByClassName('prev')[0]; //全局;

document.addEventListener("DOMContentLoaded", function () {
    json.forEach($e => {
        if ($e.pageId == 0) {
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
        };
        return false;
    })
    document.getElementsByClassName('next')[0].addEventListener('click', function (e) {
        getCententsPage(this.getAttribute('data-value'));
    });
    document.getElementsByClassName('prev')[0].addEventListener('click', function (e) {
        getCententsPage(this.getAttribute('data-value'));
    })
    // xml.open('GET', httpData + 'create_maintain_flow?userId=891&userToken=1a2039f53653e2ea8bdcbb4cbb7d69ba', false);
    // xml.send();

    document.getElementsByClassName('push')[0].addEventListener('click', function (e) {  //上传图片
        document.getElementsByClassName('fileReader')[0].click();
        document.getElementsByClassName('fileReader')[0].onchange = function (e) {
            var localFile = this.files[0];
            console.log(this.files[0])
            var reader = new FileReader();
            var content;
            reader.onload = function (event) {
                content = event.target.result;
                compress(content, 450, function (content0) {
                    console.log("final=" + content0.length / 1024 + "KB");
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
        callback(content);
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
        document.getElementsByClassName('old')[0].src = content;
        //进行压缩
        content = canvas.toDataURL("image/jpeg", 0.2);
        document.getElementsByClassName('new')[0].src = content;
        callback(content);
    };
}

function getCententsPage(params) {  //填报进度
    _eq = "";
    json.forEach($e => {
        if (nextId && prevId) {
            if ($e.pageId == params) {
                title.innerHTML = $e.question.title.replace('$', '<input class="_int_" type="number">'); //题目抬头
                $e.question.choice.forEach(($_, eq) => {  //选项列表
                    _eq += `<li> <input type="radio" name="choice" ${eq == 0 ? 'checked=checked' : ''} data-topId="${$_.topId}"  data-lastId="${$_.lastId}" id="${eq}"><label for="${eq}"> ${$_.key.replace("$", '<input class="_int_" type="number">')} </label></li>`
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
            };
        }
    })
}

function checkedBox(params) {
    nextId = params.lastId;
    prevId = params.topId;
    next.setAttribute('data-value', nextId);
    prev.setAttribute('data-value', prevId);
}
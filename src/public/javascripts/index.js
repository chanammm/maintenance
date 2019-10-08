import "../stylesheets/index.min.css";
import json from "../json/conf.json";

document.addEventListener("DOMContentLoaded", function () {
    getCententsPage();
    document.getElementsByClassName('next')[0].addEventListener('click', function (e) {
        // getCententsPage(e.value);
        console.log(this)
    })


    
    document.getElementsByClassName('push')[0].addEventListener('click', function (e) {  //上传图片
        document.getElementsByClassName('fileReader')[0].click();
        document.getElementsByClassName('fileReader')[0].onchange = function (e) {
            var localFile = this.files[0];
            console.log(this.files[0])
            var reader = new FileReader();
            var content;
            reader.onload = function (event) {
                content = event.target.result;
                compress(content, 10, function (content0) {
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

function compress(content, size, callback) {
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
        console.log("size=" + size + " rate=" + rate);
        console.log("**压缩前**" + content.length / 1024 + "KB");
        document.getElementsByClassName('old')[0].innerHTML = content.length / 1024 + "KB"
        //进行压缩
        content = canvas.toDataURL("image/jpeg", rate);
        console.log("**压缩后**" + content.length / 1024 + "KB");
        document.getElementsByClassName('new')[0].innerHTML = content.length / 1024 + "KB"
        callback(content);
    };
}

function getCententsPage(params) {
    let win = window, title = document.getElementsByClassName('title')[0], centent = document.getElementsByClassName('content-box')[0], _eq = ""; //全局
    json.forEach(($e, index) => {
        if (sessionStorage.getItem('cookies')) {
            if ($e.pageId == sessionStorage.getItem('cookies')) {
                title.innerHTML = $e.question.title;
                $e.question.choice.forEach(($_, eq) => {
                    _eq += `<li data-lastId="${$_.lastId}" data-topId="${$_.topId}"> <input type="radio" name="choice" id="${eq}"><label for="${eq}"> ${$_.key} </label><li>`
                });
                centent.innerHTML = _eq;
            };
        } else {
            if ($e.pageId == 0) {
                title.innerHTML = $e.question.title;
                $e.question.choice.forEach(($_, eq) => {
                    _eq += `<li data-lastId="${$_.lastId}" data-topId="${$_.topId}"> <input type="radio" name="choice" id="${eq}"><label for="${eq}"> ${$_.key} </label><li>`
                });
                centent.innerHTML = _eq;
            };
        }
    })
}
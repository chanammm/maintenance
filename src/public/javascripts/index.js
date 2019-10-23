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
import $ from './jquery-3.2.1.min';
let httpData = 'https://case.cbcoffee.cn/',
    filePush = 'http://test.cbcoffee.cn:8085/upload_file',
    nextId = null,
    prevId = null,
    index = null,
    radioVal = -1,
    createMaintenance = false,  //创建新的流程
    assign = JSON.parse(localStorage.getItem('assign')),
    _eq = "",
    forShow = false,
    _clpage = [],  //点击上一页的数组
    flowType = 2, //默认的运维类型
    win = window,
    title = document.getElementsByClassName('title')[0],
    centent = document.getElementsByClassName('content-box')[0],
    next = document.getElementsByClassName('next')[0],
    photo = document.getElementsByClassName('photo')[0],
    prev = document.getElementsByClassName('prev')[0],
    loading = document.getElementsByClassName('module')[0],
    axios = require('axios'); //全局;

document.addEventListener("DOMContentLoaded", function () {
    sessionStorage.setItem('hasFlow', assign.hasFlow); //0不存在、1存在流程
    if (assign.hasFlow != +true) {  //不存在未完成的运维流程
        json.forEach($e => {
            if ($e.pageId == +false) {
                index = 0;
                title.innerHTML = $e.question.title; //题目抬头
                $e.question.choice.forEach(($_, eq) => {  //选项列表
                    _eq += `<li> <input type="radio" name="choice" ${eq == 0 ? 'checked=checked' : ''} data-topid="${$_.topId}"  data-lastid="${$_.lastId}" id="${eq}"><label for="${eq}"> ${$_.key} </label></li>`
                });
                centent.setAttribute('data-page', $e.pageId + 1); //当前为1
                centent.setAttribute('data-type', $e.question.type); //当前为问题类型
                centent.innerHTML = _eq;
                prev.style.display = 'none';
                next.style.width = '100%';
                document.querySelectorAll('input').forEach((name, index) => {  //补料输入框
                    if (name.getAttribute('name') == 'choice') {
                        if (document.getElementsByTagName('input')[index].getAttribute('checked')) {
                            nextId = document.getElementsByTagName('input')[index].getAttribute('data-lastId');
                            prevId = document.getElementsByTagName('input')[index].getAttribute('data-topId');
                            next.setAttribute('data-value', nextId);
                            prev.setAttribute('data-value', prevId);
                            radioVal = document.getElementsByTagName('input')[index].parentNode.childNodes[2].innerHTML || -1; // 选择题的答案
                        }
                    }
                });
                document.querySelectorAll('li').forEach((elements, index) => {
                    elements.addEventListener('click', _ele_ => {
                        _ele_.path[0].dataset['topid'] ? checkedBox({  //答案切换时候的ID
                            topId: _ele_.path[0].dataset['topid'],
                            lastId: _ele_.path[0].dataset['lastid'],
                            key: _ele_.path[0].computedName
                        }) : null;
                    })
                })
            }
        });
    } else {  //有未完成流程
        sessionStorage.setItem('PageIds', sessionStorage.getItem('PageIds') ? sessionStorage.getItem('PageIds') : assign.questionIndex);  //缓存当前的页面Id
        getCententsPage(sessionStorage.getItem('PageIds'));  //默认显示第几个步骤
    }
    try {
        sessionStorage.getItem('PageIds') ? searchQuerytion({  //刷新 查看当前的问题答案
            id: assign.maintainFlowId ? assign.maintainFlowId : JSON.parse(sessionStorage.getItem('maintainFlow')).data.maintainFlowId,
            index: sessionStorage.getItem('PageIds')
        }) : null;
    } catch (error) {
        alert(error.message);
    }
    document.getElementsByClassName('next')[0].addEventListener('click', function (e) {  //下一步的操作
        sessionStorage.setItem('PageIds', centent.getAttribute('data-page'));  //缓存当前的页面Id
        _clpage = [];
        if (sessionStorage.getItem('_page_')) {
            _clpage = JSON.parse(sessionStorage.getItem('_page_'));
            _clpage.push(centent.getAttribute('data-page'));  //输入下一页页码的到数组
            sessionStorage.setItem('_page_', JSON.stringify(_clpage));
            let _pageArray_ = uniqueArray(JSON.parse(sessionStorage.getItem('_page_')));
            sessionStorage.setItem('_page_', JSON.stringify(_pageArray_));
        } else {
            _clpage.push(centent.getAttribute('data-page'));  //输入下一页页码的到数组
            sessionStorage.setItem('_page_', JSON.stringify(_clpage));
        }

        getCententsPage(this.getAttribute('data-value'), true);  //调用下一步的时候传递本次提交的page ID
        if (document.querySelectorAll('figure').length > 0) {  //存在图片组合的标签的时候 创建上传按钮
            photo.innerHTML = `<div class="push"></div><input class="fileReader" type="file" accept="image/*" style="display:none;" multiple="multiple">`;
        }
        document.getElementsByClassName('push')[0].addEventListener('click', fileImagePush);  //重置上传图片的按钮
    });
    document.getElementsByClassName('prev')[0].addEventListener('click', function (e) {  //上一步的操作
        let __page = sessionStorage.getItem('_page_');
        let _arr = __page ? JSON.parse(__page) : [];
        _arr.splice(-1, 1);
        _arr.length > 0 ? _arr.forEach(__value => {
            if (__value != this.getAttribute('data-value') || __value == +false) {
                sessionStorage.setItem('_page_', JSON.stringify(_arr));
                if (_arr.length < 1 && __value == +false) {
                    sessionStorage.removeItem('_page_');
                }
            }
        }) : sessionStorage.removeItem('_page_');
        getCententsPage(__page && JSON.parse(__page).length > 0 ? JSON.parse(__page).pop() : this.getAttribute('data-value'), false);
        searchQuerytion({  //上一步查询 此前提交的答案
            id: assign.maintainFlowId ? assign.maintainFlowId : JSON.parse(sessionStorage.getItem('maintainFlow')).data.maintainFlowId,
            index: this.getAttribute('data-value')
        })
    });
    document.getElementsByClassName('push')[0].addEventListener('click', fileImagePush);
});

function fileImagePush() {  //上传图片
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
                _$file.append('file', contentFile, 'machineNumber_' + Math.random() + '.png');
                axios({
                    method: "POST",
                    url: filePush,
                    data: _$file,
                    processData: false,
                    traditional: true,
                    contentType: false,
                    headers: {
                        "Content-Type": false
                    },
                    onUploadProgress: function (progressEvent) { //原生获取上传进度的事件
                        if (progressEvent.lengthComputable) {
                            //属性lengthComputable主要表明总共需要完成的工作量和已经完成的工作是否可以被测量
                            //如果lengthComputable为false，就获取不到progressEvent.total和progressEvent.loaded
                            if (progressEvent.total % progressEvent.loaded == +false) {
                                setTimeout(() => {
                                    loading.style.display = 'none';
                                }, 2000)
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
                        // _use.setAttribute('xlink:href', "#ym-icon-guanbi");
                        // _clone.appendChild(_use);
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
};

function uniqueArray(arr) {  //数组去重
    let obj = {};
    return arr.filter(function (item, index, arr) {
        return obj.hasOwnProperty(typeof item + item) ? false : (obj[typeof item + item] = true)
    })
}



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


function getCententsPage(params, bool) {  //填报进度
    sessionStorage.setItem('PageIds', sessionStorage.getItem('PageIds') ? sessionStorage.getItem('PageIds') : assign.questionIndex);  //缓存当前的页面Id
    _eq = "", index = params /* 全局参数 */;
    if (centent.getAttribute('data-page') - 1 != +false && bool) {  //优先获取 当前页面的Page ID
        createQuestion({  //提交进度内容
            maintainFlowLogId: assign.maintainFlowId ? assign.maintainFlowId : JSON.parse(sessionStorage.getItem('maintainFlow')).data.maintainFlowId
        });
    }
    json.forEach($e => {
        if ($e.pageId == params) {
            title.innerHTML = $e.question.title.replace('$', '<input class="_int_" type="number">'); //题目抬头
            new RegExp("10|11|12|13|15|16|18|19|20|21|22").test($e.pageId) ? forShow = true : forShow = false;
            $e.question.choice.forEach(($_, eq) => {  //选项列表
                _eq += `<li> <input type="radio" name="choice" ${eq == 0 ? 'checked=checked' : ''}
                    data-topId="${$_.topId}"  data-lastId="${$_.lastId}"
                    id="${eq}">${!forShow ? `<label for="${eq}"> ${$_.key.replace("$", '<input class="_int_" type="number">')} </label>`
                        : `<div> ${$_.key.replace("$", '<input class="_int_" type="number">')} </div>`} </li>`;
            });
            if ($e.pageId == 3 || $e.pageId == 9 || $e.pageId == 12 || $e.pageId == 20 || $e.pageId == 21) {  //判断是否需要上传图片0
                photo.style.display = 'block';
            } else {
                photo.style.display = 'none';
            }
            centent.setAttribute('data-page', $e.pageId); //当前为
            centent.setAttribute('data-type', $e.question.type); //当前为问题类型
            centent.innerHTML = _eq;
            document.querySelectorAll('input').forEach((name, index) => {
                if (name.getAttribute('name') == 'choice') {
                    if (document.getElementsByTagName('input')[index].getAttribute('checked')) {
                        nextId = document.getElementsByTagName('input')[index].getAttribute('data-lastId');
                        prevId = document.getElementsByTagName('input')[index].getAttribute('data-topId');
                        next.setAttribute('data-value', nextId);  //下一步
                        prev.setAttribute('data-value', prevId);   //上一步
                        radioVal = document.getElementsByTagName('input')[index].parentNode.childNodes[2].innerHTML || -1; // 选择题的答案
                    }
                }
            });
            document.querySelectorAll('li').forEach((elements, index) => {
                elements.addEventListener('click', _ele_ => {
                    _ele_.path[0].dataset['topid'] ? checkedBox({  //答案切换时候的ID
                        topId: _ele_.path[0].dataset['topid'],
                        lastId: _ele_.path[0].dataset['lastid'],
                        key: _ele_.path[0].computedName
                    }) : null;
                })
            })
        };
    });
    if (params == 0 || params == 22) {   //进度结束与开始的按钮
        prev.style.display = 'none';
        next.style.width = '100%';
        params == 22 ? (() => {
            next.innerHTML = `完成`;
            next.addEventListener('click', () => {
                sessionStorage.clear();
                localStorage.clear();
                WeixinJSBridge.call('closeWindow');
            }, true)
        })() : null;
    } else {
        prev.style.display = 'block';
        next.style.width = '33.33%';
    };
    if (sessionStorage.getItem('hasFlow') == +false) {  //第一页的时候创建运维流程

        document.querySelectorAll('input[name=choice]').forEach(_i => {
            let _pert = _i.parentNode;
            if (_pert.childNodes[2].textContent.trim() == '补料人员') {
                flowType = 2;
            } else if (_pert.childNodes[2].textContent.trim() == '清洗人员') {
                flowType = 1;
            }

        })
        // **
        axios.get(httpData + 'create_maintain_flow?maintainerId=' + assign.maintainerId +
            '&machineNumber=' + location.search.substr(1).match(new RegExp("(^|&)machineNumber=([^&]*)(&|$)", "i"))[2] +
            '&flowType=' + flowType)  //提交流程类型 
            .then(
                response => {
                    if (response.data.statusCode.status == 6666) {
                        sessionStorage.setItem('maintainFlow', JSON.stringify(response)); //流程ID
                        sessionStorage.setItem('hasFlow', 1); //
                    } else {
                        alert(response.data.statusCode.msg);
                    }
                }
            ).catch((error) => {
                console.log(error)
            });

        // sessionStorage.removeItem('hasFlow');
        return;
    };
}

function checkedBox(params) {  //切换选择项目的任务继续Page ID fBizJ8
    nextId = params.lastId;
    prevId = index;
    next.setAttribute('data-value', nextId);
    prev.setAttribute('data-value', prevId);
    radioVal = params.key || -1; // 选择题的答案
}

function createQuestion(params) {
    let _type_ = centent.getAttribute('data-type'), _pic = -1;
    switch (_type_) {
        case '1':  //1-展示页面
            radioVal = -1;
            break;
        case '2':   //1-选择题
            radioVal = radioVal;
            break;
        case '3':   //1-填空题
            let _text = {};
            document.querySelectorAll('._int_').forEach((_params, _index) => {
                _text[_index + 1] = _params.value;
            });
            radioVal = JSON.stringify(_text);
            break;
        case '4':   //1-图片上传
            let _img = [];
            document.querySelectorAll('figure').forEach((_params, _index) => {
                _img.push(_params.children[0].getAttribute('src'));
            });
            _pic = _img.join();
            if (document.querySelectorAll('textarea').length > 0) {
                radioVal = document.querySelectorAll('textarea')[0].value;
            }
            break;
        case '5':   //1-物料题
            let _obj = {};
            document.querySelectorAll('._int_').forEach((_params, _index) => {
                _obj[(_index + 1)] = _params.value;
            });
            radioVal = JSON.stringify(_obj);
            break;
        default:
            console.log('其他！');
            break;
    }
    let _data = {
        maintainerId: assign.maintainerId,  //当前维护人ID
        maintainFlowLogId: params.maintainFlowLogId,  //当前流程ID
        // questionIndex: index,  //当前问题下标
        questionIndex: sessionStorage.getItem('PageIds'),  //当前问题下标
        questionType: _type_,  //问题类型  1-展示页面,2-选择题,3-填空题,4-图片上传,5-物料题
        question: title.textContent,  //问题标题
        answerVal: radioVal,  //页面问题答案文本
        answer: radioVal,  //回显答案
        answerPic: _pic, //图片保存
        isEnd: title.innerHTML == `本次维护结束` ? 1 : 0  //流程是否结束
    };
    $.ajax({
        url: httpData + 'index_maintain_question',
        type: 'POST',
        dataType: 'json',
        data: _data
    })
        .done(response => {
            // try {
            //     if(response.statusCode.status == 5070){
            //         throw new Error(response.statusCode.msg);
            //     }
            // } catch (error) {
            //     alert(error);
            //     WeixinJSBridge.call('closeWindow');
            //     return false;
            // }
        })
}
function searchQuerytion(params) {  //查询特定下标的题目/答案
    $.ajax({
        url: httpData + 'find_maintain_question',
        type: 'GET',
        dataType: 'json',
        data: {
            maintainerId: assign.maintainerId,
            maintainFlowId: params.id,
            questionIndex: centent.getAttribute('data-page')
        }
    })
        .done(response => {
            try {
                if (response.statusCode.status == 6666) {
                    json.forEach($e => {
                        if ($e.pageId == centent.getAttribute('data-page')) {
                            $e.question.choice.forEach(($_, eq) => {  //选项列表
                                document.querySelectorAll('input[name=choice]').forEach(_inp => {
                                    let _pert = _inp.parentNode;
                                    if (_pert.childNodes[2].textContent.trim() == response.answer) {
                                        _inp.setAttribute('checked', 'checked');
                                    }
                                })
                            });
                            if (response.answerPic != -1) {  //图片
                                response.answerPic.split(',').forEach(_f => {
                                    $('.photo').append(`<figure class="hash[imageBox]"><img src="${_f}"><svg class="icon" aria-hidden="true"><use xlink:href="#ym-icon-guanbi"></use></svg></figure>`)
                                })
                            };

                            if (response.questionIndex == 15 || response.questionIndex == 16 || response.questionIndex == 18) {
                                Object.values(JSON.parse(response.answer)).forEach((nameValue, index) => {
                                    document.querySelectorAll('input._int_')[index].value = nameValue;
                                })
                            }
                        };

                    });
                }
            } catch (error) {
                throw new Error(error);
            }
        })
}
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/public/javascripts/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js!./src/public/stylesheets/index.min.css":
/*!******************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js!./src/public/stylesheets/index.min.css ***!
  \******************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./src/public/stylesheets/index.min.css?./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar stylesInDom = {};\n\nvar isOldIE = function isOldIE() {\n  var memo;\n  return function memorize() {\n    if (typeof memo === 'undefined') {\n      // Test for IE <= 9 as proposed by Browserhacks\n      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805\n      // Tests for existence of standard globals is to allow style-loader\n      // to operate correctly into non-standard environments\n      // @see https://github.com/webpack-contrib/style-loader/issues/177\n      memo = Boolean(window && document && document.all && !window.atob);\n    }\n\n    return memo;\n  };\n}();\n\nvar getTarget = function getTarget() {\n  var memo = {};\n  return function memorize(target) {\n    if (typeof memo[target] === 'undefined') {\n      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself\n\n      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {\n        try {\n          // This will throw an exception if access to iframe is blocked\n          // due to cross-origin restrictions\n          styleTarget = styleTarget.contentDocument.head;\n        } catch (e) {\n          // istanbul ignore next\n          styleTarget = null;\n        }\n      }\n\n      memo[target] = styleTarget;\n    }\n\n    return memo[target];\n  };\n}();\n\nfunction listToStyles(list, options) {\n  var styles = [];\n  var newStyles = {};\n\n  for (var i = 0; i < list.length; i++) {\n    var item = list[i];\n    var id = options.base ? item[0] + options.base : item[0];\n    var css = item[1];\n    var media = item[2];\n    var sourceMap = item[3];\n    var part = {\n      css: css,\n      media: media,\n      sourceMap: sourceMap\n    };\n\n    if (!newStyles[id]) {\n      styles.push(newStyles[id] = {\n        id: id,\n        parts: [part]\n      });\n    } else {\n      newStyles[id].parts.push(part);\n    }\n  }\n\n  return styles;\n}\n\nfunction addStylesToDom(styles, options) {\n  for (var i = 0; i < styles.length; i++) {\n    var item = styles[i];\n    var domStyle = stylesInDom[item.id];\n    var j = 0;\n\n    if (domStyle) {\n      domStyle.refs++;\n\n      for (; j < domStyle.parts.length; j++) {\n        domStyle.parts[j](item.parts[j]);\n      }\n\n      for (; j < item.parts.length; j++) {\n        domStyle.parts.push(addStyle(item.parts[j], options));\n      }\n    } else {\n      var parts = [];\n\n      for (; j < item.parts.length; j++) {\n        parts.push(addStyle(item.parts[j], options));\n      }\n\n      stylesInDom[item.id] = {\n        id: item.id,\n        refs: 1,\n        parts: parts\n      };\n    }\n  }\n}\n\nfunction insertStyleElement(options) {\n  var style = document.createElement('style');\n\n  if (typeof options.attributes.nonce === 'undefined') {\n    var nonce =  true ? __webpack_require__.nc : undefined;\n\n    if (nonce) {\n      options.attributes.nonce = nonce;\n    }\n  }\n\n  Object.keys(options.attributes).forEach(function (key) {\n    style.setAttribute(key, options.attributes[key]);\n  });\n\n  if (typeof options.insert === 'function') {\n    options.insert(style);\n  } else {\n    var target = getTarget(options.insert || 'head');\n\n    if (!target) {\n      throw new Error(\"Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.\");\n    }\n\n    target.appendChild(style);\n  }\n\n  return style;\n}\n\nfunction removeStyleElement(style) {\n  // istanbul ignore if\n  if (style.parentNode === null) {\n    return false;\n  }\n\n  style.parentNode.removeChild(style);\n}\n/* istanbul ignore next  */\n\n\nvar replaceText = function replaceText() {\n  var textStore = [];\n  return function replace(index, replacement) {\n    textStore[index] = replacement;\n    return textStore.filter(Boolean).join('\\n');\n  };\n}();\n\nfunction applyToSingletonTag(style, index, remove, obj) {\n  var css = remove ? '' : obj.css; // For old IE\n\n  /* istanbul ignore if  */\n\n  if (style.styleSheet) {\n    style.styleSheet.cssText = replaceText(index, css);\n  } else {\n    var cssNode = document.createTextNode(css);\n    var childNodes = style.childNodes;\n\n    if (childNodes[index]) {\n      style.removeChild(childNodes[index]);\n    }\n\n    if (childNodes.length) {\n      style.insertBefore(cssNode, childNodes[index]);\n    } else {\n      style.appendChild(cssNode);\n    }\n  }\n}\n\nfunction applyToTag(style, options, obj) {\n  var css = obj.css;\n  var media = obj.media;\n  var sourceMap = obj.sourceMap;\n\n  if (media) {\n    style.setAttribute('media', media);\n  }\n\n  if (sourceMap && btoa) {\n    css += \"\\n/*# sourceMappingURL=data:application/json;base64,\".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), \" */\");\n  } // For old IE\n\n  /* istanbul ignore if  */\n\n\n  if (style.styleSheet) {\n    style.styleSheet.cssText = css;\n  } else {\n    while (style.firstChild) {\n      style.removeChild(style.firstChild);\n    }\n\n    style.appendChild(document.createTextNode(css));\n  }\n}\n\nvar singleton = null;\nvar singletonCounter = 0;\n\nfunction addStyle(obj, options) {\n  var style;\n  var update;\n  var remove;\n\n  if (options.singleton) {\n    var styleIndex = singletonCounter++;\n    style = singleton || (singleton = insertStyleElement(options));\n    update = applyToSingletonTag.bind(null, style, styleIndex, false);\n    remove = applyToSingletonTag.bind(null, style, styleIndex, true);\n  } else {\n    style = insertStyleElement(options);\n    update = applyToTag.bind(null, style, options);\n\n    remove = function remove() {\n      removeStyleElement(style);\n    };\n  }\n\n  update(obj);\n  return function updateStyle(newObj) {\n    if (newObj) {\n      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {\n        return;\n      }\n\n      update(obj = newObj);\n    } else {\n      remove();\n    }\n  };\n}\n\nmodule.exports = function (list, options) {\n  options = options || {};\n  options.attributes = typeof options.attributes === 'object' ? options.attributes : {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>\n  // tags it will allow on a page\n\n  if (!options.singleton && typeof options.singleton !== 'boolean') {\n    options.singleton = isOldIE();\n  }\n\n  var styles = listToStyles(list, options);\n  addStylesToDom(styles, options);\n  return function update(newList) {\n    var mayRemove = [];\n\n    for (var i = 0; i < styles.length; i++) {\n      var item = styles[i];\n      var domStyle = stylesInDom[item.id];\n\n      if (domStyle) {\n        domStyle.refs--;\n        mayRemove.push(domStyle);\n      }\n    }\n\n    if (newList) {\n      var newStyles = listToStyles(newList, options);\n      addStylesToDom(newStyles, options);\n    }\n\n    for (var _i = 0; _i < mayRemove.length; _i++) {\n      var _domStyle = mayRemove[_i];\n\n      if (_domStyle.refs === 0) {\n        for (var j = 0; j < _domStyle.parts.length; j++) {\n          _domStyle.parts[j]();\n        }\n\n        delete stylesInDom[_domStyle.id];\n      }\n    }\n  };\n};\n\n//# sourceURL=webpack:///./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js?");

/***/ }),

/***/ "./src/public/javascripts/index.js":
/*!*****************************************!*\
  !*** ./src/public/javascripts/index.js ***!
  \*****************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _stylesheets_index_min_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../stylesheets/index.min.css */ \"./src/public/stylesheets/index.min.css\");\n/* harmony import */ var _stylesheets_index_min_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_stylesheets_index_min_css__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _json_conf_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../json/conf.json */ \"./src/public/json/conf.json\");\nvar _json_conf_json__WEBPACK_IMPORTED_MODULE_1___namespace = /*#__PURE__*/__webpack_require__.t(/*! ../json/conf.json */ \"./src/public/json/conf.json\", 1);\n\n\ndocument.addEventListener(\"DOMContentLoaded\", function () {\n  getCententsPage();\n  document.getElementsByClassName('next')[0].addEventListener('click', function (e) {\n    // getCententsPage(e.value);\n    console.log(this);\n  });\n  document.getElementsByClassName('push')[0].addEventListener('click', function (e) {\n    //上传图片\n    document.getElementsByClassName('fileReader')[0].click();\n\n    document.getElementsByClassName('fileReader')[0].onchange = function (e) {\n      var localFile = this.files[0];\n      console.log(this.files[0]);\n      var reader = new FileReader();\n      var content;\n\n      reader.onload = function (event) {\n        content = event.target.result;\n        compress(content, 10, function (content0) {\n          console.log(\"final=\" + content0.length / 1024 + \"KB\");\n        });\n      };\n\n      reader.onerror = function () {\n        alert(\"error\");\n      };\n\n      reader.readAsDataURL(localFile, \"UTF-8\");\n    };\n  });\n});\n\nfunction compress(content, size, callback) {\n  if (content.length <= size * 1024) {\n    callback(content);\n    return;\n  }\n\n  var canvas = document.createElement(\"canvas\");\n  var ctx = canvas.getContext(\"2d\");\n  var img = new Image();\n  img.src = content;\n\n  img.onload = function () {\n    var width = img.width;\n    var height = img.height;\n    canvas.width = width;\n    canvas.height = height; // 铺底色\n\n    ctx.fillStyle = \"#fff\";\n    ctx.fillRect(0, 0, width, height);\n    ctx.drawImage(img, 0, 0, width, height);\n    var rate = 1024 * size / content.length;\n    console.log(\"size=\" + size + \" rate=\" + rate);\n    console.log(\"**压缩前**\" + content.length / 1024 + \"KB\");\n    document.getElementsByClassName('old')[0].innerHTML = content.length / 1024 + \"KB\"; //进行压缩\n\n    content = canvas.toDataURL(\"image/jpeg\", rate);\n    console.log(\"**压缩后**\" + content.length / 1024 + \"KB\");\n    document.getElementsByClassName('new')[0].innerHTML = content.length / 1024 + \"KB\";\n    callback(content);\n  };\n}\n\nfunction getCententsPage(params) {\n  var win = window,\n      title = document.getElementsByClassName('title')[0],\n      centent = document.getElementsByClassName('content-box')[0],\n      _eq = \"\"; //全局\n\n  _json_conf_json__WEBPACK_IMPORTED_MODULE_1__.forEach(function ($e, index) {\n    if (sessionStorage.getItem('cookies')) {\n      if ($e.pageId == sessionStorage.getItem('cookies')) {\n        title.innerHTML = $e.question.title;\n        $e.question.choice.forEach(function ($_, eq) {\n          _eq += \"<li data-lastId=\\\"\".concat($_.lastId, \"\\\" data-topId=\\\"\").concat($_.topId, \"\\\"> <input type=\\\"radio\\\" name=\\\"choice\\\" id=\\\"\").concat(eq, \"\\\"><label for=\\\"\").concat(eq, \"\\\"> \").concat($_.key, \" </label><li>\");\n        });\n        centent.innerHTML = _eq;\n      }\n\n      ;\n    } else {\n      if ($e.pageId == 0) {\n        title.innerHTML = $e.question.title;\n        $e.question.choice.forEach(function ($_, eq) {\n          _eq += \"<li data-lastId=\\\"\".concat($_.lastId, \"\\\" data-topId=\\\"\").concat($_.topId, \"\\\"> <input type=\\\"radio\\\" name=\\\"choice\\\" id=\\\"\").concat(eq, \"\\\"><label for=\\\"\").concat(eq, \"\\\"> \").concat($_.key, \" </label><li>\");\n        });\n        centent.innerHTML = _eq;\n      }\n\n      ;\n    }\n  });\n}\n\n//# sourceURL=webpack:///./src/public/javascripts/index.js?");

/***/ }),

/***/ "./src/public/json/conf.json":
/*!***********************************!*\
  !*** ./src/public/json/conf.json ***!
  \***********************************/
/*! exports provided: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, default */
/***/ (function(module) {

eval("module.exports = [{\"title\":\"运维人员\",\"pageId\":0,\"question\":{\"title\":\"请选择以下运维人员\",\"choice\":[{\"key\":\"补料人员\",\"topId\":0,\"lastId\":14},{\"key\":\"清洗人员\",\"topId\":0,\"lastId\":1}]}},{\"title\":\"机器外观检查1\",\"pageId\":1,\"question\":{\"title\":\"到达机器现场，检查机器外观有无故障\",\"choice\":[{\"key\":\"有\",\"topId\":0,\"lastId\":2},{\"key\":\"无\",\"topId\":0,\"lastId\":7}]}},{\"title\":\"机器外观检查2\",\"pageId\":2,\"question\":{\"title\":\"\",\"choice\":[{\"key\":\"灯箱不亮\",\"topId\":1,\"lastId\":3},{\"key\":\"大门玻璃面板有破损\",\"topId\":1,\"lastId\":4},{\"key\":\"屏幕不亮/无法触控\",\"topId\":1,\"lastId\":5},{\"key\":\"小门无法关闭\",\"topId\":1,\"lastId\":6},{\"key\":\"其他问题联系客服\",\"topId\":1,\"lastId\":21}]}},{\"title\":\"机器外观检查3\",\"pageId\":3,\"question\":{\"title\":\"灯箱不亮，检查是否接线脱落\",\"choice\":[{\"key\":\"否，接线良好灯箱依旧不亮，登记上报客服\",\"topId\":2,\"lastId\":21},{\"key\":\"是，接好后登记上报客服\",\"topId\":2,\"lastId\":21}]}},{\"title\":\"机器外观检查4\",\"pageId\":4,\"question\":{\"title\":\"大门玻璃面板破损\",\"choice\":[{\"key\":\"拍照登记上报客服，清空并清洗设备，贴上停机保养中提示\",\"topId\":2,\"lastId\":21}]}},{\"title\":\"机器外观检查5\",\"pageId\":5,\"question\":{\"title\":\"屏幕不亮/无法触控\",\"choice\":[{\"key\":\"拍照登记上报客服，清空并清洗设备，贴上停机保养中提示\",\"topId\":2,\"lastId\":21}]}},{\"title\":\"机器外观检查6\",\"pageId\":6,\"question\":{\"title\":\"小门无法关闭\",\"choice\":[{\"key\":\"拍照登记上报客服，清空并清洗设备，贴上停机保养中提示\",\"topId\":2,\"lastId\":21}]}},{\"title\":\"机器程序检查1\",\"pageId\":7,\"question\":{\"title\":\"程序运行是否正常\",\"choice\":[{\"key\":\"否，应用运行崩溃，拍照登记上报客服，重启程序并升级应用版本\",\"topId\":3,\"lastId\":21},{\"key\":\"是，应用运行正常\",\"topId\":3,\"lastId\":8}]}},{\"title\":\"机器程序检查2\",\"pageId\":8,\"question\":{\"title\":\"检查应用程序是否需要升级\",\"choice\":[{\"key\":\"已经是最新版本\",\"topId\":7,\"lastId\":9},{\"key\":\"升级更新到最新版本\",\"topId\":7,\"lastId\":9}]}},{\"title\":\"机器蚊虫检查\",\"pageId\":9,\"question\":{\"title\":\"检查机器底座四边角、料盒背后、料盒固定板、豆仓旁边的间隙\",\"choice\":[{\"key\":\"无蚊虫\",\"topId\":8,\"lastId\":10},{\"key\":\"有蚊虫，拍照登记上传客服，清理物料，停机除虫处理，贴上停机保养中\",\"topId\":8,\"lastId\":10}]}},{\"title\":\"机器清洁1\",\"pageId\":10,\"question\":{\"title\":\"机器外部清洗的部件有：\",\"choice\":[{\"key\":\"门体，小门，小门内四框，屏幕(干布擦拭)，取杯窗，滴水盒子，滴水盒子上部框，杯盖架，两边的广告牌，机器后背的滤尘网\",\"topId\":9,\"lastId\":11}]}},{\"title\":\"机器清洁2\",\"pageId\":11,\"question\":{\"title\":\"机器内部清洁的器件有：\",\"choice\":[{\"key\":\"搅拌杯，搅拌杯垫圈，搅拌电机圈，防尘盒子，搅拌器上盖，出料导管，泡茶器垫圈，泡茶器硅胶嘴，意式冲泡器，意式冲泡器基座，搅拌杯接水盘，滴水盘，托杯器，粉渣桶，废水桶，机器底座，机体内侧壁，门体内侧壁\",\"topId\":10,\"lastId\":12}]}},{\"title\":\"机器清洁3\",\"pageId\":12,\"question\":{\"title\":\"部件清洗完成并安装回原位，确保运行正常，并拍照上传: \",\"choice\":[{\"key\":\"(照片1，横拍，手机抵在机器门顶，出料嘴在照片中间，能看到搅拌杯、泡茶器、意式冲泡器)\",\"topId\":11,\"lastId\":13},{\"key\":\"(照片2，横拍，能看到粉渣桶，废水桶，制冷机，水桶)\",\"topId\":11,\"lastId\":13}]}},{\"title\":\"运维后盘点清洁\",\"pageId\":13,\"question\":{\"title\":\"\",\"choice\":[{\"key\":\"确认大门已经关闭\",\"topId\":12,\"lastId\":22},{\"key\":\"确认小门已经关闭\",\"topId\":12,\"lastId\":22},{\"key\":\"确认屏幕是否正常\",\"topId\":12,\"lastId\":22},{\"key\":\"确认制作测试杯\",\"topId\":12,\"lastId\":22},{\"key\":\"确认机器外观整洁\",\"topId\":12,\"lastId\":22}]}},{\"title\":\"机器运维前物料盘点1\",\"pageId\":14,\"question\":{\"title\":\"物料是否有到保质期或结块\",\"choice\":[{\"key\":\"否\",\"topId\":0,\"lastId\":17},{\"key\":\"是\",\"topId\":0,\"lastId\":15}]}},{\"title\":\"机器运维前物料盘点2\",\"pageId\":15,\"question\":{\"title\":\"在$号仓，坏料的剩余量为$g;清洁料盒。\",\"choice\":[{\"key\":\"提示：（料仓顺序由右到左排列）（物料的保质期：桶装水20天，咖啡豆7天，红茶粉20天，可可粉15天，紫薯粉15天，抹茶粉15天，糖一年，奶粉15天，橙粉15天，柠檬冰红茶粉15天，杨枝甘露粉15天。）\",\"topId\":14,\"lastId\":16}]}},{\"title\":\"机器运维前物料盘点3\",\"pageId\":16,\"question\":{\"title\":\"现余物料盘点：\",\"choice\":[{\"key\":\"1号料仓 $g\",\"topId\":15,\"lastId\":17},{\"key\":\"2号料仓 $g\",\"topId\":15,\"lastId\":17},{\"key\":\"3号料仓 $g\",\"topId\":15,\"lastId\":17},{\"key\":\"4号料仓 $g\",\"topId\":15,\"lastId\":17},{\"key\":\"5号料仓 $g\",\"topId\":15,\"lastId\":17},{\"key\":\"6号料仓 $g\",\"topId\":15,\"lastId\":17},{\"key\":\"7号料仓 $g\",\"topId\":15,\"lastId\":17},{\"key\":\"8号料仓 $个\",\"topId\":15,\"lastId\":17}]}},{\"title\":\"物料添加1\",\"pageId\":17,\"question\":{\"title\":\"物料是否需要添加\",\"choice\":[{\"key\":\"是\",\"topId\":16,\"lastId\":18},{\"key\":\"否\",\"topId\":16,\"lastId\":19}]}},{\"title\":\"物料添加2\",\"pageId\":18,\"question\":{\"title\":\"\",\"choice\":[{\"key\":\"1号料仓 $g\",\"topId\":17,\"lastId\":19},{\"key\":\"2号料仓 $g\",\"topId\":17,\"lastId\":19},{\"key\":\"3号料仓 $g\",\"topId\":17,\"lastId\":19},{\"key\":\"4号料仓 $g\",\"topId\":17,\"lastId\":19},{\"key\":\"5号料仓 $g\",\"topId\":17,\"lastId\":19},{\"key\":\"6号料仓 $g\",\"topId\":17,\"lastId\":19},{\"key\":\"7号料仓 $g\",\"topId\":17,\"lastId\":19},{\"key\":\"8号料仓 $个\",\"topId\":17,\"lastId\":19},{\"key\":\"(物料低于200g要添加一包物料，杯子总数添加在75个以上； 填写总数量)\",\"topId\":17,\"lastId\":19}]}},{\"title\":\"运维后盘点\",\"pageId\":19,\"question\":{\"title\":\"\",\"choice\":[{\"key\":\"确认出料口整洁\",\"topId\":17,\"lastId\":20},{\"key\":\"确认上传最新物料数据\",\"topId\":17,\"lastId\":20},{\"key\":\"确认大门已关闭\",\"topId\":17,\"lastId\":20},{\"key\":\"确认小门已关闭\",\"topId\":17,\"lastId\":20},{\"key\":\"确认屏幕能点击购买\",\"topId\":17,\"lastId\":20},{\"key\":\"确认制作测试杯\",\"topId\":17,\"lastId\":20}]}},{\"title\":\"物料拍照\",\"pageId\":20,\"question\":{\"title\":\"物料添加完成后确保运行正常，并拍照上传。\",\"choice\":[{\"key\":\"(照片1，横拍，手机抵在机器门顶，出料嘴在照片中间，能看到搅拌杯、泡茶器、意式冲泡器)\",\"topId\":19,\"lastId\":21},{\"key\":\"(照片2，横拍，能看到粉渣桶，废水桶，制冷机，水桶)\",\"topId\":19,\"lastId\":21}]}},{\"title\":\"登记拍照\",\"pageId\":21,\"question\":{\"title\":\"\",\"choice\":[{\"key\":\"请输入内容\",\"topId\":0,\"lastId\":22},{\"key\":\"...\",\"topId\":0,\"lastId\":22}]}},{\"title\":\"完成\",\"pageId\":22,\"question\":{\"title\":\"\",\"choice\":[{\"key\":\"本次维护结束\",\"topId\":0,\"lastId\":0}]}}];\n\n//# sourceURL=webpack:///./src/public/json/conf.json?");

/***/ }),

/***/ "./src/public/stylesheets/index.min.css":
/*!**********************************************!*\
  !*** ./src/public/stylesheets/index.min.css ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var content = __webpack_require__(/*! !../../../node_modules/mini-css-extract-plugin/dist/loader.js!../../../node_modules/css-loader/dist/cjs.js!./index.min.css */ \"./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js!./src/public/stylesheets/index.min.css\");\n\nif (typeof content === 'string') {\n  content = [[module.i, content, '']];\n}\n\nvar options = {}\n\noptions.insert = \"head\";\noptions.singleton = false;\n\nvar update = __webpack_require__(/*! ../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\")(content, options);\n\nif (content.locals) {\n  module.exports = content.locals;\n}\n\n\n//# sourceURL=webpack:///./src/public/stylesheets/index.min.css?");

/***/ })

/******/ });
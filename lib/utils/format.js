'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatTime = formatTime;
exports.formatNum = formatNum;
exports.formatEnNum = formatEnNum;
exports.formatStr = formatStr;
function formatTime(timestamp) {
  if (!timestamp) {
    return null;
  }

  var nowTimestamp = new Date().getTime();

  // const tmp = 1534957261000;

  var subTime = nowTimestamp - timestamp;

  if (subTime < 60 * 1000) {
    return parseInt(subTime / 1000, 10) + '\u79D2\u524D';
  }if (subTime < 60 * 60 * 1000) {
    return parseInt(subTime / 60000, 10) + '\u5206\u949F\u524D';
  }if (subTime < 24 * 60 * 60 * 1000) {
    return parseInt(subTime / (60 * 60 * 1000), 10) + '\u5C0F\u65F6\u524D';
  }if (subTime < 7 * 24 * 60 * 60 * 1000) {
    return parseInt(subTime / (24 * 60 * 60 * 1000), 10) + '\u5929\u524D';
  }
  var date = new Date(timestamp);

  return date.getFullYear() + '-' + date.getMonth() + '-' + date.getDay();
}

function formatNum(count) {
  var numCount = Number(count);
  if (numCount > 1000) {
    return (numCount / 1000).toFixed(1) + ' K';
  }if (numCount > 0) {
    return numCount.toLocaleString('en');
  }

  return 0;
}

function formatEnNum(count) {
  var numCount = Number(count);
  return numCount.toLocaleString('en');
}

/**
 * 截取字符串
 *
 * @param {string} src 可能含有html标签的字符串
 * @param {number} 截取长度
 * @param {bool|string=} 截取尾部后缀
 *
 *
 */
function formatStr(src) {
  var length = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 20;
  var suffix = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '...';

  if (src === null) {
    return '';
  }

  if (length >= src.length) return src;

  var str = '';
  // final content

  var i = 0;
  // position in source

  var tag = '';
  // current tag contents (used during content reading)

  var c = '';
  // current char (used during content reading)

  var end = 0;
  // ending position of tag (used during content reading)

  var cnt = 0;
  // content size

  var tagTree = []; // open tags

  var len = src.length; // lenght of the source

  var tagStrip = function tagStrip(content) {
    var index = tag.indexOf(' '); // check for space (ex.: <span a="b">)
    if (index === -1) {
      // no space (ex.: <span>)
      return content.slice(1, -1);
    }
    return content.slice(1, index);
  };

  while (cnt < length && i < len) {
    c = src.charAt(i); // Read next char
    if (c === '<') {
      // Tag found
      end = src.slice(i).indexOf('>');
      if (end === -1) {
        // Check for incomplete tag
        return str;
      }
      end += i + 1;
      tag = src.slice(i, end); // Read tag contents
      str += tag; // Append the tag to final content
      if (tag.charAt(1) === '/') {
        // Closing tag
        tagTree = tagTree.slice(0, -1);
      } else {
        // New tag
        tagTree.push(tagStrip(tag));
      }
      i = end; // Move the position to end of the tag
    } else {
      // Append content character and move the position
      str += c;
      i += 1;
      cnt += 1;
    }
  }

  if (tagTree.length > 0) {
    for (i = tagTree.length - 1; i >= 0; i -= 1) {
      str += '</' + tagTree[i] + '>';
    }
  }
  // Return final cutted content and put suffix after it
  if (suffix === false) return str;
  return str + (typeof suffix === 'undefined' || suffix === true ? '...' : suffix);
}
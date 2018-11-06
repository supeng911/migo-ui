

export function formatTime(timestamp) {
  if (!timestamp) {
    return null;
  }

  const nowTimestamp = new Date().getTime();

  // const tmp = 1534957261000;

  const subTime = nowTimestamp - timestamp;

  if (subTime < (60 * 1000)) {
    return `${parseInt(subTime / 1000, 10)}秒前`;
  } if (subTime < (60 * 60 * 1000)) {
    return `${parseInt(subTime / 60000, 10)}分钟前`;
  } if (subTime < (24 * 60 * 60 * 1000)) {
    return `${parseInt(subTime / (60 * 60 * 1000), 10)}小时前`;
  } if (subTime < (7 * 24 * 60 * 60 * 1000)) {
    return `${parseInt(subTime / (24 * 60 * 60 * 1000), 10)}天前`;
  }
  const date = new Date(timestamp);

  return `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}`;
}


export function formatNum(count) {
  const numCount = Number(count);
  if (numCount > 1000) {
    return `${(numCount / 1000).toFixed(1)} K`;
  } if (numCount > 0) {
    return numCount.toLocaleString('en');
  }

  return 0;
}


export function formatEnNum(count) {
  const numCount = Number(count);
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
export function formatStr(src, length = 20, suffix = '...') {
  if (src === null) {
    return '';
  }

  if (length >= src.length) return src;

  let str = '';
  // final content

  let i = 0;
  // position in source

  let tag = '';
  // current tag contents (used during content reading)

  let c = '';
  // current char (used during content reading)

  let end = 0;
  // ending position of tag (used during content reading)

  let cnt = 0;
  // content size

  let tagTree = []; // open tags

  const len = src.length; // lenght of the source

  const tagStrip = (content) => {
    const index = tag.indexOf(' '); // check for space (ex.: <span a="b">)
    if (index === -1) { // no space (ex.: <span>)
      return content.slice(1, -1);
    }
    return content.slice(1, index);
  };

  while (cnt < length && i < len) {
    c = src.charAt(i); // Read next char
    if (c === '<') {
      // Tag found
      end = src.slice(i).indexOf('>');
      if (end === -1) { // Check for incomplete tag
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
      str += `</${tagTree[i]}>`;
    }
  }
  // Return final cutted content and put suffix after it
  if (suffix === false) return str;
  return str + ((typeof suffix === 'undefined' || suffix === true) ? '...' : suffix);
}

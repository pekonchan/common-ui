var striptags = require('./strip-tags');
var md = require('markdown-it')();

function wrap(render) {
  return function() {
    return render
      .apply(this, arguments)
      .replace('<code class="', '<code class="hljs ')
      .replace('<code>', '<code class="hljs">');
  };
}


exports.mdPreprocess = function(MarkdownIt, source) {
  MarkdownIt.renderer.rules.table_open = function() {
    return '<table class="table">';
  };
  MarkdownIt.renderer.rules.fence = wrap(MarkdownIt.renderer.rules.fence);
  return source;
};

function convert(str) {
  str = str.replace(/(&#x)(\w{4});/gi, function($0) {
    return String.fromCharCode(
      parseInt(
        encodeURIComponent($0).replace(/(%26%23x)(\w{4})(%3B)/g, '$2'),
        16
      )
    );
  });
  return str;
}


function render(tokens, idx) {
  var m = tokens[idx].info.trim().match(/^demo\s*(.*)$/);
  if (tokens[idx].nesting === 1) {
    let index = idx + 1;
    var html = '';
    var style = '';
    var script = '';
    while (tokens[index].nesting === 0) {
      const content = tokens[index].content;
      const tag = tokens[index].info;
      if (tag === 'html') {
        html = convert(striptags.strip(content, ['script', 'style'])).replace(
          /(<[^>]*)=""(?=.*>)/g,
          '$1'
        );
        script = striptags.fetch(content, 'script');
        style = striptags.fetch(content, 'style');
      } else if (tag === 'js' && !script) {
        script = striptags.fetch(content, 'script');
      } else if (
        ['css', 'style', 'scss'].indexOf(tag) !== -1 &&
        !style
      ) {
        style = striptags.fetch(content, 'style');
      }
      index++;
    }
    var description = m && m.length > 1 ? m[1] : '';
    var jsfiddle = { html: html, script: script, style: style };
    var descriptionHTML = description ? md.render(description) : '';

    jsfiddle = md.utils.escapeHtml(JSON.stringify(jsfiddle));
    return `
      <demo-block class="demo-box" :jsfiddle="${jsfiddle}">
        <div class="source" slot="source">${html}</div>
        ${descriptionHTML}
        <div class="hljs highlight" slot="highlight">
    `;
  }
  return '</div></demo-block>\n';
}

exports.demoContainerRender = render;


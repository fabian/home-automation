var documentation = {};

documentation.Document = function () {
    
};

documentation.Document.prototype.render = function () {
    this.renderTableOfContents();
    this.renderTableOfFigures();
};

documentation.Document.prototype.renderTableOfContents = function () {

    var headers = $('h2'),
        toc = $('#toc'),
        i, j, node, id, chapter, li, childs, ol;

    // skip first header (TOC)
    headers = headers.slice(1);

    headers.each(function(i, element) {

        element = $(element);

        i = i + 1;
        id = 'chapter-' + i;
        li = documentation.createListItem(element, id, i);

        childs = element.closest('h3');
        ol = $('<ol>');

        childs.each(function (j, child) {

            child = $(child);

            j = j + 1;
            id = 'chapter-' + i + '-' + j;
            sli = documentation.createListItem(child, id, i, j);
            ol.append(sli); 

        });

        li.append(ol);
        toc.append(li);

    });
};

documentation.createListItem = function (node, id, chapter, subChapter) {

    var li, a, spanChapter, spanTitle;

    node.attr('id', id);

    li = $('<li>');

    a = $('<a>').attr('href', '#' + id);

    chapter = '' + chapter;
    if (typeof subChapter != 'undefined') {
        chapter += '.' + subChapter;
    }

    $('<span>').appendTo(a).attr('class', 'chapter').text(chapter);

    spanTitle = $('span');
    spanTitle
    spanTitle
    $('<span>').appendTo(a).attr('class', 'title').text(node.text());

    li.append(a);

    return li;
};

documentation.Document.prototype.renderTableOfFigures = function () {

    var captions = $('figcaption'),
        figures = $('#figures'),
        figure, li, a;

    captions.each(function(i, caption) {

        caption = $(caption);
        figure = caption.parents('figure');
        id = 'figure-' + i;

        figure.attr('id', id);
        caption.text('Abb. ' + (i + 1) + ' ' + caption.text());

        li = $('<li>');

        a = $('<a>').attr('href', '#' + id).text(caption.text());

        li.append(a);
        figures.append(li);
    });
};

$(function () {
    var document = new documentation.Document();
    document.render();
});

function item(node, id, chapter, subChapter) {

    var li, a, spanChapter, spanTitle;

    node.setAttribute('id', id);

    li = document.createElement('li');

    a = document.createElement('a');
    a.setAttribute('href', '#' + id);

    chapter = '' + chapter;
    if (typeof subChapter != 'undefined') {
        chapter += '.' + subChapter;
    }

    spanChapter = document.createElement('span');
    spanChapter.setAttribute('class', 'chapter');
    spanChapter.appendChild(document.createTextNode(chapter));
    a.appendChild(spanChapter);

    spanTitle = document.createElement('span');
    spanTitle.setAttribute('class', 'title');
    spanTitle.appendChild(document.createTextNode(node.innerHTML));
    a.appendChild(spanTitle);

    li.appendChild(a);

    return li;
}

function toc() {

    var headers = document.getElementsByTagName('h2'),
        toc = document.getElementById('toc'),
        i, j, node, id, chapter, li, childs, ol;

    // skip first header (TOC)
    for (i = 1; i < headers.length; i++) {

        node = headers[i];
        id = 'chapter-' + i;
        li = item(node, id, i);

        childs = node.parentNode.getElementsByTagName("h3");
        ol = document.createElement('ol');

        for (j = 0; j < childs.length; j++) {

            node = childs[j];
            id = 'chapter-' + i + '-' + (j + 1);
            sli = item(node, id, i, j + 1);
            ol.appendChild(sli); 
        }

        li.appendChild(ol);
        toc.appendChild(li);
    }
}

function sources() {

    var sources = document.getElementsByTagName('a'),
        index = document.getElementById('sources'),
        i, source, li, href, text;

    for (i = 0; i < sources.length; i++) {

        source = sources[i];
        href = source.getAttribute('href');
        text = source.getAttribute('title');

        if (href.indexOf('http') != 0) {
            continue;
        }

        if (!text) {
            text = source.innerHTML;
        }

        li = document.createElement('li');
        li.appendChild(document.createTextNode(text + ': ' + href));
        index.appendChild(li); 
    }
}

function figures() {

    var captions = $('figcaption'),
        figures = $('figures'),
        i, caption, figure, li, a;

    captions.each(function(i, caption) {

        figure = caption.parentNode;

        caption.innerHTML = 'Abb. ' + (i + 1) + ' ' + caption.innerHTML;

        li = document.createElement('li');

        a = document.createElement('a');
        a.setAttribute('href', '#' + figure.getAttribute('id'));

        a.appendChild(document.createTextNode(caption.textContent));

        li.appendChild(a);
        figures.appendChild(li); 
    });
}

function init() {

    sources();
    figures();
    toc();
}


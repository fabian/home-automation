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

        childs = element.closest('.chapter').find('h3');
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
        caption.prepend('<span>Abb. ' + (i + 1) + ' </span>');

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

// ==UserScript==
// @name           Hacker News Tab Index
// @namespace      http://logaan.net/
// @include        http://news.ycombinator.com/
// @description    When Hacker News loads the first link will be selected. You may navigate through the links using tab to go forwards, or shift+tab to move backwards. When opening a link in a new tab (using command+enter on a mac) the next link will be automatically selected. This allows you to consume Hacker News quickly and without the use of a mouse.
// ==/UserScript==

(function() {
  // Have to use a factory for this to get the scoping right. Unfortunately JS
  // re-uses the index variable in the for loop so having the callback inline
  // breaks. Also we've got to explicitly parse the index as an int as it's being
  // given to us as a string. Took a while to figure out that one.
  function focus_next_factory(index){
    return function focus_next() {
      document.getElementsByClassName("title")[parseInt(index) + 2].children[0].focus();
    };
  }

  var title_cells = document.getElementsByClassName("title");
  var link_count = 0;

  for(index in title_cells) {
    if(index % 2 == 1) {
      // Set the tabindex to something more helpful
      link_count = link_count + 1;
      title_cells[index].children[0].tabIndex = link_count;

      // Focus on the next link when this one is clicked
      title_cells[index].children[0].addEventListener("click", focus_next_factory(index), true);
    }
  }

  // Focus on the first story
  title_cells[1].children[0].focus();
}())


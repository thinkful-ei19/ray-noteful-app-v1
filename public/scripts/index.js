/* global $ noteful api store */
'use strict';

$(document).ready(function () {
  noteful.bindEventListeners();

  api.search({}, response => {
    store.notes = response;
    noteful.render();
  });

  console.log('create a new note');
  const newNote = {
    title: 'new note',
    content: 'the body'
  };
  api.create(newNote, response => {
    console.log('new note', response);
  });
});

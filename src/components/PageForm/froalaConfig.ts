export const froalaConfig = {
  placeholder: 'Page content here...',
  editorClass: 'shadow-sm',
  height: 300,
  toolbarButtons: {
    'moreMisc': {
      'buttons': [
        'undo', 'redo'
      ],
      'buttonsVisible': 2
    },
    'moreText': {
      'buttons': [
        'bold', 'italic', 'underline', 'strikeThrough', 'subscript',
        'superscript', 'fontFamily', 'fontSize', 'textColor',
        'backgroundColor', 'inlineClass', 'inlineStyle', 'clearFormatting'
      ]
    },
    'moreParagraph': {
      'buttons': [
        'alignLeft', 'alignCenter', 'formatOLSimple',
        'alignRight', 'alignJustify', 'formatOL', 'formatUL',
        'paragraphFormat', 'paragraphStyle', 'lineHeight',
        'outdent', 'indent', 'quote'
      ]
    },
    'moreRich': {
      'buttons': [
        'insertLink', 'insertImage', 'insertVideo', 'insertTable',
        'emoticons', 'fontAwesome', 'specialCharacters',
        'embedly', 'insertFile', 'insertHR'
      ],
      'buttonsVisible': 2
    },
  }
}
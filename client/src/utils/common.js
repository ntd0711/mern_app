export const toUpperCaseFirstLetter = (string) => {
    if (string.length <= 0) throw new Error('string is not valid');

    return string
        .split(' ')
        .map((word) => {
            const firstLetter = word[0];
            return firstLetter.toUpperCase() + word.slice(1);
        })
        .join(' ');
};

// export const positionCaret = () => {

// }

// function setSelectionRange(input, selectionStart, selectionEnd) {
//     if (input.setSelectionRange) {
//         input.focus();
//         input.setSelectionRange(selectionStart, selectionEnd);
//     } else if (input.createTextRange) {
//         var range = input.createTextRange();
//         range.collapse(true);
//         range.moveEnd('character', selectionEnd);
//         range.moveStart('character', selectionStart);
//         range.select();
//     }
// }

// export const setCaretToPos = (input, pos) => {
//     setSelectionRange(input, pos, pos);
// };

// export const toUpperCaseFirstLetter = (string) => {
//     if (string.length <= 0) throw new Error('string is not valid');

//     return string
//         .split(' ')
//         .map((word) => {
//             const firstLetter = word[0];
//             return firstLetter.toUpperCase() + word.slice(1);
//         })
//         .join(' ');
// };

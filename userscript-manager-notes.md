# Notes on differences between Userscripts and Userstyle managers

I am now testing like this:

- Safari -- "Userscripts Safari" for both JS and CSS
- Firefox -- Violentmonkey for JS, Stylus for CSS
- Chrome -- (presumably the same as Safari, but I'm not there yet)

# CSS notes

I had to make two copies of everything, ugh...

Here are the notes:

## Stylus

- requires its own particular metadata -- see
https://github.com/openstyles/stylus/wiki/Writing-UserCSS
- requires you to use `@-moz-document` to limit which pages the CSS applies to -- see https://developer.mozilla.org/en-US/docs/Web/CSS/@document#syntax
- is OK with filename not matching @name
- wants filename to end in .user.css

## Safari Userscripts

- needs the filename to match the @name
- wants the filename to end with .css
- has different metadata rules from Stylus
- !! remember that you have to open the little popup after you make changes

# Notes on differences between Userscripts and Userstyle managers

I am now testing like this:

- Safari -- "Userscripts Safari" for both JS and CSS
- Firefox -- Violentmonkey for JS, Stylus for CSS
- Chrome -- (presumably the same as Safari, but I'm not there yet)

## Script installation process

### Stylus

- Local file: open a new tab, and drag the file you want to install onto it
- From URL: just open the URL
- in either case, Stylus will intercept it and take you to an install-the-style page

### Violentmonkey

- Open the manager
- Press the +
- "Install from URL"

(idk how to install a local file, maybe you can't)

### Userscripts Safari (macOS)

#### From URL

- Open the manager
- Press the +
- "New remote"
- Save

#### Local files

- Open the manager
- Open the settings
- Click the link to the 'save' folder
- Copy the files into that folder
- (Don't organize them into subfolders)
- (Remember that you have to open the little popup after you make any changes to the files, unless you use Userscripts Safari's editor)


## Creating CSS

I had to make two copies of everything, ugh...

Here are the notes:

### Creating CSS for Stylus

- requires its own particular metadata -- see
https://github.com/openstyles/stylus/wiki/Writing-UserCSS
- requires you to use `@-moz-document` to limit which pages the CSS applies to -- see https://developer.mozilla.org/en-US/docs/Web/CSS/@document#syntax
- is OK with filename not matching @name
- wants filename to end in .user.css

### Creating CSS for Safari Userscripts

- needs the filename to match the @name
- wants the filename to end with .css
- has different metadata rules from Stylus
- !! remember that you have to open the little popup after you make changes

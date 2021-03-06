---
title: Managing Content
date: 2015/07/20
---

There are three types of content:

 - The home page
 - Plain pages
 - Blog posts

By default, any Markdown `.md` or HTML `.html` file in the `_content` directory will be turned into one of these three types. A file at `_content/index.*` will be treated as the home page. Files under the archives directory (by default `_content/posts`) will be treated as blog posts, and archived by date and tag. All other content files are assumed to be pages.

#### URLs

URLs for **atomic content** are determined by file path.  The content at `_content/foo.md` will end up having the URL `/foo/`. If the content file is located at `_content/foo/index.html`, then the URL will likewise be `/foo/`. A file at `_content/foo/bar/baz.html` will have the URL `/foo/bar/baz/`.

#### Parents and  Children
Both pages and posts are hierarchical. For example, the content at `_content/foo/bar.md` will be considered the child of the content at `_content/foo/index.md`.

Note that this system is dependent on directory structure, but not the other way around. If the file `_content/foo/bar/baz.html` exists but neither `_content/foo/baz.*` nor `_content/foo/baz/index.*` exists, then
`_content/foo/bar/baz.html` will still be published, without a parent, at `/foo/bar/baz/`.

Only direct descendants are considered "children" of a piece of atomic content.

In templates:
- `content.parent` is either null or a content object representing parent.
- `content.children` is always an array of content objects.


#### Conflicting Content Files

Note the following rules:

 - Index files take precedence: `help/index.md` will be used and `help.md` will be ignored.
 - By default Markdown files take precedence over HTML files: `help/advanced.md` will be used instead of `help/advanced.html`. You can change this precedence by editing the order of the extensions in `content_extensions`.
 - Any file that would conflict with the blog post archives URL will be ignored. For example, `_content/posts.md` will be ignored as long as you keep the default config value for `archives_directory`, because its URL would be the same as the base blog archive URL: `/posts/`. Note that you can set `archives_directory` to anything you like.



#### Content Metadata

Content metadata, such as the title, is defined by inserting an optional YAML front matter section at the top of your content  files. The front matter section consists of:

 - three dashes `---` and a line break
 - some YAML
 - three dashes `---` and a line break

For example, a valid page file in Markdown might look like this:

```
---
title: My Valid Page
excerpt: Who dee woot who dee woo too?
date: '2015/07/19  16:00'
---
# The Actual Content Begins Here
```

By default and design, Nog doesn't care very much or make assumptions about what a page's metadata has or doesn't have. That said, Nog provides the following sensible default values:

 - `title`

 If missing, Nog uses the humanized name of the file. Thus `my-great-page` will result in a title of My great page.

 - `date`

 If missing (or if the value can't be parsed as a Date) this is set to the modified time of the file. You can use any  format parseable by moment.js, but you can't go wrong with `YYYY/MM/DD HH:mm`.

 - `excerpt`

 If missing, Nog uses the first 255 characters of the strip-tagged content, with all consecutive whitespaces converted to a single space character.

 - `template`

 If missing, assumed to be `page.twig` if the content is a plain page, `post.twig` if it's a blog post or `archive.twig` if it's an archive of blog posts. This value should always be relative to the `_templates` directory.

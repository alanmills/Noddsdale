# Roadmap
The roadmap is a living document and will evolve to document the plans for Noddsdale.

## next
The intention is to build the initial skeleton of Noddsdale
* [CLI help](#cli)
* [Initalise new blog site](#initalise)
* [Generate static html site from markdown source](#generate)
* [Host generated site for local use](#host)

### CLI
1. Provide available commands when your run `noddsdale` with no options.
``` bash
noddsdale

Usage: noddsdale <command>

where <command> is one of: init, build, host

noddsdale <cmd> -h   quick help on <cmd>
noddsdale -l         display full usage info
noddsdale help <cmd>
```
2. Provide command line help when you run `noddsdale <cmd> -h`.
``` bash
noddsdale help init
noddsdale help build
noddsdale help host
```

As part of this first release there are no command line options, all of the configuration is in the config.yml file.

### Initalise
3. Initalise a new blog within an empty directory `noddsdale init`.  The following directory structure and files are created.
```
|-- config.yml
|
|-- layout
|   |-- base
|   |   |-- base.css
|   |   |-- base.html
|   |
|   |-- posts
|   |   |-- posts.css
|   |   |-- posts.html
|
|-- posts
|   |-- <<todays date>>-welcome-to-noddsdale.md
|
|-- images
|   |-- favicon.ico    
```



#### config.yml
``` yml
# Location of source files
source:        .
layouts:       ./layout
posts:         ./posts
static:        ./static
images:        ./images

# Generation
destination:   ./_site
PostStatus:    OnlyPublish

# Hosting
host: 127.0.0.1
port: 8080
```

### Generate
4. Generate the blog `noddsdale build`.  The blog site is generated in the sub-folder `.site/`
```
|-- favicon.ico
|-- index.html
|
|-- blog
|   |-- posts
|   |   |-- <<current year
|   |   |   |-- <<current month>>
|   |   |   |   |-- <<todays date>>-welcome-to-noddsdale.md
|
|-- stylesheets
|   |-- base.css
```

### Host
5. Host the blog locally `noddsdale host`.  [Express](http://expressjs.com)  will be used to run the site on [http://localhost:8080][]


## Frameworks & tools
The following framework and tools are being considered for use as part of this project.
* [Docker](https://www.docker.com)
* [GNU Make](https://www.gnu.org/software/make/)
* [ESLint](http://eslint.org)
* [Intern](https://theintern.github.io)
* [Istanbul](https://istanbul.js.org)
* [Sinon.JS](http://sinonjs.org/releases/v2.1.0/)
* [Chai](http://chaijs.com)
* [Mocha](http://mochajs.org)

## Future
In future version of Noddsdale, the intention is to add the following capabilities:
* Navigation by data
* Navigation by category tags
* Feed syndication of posts
* Static pages like an about page, CV, etc.
* Privacy and cookies information and acceptance handling as needed by EU legistlation.
* Sitemap generation
* Robots.txt
* Image support within posts hosted by noddsdale generated site
* Validation that references are still relevant e.g. that a page linked by a post is still the same as when the page was published
* Migrate Resources from within the resourceManager.js source code to a resource.json file
* Automatically load in command modules when they addeded to the src/commands folder

```
|-- posts.rss
|-- robots.txt
|
|-- blog
|   |-- categories
|   |   |-- noddsdale.html
|   |
|   |-- history
|   |   |-- <<todays year>>-<<todays month>>.html
|
|-- static
|   |-- about.html
|   |-- privacy-and-cookies.html
|   |-- sitemap.html
```
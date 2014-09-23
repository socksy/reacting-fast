reacting-fast
=============

An example of an implementation of infinite scroll in ReactJS


To implement the coding challenge, ReactJS was chosen. The library is defined as a module in `lib/infinite-scroll.jsx`.
The code is then imported and shown to work with an example jsx element defining how each data point will be rendered,
and using the getFakeData method provided.

Usage is as follows
``` js
infiniteScroll = require('./path/to/infinite-scroll.js')
infiniteScroll(DOMElement, DataRepresentation, getFakeData)
```
Where `DOMElement` is the element in which the infinite scroll area is loaded, DataRepresentation is a ReactJS representation
of how a single data point should be rendered, and getFakeData is the data fetching method.

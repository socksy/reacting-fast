#Assuming npm install -g react-tools
JSX=jsx
#Assuming npm install -g browserify
BROWSERIFY=browserify


all: bundle.js main.js lib/infinite-scroll.js

clean:
	rm -f main.js bundle.js lib/infinite-scroll.js

main.js:
	$(JSX) main.jsx > main.js

lib/infinite-scroll.js:
	$(JSX) ./lib/infinite-scroll.jsx > ./lib/infinite-scroll.js

bundle.js: main.js lib/infinite-scroll.js
	$(BROWSERIFY) main.js > bundle.js


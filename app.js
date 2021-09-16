require('dotenv').config();

const path = require('path');
const express = require('express');
const errorHandler = require('errorhandler');
const bodyParser = require('body-parser');
const logger = require('morgan');
const methodOverride = require('method-override');
const Prismic = require('@prismicio/client');
const PrismicDOM = require('prismic-dom');

const app = express();
const port = 3000;

// Initialize the prismic.io api
const initApi = req => Prismic.getApi(process.env.PRISMIC_ENDPOINT, { req });

// Link Resolver
const handleLinkResolver = doc => {
  if (doc.type === 'product') return `/detail/${doc.slug}`;
  if (doc.type === 'about') return '/about';
  if (doc.type === 'collections') return '/collections';
  return '/';
};

// Middleware to inject prismic context
app.use((req, res, next) => {
  res.locals.Link = handleLinkResolver;
  res.locals.PrismicDOM = PrismicDOM;
  next();
});

app.use(logger('dev'));
app.use(errorHandler());
app.use(methodOverride());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(async (req, res, next) => {
  const api = await initApi(req);

  const navigation = await api.getSingle('navigation');
  const preloader = await api.getSingle('preloader');
  const meta = await api.getSingle('meta');
  req.defaults = { navigation, preloader, meta };

  res.locals.Numbers = index => {
    switch (index) {
      case 0:
        return 'One';
      case 1:
        return 'Two';
      case 2:
        return 'Three';
      case 3:
        return 'Four';
      default:
        return '';
    }
  };
  next();
});

app.get('/', async (req, res) => {
  const api = await initApi(req);
  const home = await api.getSingle('home');
  const { results: collections } = await api.query(
    Prismic.Predicates.at('document.type', 'collection')
  );

  res.render('pages/home', { ...req.defaults, home, collections });
});

app.get('/about', async (req, res) => {
  const api = await initApi(req);
  const about = await api.getSingle('about');

  res.render('pages/about', {
    ...req.defaults,
    about,
  });
});

app.get('/detail/:uid', async (req, res) => {
  const { uid } = req.params;
  const api = await initApi(req);
  const product = await api.getByUID('product', uid, {
    fetchLinks: 'collection.title',
  });
  const home = await api.getSingle('home');

  res.render('pages/detail', {
    ...req.defaults,
    product,
    home,
  });
});

app.get('/collections', async (req, res) => {
  const api = await initApi(req);
  const home = await api.getSingle('home');
  const { results: collections } = await api.query(
    Prismic.Predicates.at('document.type', 'collection'),
    {
      fetchLinks: 'product.image',
    }
  );

  res.render('pages/collections', {
    ...req.defaults,
    home,
    collections,
  });
});

app.listen(port, () => {
  console.log(`Listening on port http://localhost:${port}`);
});

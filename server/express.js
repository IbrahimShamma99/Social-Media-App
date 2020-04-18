import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compress from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import Template from './../template';
import RouteNames from './RouteNames';

//API
import userRoutes from './User/';
import authRoutes from './routes/auth.routes';
import postRoutes from './Post/post.routes';

// modules for server side rendering
import React from 'react'
import ReactDOMServer from 'react-dom/server';
import MainRouter from './../client/MainRouter';
import StaticRouter from 'react-router-dom/StaticRouter';

import { SheetsRegistry } from 'react-jss/lib/jss';
import JssProvider from 'react-jss/lib/JssProvider';
import { MuiThemeProvider, createMuiTheme, 
  createGenerateClassName } from 'material-ui/styles';
import {teal, orange} from 'material-ui/colors';

//comment out before building for production bundling using webpack aka devBundle
import devBundle from './devBundle';

const CURRENT_WORKING_DIR = process.cwd();

console.log("\u{1F913}\u{1F913}\u{1F913}","CWD=",CURRENT_WORKING_DIR);
const app = express();

//comment out before building for production
devBundle.compile(app);

// parse body params and attache them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compress());
app.use(helmet());
app.use(cors());

app.use(RouteNames.dist, express.static(path.join(CURRENT_WORKING_DIR, 'dist')));

// mount routes
//FIXME 
app.use(RouteNames.root, userRoutes);
app.use(RouteNames.root, authRoutes);
app.use(RouteNames.root, postRoutes);

app.get('*', (req, res) => {
   const sheetsRegistry = new SheetsRegistry()
   const theme = createMuiTheme({
     palette: {
       primary: {
       light: '#52c7b8',
       main: '#009688',
       dark: '#00675b',
       contrastText: '#fff',
     },
     secondary: {
       light: '#ffd95b',
       main: '#ffa726',
       dark: '#c77800',
       contrastText: '#000',
     },
       openTitle: teal['700'],
       protectedTitle: orange['700'],
       type: 'light'
     }
   })
   const generateClassName = createGenerateClassName()
   const context = {}
   const markup = ReactDOMServer.renderToString(
      <StaticRouter location={req.url} context={context}>
         <JssProvider registry={sheetsRegistry} generateClassName={generateClassName}>
            <MuiThemeProvider theme={theme} sheetsManager={new Map()}>
              <MainRouter/>
            </MuiThemeProvider>
         </JssProvider>
      </StaticRouter>
     )
    if (context.url) {
      return res.redirect(303, context.url)
    }
    const css = sheetsRegistry.toString()
    res.status(200).send(Template({
      markup: markup,
      css: css
    }))
});

// Catch unauthorised errors
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({"error" : err.name + ": " + err.message})
  }
});
export default app

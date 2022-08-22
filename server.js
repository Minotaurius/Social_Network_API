// pull in required packages

const express = require('express');
const mongoose = require('mongoose');

const db = require('./config/connection')
const app = express();
const PORT = process.env.PORT || 9000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
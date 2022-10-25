import request from 'supertest';
import express, { Request, Response } from 'express';
import axios from 'axios';
import app from './src/server';

describe('tests', () => {
  describe('GET /person/:id', () => {
    it('responds with json', async () => {
      const response = await request(app).get('/person/631dbd3a49060eb10bbab71b');

      console.log(response.body);

      const expected = {
        _id: '631dbd3a49060eb10bbab71b',
        firstName: 'aaaa',
        age: 7,
        groups: [
          '631f148707659a02342c3ebc',
        ],
        lastName: 'bbbbb',
      };

      expect(response.status).toEqual(200);
      expect(response.body).toMatchObject(expected);
    });
  });

  describe('GET /group/:id', () => {
    it('responds with json', async () => {
      const response = (await request(app).get('/group/631f148707659a02342c3ebc'));

      console.log(response.body);

      const expected = {
        _id: '631f148707659a02342c3ebc',
        name: 'group1',
        groups: [],
        people: [
          '631dbd3a49060eb10bbab71b',
        ],
      };

      expect(response.status).toEqual(200);
      expect(response.body).toMatchObject(expected);
    });
  });

  describe('GET /person/All/groups/:id', () => {
    it('responds with json', async () => {
      const response = (await request(app).get('/person/All/groups/631dbd3a49060eb10bbab71b'));

      console.log(response.body);

      const expected = {
        _id: '631dbd3a49060eb10bbab71b',
        firstName: 'aaaa',
        age: 7,
        groups: [
          {
            _id: '631f148707659a02342c3ebc',
            name: 'group1',
            groups: [],
            people: [
              '631dbd3a49060eb10bbab71b',
            ],
          },
        ],
        lastName: 'bbbbb',
        __v: 0,
      };

      expect(response.status).toEqual(200);
      expect(response.body).toMatchObject(expected);
    });
  });
});

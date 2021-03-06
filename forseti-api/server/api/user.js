// Copyright 2020 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import {
    Router
} from 'express';
import ForsetiService from '../services/forseti-service';
import cors from 'cors';

export default ({
    config,
    db
}) => {
    let userApi = Router();

    userApi.all('*', cors());

    /**
     * @desc returns the username
     */
    userApi.get('/', function (req, res) {
        res.json({
            username: 'Me'
        });
    });

    /**
     * @desc returns the username
     */
    userApi.get('/AuthenticatedUser', ensureAuthenticated, function (req, res) {
        console.log(req.user)
        res.json('access granted');
    });

    return userApi;
}

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        // req.user is available for use here
        return next();
    }

    console.log(req.user);
    // denied. redirect to login
    res.redirect('/auth/login')
}
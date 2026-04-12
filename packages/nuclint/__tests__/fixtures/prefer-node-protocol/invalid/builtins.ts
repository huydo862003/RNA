import fs from 'fs';
import path from 'path';
import { EventEmitter } from 'events';
import crypto from 'crypto';
import http from 'http';
import { readFile } from 'fs/promises';

const buffer = Buffer.alloc(10);
const result = crypto.randomBytes(8);
